import { OpenAI } from 'openai'
import { action } from "./_generated/server";
import { v } from "convex/values";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.aimlapi.com",
});

  export const chat = action({
    args: {input: v.string()},
    handler: async (ctx, args) => {
      // do something with data
      
      const chatCompletion = await openai.chat.completions.create({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            { role: "system", content: "You are a travel guide. Create unlisted itinerary items and be helpful" },
            { role: "user", content: args.input }
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        return chatCompletion.choices[0].message.content
    },
  });