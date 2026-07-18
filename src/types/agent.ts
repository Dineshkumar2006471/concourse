/**
 * Centralized type definitions for all Concourse AI Agent data models.
 *
 * These types define the canonical shape of Firestore documents consumed
 * by the frontend. All agent pages and hooks should import from here
 * rather than defining inline types.
 */

// ──────────────────────────────────────────────
// Pulse Agent
// ──────────────────────────────────────────────

/** Live pulse data metrics representing overall stadium occupancy and throughput. */
export type PulseData = {
  occupancy: number;
  flowRate: number;
  activeIncidents: number;
  timestamp: string;
};

// ──────────────────────────────────────────────
// Transit Agent
// ──────────────────────────────────────────────

export type TrainSchedule = {
  line: string;
  status: string;
  time: string;
  color: string;
};

export type TransitData = {
  trains: TrainSchedule[];
};

// ──────────────────────────────────────────────
// Access Agent
// ──────────────────────────────────────────────

export type AccessLog = {
  type: 'sensor' | 'group' | 'agent' | 'conclusion';
  message: string;
  submessage?: string;
  icon: string;
  color: string;
  bg: string;
  time: string;
};

export type AccessData = {
  validScans: number;
  invalidAttempts: number;
  vipClearances: number;
  detectedBreaches: number;
  reasoningTrail: AccessLog[];
  timestamp: string;
};

// ──────────────────────────────────────────────
// Wayfinder Agent
// ──────────────────────────────────────────────

export type WayfinderLog = {
  type: string;
  title: string;
  message: string;
  icon: string;
  color: string;
  bg: string;
  time: string;
};

export type WayfinderData = {
  activeReroute: boolean;
  targetGate: string;
  flowRate: number;
  capacityLimit: number;
  reasoningTrail: WayfinderLog[];
  timestamp: string;
};

// ──────────────────────────────────────────────
// Polyglot Agent
// ──────────────────────────────────────────────

export type PolyglotChat = {
  sender: string;
  lang: string;
  source: string;
  translated: string;
  conf: number;
  align: 'left' | 'right';
  isAgent?: boolean;
  time: string;
};

export type PolyglotData = {
  activeNodes: number;
  liveTranslations: PolyglotChat[];
  timestamp: string;
};

// ──────────────────────────────────────────────
// Verde Agent
// ──────────────────────────────────────────────

export type VerdeLog = {
  time: string;
  message: string;
  type: 'log' | 'recommendation';
  submessage?: string;
  savings?: string;
};

export type VerdeData = {
  powerDraw: number;
  waterUsage: number;
  carbonFootprint: string;
  reasoningTrail: VerdeLog[];
  timestamp: string;
};
