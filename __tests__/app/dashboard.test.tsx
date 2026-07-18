import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DashboardPage from '@/app/app/page';

// Mock the Link component since we are not testing routing
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

describe('Dashboard (Overview) Page', () => {
  it('renders without crashing', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Concourse')).toBeDefined();
  });

  it('renders all 6 agent cards', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Pulse')).toBeDefined();
    expect(screen.getByText('Access')).toBeDefined();
    expect(screen.getByText('Wayfinder')).toBeDefined();
    expect(screen.getByText('Transit')).toBeDefined();
    expect(screen.getByText('Polyglot')).toBeDefined();
    expect(screen.getByText('Verde')).toBeDefined();
  });
});
