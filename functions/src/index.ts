import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Initialize Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// Static fallbacks for Chat UI
const fallbackPolyglotChats = [
  { sender: 'Gate C Security (Radio)', lang: 'ES-AR', source: '"Necesitamos refuerzos en la puerta tres, la multitud se está empujando."', translated: '"We need backup at gate three, the crowd is pushing."', conf: 98, align: 'left' },
  { sender: 'Polyglot Agent', lang: 'EN-US', source: '"Copy Gate C. Dispatching Crowd Control Unit Alpha. ETA 2 minutes."', translated: '"Copiado Puerta C. Despachando Unidad de Control de Multitudes Alfa. Tiempo estimado 2 minutos."', conf: 100, align: 'right', isAgent: true },
  { sender: 'Medical Team 4 (App)', lang: 'FR-FR', source: '"Patient stabilisé, on l\'emmène au poste médical avancé nord."', translated: '"Patient stabilized, taking them to the north advanced medical post."', conf: 99, align: 'left' },
];

// ──────────────────────────────────────────────
// Strict AI Payload Schema (Zod)
// ──────────────────────────────────────────────
const GenAIPayloadSchema = z.object({
  state: z.object({
    occupancy: z.number(),
    flowRate: z.number(),
    activeIncidents: z.number(),
    powerDraw: z.number(),
    waterUsage: z.number(),
    carbonFootprint: z.string(),
    transitDelayed: z.boolean(),
    activeReroute: z.boolean(),
    targetGate: z.string(),
  }),
  logs: z.object({
    accessLogs: z.array(z.object({
      type: z.enum(['sensor', 'group', 'agent', 'conclusion']),
      message: z.string(),
      submessage: z.string().optional(),
      icon: z.string(),
      color: z.string(),
      bg: z.string(),
    })),
    wayfinderLogs: z.array(z.object({
      type: z.string(),
      title: z.string(),
      message: z.string(),
      icon: z.string(),
      color: z.string(),
      bg: z.string(),
    })),
    verdeTrails: z.array(z.object({
      message: z.string(),
      type: z.enum(['log', 'recommendation']),
      submessage: z.string().optional(),
      savings: z.string().optional(),
    }))
  })
});

type GenAIPayload = z.infer<typeof GenAIPayloadSchema>;

/**
 * Fallback state if AI hallucination occurs
 */
function getFallbackState(): GenAIPayload {
  return {
    state: {
      occupancy: 85,
      flowRate: 100,
      activeIncidents: 0,
      powerDraw: 4.2,
      waterUsage: 1200,
      carbonFootprint: "-12.4%",
      transitDelayed: false,
      activeReroute: false,
      targetGate: "GATE C",
    },
    logs: {
      accessLogs: [],
      wayfinderLogs: [],
      verdeTrails: []
    }
  };
}

/**
 * Invokes Gemini AI to dictate the absolute state of the stadium and generate reasoning trails.
 */
export async function fetchGenAIState(): Promise<GenAIPayload> {
  try {
    const prompt = `You are the AI brain of 'Concourse', a massive stadium management system for the FIFA World Cup 2026.
You are directly in control of the simulation numerical state and the operational logs.

Generate a JSON object conforming EXACTLY to this schema:
{
  "state": {
    "occupancy": number (75-100),
    "flowRate": number (80-150),
    "activeIncidents": number (0-5),
    "powerDraw": number (3.0-5.0),
    "waterUsage": number (1000-2000),
    "carbonFootprint": string (e.g. "-12.4%"),
    "transitDelayed": boolean,
    "activeReroute": boolean,
    "targetGate": string (e.g. "GATE C")
  },
  "logs": {
    "accessLogs": [4 objects with { type, message, submessage, icon, color, bg }],
    "wayfinderLogs": [3 objects with { type, title, message, icon, color, bg }],
    "verdeTrails": [3 objects with { message, type: 'log'|'recommendation', submessage, savings }]
  }
}

Use context: Imagine a high-stakes match is happening. Ensure the logs logically match the numerical state you generate.
Return ONLY valid JSON without markdown formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    const parsedJson = JSON.parse(response.text || '{}');
    
    // Strict runtime validation
    const validatedData = GenAIPayloadSchema.parse(parsedJson);
    console.log("✅ Successfully generated and validated dynamic Gen AI state.");
    return validatedData;
    
  } catch (e) {
    console.error("❌ Gemini AI generation or Zod validation failed. Using fallback.", e);
    return getFallbackState();
  }
}

// ──────────────────────────────────────────────
// Scheduled Cloud Function (Runs every minute)
// ──────────────────────────────────────────────
export const runSimulationTick = onSchedule("every 1 minutes", async () => {
  const now = new Date();
  
  try {
    const batch = db.batch();

    // 1. 🧠 Gen AI Directly Dictates the System State
    const aiPayload = await fetchGenAIState();

    // 2. Pulse Metrics (AI Driven)
    batch.set(db.doc('pulse_metrics/live'), {
      occupancy: aiPayload.state.occupancy,
      flowRate: aiPayload.state.flowRate,
      activeIncidents: aiPayload.state.activeIncidents,
      timestamp: now.toISOString(),
    });

    // 3. Transit Schedules (AI Driven Status)
    const transitSchedules = {
      trains: [
        { line: 'NJT Meadowlands Rail', status: 'On Time', time: '12m', color: 'bg-pitch' },
        { line: 'Coach USA 351 Bus', status: aiPayload.state.transitDelayed ? 'Delayed' : 'On Time', time: aiPayload.state.transitDelayed ? '35m' : '15m', color: aiPayload.state.transitDelayed ? 'bg-signal' : 'bg-pitch' },
        { line: 'NJT Secaucus Shuttle', status: 'On Time', time: '24m', color: 'bg-pitch' },
      ],
      timestamp: now.toISOString(),
    };
    batch.set(db.doc('transit_schedules/live'), transitSchedules);

    // 4. Format AI Timestamps
    const rotatedChats = [...fallbackPolyglotChats].map(chat => ({ ...chat, time: new Date(now.getTime() - Math.random() * 30000).toISOString() }));
    const finalAccessLogs = aiPayload.logs.accessLogs.map(log => ({ ...log, time: new Date(now.getTime() - Math.random() * 10000).toISOString() }));
    const finalWayfinderLogs = aiPayload.logs.wayfinderLogs.map(log => ({ ...log, time: new Date(now.getTime() - Math.random() * 5000).toISOString() }));
    const finalVerdeLogs = aiPayload.logs.verdeTrails.map(log => ({ ...log, time: new Date(now.getTime() - Math.random() * 20000).toISOString() }));

    // 5. Update Agent Documents in Batch (AI Driven)
    batch.set(db.doc('access_logs/live'), {
      validScans: Math.floor(aiPayload.state.occupancy * 156),
      invalidAttempts: aiPayload.state.activeIncidents * 7 + 2,
      vipClearances: 345,
      detectedBreaches: aiPayload.state.activeIncidents,
      reasoningTrail: finalAccessLogs,
      timestamp: now.toISOString(),
    });

    batch.set(db.doc('wayfinder_routes/live'), {
      activeReroute: aiPayload.state.activeReroute,
      targetGate: aiPayload.state.targetGate,
      flowRate: aiPayload.state.flowRate * 12,
      capacityLimit: 850,
      reasoningTrail: finalWayfinderLogs,
      timestamp: now.toISOString(),
    });

    batch.set(db.doc('polyglot_streams/live'), {
      activeNodes: aiPayload.state.flowRate + 10,
      liveTranslations: rotatedChats,
      timestamp: now.toISOString(),
    });

    batch.set(db.doc('verde_stats/live'), {
      powerDraw: aiPayload.state.powerDraw,
      waterUsage: aiPayload.state.waterUsage,
      carbonFootprint: aiPayload.state.carbonFootprint,
      reasoningTrail: finalVerdeLogs,
      timestamp: now.toISOString(),
    });

    batch.set(db.doc('_worker_health/simulation'), {
      lastTick: now.toISOString(),
      status: 'healthy-cloud-function-genai',
    });

    // 6. Commit atomic batch
    await batch.commit();
    console.log(`✅ Simulation batch committed at ${now.toISOString()}`);
    
  } catch (error) {
    console.error(`❌ Simulation batch failed:`, error);
  }
});
