# PROJECT.md — Concourse
### The AI Operating System for the FIFA World Cup 2026 Stadium Experience
**PromptWars Virtual — Challenge 4: Smart Stadiums & Tournament Operations**

---

## 0. Brutal Honest Framing First

Before any architecture: this is a crowded problem statement. "Build a stadium assistant with GenAI" is the single most obvious interpretation of Challenge 4, and most submissions will be a chatbot that answers "where is gate 12" with hardcoded JSON. If you build that, you place top 30-40% at best — competent, forgettable.

To hit 99th percentile, three things have to be true simultaneously, and most teams only manage one:

1. **It has to look alive.** Judges spend 90 seconds per repo before they read a line of code. If the landing page looks like a Bootstrap template, the "innovative" score is already capped before they open `App.tsx`. This is why the design bar (Section 6) is not cosmetic — it's the first data point in your evaluation.
2. **It has to be provably real-time, not simulated-looking.** "Real-time" is the most over-claimed word in hackathon READMEs. If your data updates once when the page loads and never again, a judge will notice in under a minute. Section 3 explains exactly how to be real-time *honestly* — using a live simulation engine driven by real stadium/match parameters, not a `setInterval(Math.random())` dressed up as AI.
3. **It has to show its reasoning, not just its output.** A chatbot that says "go to Gate 14" is a wrapper. A system that shows *why* — "Gate 12 queue is 340% above baseline, Gate 14 is 12% below, walking distance +40m, net time saved: 6 min" — is a decision-support system. That distinction is what separates "Medium Impact" scores from "High Impact" scores across every evaluation tier in Section 8.

Everything below is built to satisfy those three constraints without inventing fake data or overpromising features you won't finish. Read Section 11 (Reality Check & Scope Guardrails) before you start building — it exists specifically to stop this project from becoming too big to finish, which is the #1 reason ambitious hackathon projects score *worse* than simple ones.

---

## 1. Problem Statement (As Given)

> **[Challenge 4] Smart Stadiums & Tournament Operations**
> Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff. The solution must leverage Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the FIFA World Cup 2026.

**Read literally, this statement gives you eight verticals and four user personas (fans, organizers, volunteers, venue staff), with no requirement to cover all of them.** Most teams will try to touch all eight verticals shallowly — a button for each — because it *looks* comprehensive on a slide. That is a scoring trap: shallow coverage of eight things scores worse than deep, correlated coverage of five, because "logical decision making based on user context" (an explicit Challenge Expectation) is impossible to demonstrate in a feature that's a static info card.

**Concourse's approach:** cover six of the eight verticals (navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance) plus operational intelligence and real-time decision support as *emergent properties* of how the six agents talk to each other — not as a seventh and eighth button. This is explained in Section 2.

---

## 2. The Core Idea

**Concourse is not a chatbot. It's a multi-agent nervous system for a stadium**, where each agent owns one vertical, all agents share one real-time data plane (Supabase), and — this is the differentiator — **agents correlate with each other's findings before they speak to a human.**

Example of what "logical decision making based on user context" actually looks like in Concourse, versus what it looks like in a typical submission:

| Typical submission | Concourse |
|---|---|
| Fan asks "how do I get to my seat" → static wayfinding text | Fan asks the same → **Wayfinder Agent** checks the **Pulse Agent's** live concourse-density map, detects Gate 12 queue is spiking because Bag Check is understaffed (a fact only knowable by cross-referencing gate throughput vs. historical baseline), and reroutes through Gate 14 while explaining the tradeoff |
| "Sustainability" tab shows a static tip: "take the train!" | **Verde Agent** reads the fan's actual saved transit choice from the **Transit Agent**, computes real CO₂e using published emission factors, and shows a running personal tournament footprint |
| "Accessibility" mode toggles larger fonts | **Access Agent** is a first-class agent with its own routing graph (step-free paths only, elevator status awareness) and audio-first interaction, not a CSS toggle |
| Ops dashboard shows current numbers | **Command Agent** doesn't just display — it receives correlated alerts *from* the other five agents (e.g. Transit delay + Gate congestion rising at the same exit = a real operational risk) and proposes a dispatch action to a human, who approves or rejects it |

That last row is the single highest-leverage feature in this whole project for scoring. It's the direct structural equivalent of the "cross-document contradiction detection" pattern from your IntelliPlant submission — the same idea (agents finding disagreements/correlations another agent alone couldn't see), applied to a different domain. Judges who've seen a hundred single-agent chatbots this cycle will notice multi-agent correlation immediately, because almost nobody bothers to wire agents to talk to each other; they wire them to a shared UI instead, which is not the same thing.

---

## 3. The "Real Data, Not Static Data" Problem — Solved Honestly

You were explicit: no static/hardcoded data, real-time, real backend. Here's the honest constraint you're up against, and how Concourse handles it without lying in the README.

**What is genuinely available as real public data (use these, don't fake them):**
- **Real stadium list, capacities, host cities** — all 16 FIFA World Cup 2026 venues are public record (e.g. AT&T Stadium Dallas ~94,000 capacity, Estadio Azteca Mexico City, MetLife Stadium NY/NJ hosting the final, BMO Field Toronto, etc. across 11 US cities, 3 Mexico, 2 Canada). Seed your `venues` and `gates` tables with real venue geometry and real gate/capacity counts, not invented numbers.
- **Real public transit data** — most host-city transit agencies publish open GTFS (General Transit Feed Specification) static feeds (NYC MTA, LA Metro, TransLink Vancouver, TTC Toronto, etc.). Pull real route/stop data for at least 2-3 host cities to prove the integration is real, not mocked.
- **Real emission factors** — published transport CO₂e-per-passenger-km tables (government/transport-authority sourced) exist publicly. Use real coefficients, cite the source in your README.
- **Real weather** — a live weather API (OpenWeatherMap, or Google's weather data) for outdoor comfort/heat-advisory logic.
- **Real language list** — the 48 competing nations map to a real, fixed list of primary languages. Don't invent a language list; use the real one.

**What is NOT publicly available and you must not pretend it is:**
- Live IoT turnstile/sensor feeds from actual FIFA stadiums. These don't exist publicly. Any submission claiming to ingest "real live crowd sensor data" is lying, and a technical judge will ask you to prove it in under one question.

**The honest solution — a Live Simulation Engine, not a mock:**
Build a backend worker (a scheduled Supabase Edge Function or a small Python/FastAPI service) that **ticks every 5-10 seconds** and evolves crowd/queue state using a real queueing-theory model (M/M/c multi-server queue simulation), seeded with:
- The real gate capacity for the selected venue
- The real match kickoff time (counting down/up drives arrival-curve shape — arrivals spike 90-45 minutes pre-kickoff, a well-documented real stadium-ops pattern)
- Configurable perturbation events (an "inject incident" control for demo purposes — e.g. "simulate Gate 12 bag-check slowdown") that a judge can trigger live during evaluation to *watch the whole agent mesh react in real time*

This is the crucial distinction for your README's "Assumptions" section: **the simulation parameters are real (real capacities, real kickoff times, real queueing math); the turnstile-level sensor readings are synthetic because no public real feed exists.** State this explicitly and proudly — judges reward honesty about scope far more than they punish an acknowledged, well-reasoned assumption. Overclaiming and getting caught is far worse than a clearly-labeled, well-justified simulation.

This is also why it must run through Supabase Realtime channels (Postgres changes → WebSocket push) and not client-side polling — the "real-time database" requirement is about the data plane architecture, which is 100% real regardless of whether the seed values are simulated.

---

## 4. The Six Agents (Concourse Agent Mesh)

Each agent is a Google ADK agent definition orchestrated through **Genkit flows**, rooted under one **Gemini 2.5 Flash** orchestrator that classifies intent and routes to the right agent(s) — routing to more than one agent per query is expected and is where the correlation magic happens.

1. **Wayfinder** — navigation & wayfinding. Indoor concourse graph (nodes = gates/sections/amenities, edges = walk time) + Google Maps Platform (Routes API) for outdoor/last-mile. Reads live density from Pulse before proposing a route.
2. **Pulse** — crowd management & bottleneck forecasting. Owns the Live Simulation Engine (Section 3). Exposes a short-horizon forecast (next 15-30 min) using simple exponential smoothing over the simulated arrival curve — this satisfies "operational intelligence" and "real-time decision support" without needing a heavyweight ML model.
3. **Access** — accessibility concierge. Separate step-free/elevator-aware routing graph, audio-first response mode, and Gemini's multimodal input (a photo of a sign/landmark → confirms location) as a stretch feature.
4. **Transit** — transportation. Real GTFS-backed route/schedule lookups for the selected host city, integrated with live delay signals where the agency exposes GTFS-Realtime.
5. **Verde** — sustainability. Computes a per-fan running carbon footprint from their actual transit choices using real published emission factors; nudges toward lower-carbon options without being preachy.
6. **Polyglot** — multilingual assistance. Gemini-native multilingual chat + Google Cloud Translation API fallback for the fixed real list of competing-nation languages; auto-detects fan's language from first message.
7. **Command** — the staff-facing agent. Not fan-facing. Receives correlated cross-agent alerts (e.g., Transit delay + Pulse congestion at the same exit within the same time window) and proposes a dispatch/incident action to a human operator, who has final approval — this human-in-the-loop detail matters for the "Security" evaluation criterion (no autonomous physical-world actions without human sign-off).

**The Reasoning Trail (signature feature, carried over from your IntelliPlant pattern):** every agent response in the fan-facing UI has an expandable "Why this answer?" panel showing the actual tool calls made (which data was read, from which table, at what timestamp) and the intermediate reasoning before the final answer. This does three jobs at once: (a) it's the single most "wow, that's not just a wrapper" visual a judge will see, (b) it directly helps the Security evaluation criterion (nothing is a black box), (c) it gives you something concrete and inspectable to build automated tests against (Section 9).

---

## 5. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14+ (App Router) + TypeScript + Tailwind | SSR for fast first paint on the landing page (judges' first impression), file-based routing keeps repo clean |
| Agent orchestration | Google ADK + Genkit flows | Genkit's built-in flow tracing is what powers the Reasoning Trail UI for free — don't build your own tracer, use Genkit's |
| LLM | Gemini 2.5 Flash (primary), Gemini 2.5 Pro (Command Agent's correlation reasoning, where quality > latency) | Flash for interactive fan chat latency, Pro for the harder cross-agent correlation task |
| Realtime data plane | Supabase (Postgres + Realtime + Row-Level Security) | Postgres changes → websocket push is the real-time backbone; RLS gives you a real, demonstrable "Security" story for free |
| Auth | Supabase Auth (fans) — Firebase Auth is optional only if you need native push notifications via FCM for the Command Agent's staff alerts | Don't run two auth systems unless FCM push is a must-have; pick one and justify it in the README |
| Simulation worker | Supabase Edge Function (Deno, scheduled via `pg_cron`) or a small FastAPI service if you need heavier queueing math | Edge Function keeps the repo lighter (repo size rule: <10MB) |
| Backend API (if needed beyond Supabase's auto-generated API) | FastAPI (Python) | Only add this layer if ADK/Genkit needs a Python host — otherwise Supabase + Next.js API routes may be sufficient and simpler |
| Maps/transit | Google Maps Platform (Routes, Places), real GTFS static feeds for 2-3 host cities | Real data requirement (Section 3) |
| Deployment | Vercel (frontend), Supabase Cloud (data/edge functions) | Both have generous free tiers — keeps this in prototype-stage free-tier territory, consistent with your usual stack preference |

---

## 6. Design Direction — Whitish, Premium, Storytelling (IPLT20-Inspired)

**Honest note first:** iplt20.com isn't in the getdesign.md catalog (checked directly), so there's no exact DESIGN.md to lift for it. Rather than approximate a cricket broadcast site's exact tokens, I compared the catalog's closest real analogs to what you described — whitish canvas, professional typography, storytelling hero, clear CTA, subtle motion:

- **HP** — pure white canvas, one confident accent color, geometric chevron motifs (closest structural match to "clean white background + one energetic signal color + dynamic graphic motifs")
- **PlayStation** — three-surface channel layout, quiet-authority display type, cyan hover-scale micro-interactions (closest match to "subtle animations on nav/buttons")
- **Nike** — massive confident uppercase display type on full-bleed photography (closest match to "hero section storytelling with a big CTA")

**Recommendation: build an original palette inspired by the *structure* of these three, not their literal brand colors** (reusing HP's exact blue or Nike's exact type treatment would read as derivative, which actively hurts your originality score — the goal is "IPL-quality craft," not "HP's website with a football skin"). Full spec below — hand this directly to your build agent as `DESIGN.md`.

### Palette
| Token | Hex | Role |
|---|---|---|
| `--canvas` | `#FFFFFF` | Primary background — whitish, per your reference |
| `--canvas-alt` | `#F7F8FA` | Section alternation, cards |
| `--ink` | `#0B1220` | Primary text — near-black navy, not pure black (softer, more premium) |
| `--ink-muted` | `#5B6472` | Secondary text |
| `--pitch` | `#0E7C4A` | Primary accent — a football-pitch green, used sparingly for primary CTAs only |
| `--floodlight` | `#1B4DFF` | Secondary accent — stadium floodlight blue, used for links/active states/agent-avatar accents |
| `--signal` | `#FF6B2C` | Alert/live-indicator accent (used only for "LIVE" badges, incident alerts — never decorative) |
| `--line` | `#E6E9EE` | Hairline borders, dividers |

### Typography
- **Display/Hero:** a confident geometric sans at heavy weight (e.g. Space Grotesk Bold or General Sans Bold) — reuse Space Grotesk since it's already in your CareerSpark type system, keeps a consistent personal signature across your portfolio
- **Body:** Inter — high legibility at small sizes, pairs cleanly with Space Grotesk
- **Data/mono (agent reasoning trail, live stats):** JetBrains Mono — signals "this is a real system reading real data," not decorative

### Layout & Motion Rules
- Hero section: full-width, whitish canvas, large Space Grotesk headline + one-line subhead + **one primary CTA** ("Enter Your Match Day") — no more than one competing CTA above the fold
- Left sidebar nav on the app shell (post-auth): icon + label, active state uses `--floodlight` underline, not a filled background (keeps it light/airy, not boxy)
- Footer: repeats the CTA once, plus real-data attribution line (GTFS/emission-factor sources), which doubles as a subtle trust signal for judges skimming the footer
- Motion: all animations are 150-220ms ease-out, transform/opacity only (never animate layout-affecting properties — keeps it fast and avoids jank). Card hover = 2-4px lift + subtle shadow, never scale >1.02. Live data updates fade-in the changed number, don't hard-swap it — this alone communicates "real-time" to a judge's eye before they read a line of code
- Never use glassmorphism (consistent with your established design stance across CareerSpark/CropSentinel) — this design leans editorial-premium, not frosted-glass

A separate `DESIGN.md` file (matching the Stitch DESIGN.md spec format: theme, palette+roles, type scale, component states, layout/spacing scale, depth system, do's/don'ts, responsive rules, agent prompt guide) is provided alongside this file — hand both to your build agent together.

---

## 7. Data Model (Supabase / Postgres)

Core tables — keep this lean, don't over-normalize for a hackathon timeline:

- `venues` (id, name, city, country, capacity, lat, lng, kickoff_next) — seeded with real FIFA 2026 venue data
- `gates` (id, venue_id, name, base_capacity_per_min, step_free bool)
- `zones` (id, venue_id, name, type: concourse/seating/food/exit, geometry as simple polygon coords for the digital-twin map)
- `crowd_readings` (id, zone_id, timestamp, occupancy_pct, source: 'simulated') — written every tick by the Live Simulation Engine, read via Supabase Realtime subscription
- `transit_routes` (id, venue_id, city, provider, route_data jsonb) — seeded from real GTFS pulls
- `emission_factors` (mode, kg_co2e_per_km, source_citation) — real published values, cited
- `fan_sessions` (id, user_id, venue_id, language, accessibility_prefs, transit_choice, footprint_running_total)
- `incidents` (id, venue_id, zone_id, type, status, raised_by_agent, correlated_with jsonb, human_approved bool) — this table is what makes Command Agent's cross-agent correlation demonstrable and testable
- `agent_reasoning_logs` (id, session_id, agent_name, tool_calls jsonb, reasoning_text, timestamp) — powers the Reasoning Trail UI, and gives you something concrete to write tests against

Row-Level Security: fans can only read their own `fan_sessions`; `incidents` and `agent_reasoning_logs` are staff-role-only for write, which is your concrete, demonstrable "Security" story for the evaluation rubric.

---

## 8. Evaluation-Criteria Mapping (How 99% Actually Gets Scored)

| Rubric area | Concourse feature that earns it | Impact tier (typical) |
|---|---|---|
| Code Quality | Clean ADK agent separation (one file/module per agent), typed Next.js + Supabase client, no dead code | High |
| Security | RLS policies on every table, human-approval gate on Command Agent actions, no secrets in repo (`.env.example` only) | High |
| Efficiency | Gemini Flash for interactive paths, Pro reserved only for the correlation task, Realtime channels instead of polling | Medium |
| Testing | Unit tests on the queueing simulation math, integration test that an injected incident produces a correlated `incidents` row, snapshot test on Reasoning Trail structure | Medium |
| Accessibility | Access Agent as a first-class agent (not a CSS toggle), real WCAG-conscious contrast ratios in the palette above, keyboard nav on the app shell | High |
| Innovation/"crazy-creative" (implicit, but clearly the deciding factor between top 30% and top 1%) | Multi-agent correlation (Section 2), honest real-time simulation architecture (Section 3), visible Reasoning Trail (Section 4) | High |

Do not spread effort evenly across all six rows. **Security and Accessibility are cheap to do well and easy for judges to verify in minutes — prioritize them early.** Innovation is expensive but is what separates you from every other "stadium chatbot" submission — protect the time budget for it. Efficiency and Testing are real but lower-leverage; do them well, don't gold-plate them.

---

## 9. Build Plan (Phase-Based, Not Calendar-Based)

No fixed deadline was given for this challenge in your prompt — plan in phases, not days, and cut Phase 3 features first if time runs short, never Phase 1.

**Phase 1 — Skeleton that's honest end-to-end (do not skip, do not shortcut):**
1. Supabase schema (Section 7) + seed real venue/GTFS/emission data
2. Live Simulation Engine ticking real data into `crowd_readings`, visible on a bare-bones page via Realtime subscription — prove real-time works before building any UI polish on top of it
3. One agent (Wayfinder) wired through Genkit with a visible (even ugly) Reasoning Trail
4. Auth + basic app shell

**Phase 2 — The rest of the mesh + the differentiator:**
5. Remaining five agents
6. Command Agent's cross-agent correlation logic + `incidents` table + human-approval UI
7. Digital-twin concourse map (SVG, zones colored by live occupancy from `crowd_readings`)

**Phase 3 — Design pass + polish (only after Phase 1+2 are functionally real):**
8. Apply the full DESIGN.md system (Section 6 + companion file)
9. Landing page storytelling pass, hero + footer CTAs
10. Demo script: pre-stage one "inject incident" trigger so judges can watch Pulse → Transit → Command correlate live in under 30 seconds

**Do not start Phase 3 before Phase 1 is real.** A beautiful UI over fake data will be caught by any judge who opens dev tools for ten seconds; an ugly UI over genuinely real-time, correlated data still scores well on every High Impact row above.

---

## 10. Repository & Submission Rules — Read Before You Push Anything

These are hard constraints from the challenge instructions, and they conflict with your usual workflow in one important way:

- **Maximum 3 attempts allowed** — do not push broken/incomplete states casually; treat each push as if it might be evaluated.
- **Repository size must be under 10MB** — this rules out committing `node_modules`, large seed datasets, or video assets. GTFS static feeds can be large; either subset them at seed-time (script that fetches + trims, not the raw feed committed to the repo) or fetch them at runtime rather than committing them.
- **Repository must be public.**
- **⚠️ The repository must contain only ONE branch.** This directly conflicts with your usual branch-based PR workflow (used on IntelliPlant/CareerSpark). For this specific submission: **work directly on `main`**, commit incrementally with clear messages, and do not create feature branches — a stray second branch left in the repo, even a merged/dead one, may violate this rule as written. Delete any experimental branches before final submission.
- **README.md must include:** your chosen vertical (state it's a multi-vertical, agent-correlated approach — don't force it into one bucket), approach & logic (Sections 2-4 of this doc, summarized), how the solution works (Section 4-7 summarized), and assumptions made (Section 3's honest simulation-vs-real-sensor distinction, verbatim — this is your strongest trust-building paragraph, don't bury it).

---

## 11. Reality Check & Scope Guardrails

Being blunt, because you asked for brutal honesty: the ambition in this brief (six live agents, a digital twin, real GTFS integration, correlation logic, a premium design system) is a two-to-three week product roadmap compressed into a hackathon window. That's fine — that's what "build something crazy" requires — but it only works if you protect Phase 1 (Section 9) ruthlessly. The single most common failure mode in ambitious hackathon builds isn't lack of ideas, it's shipping five half-working agents instead of three fully-working ones with real correlation between them. **Three agents that genuinely correlate and show honest real-time data will outscore six agents that are each a shallow wrapper**, every time, against this rubric.

If you're tight on time, the non-negotiable core for a 99th-percentile submission is: **Wayfinder + Pulse + Command, wired together, with the Reasoning Trail visible, on top of the real venue/simulation data plane, with the design system applied.** Everything else (Transit, Verde, Polyglot, Access) is genuinely valuable and should be attempted, but in that priority order, and only after the core three are solid.
