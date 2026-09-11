import { v } from "convex/values"
import { action, mutation, query } from "./_generated/server"
import { api } from "./_generated/api"
import { z } from "zod"

const MessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(200),
  subject: z.string().max(150).optional(),
  message: z.string().min(10, "Message must contain at least 10 characters").max(5000),
})

/** Public action used by the contact form. Validates, rate-limits, then stores. */
export const submitMessage = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Validate with zod — throws a friendly message on bad input
    const parsed = MessageSchema.parse({
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      subject: args.subject?.trim() || undefined,
      message: args.message.trim(),
    })

    // 2. Simple rate limit: max 5 messages per email per hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const recent = await ctx.runQuery(api.messages.listRecent, { since: oneHourAgo })
    const fromSameEmail = recent.filter((m) => m.email === parsed.email)
    if (fromSameEmail.length >= 5) {
      throw new Error("Too many messages from this email — please try again later.")
    }

    // 3. Persist
    await ctx.runMutation(api.messages.insertMessage, {
      name: parsed.name,
      email: parsed.email,
      subject: parsed.subject,
      message: parsed.message,
      createdAt: Date.now(),
      read: false,
    })

    return { ok: true as const }
  },
})

/** Recent messages (used by the action for rate limiting). */
export const listRecent = query({
  args: { since: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_creation_time", (q) => q.gte("createdAt", args.since))
      .collect()
  },
})

/** Insert a validated message. Called from the submitMessage action. */
export const insertMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", args)
  },
})

/** Inbox for the site owner. */
export const listMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_creation_time")
      .order("desc")
      .collect()
  },
})

/** Mark a message as read. */
export const markRead = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: true })
  },
})
