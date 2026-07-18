'use client';

import { useAgentData } from '@/hooks/useAgentData';

export default function Page() {
  const { wayfinder, pulse } = useAgentData();
  return (
    <>




<main className="flex-1 lg:ml-[240px] p-margin-desktop bg-surface flex flex-col gap-6 w-full max-w-max-width mx-auto" role="main" aria-label="Wayfinder Smart Routing">
<div className="flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Wayfinder — Smart Routing</h2>
<p className="font-body-md text-body-md text-ink-muted mt-1">Real-time crowd flow optimization and automated concourse routing.</p>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 rounded bg-canvas border border-line font-body-md text-body-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">tune</span> Adjust Parameters
                    </button>
</div>
</div>
<div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-[600px]">
<div className="xl:col-span-8 flex flex-col bg-canvas border border-line rounded-xl overflow-hidden relative shadow-sm">
<div className="flex justify-between items-center p-4 border-b border-line bg-canvas z-10 relative">
<div className="flex items-center gap-3">
<div className={`flex items-center gap-1.5 ${wayfinder.activeReroute ? 'bg-error-container text-on-error-container border-error/20' : 'bg-surface-container text-on-surface border-line'} px-2.5 py-1 rounded-full border`}>
{wayfinder.activeReroute && <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>}
<span className="font-label-caps text-label-caps font-bold">{wayfinder.activeReroute ? 'ACTIVE REROUTE' : 'ROUTING STABLE'}</span>
</div>
<span className="font-data-md text-data-md text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">schedule</span> {pulse?.timestamp ? new Date(pulse.timestamp).toLocaleTimeString() : '14:32:05'}
                            </span>
</div>
<div className="flex gap-1 bg-surface-container rounded-lg p-1 border border-line">
<button className="px-3 py-1.5 rounded-md bg-canvas shadow-sm text-primary font-label-caps text-label-caps border border-line">Heatmap</button>
<button className="px-3 py-1.5 rounded-md text-ink-muted font-label-caps text-label-caps hover:text-on-surface">Flow Vectors</button>
<button className="px-3 py-1.5 rounded-md text-ink-muted font-label-caps text-label-caps hover:text-on-surface">Assets</button>
</div>
</div>
<div className="flex-1 relative bg-canvas-alt overflow-hidden">
<div className="absolute inset-0 bg-cover bg-center opacity-70" data-alt="A highly detailed, stark architectural blueprint-style top-down map of a massive modern sports stadium concourse. Light mode aesthetic, pristine white background with crisp, precise light grey and pale blue structural lines denoting walls, corridors, and seating tiers. Professional, clean, and data-ready aesthetic." style={{ backgroundImage: "url('/images/stadium_aerial_real.png')", backgroundSize: 'cover' }}></div>
<svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
<circle className="pulse-ring" cx="30%" cy="40%" fill="rgba(186, 26, 26, 0.1)" r="40" stroke="#ba1a1a" strokeWidth="1"></circle>
<circle cx="30%" cy="40%" fill="#ba1a1a" r="8"></circle>
<text dy="-15" fill={wayfinder.activeReroute ? "#ba1a1a" : "#194cfe"} fontFamily="JetBrains Mono" fontSize="12" fontWeight="600" textAnchor="middle" x="30%" y="38%">GATE C CONGESTION</text>
<path className="marching-ants opacity-80" d="M35% 45% Q 45% 60%, 65% 55% T 80% 30%" fill="none" stroke="#194cfe" strokeLinecap="round" strokeWidth="4"></path>
<g transform="translate(80%, 30%)">
<circle cx="0" cy="0" fill="#194cfe" r="16"></circle>
<circle className="pulse-ring" cx="0" cy="0" fill="none" r="24" stroke="#194cfe" strokeWidth="2"></circle>
<text fill="#ffffff" fontFamily="Space Grotesk" fontSize="14" fontWeight="700" textAnchor="middle" x="0" y="5">{wayfinder.targetGate.replace('GATE ', '') || 'F'}</text>
<rect fill="#FFFFFF" height="18" rx="4" stroke="#E6E9EE" strokeWidth="1" width="70" x="-35" y="-35"></rect>
<text fill="#0036ce" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" letterSpacing="1" textAnchor="middle" x="0" y="-23">TARGET GATE</text>
</g>
</svg>
<div className="absolute bottom-4 right-4 flex flex-col gap-2">
<button className="w-10 h-10 rounded bg-canvas border border-line shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container" aria-label="Zoom in"><span className="material-symbols-outlined" aria-hidden="true">add</span></button>
<button className="w-10 h-10 rounded bg-canvas border border-line shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container" aria-label="Zoom out"><span className="material-symbols-outlined" aria-hidden="true">remove</span></button>
<button className="w-10 h-10 rounded bg-canvas border border-line shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container mt-2" aria-label="Center on my location"><span className="material-symbols-outlined" aria-hidden="true">my_location</span></button>
</div>
</div>
</div>
<div className="xl:col-span-4 flex flex-col gap-4 h-full">
<div className="bg-canvas-alt border border-line rounded-xl p-5 flex-1 flex flex-col">
<div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
<div className="w-10 h-10 rounded-lg bg-surface-container border border-line flex items-center justify-center rotate-45 transform">
<span className="material-symbols-outlined text-secondary -rotate-45 transform">psychology</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Pulse AI Reasoning</h3>
<p className="font-label-caps text-label-caps text-ink-muted">AGENT: WAYFINDER-04</p>
</div>
</div>
<div className="flex-1 overflow-y-auto pr-2 relative">
<div className="absolute left-3 top-2 bottom-6 w-px bg-line"></div>
<div className="flex flex-col gap-6 relative">
{wayfinder.reasoningTrail?.map((log, index) => (
  <div key={index} className="flex gap-4 relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${log.bg}`}>
      <span className={`material-symbols-outlined text-[14px] ${log.color}`}>{log.icon}</span>
    </div>
    <div>
      <div className={`font-data-md text-data-md font-medium ${log.color}`}>{log.title}</div>
      <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">{log.message}</div>
      {log.type === 'anomaly' && (
        <div className="mt-2 bg-canvas border border-line rounded p-2 font-data-md text-[12px] text-ink-muted">
            &gt; Ticker: GAT-C-01<br/>
            &gt; Flow: {wayfinder.flowRate || ((pulse?.flowRate ?? 100) * 12)} pax/hr<br/>
            &gt; Limit: {wayfinder.capacityLimit || 850} pax/hr
        </div>
      )}
      {log.type === 'broadcast' && (
        <div className="mt-3">
          <button className="w-full py-2 bg-canvas border border-line rounded text-on-surface hover:bg-surface font-label-caps text-label-caps flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[16px]">visibility</span> View Broadcast Logs
          </button>
        </div>
      )}
    </div>
  </div>
))}
</div>
</div>
</div>
</div>
</div>
</main>

    </>
  );
}
