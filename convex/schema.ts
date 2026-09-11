import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
  })
    .index("by_creation_time", ["createdAt"])
    .index("by_read", ["read"]),

  profilePhoto: defineTable({
    storageId: v.id("_storage"),
    updatedAt: v.number(),
  }),
})
