import Link from 'next/link';
import React from 'react';

export interface AgentCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
  status: 'ACTIVE' | 'STABLE' | 'ALERT';
  metricLabel: string;
  metricValue: React.ReactNode;
  metricColor?: string;
}

export function AgentCard({
  name,
  description,
  icon,
  href,
  status,
  metricLabel,
  metricValue,
  metricColor = 'text-on-surface',
}: AgentCardProps) {
  let statusBadge = null;
  let cardBorder = 'border-line';
  let cardShadow = '';

  switch (status) {
    case 'ACTIVE':
      statusBadge = (
        <span className="px-2.5 py-1 rounded-full bg-floodlight-tint text-primary font-label-caps text-[10px] border border-secondary-fixed flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-floodlight animate-pulse"></span>
          ACTIVE
        </span>
      );
      cardBorder = 'border-line';
      break;
    case 'ALERT':
      statusBadge = (
        <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-caps text-[10px] border border-error/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse"></span>
          ALERT
        </span>
      );
      cardBorder = 'border-floodlight border-2';
      cardShadow = 'shadow-[0_0_15px_rgba(27,77,255,0.1)]';
      break;
    case 'STABLE':
    default:
      statusBadge = (
        <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] border border-line flex items-center gap-1">
          STABLE
        </span>
      );
      break;
  }

  return (
    <div
      className={`bg-canvas ${cardBorder} rounded-xl p-6 hover:border-floodlight transition-colors group relative overflow-hidden ${cardShadow}`}
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
      
      <div className="flex justify-between items-start mb-6 z-10 relative">
        <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center border border-line">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>
        {statusBadge}
      </div>
      
      <div className="z-10 relative">
        <h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
          {name}
        </h4>
        <p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">
          {description}
        </p>
        
        <div className="border-t border-line pt-4 flex justify-between items-end">
          <div>
            <span className="block font-label-caps text-[10px] text-ink-muted mb-1">
              {metricLabel}
            </span>
            <span className={`font-data-md text-data-lg font-semibold ${metricColor}`}>
              {metricValue}
            </span>
          </div>
          <Link
            href={href}
            aria-label={`Open ${name} agent`}
            className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <span
              className="material-symbols-outlined text-ink-muted group-hover:text-primary transition-colors"
              role="img"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
