import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGenAIState } from '../src/index';
import { GoogleGenAI } from '@google/genai';

// Mock dependencies
vi.mock('@google/genai', () => {
  const MockGenAI = vi.fn();
  MockGenAI.prototype.models = {
    generateContent: vi.fn(),
  };
  return { GoogleGenAI: MockGenAI };
});

vi.mock('firebase-admin', () => {
  return {
    initializeApp: vi.fn(),
    firestore: vi.fn(() => ({
      batch: vi.fn(() => ({
        set: vi.fn(),
        commit: vi.fn(),
      })),
      doc: vi.fn(),
    })),
  };
});

describe('fetchGenAIState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return fallback state when Gemini throws an error', async () => {
    // Mock the GoogleGenAI instance to throw an error
    const aiInstance = new GoogleGenAI({ apiKey: 'test' });
    vi.mocked(aiInstance.models.generateContent).mockRejectedValueOnce(new Error('API Timeout'));

    const result = await fetchGenAIState();

    expect(result.state.occupancy).toBe(85);
    expect(result.state.flowRate).toBe(100);
    expect(result.state.activeIncidents).toBe(0);
    expect(result.logs.accessLogs).toEqual([]);
  });

  it('should return fallback state when Gemini returns invalid JSON', async () => {
    const aiInstance = new GoogleGenAI({ apiKey: 'test' });
    vi.mocked(aiInstance.models.generateContent).mockResolvedValueOnce({
      text: 'This is just some plain text, not JSON at all.',
    } as any);

    const result = await fetchGenAIState();

    expect(result.state.occupancy).toBe(85);
  });

  it('should return fallback state when Gemini returns JSON that fails Zod validation', async () => {
    const aiInstance = new GoogleGenAI({ apiKey: 'test' });
    vi.mocked(aiInstance.models.generateContent).mockResolvedValueOnce({
      text: JSON.stringify({ state: { occupancy: 'should-be-number' } }), // Malformed state
    } as any);

    const result = await fetchGenAIState();

    expect(result.state.occupancy).toBe(85); // Falls back to default 85
  });

  it('should return valid parsed data when Gemini returns correct JSON', async () => {
    const validResponse = {
      state: {
        occupancy: 92,
        flowRate: 110,
        activeIncidents: 1,
        powerDraw: 4.5,
        waterUsage: 1500,
        carbonFootprint: "-10%",
        transitDelayed: false,
        activeReroute: true,
        targetGate: "GATE D",
      },
      logs: {
        accessLogs: [],
        wayfinderLogs: [],
        verdeTrails: []
      }
    };

    const aiInstance = new GoogleGenAI({ apiKey: 'test' });
    vi.mocked(aiInstance.models.generateContent).mockResolvedValueOnce({
      text: JSON.stringify(validResponse),
    } as any);

    const result = await fetchGenAIState();

    expect(result.state.occupancy).toBe(92);
    expect(result.state.targetGate).toBe("GATE D");
  });
});
