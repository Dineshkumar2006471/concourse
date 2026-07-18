/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/app', label: 'Home', icon: 'home' },
  { href: '/app/wayfinder', label: 'Wayfinder', icon: 'explore' },
  { href: '/app/pulse', label: 'Pulse', icon: 'sensors' },
  { href: '/app/transit', label: 'Transit', icon: 'directions_bus' },
  { href: '/app/verde', label: 'Verde', icon: 'forest' },
  { href: '/app/polyglot', label: 'Polyglot', icon: 'translate' },
  { href: '/app/access', label: 'Access', icon: 'admin_panel_settings' },
];

export const Sidebar = React.memo(function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex w-[240px] h-screen fixed left-0 top-0 border-r border-line bg-canvas-alt flex-col py-gutter px-2 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mb-8 px-2 flex flex-col gap-2">
        <Link href="/app" aria-label="Concourse — Go to home">
            <img alt="Concourse Logo" className="h-8 w-auto object-contain self-start mt-2 ml-2" src="/images/logo.png"/>
        </Link>
      </div>
      
      <button
        className="mb-8 bg-pitch text-on-primary font-body-md text-body-md py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-pitch-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Create new incident report"
      >
        <span className="material-symbols-outlined text-sm" aria-hidden="true">add</span>
        New Incident
      </button>

      <nav className="flex-1 space-y-2" aria-label="Agent pages">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-floodlight-tint text-primary border-r-2 border-secondary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-line pt-4">
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors scale-95 active:scale-90 duration-150 font-body-md text-body-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Open settings"
        >
          <span className="material-symbols-outlined" aria-hidden="true">settings</span>
          Settings
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors scale-95 active:scale-90 duration-150 font-body-md text-body-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Get support"
        >
          <span className="material-symbols-outlined" aria-hidden="true">help</span>
          Support
        </button>
        <div className="flex items-center gap-3 px-3 py-2 mt-4">
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-line">
            <img
              alt="Chief Security Officer avatar"
              className="w-full h-full object-cover"
              src="/images/control_room.png"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-body-sm text-body-sm truncate text-on-surface">Chief Security Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
});
