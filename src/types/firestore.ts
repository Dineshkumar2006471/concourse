/**
 * Firestore document schema validation utilities.
 *
 * Provides runtime validation for data coming from Firestore,
 * ensuring the UI never crashes on malformed documents.
 */

import type { PulseData, TransitData, AccessData, WayfinderData, PolyglotData, VerdeData } from './agent';

/**
 * Safely parses a Firestore document into PulseData.
 * Returns defaults for any missing or invalid fields.
 */
export function parsePulseData(raw: Record<string, unknown>): PulseData {
  return {
    occupancy: typeof raw.occupancy === 'number' ? raw.occupancy : 0,
    flowRate: typeof raw.flowRate === 'number' ? raw.flowRate : 0,
    activeIncidents: typeof raw.activeIncidents === 'number' ? raw.activeIncidents : 0,
    timestamp: typeof raw.timestamp === 'string' ? raw.timestamp : '',
  };
}

/**
 * Safely parses a Firestore document into TransitData.
 */
export function parseTransitData(raw: Record<string, unknown>): TransitData {
  return {
    trains: Array.isArray(raw.trains) ? raw.trains : [],
  };
}

/**
 * Safely parses a Firestore document into AccessData.
 */
export function parseAccessData(raw: Record<string, unknown>): AccessData {
  return {
    validScans: typeof raw.validScans === 'number' ? raw.validScans : 0,
    invalidAttempts: typeof raw.invalidAttempts === 'number' ? raw.invalidAttempts : 0,
    vipClearances: typeof raw.vipClearances === 'number' ? raw.vipClearances : 0,
    detectedBreaches: typeof raw.detectedBreaches === 'number' ? raw.detectedBreaches : 0,
    reasoningTrail: Array.isArray(raw.reasoningTrail) ? raw.reasoningTrail : [],
    timestamp: typeof raw.timestamp === 'string' ? raw.timestamp : '',
  };
}

/**
 * Safely parses a Firestore document into WayfinderData.
 */
export function parseWayfinderData(raw: Record<string, unknown>): WayfinderData {
  return {
    activeReroute: typeof raw.activeReroute === 'boolean' ? raw.activeReroute : false,
    targetGate: typeof raw.targetGate === 'string' ? raw.targetGate : '',
    flowRate: typeof raw.flowRate === 'number' ? raw.flowRate : 0,
    capacityLimit: typeof raw.capacityLimit === 'number' ? raw.capacityLimit : 0,
    reasoningTrail: Array.isArray(raw.reasoningTrail) ? raw.reasoningTrail : [],
    timestamp: typeof raw.timestamp === 'string' ? raw.timestamp : '',
  };
}

/**
 * Safely parses a Firestore document into PolyglotData.
 */
export function parsePolyglotData(raw: Record<string, unknown>): PolyglotData {
  return {
    activeNodes: typeof raw.activeNodes === 'number' ? raw.activeNodes : 0,
    liveTranslations: Array.isArray(raw.liveTranslations) ? raw.liveTranslations : [],
    timestamp: typeof raw.timestamp === 'string' ? raw.timestamp : '',
  };
}

/**
 * Safely parses a Firestore document into VerdeData.
 */
export function parseVerdeData(raw: Record<string, unknown>): VerdeData {
  return {
    powerDraw: typeof raw.powerDraw === 'number' ? raw.powerDraw : 0,
    waterUsage: typeof raw.waterUsage === 'number' ? raw.waterUsage : 0,
    carbonFootprint: typeof raw.carbonFootprint === 'string' ? raw.carbonFootprint : '',
    reasoningTrail: Array.isArray(raw.reasoningTrail) ? raw.reasoningTrail : [],
    timestamp: typeof raw.timestamp === 'string' ? raw.timestamp : '',
  };
}
