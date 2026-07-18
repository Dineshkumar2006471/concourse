import { ai, SYSTEM_CONTEXT } from '../genkit';
import { wayfinderAgent } from './wayfinder';

// The Orchestrator routes user queries to the correct specialized agent.

export const orchestratorAgent = ai.defineFlow(
  {
    name: 'orchestratorFlow',
    inputSchema: ai.defineSchema('OrchestratorInput', {
      type: 'object',
      properties: {
        query: { type: 'string' },
        venueId: { type: 'string' },
      }
    }),
  },
  async (input) => {
    // In a full implementation, we'd use a classifier or tool-calling LLM to route.
    // For this demo structure, we use basic keyword matching to delegate to Wayfinder.
    const lowerQuery = input.query.toLowerCase();
    
    let routedTo = 'Wayfinder';
    let response;
    
    if (lowerQuery.includes('where') || lowerQuery.includes('how to get') || lowerQuery.includes('navigate')) {
      const wayfinderOutput = await wayfinderAgent({
        query: input.query,
        venueId: input.venueId,
        currentLocation: 'Gate A' // Mocked for demo
      });
      return {
        agent: 'Wayfinder',
        ...wayfinderOutput
      };
    }
    
    // Fallback simple response
    return {
      agent: 'Orchestrator',
      response: 'I am the Concourse Orchestrator. How can I assist you at the stadium today?',
      reasoningTrail: [
        { tool: 'intent_classifier', logic: 'No specific agent matched, using default greeting.' }
      ],
      suggestedRoute: []
    };
  }
);
