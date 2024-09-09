import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  query: defineTable({
    userId: v.id("users"),
    location: v.string(),
    start: v.string(),
    end: v.string(),
    type: v.string(),
    category: v.string(),
  }).index("userId", ["userId"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});

/*

*/
