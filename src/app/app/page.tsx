'use client';
import { useAgentData } from '@/hooks/useAgentData';
import { AgentCard } from '@/components/AgentCard';
import { AIInsightsPanel } from '@/components/AIInsightsPanel';

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
{/*  Gen AI Insights  */}
<section className="mb-8">
<AIInsightsPanel 
  logs={wayfinder.reasoningTrail || []} 
  title="Wayfinder AI Insights"
  kpiPrimary={{ label: 'Flow Optimization', value: '+14%' }}
  kpiSecondary={{ label: 'Wait Time Reduction', value: '-8m' }}
/>
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
  <AgentCard
    name="Wayfinder"
    description="Crowd flow and spatial optimization routing."
    icon="explore"
    href="/app/wayfinder"
    status={wayfinder.activeReroute ? 'ACTIVE' : 'STABLE'}
    metricLabel="LIVE REROUTES"
    metricValue={wayfinder.activeReroute ? '1 Active' : '0 Active'}
  />
  <AgentCard
    name="Pulse"
    description="Venue health and capacity monitoring."
    icon="sensors"
    href="/app/pulse"
    status={pulse?.activeIncidents > 0 ? 'ALERT' : 'STABLE'}
    metricLabel="CONCOURSE C"
    metricValue={`${pulse?.occupancy ?? 92}% Occupancy`}
    metricColor={pulse?.activeIncidents > 0 ? 'text-signal' : 'text-on-surface'}
  />
  <AgentCard
    name="Transit"
    description="External logistics and arrivals tracking."
    icon="directions_bus"
    href="/app/transit"
    status="STABLE"
    metricLabel="INBOUND FLEET"
    metricValue={`${transit?.trains?.length ?? 45} Vehicles`}
  />
  <AgentCard
    name="Verde"
    description="Sustainability and energy management."
    icon="forest"
    href="/app/verde"
    status="STABLE"
    metricLabel="GRID DRAW"
    metricValue={`${verde.powerDraw ? verde.powerDraw.toFixed(1) : 4.2} MW`}
  />
  <AgentCard
    name="Polyglot"
    description="Real-time translation and comms."
    icon="translate"
    href="/app/polyglot"
    status="ACTIVE"
    metricLabel="ACTIVE SESSIONS"
    metricValue={`${polyglot.activeNodes || 124} Nodes`}
  />
  <AgentCard
    name="Access"
    description="Credentialing and security zone control."
    icon="admin_panel_settings"
    href="/app/access"
    status="STABLE"
    metricLabel="ZONE BREACHES"
    metricValue={`${access.detectedBreaches || 0} Detected`}
  />
</div>
</section>
</main>

    </>
  );
}
