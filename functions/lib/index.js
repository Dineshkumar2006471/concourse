"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSimulationTick = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const admin = __importStar(require("firebase-admin"));
const genai_1 = require("@google/genai");
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
// Initialize Google Gen AI
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
// Static fallbacks in case the AI fails or times out
const fallbackPolyglotChats = [
    { sender: 'Gate C Security (Radio)', lang: 'ES-AR', source: '"Necesitamos refuerzos en la puerta tres, la multitud se está empujando."', translated: '"We need backup at gate three, the crowd is pushing."', conf: 98, align: 'left' },
    { sender: 'Polyglot Agent', lang: 'EN-US', source: '"Copy Gate C. Dispatching Crowd Control Unit Alpha. ETA 2 minutes."', translated: '"Copiado Puerta C. Despachando Unidad de Control de Multitudes Alfa. Tiempo estimado 2 minutos."', conf: 100, align: 'right', isAgent: true },
    { sender: 'Medical Team 4 (App)', lang: 'FR-FR', source: '"Patient stabilisé, on l\'emmène au poste médical avancé nord."', translated: '"Patient stabilized, taking them to the north advanced medical post."', conf: 99, align: 'left' },
];
// ──────────────────────────────────────────────
// Scheduled Cloud Function (Runs every minute)
// ──────────────────────────────────────────────
exports.runSimulationTick = (0, scheduler_1.onSchedule)("every 1 minutes", async (event) => {
    const now = new Date();
    try {
        const batch = db.batch();
        // 1. Pulse Metrics
        const pulseMetrics = {
            occupancy: Math.floor(Math.random() * (95 - 75 + 1) + 75),
            flowRate: Math.floor(Math.random() * (120 - 80 + 1) + 80),
            activeIncidents: Math.floor(Math.random() * 3),
            timestamp: now.toISOString(),
        };
        batch.set(db.doc('pulse_metrics/live'), pulseMetrics);
        // 2. Transit Schedules
        const transitSchedules = {
            trains: [
                { line: 'NJT Meadowlands Rail', status: 'On Time', time: `${Math.floor(Math.random() * 15 + 1)}m`, color: 'bg-pitch' },
                { line: 'Coach USA 351 Bus', status: Math.random() > 0.8 ? 'Delayed' : 'On Time', time: `${Math.floor(Math.random() * 30 + 10)}m`, color: Math.random() > 0.8 ? 'bg-signal' : 'bg-pitch' },
                { line: 'NJT Secaucus Shuttle', status: 'On Time', time: '24m', color: 'bg-pitch' },
            ],
            timestamp: now.toISOString(),
        };
        batch.set(db.doc('transit_schedules/live'), transitSchedules);
        // 3. 🧠 CALL GEMINI TO GENERATE DYNAMIC LOGS (GEN AI REQUIREMENT)
        let aiGeneratedLogs = {};
        try {
            const prompt = `You are the AI brain of 'Concourse', a massive stadium management system.
Current stadium occupancy: ${pulseMetrics.occupancy}%
Active incidents: ${pulseMetrics.activeIncidents}

Generate a JSON object containing 3 arrays of realistic simulation logs based on the current context:
1. 'accessLogs': 4 objects with { type, message, submessage, icon, color, bg }. 
   (Icons: 'sensors', 'group', 'check', 'warning'. Colors: 'text-ink-muted', 'text-white', 'text-error'. Backgrounds: 'bg-surface-container', 'bg-secondary', 'bg-error-container')
2. 'wayfinderLogs': 3 objects with { type, message, title, icon, color, bg }.
   (Icons: 'warning', 'analytics', 'alt_route', 'cast')
3. 'verdeTrails': 3 objects with { message, type: 'log' | 'recommendation', submessage, savings }.
   (Make it about HVAC, power, or water).

Return ONLY valid JSON.`;
            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json" }
            });
            aiGeneratedLogs = JSON.parse(response.text || '{}');
            console.log("✅ Successfully generated dynamic Gen AI logs.");
        }
        catch (e) {
            console.error("❌ Gemini AI generation failed:", e);
        }
        const rotatedChats = [...fallbackPolyglotChats].map(chat => ({ ...chat, time: new Date(now.getTime() - Math.random() * 30000).toISOString() }));
        // Format timestamps for the AI generated logs
        const finalAccessLogs = (aiGeneratedLogs.accessLogs || []).map((log) => ({ ...log, time: new Date(now.getTime() - Math.random() * 10000).toISOString() }));
        const finalWayfinderLogs = aiGeneratedLogs.wayfinderLogs || [];
        const finalVerdeLogs = (aiGeneratedLogs.verdeTrails || []).map((log) => ({ ...log, time: new Date(now.getTime() - Math.random() * 20000).toISOString() }));
        // 4. Access Metrics
        batch.set(db.doc('access_logs/live'), {
            validScans: Math.floor(pulseMetrics.occupancy * 156 + Math.random() * 50),
            invalidAttempts: pulseMetrics.activeIncidents * 7 + 2 + Math.floor(Math.random() * 3),
            vipClearances: 345 + Math.floor(Math.random() * 5),
            detectedBreaches: pulseMetrics.activeIncidents,
            reasoningTrail: finalAccessLogs,
            timestamp: now.toISOString(),
        });
        // 5. Wayfinder Metrics
        batch.set(db.doc('wayfinder_routes/live'), {
            activeReroute: pulseMetrics.activeIncidents > 0,
            targetGate: `GATE ${['C', 'D', 'F'][Math.floor(Math.random() * 3)]}`,
            flowRate: pulseMetrics.flowRate * 12 + Math.floor(Math.random() * 50),
            capacityLimit: 850,
            reasoningTrail: finalWayfinderLogs,
            timestamp: now.toISOString(),
        });
        // 6. Polyglot Streams (Still rotating static for chat UI structure)
        batch.set(db.doc('polyglot_streams/live'), {
            activeNodes: pulseMetrics.flowRate + Math.floor(Math.random() * 20),
            liveTranslations: rotatedChats,
            timestamp: now.toISOString(),
        });
        // 7. Verde Stats
        batch.set(db.doc('verde_stats/live'), {
            powerDraw: (pulseMetrics.occupancy / 20) + (Math.random() * 0.2),
            waterUsage: pulseMetrics.flowRate * 12 + Math.floor(Math.random() * 100),
            carbonFootprint: `-${(12.4 + Math.random()).toFixed(1)}%`,
            reasoningTrail: finalVerdeLogs,
            timestamp: now.toISOString(),
        });
        // 8. Health Heartbeat
        batch.set(db.doc('_worker_health/simulation'), {
            lastTick: now.toISOString(),
            status: 'healthy-cloud-function-genai',
        });
        // Commit atomic batch
        await batch.commit();
        console.log(`✅ Simulation batch committed at ${now.toISOString()}`);
    }
    catch (error) {
        console.error(`❌ Simulation batch failed:`, error);
    }
});
//# sourceMappingURL=index.js.map