import { genkit } from 'genkit';
import { googleAI, gemini15Pro } from '@genkit-ai/googleai';
import { z } from 'zod';

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Pro
});

// A tool that fetches the latest 3 active incidents and transit delays
export const getActiveIncidentsAndDelays = ai.defineTool(
  {
    name: 'getActiveIncidentsAndDelays',
    description: 'Fetches current live alerts across all stadium zones and transit systems.',
    inputSchema: z.object({}),
  },
  async () => {
    // In a real implementation, this reads from the Supabase/Firebase 'incidents' and 'transit_schedules' collections.
    return {
      incidents: [
        { id: 'INC-101', type: 'Queue Spike', location: 'Gate 12', severity: 'HIGH', timestamp: new Date().toISOString() }
      ],
      transitDelays: [
        { line: 'SH-A Shuttle', status: 'DELAYED', delayMinutes: 10, impactGate: 'Gate 12' }
      ]
    };
  }
);

// Define the core Command Agent prompt
export const commandAgent = ai.definePrompt(
  {
    name: 'commandAgent',
    description: 'An operational intelligence agent that correlates cross-system alerts and proposes actions to staff.',
    input: {
      schema: z.object({
        query: z.string()
      })
    },
    tools: [getActiveIncidentsAndDelays],
  },
  `You are the Concourse Command Agent for the FIFA World Cup 2026.
  Your job is to assist stadium staff by correlating data across multiple agent domains.
  
  CRITICAL RULES:
  1. ALWAYS use the getActiveIncidentsAndDelays tool when asked about current status.
  2. If you notice a correlation between an incident (e.g., Gate congestion) and a transit delay affecting the same area, you MUST highlight this correlation.
  3. ALWAYS propose a concrete "Dispatch Action" for the human operator to approve (e.g., "Dispatch 4 extra security personnel from Gate 14 to Gate 12").
  
  User Request: {{query}}
  `
);
