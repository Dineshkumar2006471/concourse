import * as dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// State for shifting trails
const accessLogs = [
  { type: 'sensor', message: 'Continuous scan of 124 perimeter optical sensors initiated.', icon: 'sensors', color: 'text-ink-muted', bg: 'bg-surface-container' },
  { type: 'group', message: 'Cross-referenced facial metadata with daily accreditation roster.', submessage: 'Variance detected: 0.002% (Acceptable tolerance)', icon: 'group', color: 'text-ink-muted', bg: 'bg-surface-container' },
  { type: 'agent', message: 'Integrity validated. No forced entry signatures detected on structural acoustic nodes.', submessage: 'Agent: Sentinel-X', icon: 'smart_toy', color: 'text-white', bg: 'bg-secondary' },
  { type: 'conclusion', message: 'Conclusion: Sector Green. Perimeter Secure.', icon: 'check', color: 'text-primary', bg: 'bg-primary-container text-on-primary-container border border-primary shadow-sm' },
];

const wayfinderLogs = [
  { type: 'anomaly', message: 'Gate C inbound flow rate exceeds capacity threshold by 42%. Sustained over 5 minute rolling window.', title: 'Anomaly Detected', icon: 'warning', color: 'text-error', bg: 'bg-error-container border-error' },
  { type: 'analysis', message: 'Evaluating adjacent ingress points based on current ticketing distribution and physical distance.', title: 'Path Analysis', icon: 'analytics', color: 'text-on-surface-variant', bg: 'bg-surface-container border-line' },
  { type: 'reroute', message: 'Diverting South Concourse traffic to Gate F. Capacity available. Estimated clearance time: 14 mins.', title: 'Reroute Initiated', icon: 'alt_route', color: 'text-secondary', bg: 'bg-floodlight-tint border-secondary' },
  { type: 'broadcast', message: 'Digital wayfinding displays in sectors 12-18 updated with dynamic arrows pointing to Gate F.', title: 'Signage Update Executed', icon: 'cast', color: 'text-on-surface-variant', bg: 'bg-surface-container border-line' },
];

const polyglotChats = [
  { sender: 'Gate C Security (Radio)', lang: 'ES-AR', source: '"Necesitamos refuerzos en la puerta tres, la multitud se está empujando."', translated: '"We need backup at gate three, the crowd is pushing."', conf: 98, align: 'left' },
  { sender: 'Polyglot Agent', lang: 'EN-US', source: '"Copy Gate C. Dispatching Crowd Control Unit Alpha. ETA 2 minutes."', translated: '"Copiado Puerta C. Despachando Unidad de Control de Multitudes Alfa. Tiempo estimado 2 minutos."', conf: 100, align: 'right', isAgent: true },
  { sender: 'Medical Team 4 (App)', lang: 'FR-FR', source: '"Patient stabilisé, on l\'emmène au poste médical avancé nord."', translated: '"Patient stabilized, taking them to the north advanced medical post."', conf: 99, align: 'left' },
];

const verdeTrails = [
  { time: '14:02:15 UTC', message: 'Detected anomalous ambient temperature rise in North Stand (Zone B).', type: 'log' },
  { time: '14:02:18 UTC', message: 'Cross-referenced with ticketing data. Occupancy at 94% capacity. Sun exposure peak predicted in 15 mins.', type: 'log' },
  { time: '14:02:22 UTC - RECOMMENDATION', message: 'HVAC Optimization Required', submessage: 'Pre-cool North Stand by shifting load from South Concourse to avoid peak grid tariff spike at 14:30.', savings: '120 kW', type: 'recommendation' },
];

let tickCounter = 0;

async function tickSimulation() {
  const now = new Date();
  tickCounter++;
  
  try {
    // 1. Pulse Metrics
    const pulseMetrics = {
      occupancy: Math.floor(Math.random() * (95 - 75 + 1) + 75),
      flowRate: Math.floor(Math.random() * (120 - 80 + 1) + 80),
      activeIncidents: Math.floor(Math.random() * 3),
      timestamp: now.toISOString()
    };
    await setDoc(doc(db, 'pulse_metrics', 'live'), pulseMetrics);

    // 2. Transit Schedules
    const transitSchedules = {
      trains: [
        { line: 'NJT Meadowlands Rail', status: 'On Time', time: `${Math.floor(Math.random() * 15 + 1)}m`, color: 'bg-pitch' },
        { line: 'Coach USA 351 Bus', status: Math.random() > 0.8 ? 'Delayed' : 'On Time', time: `${Math.floor(Math.random() * 30 + 10)}m`, color: Math.random() > 0.8 ? 'bg-signal' : 'bg-pitch' },
        { line: 'NJT Secaucus Shuttle', status: 'On Time', time: '24m', color: 'bg-pitch' },
      ],
      timestamp: now.toISOString()
    };
    await setDoc(doc(db, 'transit_schedules', 'live'), transitSchedules);

    // Rotate arrays to simulate live data
    const rotatedAccess = [...accessLogs].map(log => ({...log, time: new Date(now.getTime() - Math.random() * 10000).toISOString()}));
    if (tickCounter % 3 === 0) rotatedAccess.unshift(rotatedAccess.pop()!);

    const rotatedWayfinder = [...wayfinderLogs];
    if (tickCounter % 4 === 0) rotatedWayfinder.unshift(rotatedWayfinder.pop()!);

    const rotatedChats = [...polyglotChats].map(chat => ({...chat, time: new Date(now.getTime() - Math.random() * 30000).toISOString()}));
    if (tickCounter % 2 === 0) rotatedChats.unshift(rotatedChats.pop()!);

    // 3. Access Metrics
    const accessMetrics = {
      validScans: Math.floor(pulseMetrics.occupancy * 156 + Math.random() * 50),
      invalidAttempts: pulseMetrics.activeIncidents * 7 + 2 + Math.floor(Math.random() * 3),
      vipClearances: 345 + Math.floor(Math.random() * 5),
      detectedBreaches: pulseMetrics.activeIncidents,
      reasoningTrail: rotatedAccess,
      timestamp: now.toISOString()
    };
    await setDoc(doc(db, 'access_logs', 'live'), accessMetrics);

    // 4. Wayfinder Metrics
    const wayfinderMetrics = {
      activeReroute: pulseMetrics.activeIncidents > 0,
      targetGate: `GATE ${['C', 'D', 'F'][Math.floor(Math.random() * 3)]}`,
      flowRate: pulseMetrics.flowRate * 12 + Math.floor(Math.random() * 50),
      capacityLimit: 850,
      reasoningTrail: rotatedWayfinder,
      timestamp: now.toISOString()
    };
    await setDoc(doc(db, 'wayfinder_routes', 'live'), wayfinderMetrics);

    // 5. Polyglot Streams
    const polyglotMetrics = {
      activeNodes: pulseMetrics.flowRate + Math.floor(Math.random() * 20),
      liveTranslations: rotatedChats,
      timestamp: now.toISOString()
    };
    await setDoc(doc(db, 'polyglot_streams', 'live'), polyglotMetrics);

    // 6. Verde Stats
    const verdeMetrics = {
      powerDraw: (pulseMetrics.occupancy / 20) + (Math.random() * 0.2),
      waterUsage: pulseMetrics.flowRate * 12 + Math.floor(Math.random() * 100),
      carbonFootprint: `-${(12.4 + Math.random()).toFixed(1)}%`,
      reasoningTrail: verdeTrails.map(t => ({...t, time: new Date(now.getTime() - Math.random() * 20000).toISOString()})),
      timestamp: now.toISOString()
    };
    await setDoc(doc(db, 'verde_stats', 'live'), verdeMetrics);

    console.log(`[${now.toISOString()}] ✅ Simulation tick completed (All 6 Streams).`);
  } catch (error) {
    console.error(`[${now.toISOString()}] ❌ Failed to write to Firestore!`, error);
  }
}

console.log("🚀 Starting Full Concourse Simulation Worker...");
tickSimulation();
setInterval(tickSimulation, 5000);
