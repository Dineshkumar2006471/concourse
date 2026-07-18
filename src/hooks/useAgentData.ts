'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export type PulseData = {
  occupancy: number;
  flowRate: number;
  activeIncidents: number;
  timestamp: string;
};

export type TransitData = {
  trains: Array<{ line: string; status: string; time: string; color: string }>;
};

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

const DEFAULT_PULSE: PulseData = { occupancy: 0, flowRate: 0, activeIncidents: 0, timestamp: '' };
const DEFAULT_TRANSIT: TransitData = { trains: [] };
const DEFAULT_ACCESS: AccessData = { validScans: 0, invalidAttempts: 0, vipClearances: 0, detectedBreaches: 0, reasoningTrail: [], timestamp: '' };
const DEFAULT_WAYFINDER: WayfinderData = { activeReroute: false, targetGate: '', flowRate: 0, capacityLimit: 0, reasoningTrail: [], timestamp: '' };
const DEFAULT_POLYGLOT: PolyglotData = { activeNodes: 0, liveTranslations: [], timestamp: '' };
const DEFAULT_VERDE: VerdeData = { powerDraw: 0, waterUsage: 0, carbonFootprint: '', reasoningTrail: [], timestamp: '' };

export function useAgentData() {
  const [pulse, setPulse] = useState<PulseData>(DEFAULT_PULSE);
  const [transit, setTransit] = useState<TransitData>(DEFAULT_TRANSIT);
  const [access, setAccess] = useState<AccessData>(DEFAULT_ACCESS);
  const [wayfinder, setWayfinder] = useState<WayfinderData>(DEFAULT_WAYFINDER);
  const [polyglot, setPolyglot] = useState<PolyglotData>(DEFAULT_POLYGLOT);
  const [verde, setVerde] = useState<VerdeData>(DEFAULT_VERDE);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let unsubs: Array<() => void> = [];

    try {
      unsubs.push(onSnapshot(doc(db, 'pulse_metrics', 'live'), (doc) => {
        if (doc.exists()) { setIsConnected(true); setPulse(doc.data() as PulseData); }
      }));
      unsubs.push(onSnapshot(doc(db, 'transit_schedules', 'live'), (doc) => {
        if (doc.exists()) setTransit(doc.data() as TransitData);
      }));
      unsubs.push(onSnapshot(doc(db, 'access_logs', 'live'), (doc) => {
        if (doc.exists()) setAccess(doc.data() as AccessData);
      }));
      unsubs.push(onSnapshot(doc(db, 'wayfinder_routes', 'live'), (doc) => {
        if (doc.exists()) setWayfinder(doc.data() as WayfinderData);
      }));
      unsubs.push(onSnapshot(doc(db, 'polyglot_streams', 'live'), (doc) => {
        if (doc.exists()) setPolyglot(doc.data() as PolyglotData);
      }));
      unsubs.push(onSnapshot(doc(db, 'verde_stats', 'live'), (doc) => {
        if (doc.exists()) setVerde(doc.data() as VerdeData);
      }));
    } catch (err) {
      console.warn("Firebase collection not initialized or rules denying access.", err);
    }

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  return { pulse, transit, access, wayfinder, polyglot, verde, isConnected };
}
