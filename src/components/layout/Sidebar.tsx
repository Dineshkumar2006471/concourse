/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = React.memo(function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[240px] h-screen fixed left-0 top-0 border-r border-line bg-canvas-alt flex-col py-gutter px-2 z-50">
      <div className="mb-8 px-2 flex flex-col gap-2">
        <Link href="/app">
            <img alt="Concourse Logo" className="h-8 w-auto object-contain self-start mt-2 ml-2" src="/images/logo.png"/>
        </Link>
        {/* Double title removed per user request */}
      </div>
      
      <button className="mb-8 bg-pitch text-on-primary font-body-md text-body-md py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-pitch-hover transition-colors">
        <span className="material-symbols-outlined text-sm">add</span>
        New Incident
      </button>

      <nav className="flex-1 space-y-2">
        <Link href="/app" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">home</span>
          Home
        </Link>
        <Link href="/app/wayfinder" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app/wayfinder' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">explore</span>
          Wayfinder
        </Link>
        <Link href="/app/pulse" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app/pulse' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">sensors</span>
          Pulse
        </Link>
        <Link href="/app/transit" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app/transit' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">directions_bus</span>
          Transit
        </Link>
        <Link href="/app/verde" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app/verde' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">forest</span>
          Verde
        </Link>
        <Link href="/app/polyglot" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app/polyglot' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">translate</span>
          Polyglot
        </Link>
        <Link href="/app/access" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-body-md text-body-md transition-colors scale-95 active:scale-90 duration-150 ${pathname === '/app/access' ? 'bg-floodlight-tint text-primary border-r-2 border-secondary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">admin_panel_settings</span>
          Access
        </Link>
      </nav>

      <div className="mt-auto space-y-2 border-t border-line pt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors scale-95 active:scale-90 duration-150 font-body-md text-body-md">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors scale-95 active:scale-90 duration-150 font-body-md text-body-md">
          <span className="material-symbols-outlined">help</span>
          Support
        </button>
        <div className="flex items-center gap-3 px-3 py-2 mt-4">
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-line">
            <img className="w-full h-full object-cover" data-alt="A professional headshot of a Chief Security Officer in a modern control room environment. Professional lighting, realistic style." src="/images/control_room.png"/>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-body-sm text-body-sm truncate text-on-surface">Chief Security Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
});
