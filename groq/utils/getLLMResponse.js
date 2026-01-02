import { getDBResponse } from "./getDBResponse.js";
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: 'API_KEY_HERE',
  dangerouslyAllowBrowser: true // Use only for prototyping; otherwise use a backend
});

export async function getLLMResponse(query) {
  const dbResults = await getDBResponse(query);
    const template = {
      role:"system",
      content: `You are a helpful assistant that provides concise and accurate information based on the context
      Answer the question based on the context provided.
      If the answer is not contained within the context, respond with "I don't know."
      -------------
      START CONTEXT
      ${dbResults}
      END CONTEXT
      -------------
      question:${query}
      -------------
      `
    };

    const messages = [template];
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant", // Specify the desired model
    } );
  return chatCompletion.choices[0]?.message?.content || "Network Issues. Please try again later";
}