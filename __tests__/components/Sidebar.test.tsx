import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/app',
}));

describe('Sidebar Component', () => {
  it('should render all navigation links correctly', () => {
    render(<Sidebar />);
    
    // Check for main nav items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Pulse')).toBeInTheDocument();
    expect(screen.getByText('Wayfinder')).toBeInTheDocument();
    expect(screen.getByText('Transit')).toBeInTheDocument();
    expect(screen.getByText('Verde')).toBeInTheDocument();
    expect(screen.getByText('Polyglot')).toBeInTheDocument();
    expect(screen.getByText('Access')).toBeInTheDocument();
  });
});
