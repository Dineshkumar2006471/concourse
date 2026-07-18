import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AgentCard } from '@/components/AgentCard';

describe('AgentCard Component', () => {
  const defaultProps = {
    name: 'Test Agent',
    description: 'A test agent description.',
    icon: 'test_icon',
    href: '/test',
    status: 'STABLE' as const,
    metricLabel: 'TEST METRIC',
    metricValue: '100',
  };

  it('renders correctly with stable status', () => {
    render(<AgentCard {...defaultProps} />);
    
    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByText('A test agent description.')).toBeInTheDocument();
    expect(screen.getByText('TEST METRIC')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText(/STABLE/)).toBeInTheDocument();
  });

  it('renders alert status with correct visual indicators', () => {
    const { container } = render(<AgentCard {...defaultProps} status="ALERT" />);
    
    expect(screen.getByText(/ALERT/)).toBeInTheDocument();
    
    // Check for the alert container classes
    const alertBadge = container.querySelector('.bg-error-container');
    expect(alertBadge).toBeInTheDocument();
    expect(alertBadge).toHaveClass('text-on-error-container');
  });

  it('renders active status with correct visual indicators', () => {
    const { container } = render(<AgentCard {...defaultProps} status="ACTIVE" />);
    
    expect(screen.getByText(/ACTIVE/)).toBeInTheDocument();
    
    // Check for the active container classes
    const activeBadge = container.querySelector('.bg-floodlight-tint');
    expect(activeBadge).toBeInTheDocument();
    expect(activeBadge).toHaveClass('text-primary');
  });

  it('includes an accessible link', () => {
    render(<AgentCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /Open Test Agent agent/i });
    expect(link).toHaveAttribute('href', '/test');
  });
});
