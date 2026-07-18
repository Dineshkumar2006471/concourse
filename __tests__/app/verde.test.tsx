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

describe('Verde Agent Page', () => {
  it('renders without crashing', () => {
    render(<VerdePage />);
    expect(screen.getByText('Verde')).toBeDefined();
    expect(screen.getByText('GRID LOAD')).toBeDefined();
  });
});
