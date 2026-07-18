import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash
});

// A simple tool for the Wayfinder to check if a specific gate is congested
export const checkGateCongestion = ai.defineTool(
  {
    name: 'checkGateCongestion',
    description: 'Checks the current live crowd density and queue time for a specific gate',
    inputSchema: z.object({
      gateId: z.string().describe('The ID of the gate (e.g. Gate 12, Gate 14)')
    }),
  },
  async ({ gateId }) => {
    // In a real implementation, this would query the 'crowd_readings' table in Firestore.
    // For this demonstration, we'll return simulated data that forces a reroute condition.
    if (gateId.includes('12')) {
      return { 
        status: 'CRITICAL', 
        queueLengthPercent: 340, 
        waitTimeMinutes: 28,
        reason: 'Bag Check understaffed'
      };
    }
    
    return { 
      status: 'NORMAL', 
      queueLengthPercent: 12, 
      waitTimeMinutes: 4,
      reason: 'Nominal flow'
    };
  }
);

// Define the core Wayfinder prompt
export const wayfinderAgent = ai.definePrompt(
  {
    name: 'wayfinderAgent',
    description: 'An AI assistant that helps fans navigate the stadium dynamically based on live crowd data.',
    input: {
      schema: z.object({
        userRequest: z.string()
      })
    },
    tools: [checkGateCongestion],
  },
  `You are the Concourse Wayfinder Agent for the FIFA World Cup 2026.
  Your job is to help fans navigate the stadium.
  
  CRITICAL RULES:
  1. ALWAYS use the checkGateCongestion tool before suggesting a route if the user asks about a gate or entrance.
  2. If a gate is heavily congested (queue > 100%), you MUST recommend an alternative gate and explain WHY (e.g., "Gate 12 queue is 340% above baseline, Gate 14 is 12% below, net time saved: 24 min").
  3. Keep your tone helpful, energetic, and professional.
  
  User Request: {{userRequest}}
  `
);
