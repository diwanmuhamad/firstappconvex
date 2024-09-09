import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getQuery = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const query = await ctx.db
      .query("query")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .collect();

    return query;
  },
});

export const insertQuery = mutation({
  args: {
    userId: v.string(),
    location: v.string(),
    start: v.string(),
    end: v.string(),
    type: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const queryId = await ctx.db.insert("query", args);
  },
});
