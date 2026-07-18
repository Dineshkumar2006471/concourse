# Contributing to Concourse

Thank you for your interest in contributing to Concourse! 

## Development Workflow
1. **Fork the Repository** and clone it locally.
2. **Install Dependencies:** `npm install`
3. **Configure Environment:** Copy `.env.example` to `.env.local` and add your Firebase credentials.
4. **Run the Simulation Engine:** `npx tsx scripts/simulation-worker.ts`
5. **Start Dev Server:** `npm run dev`

## Pull Request Process
- Ensure all tests pass: `npm run test`
- Ensure linting passes with zero errors: `npm run lint`
- Verify that your UI changes meet WCAG AA Accessibility standards (no missing ARIA labels).
- Submit your PR with a clear description of the problem and the proposed solution.

## Architecture Guidelines
- Do not poll for data. Use Firestore `onSnapshot` for real-time reactivity via the `useAgentData` hook.
- All new AI agents must provide a structured `reasoningTrail` for UI transparency.
