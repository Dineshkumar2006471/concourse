import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VerdePage from '@/app/app/verde/page';

// Mock the Link component
vi.mock('next/link', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => {
      return <a>{children}</a>;
    },
  };
});

vi.mock('@/lib/firebase', () => ({
  db: {},
  app: {},
  auth: {}
}));

vi.mock('@/hooks/useAgentData', () => ({
  useAgentData: vi.fn(() => ({
    pulse: { occupancy: 85 },
    verde: { 
      powerDraw: 15.2, 
      waterUsage: 1200, 
      carbonFootprint: '-12.4%', 
      reasoningTrail: [{ type: 'recommendation', time: '12:00', message: 'Test message', submessage: 'Test sub', savings: '5%' }] 
    },
    isConnected: true,
  })),
}));

describe('Verde Agent Page', () => {
  it('renders without crashing', () => {
    render(<VerdePage />);
    expect(screen.getByText('Verde')).toBeDefined();
    expect(screen.getByText('GRID LOAD')).toBeDefined();
  });
});
