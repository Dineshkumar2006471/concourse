'use client';
import { useAgentData } from '@/hooks/useAgentData';
import Link from 'next/link';

export default function Page() {
  const { pulse, transit, wayfinder, verde, polyglot, access } = useAgentData();
  return (
    <>





{/*  Main Content  */}
<main className="lg:ml-[240px] p-margin-mobile md:p-margin-desktop max-w-max-width mx-auto space-y-8 pb-24" role="main" aria-label="Command Center Dashboard">
{/*  Context Card  */}
<section className="bg-canvas-alt border border-line rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden" aria-label="Match context">
<div className="absolute top-0 right-0 w-64 h-full opacity-10 pointer-events-none" data-alt="Abstract blueprint of a massive sports stadium structure, technical drawing style, dark blue ink lines on white background, highly detailed." style={{ backgroundImage: "url('/images/stadium_aerial_real.png')", backgroundSize: 'cover' }}></div>
<div className="z-10">
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Good afternoon, Command.</h2>
<div className="flex items-center gap-3 text-ink-muted font-body-md text-body-md">
<span className="material-symbols-outlined text-sm">location_on</span>
<span>MetLife Stadium, New Jersey</span>
<span className="w-1 h-1 rounded-full bg-line"></span>
<span>FIFA World Cup 2026</span>
</div>
</div>
<div className="z-10 flex flex-col items-end gap-2 bg-canvas p-4 rounded-lg border border-line shadow-sm">
<span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">Kickoff Countdown</span>
<div className="font-data-lg text-headline-lg text-on-surface flex items-baseline gap-1">
<span>02</span><span className="font-label-caps text-label-caps text-ink-muted">h</span>
<span>45</span><span className="font-label-caps text-label-caps text-ink-muted">m</span>
<span>12</span><span className="font-label-caps text-label-caps text-ink-muted">s</span>
</div>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-line text-[10px] font-label-caps uppercase text-ink-muted">USA vs ARG</span>
</div>
</div>
</section>
{/*  Agent Grid  */}
<section>
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">memory</span>
                    Active AI Agents
                </h3>
<span className={`font-label-caps text-label-caps ${pulse?.activeIncidents > 0 ? 'text-signal animate-pulse' : 'text-ink-muted'}`} role="status" aria-live="assertive">
                    {pulse?.activeIncidents > 0 ? 'SYSTEM ALERT' : 'System Nominal'}
                </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/*  Agent: Wayfinder  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-floodlight transition-colors group relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div className="flex justify-between items-start mb-6 z-10 relative">
<div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center border border-line">
<span className="material-symbols-outlined text-primary text-2xl" style={{ "fontVariationSettings": "'FILL' 1" }}>explore</span>
</div>
<span className={`px-2.5 py-1 rounded-full font-label-caps text-[10px] border flex items-center gap-1 ${wayfinder.activeReroute ? 'bg-error-container text-on-error-container border-error/20' : 'bg-surface-container-high text-on-surface-variant border-line'}`}>
  {wayfinder.activeReroute ? (
    <>
      <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
      ACTIVE
    </>
  ) : (
    'STABLE'
  )}
</span>
</div>
<div className="z-10 relative">
<h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Wayfinder</h4>
<p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">Crowd flow and spatial optimization routing.</p>
<div className="border-t border-line pt-4 flex justify-between items-end">
<div>
<span className="block font-label-caps text-[10px] text-ink-muted mb-1">LIVE REROUTES</span>
<span className="font-data-md text-data-lg text-on-surface font-semibold">{wayfinder.activeReroute ? '1 Active' : '0 Active'}</span>
</div>
<Link href="/app/wayfinder" aria-label="Open Wayfinder agent">
<span className="material-symbols-outlined text-ink-muted hover:text-primary transition-colors" role="img" aria-hidden="true">arrow_forward</span>
</Link>
</div>
</div>
</div>
{/*  Agent: Pulse  */}
<div className="bg-canvas border-2 border-floodlight rounded-xl p-6 shadow-[0_0_15px_rgba(27,77,255,0.1)] group relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div className="flex justify-between items-start mb-6 z-10 relative">
<div className="w-12 h-12 rounded-lg bg-floodlight-tint flex items-center justify-center border border-secondary-fixed">
<span className="material-symbols-outlined text-floodlight text-2xl" style={{ "fontVariationSettings": "'FILL' 1" }}>sensors</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-caps text-[10px] border border-error/20 flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse"></span>
                            ALERT
                        </span>
</div>
<div className="z-10 relative">
<h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Pulse</h4>
<p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">Venue health and capacity monitoring.</p>
<div className="border-t border-line pt-4 flex justify-between items-end">
<div>
<span className="block font-label-caps text-[10px] text-ink-muted mb-1">CONCOURSE C</span>
<span className="font-data-md text-data-lg text-signal font-semibold">{pulse?.occupancy ?? 92}% Occupancy</span>
</div>
<Link href="/app/pulse" aria-label="Open Pulse agent">
<span className="material-symbols-outlined text-floodlight hover:text-secondary transition-colors" role="img" aria-hidden="true">arrow_forward</span>
</Link>
</div>
</div>
</div>
{/*  Agent: Transit  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-floodlight transition-colors group relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div className="flex justify-between items-start mb-6 z-10 relative">
<div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center border border-line">
<span className="material-symbols-outlined text-primary text-2xl" style={{ "fontVariationSettings": "'FILL' 1" }}>directions_bus</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] border border-line flex items-center gap-1">
                            STABLE
                        </span>
</div>
<div className="z-10 relative">
<h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Transit</h4>
<p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">External logistics and arrivals tracking.</p>
<div className="border-t border-line pt-4 flex justify-between items-end">
<div>
<span className="block font-label-caps text-[10px] text-ink-muted mb-1">INBOUND FLEET</span>
<span className="font-data-md text-data-lg text-on-surface font-semibold">{transit?.trains?.length ?? 45} Vehicles</span>
</div>
<Link href="/app/transit" aria-label="Open Transit agent">
<span className="material-symbols-outlined text-ink-muted hover:text-primary transition-colors" role="img" aria-hidden="true">arrow_forward</span>
</Link>
</div>
</div>
</div>
{/*  Agent: Verde  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-floodlight transition-colors group relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div className="flex justify-between items-start mb-6 z-10 relative">
<div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center border border-line">
<span className="material-symbols-outlined text-primary text-2xl" style={{ "fontVariationSettings": "'FILL' 1" }}>forest</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] border border-line flex items-center gap-1">
                            STABLE
                        </span>
</div>
<div className="z-10 relative">
<h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Verde</h4>
<p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">Sustainability and energy management.</p>
<div className="border-t border-line pt-4 flex justify-between items-end">
<div>
<span className="block font-label-caps text-[10px] text-ink-muted mb-1">GRID DRAW</span>
<span className="font-data-md text-data-lg text-on-surface font-semibold">{verde.powerDraw ? verde.powerDraw.toFixed(1) : 4.2} MW</span>
</div>
<Link href="/app/verde" aria-label="Open Verde agent">
<span className="material-symbols-outlined text-ink-muted hover:text-primary transition-colors" role="img" aria-hidden="true">arrow_forward</span>
</Link>
</div>
</div>
</div>
{/*  Agent: Polyglot  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-floodlight transition-colors group relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div className="flex justify-between items-start mb-6 z-10 relative">
<div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center border border-line">
<span className="material-symbols-outlined text-primary text-2xl" style={{ "fontVariationSettings": "'FILL' 1" }}>translate</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-floodlight-tint text-primary font-label-caps text-[10px] border border-secondary-fixed flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-floodlight animate-pulse"></span>
                            ACTIVE
                        </span>
</div>
<div className="z-10 relative">
<h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Polyglot</h4>
<p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">Real-time translation and comms.</p>
<div className="border-t border-line pt-4 flex justify-between items-end">
<div>
<span className="block font-label-caps text-[10px] text-ink-muted mb-1">ACTIVE SESSIONS</span>
<span className="font-data-md text-data-lg text-on-surface font-semibold">{polyglot.activeNodes || 124} Nodes</span>
</div>
<Link href="/app/polyglot" aria-label="Open Polyglot agent">
<span className="material-symbols-outlined text-ink-muted hover:text-primary transition-colors" role="img" aria-hidden="true">arrow_forward</span>
</Link>
</div>
</div>
</div>
{/*  Agent: Access  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-floodlight transition-colors group relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
<div className="flex justify-between items-start mb-6 z-10 relative">
<div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center border border-line">
<span className="material-symbols-outlined text-primary text-2xl" style={{ "fontVariationSettings": "'FILL' 1" }}>admin_panel_settings</span>
</div>
<span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] border border-line flex items-center gap-1">
                            STABLE
                        </span>
</div>
<div className="z-10 relative">
<h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Access</h4>
<p className="font-body-sm text-body-sm text-ink-muted mb-4 h-10">Credentialing and security zone control.</p>
<div className="border-t border-line pt-4 flex justify-between items-end">
<div>
<span className="block font-label-caps text-[10px] text-ink-muted mb-1">ZONE BREACHES</span>
<span className="font-data-md text-data-lg text-on-surface font-semibold">{access.detectedBreaches || 0} Detected</span>
</div>
<Link href="/app/access" aria-label="Open Access agent">
<span className="material-symbols-outlined text-ink-muted hover:text-primary transition-colors" role="img" aria-hidden="true">arrow_forward</span>
</Link>
</div>
</div>
</div>
</div>
</section>
</main>

    </>
  );
}
