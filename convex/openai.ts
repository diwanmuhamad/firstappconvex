import { OpenAI } from 'openai'
import { action } from "./_generated/server";
import { v } from "convex/values";

const openai = new OpenAI({
  apiKey: "6622344ef5cb44f4b2ddd7cfbcc7af0d",
  baseURL: "https://api.aimlapi.com",
});

  export const chat = action({
    args: {input: v.string()},
    handler: async (ctx, args) => {
      // do something with data
      
      const chatCompletion = await openai.chat.completions.create({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
            { role: "user", content: args.input }
          ],
          temperature: 0.7,
          max_tokens: 128,
        });

        return chatCompletion.choices[0].message.content
    },
  });