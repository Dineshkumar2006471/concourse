import { renderHook, act } from '@testing-library/react';
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

  it('should initialize with default states and connecting status', () => {
    (onSnapshot as Mock).mockImplementation(() => {
      return vi.fn(); // unsubscribe mock
    });

    const { result } = renderHook(() => useAgentData());

    expect(result.current.pulse.occupancy).toBe(0);
    expect(result.current.access.validScans).toBe(0);
    expect(result.current.wayfinder.activeReroute).toBe(false);
    expect(result.current.polyglot.activeNodes).toBe(0);
    expect(result.current.verde.powerDraw).toBe(0);
    expect(result.current.transit.trains).toEqual([]);
    expect(result.current.connectionState).toBe('connecting');
    expect(result.current.isStale).toBe(false);
    expect(result.current.lastError).toBeNull();
  });

  it('should set connected state when snapshot fires', () => {
    (onSnapshot as Mock).mockImplementation((ref, onNext) => {
      if (ref === 'pulse_doc_mock') {
        onNext({ exists: () => true, data: () => ({ occupancy: 85, flowRate: 120, activeIncidents: 0, timestamp: '12:00:00 UTC' }) });
      }
      return vi.fn();
    });

    (doc as Mock).mockImplementation((_db, collection) => {
      if (collection === 'pulse_metrics') return 'pulse_doc_mock';
      return `${collection}_doc_mock`;
    });

    const { result } = renderHook(() => useAgentData());

    expect(result.current.pulse.occupancy).toBe(85);
    expect(result.current.isConnected).toBe(true);
    expect(result.current.connectionState).toBe('connected');
  });

  it('should transition to disconnected state on initial errors before max retries', () => {
    let callCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (onSnapshot as Mock).mockImplementation((...args: any[]) => {
      callCount++;
      // Only fail the very first listener to simulate a single temporary drop
      if (callCount === 1) {
        const onError = args[2];
        onError({ code: 'unavailable', message: 'Offline' });
      }
      return vi.fn();
    });

    const { result } = renderHook(() => useAgentData());

    // Should be disconnected, not error, because it hasn't hit maxRetries yet
    expect(result.current.connectionState).toBe('disconnected');
    expect(result.current.lastError).toBe('Offline');
  });

  it('should transition to error state after max retries are exhausted', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (onSnapshot as Mock).mockImplementation((...args: any[]) => {
      // Fail all 6 listeners immediately, which will blow past maxRetries (5)
      const onError = args[2];
      onError({ code: 'unavailable', message: 'Persistent Failure' });
      return vi.fn();
    });

    const { result } = renderHook(() => useAgentData());

    expect(result.current.connectionState).toBe('error');
    expect(result.current.lastError).toBe('Persistent Failure');
  });

  it('should return memoized value (referential stability)', () => {
    (onSnapshot as Mock).mockImplementation(() => vi.fn());

    const { result, rerender } = renderHook(() => useAgentData());
    const firstRender = result.current;
    rerender();
    const secondRender = result.current;

    // Same reference means useMemo is working
    expect(firstRender).toBe(secondRender);
  });
});
