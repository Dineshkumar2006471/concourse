import { renderHook } from '@testing-library/react';
import { useAgentData } from '@/hooks/useAgentData';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { onSnapshot, doc } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  onSnapshot: vi.fn(),
  getFirestore: vi.fn(),
}));

vi.mock('@/lib/firebase', () => ({
  db: {},
}));

describe('useAgentData Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default states', () => {
    (onSnapshot as Mock).mockImplementation((_doc, _callback) => {
      // do nothing to simulate no data
      return vi.fn(); 
    });

    const { result } = renderHook(() => useAgentData());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.pulse.occupancy).toBe(0);
    expect(result.current.access.validScans).toBe(0);
    expect(result.current.wayfinder.activeReroute).toBe(false);
    expect(result.current.polyglot.activeNodes).toBe(0);
    expect(result.current.verde.powerDraw).toBe(0);
    expect(result.current.transit.trains).toEqual([]);
  });

  it('should update state when onSnapshot triggers', () => {
    (onSnapshot as Mock).mockImplementation((ref, callback) => {
      if (ref === 'pulse_doc_mock') {
        callback({ exists: () => true, data: () => ({ occupancy: 85, flowRate: 120, activeIncidents: 0, timestamp: '12:00:00 UTC' }) });
      }
      return vi.fn(); 
    });

    (doc as Mock).mockImplementation((_db, collection, _id) => {
      if (collection === 'pulse_metrics') return 'pulse_doc_mock';
      return `${collection}_doc_mock`;
    });

    const { result } = renderHook(() => useAgentData());

    expect(result.current.pulse.occupancy).toBe(85);
    expect(result.current.isConnected).toBe(true);
  });
});
