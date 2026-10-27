# Frontend handoff — 27 October 2026

## What the user wants

The search page is for **currently open Bangkok software/IT e-bidding TOR projects**. Every card in the main results must show a title, positive budget, announcement date, actual future bid deadline, and AI TOR summary from verified official documents. A project with no confirmed deadline must not be presented as open. The user suggested a separate “No deadline” category only if needed; none has been added because the main feed now has a qualifying project.

## Current page and data flow

- `app/search-feed/page.tsx` is the public search UI at `http://localhost:3000/search-feed`. It requests `GET http://localhost:5001/api/projects?availability=open` and is labelled for Bangkok IT e-bidding. The backend enforces source, method, verified fields, and future deadline even if a client changes query parameters.
- `component/searchfeed/TORCard.tsx` renders each result. `component/TORFacts.tsx` shows budget, publication date, and deadline; `lib/submission.ts` formats the deadline in `Asia/Bangkok`. `lib/projects.ts` maps API data and the AI summary into the card.
- The Bangkok-only page no longer displays the national e-GP access warning, which was unrelated to this working source.
- The confirmed card links to `/tor-page/6ae0b63ffb773330336475e6`. On 27 October 2026 the browser showed one result: the Bangkok IT strategy information system e-bidding TOR, **฿5,560,158**, published **20 October 2026**, closing **5 November 2026 at 12:00 Thailand time**, with its AI summary.

## Run and verify

- Start from the repository root `C:\Users\Adithep\scp_proj` with `docker compose -f docker-compose.yaml up -d`. The backend `.env` currently sets `VERTEX_AI_ENABLED=false`; already analyzed projects still display without Vertex running. Do not use the backend folder's separate Compose file for the full website.
- The containers were **stopped at this handoff**. The last live verification before they stopped showed HTTP 200 for `/search-feed`, one open API result, and the correct card in Chrome.
- The last frontend production build passed. If a build reports a syntax error in generated `.next/dev/types/validator.ts`, delete that generated file and rerun the build; this occurred once from stale Next.js output, while source TypeScript compiled successfully.

## Guardrails for later changes

- Keep the main results deadline-required and exclude expired bids. If a “No deadline” tab is later requested, make it clearly separate from open bids and label status as unconfirmed; do not imply those projects are accepting submissions.
- A scanned official invitation led Vertex to disagree on the closing **time**. The confirmed card’s 12:00 time was visually checked against page 1 of the source PDF and corrected in the database. Preserve that value unless newer official evidence supersedes it.
