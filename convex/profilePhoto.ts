import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

/**
 * Profile photo, storage-backed.
 *
 * Flow:
 *  1. Client calls generateUploadUrl() -> short-lived upload URL
 *  2. Client POSTs the image file to that URL -> receives storageId
 *  3. Client calls saveProfilePhoto({ storageId }) -> becomes the active avatar
 *  4. Client can subscribe to getProfilePhoto() to resolve a display URL
 */

/** Short-lived upload URL for storing a new photo in Convex file storage. */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

/** Save (or replace) the active profile photo by storage id. */
export const saveProfilePhoto = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    // Replace any existing photo row
    const existing = await ctx.db.query("profilePhoto").collect()
    for (const row of existing) {
      await ctx.db.delete(row._id)
    }
    return await ctx.db.insert("profilePhoto", {
      storageId: args.storageId,
      updatedAt: Date.now(),
    })
  },
})

/** Resolve the active profile photo to a display URL (or null if unset). */
export const getProfilePhoto = query({
  args: {},
  handler: async (ctx) => {
    const latest = await ctx.db
      .query("profilePhoto")
      .order("desc")
      .first()
    if (!latest) return null
    return await ctx.storage.getUrl(latest.storageId)
  },
})

/** Delete a stored file (cleanup after replacing a photo). */
export const deleteStorageFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId)
    return { deleted: true as const }
  },
})
