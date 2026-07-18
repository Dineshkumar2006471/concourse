'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Page() {
  return (
    <>

{/*  Utility Bar  */}
<div className="bg-inverse-surface text-inverse-on-surface py-2 text-center font-data-md text-data-md">
        NEXT MATCH: ARG vs BRA (Estadio Azteca) - <span className="font-bold text-primary-fixed">T-MINUS 04:22:15</span>
</div>
{/*  Main Nav  */}
<nav className="bg-canvas border-b border-line h-topbar-height sticky top-0 w-full z-40 flex justify-between items-center px-margin-desktop md:px-margin-desktop px-margin-mobile">
<Link className="flex items-center" href="/">
<img alt="Concourse Logo" className="h-8" src="/images/logo.png" />
</Link>
<div className="hidden md:flex gap-6 items-center">
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all font-semibold" href="/">Platform</Link>
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all font-semibold" href="/">Agents</Link>
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all font-semibold" href="/">Case Studies</Link>
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all font-semibold" href="/">Security</Link>
</div>
<div>
<Link href="/app">
<button className="bg-primary hover:bg-pitch-hover text-on-primary font-display-lg font-medium text-[15px] px-6 py-2.5 rounded transition-colors tracking-wide hidden md:block whitespace-nowrap">
                Enter Your Match Day
            </button>
</Link>
<button className="md:hidden text-on-surface" aria-label="Open Mobile Menu">
<span className="material-symbols-outlined text-[24px]">menu</span>
</button>
</div>
</nav>
{/*  Hero Section  */}
<section className="max-w-max-width mx-auto px-margin-desktop py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
<div className="space-y-6">
<h1 className="font-display-lg text-display-lg text-on-surface leading-tight">Your Stadium, <br />Understood in Real Time</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Concourse AI orchestrates high-stakes venue operations. From dynamic crowd routing to multi-lingual incident resolution, command your arena with absolute clarity.
            </p>
<div className="pt-4 flex gap-4">
<Link href="/app">
<button className="bg-primary hover:bg-pitch-hover text-on-primary font-display-lg font-medium text-[16px] px-8 py-3 rounded transition-colors tracking-wide flex items-center justify-center gap-2 whitespace-nowrap w-fit">
                    Request Demo <span aria-hidden="true" className="material-symbols-outlined text-[20px]" data-original-icon="arrow_forward">arrow_forward</span>
</button>
</Link>
</div>
</div>
<div className="relative rounded-2xl overflow-hidden border border-line bg-canvas-alt h-[400px] flex items-center justify-center">
{/*  Simulated Photo Collage  */}
<div className="absolute inset-0 bg-cover bg-center opacity-80" data-alt="A highly detailed cinematic photo collage showing an aerial view of a massive modern soccer stadium filled with cheering fans, juxtaposed with high-tech glowing AI data overlays mapping crowd movement and security zones. The mood is energetic and high-stakes, illuminated by bright stadium floodlights. Professional corporate style with a data-driven edge." style={{ backgroundImage: "url('/images/stadium_aerial_real.png')", backgroundSize: 'cover' }}></div>
<div className="absolute bottom-6 left-6 right-6 md:right-auto bg-canvas border border-line rounded-lg p-4 shadow-sm flex items-center gap-4 whitespace-nowrap overflow-hidden">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
<span className="material-symbols-outlined">analytics</span>
</div>
<div className="min-w-0">
<div className="font-data-lg text-data-lg text-primary">92%</div>
<div className="font-label-caps text-label-caps text-on-surface-variant truncate">Predicted Accuracy</div>
</div>
</div>
</div>
</section>
{/*  Marquee Ticker  */}
<div className="bg-primary text-on-primary py-3 overflow-hidden border-y border-pitch-hover marquee-container">
<div className="marquee-content font-data-md text-data-md tracking-wider flex items-center">
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> WAYFINDER ACTIVE</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> PULSE MONITORING</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> TRANSIT SYNCED</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> VERDE OPTIMIZING</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> POLYGLOT TRANSLATING</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> ACCESS SECURED</span>
{/*  Duplicate for seamless scroll  */}
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> WAYFINDER ACTIVE</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> PULSE MONITORING</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> TRANSIT SYNCED</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> VERDE OPTIMIZING</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> POLYGLOT TRANSLATING</span>
<span className="px-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span> ACCESS SECURED</span>
</div>
</div>
{/*  About/Stats Section  */}
<section className="max-w-max-width mx-auto px-margin-desktop py-20 border-b border-line">
<div className="grid md:grid-cols-2 gap-16">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Uncompromising Performance</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                    Built for the scale of the World Cup, Concourse processes millions of data points per second to deliver actionable intelligence when milliseconds matter.
                </p>
<button className="text-primary font-display-lg font-medium hover:underline flex items-center gap-1">
                    Read the Architecture Whitepaper <span aria-hidden="true" className="material-symbols-outlined text-[18px]" data-original-icon="arrow_outward">arrow_outward</span>
</button>
</div>
<div className="space-y-8 bg-canvas p-8 rounded-xl border border-line">
{/*  Stat Bar 1  */}
<div>
<div className="flex justify-between mb-2">
<span className="font-label-caps text-label-caps text-on-surface">Predictive Accuracy</span>
<span className="font-data-md text-data-md text-primary font-bold">92%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ "width": "92%" }}></div>
</div>
</div>
{/*  Stat Bar 2  */}
<div>
<div className="flex justify-between mb-2">
<span className="font-label-caps text-label-caps text-on-surface">Data Refresh Latency</span>
<span className="font-data-md text-data-md text-primary font-bold">&lt; 50ms</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ "width": "98%" }}></div>
</div>
</div>
{/*  Stat Bar 3  */}
<div>
<div className="flex justify-between mb-2">
<span className="font-label-caps text-label-caps text-on-surface">Language Coverage</span>
<span className="font-data-md text-data-md text-primary font-bold">42 Dialects</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{ "width": "85%" }}></div>
</div>
</div>
</div>
</div>
</section>
{/*  Agent Feature Band  */}
<section className="bg-canvas-alt py-24 px-margin-desktop border-b border-line">
<div className="max-w-max-width mx-auto">
<div className="text-center mb-16">
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">The Concourse AI Agents</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">A specialized fleet of AI agents working in concert to manage every facet of stadium operations.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/*  Agent 1  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-primary transition-colors group cursor-pointer shadow-sm">
<div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">explore</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Wayfinder</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Dynamic crowd routing and congestion prediction.</p>
<div className="font-data-md text-data-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Specs <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
{/*  Agent 2  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-primary transition-colors group cursor-pointer shadow-sm">
<div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">sensors</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Pulse</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Real-time incident detection and security sentiment analysis.</p>
<div className="font-data-md text-data-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Specs <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
{/*  Agent 3  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-primary transition-colors group cursor-pointer shadow-sm">
<div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">directions_bus</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Transit</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Inbound/outbound logistics and public transport sync.</p>
<div className="font-data-md text-data-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Specs <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
{/*  Agent 4  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-primary transition-colors group cursor-pointer shadow-sm">
<div className="w-12 h-12 bg-surface-tint text-on-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">forest</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Verde</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Energy optimization and environmental controls.</p>
<div className="font-data-md text-data-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Specs <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
{/*  Agent 5  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-primary transition-colors group cursor-pointer shadow-sm">
<div className="w-12 h-12 bg-[#5B6472] text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">translate</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Polyglot</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Instant multi-lingual translation for global fan bases.</p>
<div className="font-data-md text-data-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Specs <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
{/*  Agent 6  */}
<div className="bg-canvas border border-line rounded-xl p-6 hover:border-primary transition-colors group cursor-pointer shadow-sm">
<div className="w-12 h-12 bg-error text-on-error rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">admin_panel_settings</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Access</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Biometric ticketing and restricted zone monitoring.</p>
<div className="font-data-md text-data-md text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Specs <span aria-hidden="true" className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="bg-surface-container w-full py-12 border-t border-line">
<div className="max-w-max-width mx-auto flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-6">
<div className="flex items-center gap-4">
<img alt="Concourse Logo" className="h-6 opacity-80" src="/images/logo.png" />
<span className="font-body-sm text-body-sm text-ink-muted">© 2026 FIFA World Cup Operations. Powered by Concourse AI.</span>
</div>
<div className="flex flex-wrap justify-center gap-6">
<Link className="font-body-sm text-body-sm text-ink-muted hover:text-secondary transition-opacity hover:opacity-80" href="/">Privacy Policy</Link>
<Link className="font-body-sm text-body-sm text-ink-muted hover:text-secondary transition-opacity hover:opacity-80" href="/">Terms of Service</Link>
<Link className="font-body-sm text-body-sm text-ink-muted hover:text-secondary transition-opacity hover:opacity-80" href="/">Security Architecture</Link>
<Link className="font-body-sm text-body-sm text-ink-muted hover:text-secondary transition-opacity hover:opacity-80" href="/">Contact Support</Link>
</div>
</div>
</footer>

    </>
  );
}
