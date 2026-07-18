'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, FirestoreError } from 'firebase/firestore';
import type {
  PulseData,
  TransitData,
  AccessData,
  WayfinderData,
  PolyglotData,
  VerdeData,
} from '@/types/agent';

// Re-export types for backward compatibility
export type { PulseData, TransitData, AccessData, WayfinderData, PolyglotData, VerdeData } from '@/types/agent';
export type { AccessLog, WayfinderLog, PolyglotChat, VerdeLog } from '@/types/agent';

/** Connection lifecycle state for the real-time Firestore link. */
export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

// ──────────────────────────────────────────────
// Defaults
// ──────────────────────────────────────────────
const DEFAULT_PULSE: PulseData = { occupancy: 0, flowRate: 0, activeIncidents: 0, timestamp: '' };
const DEFAULT_TRANSIT: TransitData = { trains: [] };
const DEFAULT_ACCESS: AccessData = { validScans: 0, invalidAttempts: 0, vipClearances: 0, detectedBreaches: 0, reasoningTrail: [], timestamp: '' };
const DEFAULT_WAYFINDER: WayfinderData = { activeReroute: false, targetGate: '', flowRate: 0, capacityLimit: 0, reasoningTrail: [], timestamp: '' };
const DEFAULT_POLYGLOT: PolyglotData = { activeNodes: 0, liveTranslations: [], timestamp: '' };
const DEFAULT_VERDE: VerdeData = { powerDraw: 0, waterUsage: 0, carbonFootprint: '', reasoningTrail: [], timestamp: '' };

/** Staleness threshold in milliseconds (30 seconds). */
const STALE_THRESHOLD_MS = 30_000;

/**
 * Global hook to subscribe to real-time agent metrics from Firebase Firestore.
 *
 * This hook establishes WebSocket connections via `onSnapshot` and automatically
 * cleans up listeners on unmount. It tracks connection state, detects stale data,
 * and handles errors with retry logic.
 *
 * Avoid calling this hook in deeply nested components to prevent excessive
 * re-renders; instead, call it near the top of the component tree and pass data down.
 *
 * @returns An object containing live states for all 6 Concourse AI Agents,
 *          connection state, staleness indicator, and the last error message.
 */
export function useAgentData() {
  const [pulse, setPulse] = useState<PulseData>(DEFAULT_PULSE);
  const [transit, setTransit] = useState<TransitData>(DEFAULT_TRANSIT);
  const [access, setAccess] = useState<AccessData>(DEFAULT_ACCESS);
  const [wayfinder, setWayfinder] = useState<WayfinderData>(DEFAULT_WAYFINDER);
  const [polyglot, setPolyglot] = useState<PolyglotData>(DEFAULT_POLYGLOT);
  const [verde, setVerde] = useState<VerdeData>(DEFAULT_VERDE);
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [isStale, setIsStale] = useState(false);
  const retryCountRef = useRef(0);
  const maxRetries = 5;

  // Legacy compat
  const isConnected = connectionState === 'connected';

  // ──────────────────────────────────────────
  // Staleness detector
  // ──────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastUpdated;
      setIsStale(elapsed > STALE_THRESHOLD_MS);
    }, 5000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  // ──────────────────────────────────────────
  // Error handler with retry logic
  // ──────────────────────────────────────────
  const handleSnapshotError = useCallback((error: FirestoreError) => {
    console.error('[useAgentData] Firestore snapshot error:', error.code, error.message);
    setLastError(error.message);

    if (retryCountRef.current < maxRetries) {
      retryCountRef.current += 1;
      setConnectionState('disconnected');
    } else {
      setConnectionState('error');
    }
  }, []);

  // ──────────────────────────────────────────
  // Firestore subscriptions
  // ──────────────────────────────────────────
  useEffect(() => {
    const unsubs: Array<() => void> = [];
    retryCountRef.current = 0;

    try {
      unsubs.push(onSnapshot(
        doc(db, 'pulse_metrics', 'live'),
        (snapshot) => {
          if (snapshot.exists()) {
            setConnectionState('connected');
            setLastError(null);
            setLastUpdated(Date.now());
            setPulse(snapshot.data() as PulseData);
          }
        },
        handleSnapshotError,
      ));

      unsubs.push(onSnapshot(
        doc(db, 'transit_schedules', 'live'),
        (snapshot) => { if (snapshot.exists()) setTransit(snapshot.data() as TransitData); },
        handleSnapshotError,
      ));

      unsubs.push(onSnapshot(
        doc(db, 'access_logs', 'live'),
        (snapshot) => { if (snapshot.exists()) setAccess(snapshot.data() as AccessData); },
        handleSnapshotError,
      ));

      unsubs.push(onSnapshot(
        doc(db, 'wayfinder_routes', 'live'),
        (snapshot) => { if (snapshot.exists()) setWayfinder(snapshot.data() as WayfinderData); },
        handleSnapshotError,
      ));

      unsubs.push(onSnapshot(
        doc(db, 'polyglot_streams', 'live'),
        (snapshot) => { if (snapshot.exists()) setPolyglot(snapshot.data() as PolyglotData); },
        handleSnapshotError,
      ));

      unsubs.push(onSnapshot(
        doc(db, 'verde_stats', 'live'),
        (snapshot) => { if (snapshot.exists()) setVerde(snapshot.data() as VerdeData); },
        handleSnapshotError,
      ));
    } catch (err) {
      console.warn('[useAgentData] Failed to initialize Firestore listeners:', err);
      // Error state will be set by handleSnapshotError callbacks
    }

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, [handleSnapshotError]);

  // ──────────────────────────────────────────
  // Memoized return value
  // ──────────────────────────────────────────
  return useMemo(() => ({
    pulse,
    transit,
    access,
    wayfinder,
    polyglot,
    verde,
    isConnected,
    connectionState,
    isStale,
    lastError,
    lastUpdated,
  }), [pulse, transit, access, wayfinder, polyglot, verde, isConnected, connectionState, isStale, lastError, lastUpdated]);
}
