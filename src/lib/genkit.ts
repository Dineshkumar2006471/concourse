import { genkit } from 'genkit';
import { googleAI, gemini15Flash, gemini15Pro } from '@genkit-ai/googleai'; // Or google-genai depending on final install

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_CLOUD_PROJECT_ID ? undefined : process.env.GOOGLE_CLOUD_PROJECT_ID, // Use ADC if possible, or key
      // If we are strictly using Vertex AI, we'd use @genkit-ai/vertexai. 
      // But for hackathons with raw Gemini keys, googleAI is often easier.
    })
  ],
  model: gemini15Flash, // Default to flash for fan agents
});

// Common persona context injected into all agents
export const SYSTEM_CONTEXT = `
You are an agent operating within Concourse, the AI Operating System for the FIFA World Cup 2026.
Your role is to assist fans or staff based on your specific agent designation.
Always be concise, factual, and maintain a premium, confident tone.
If generating reasoning logs, detail the tool calls and logic clearly.
`;
