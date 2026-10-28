# 2026-10-28 - Two-month national procurement discovery and live Vertex run

- Added Tero Procurement and authenticated GovSpending discovery, using publication dates from two calendar months ago onward (28 August 2026 at this run). Existing historical records are retained.
- Tero ZIP downloads select actual TOR/tender/invitation PDFs with bounded expansion. Matching national project IDs merge provider provenance; known contracts/cancellations and expired invitations are excluded from paid processing/open results.
- Public IT e-bidding results now include the new providers when verified PDF evidence supplies summary, budget, publication date and a future submission deadline. Frontend search labels no longer imply Bangkok-only coverage and cards show provider names.
- Vertex is enabled and running in Docker. PDF reading order and physical-page citation correction improve evidence validation. The new graphical-software project (700,000 THB, closes 12 November 2026 16:00 Bangkok) qualified; the remaining queue continues asynchronously with rate-limit retries.
- Live feed reached nine qualifying open projects (eight new Tero records plus the original Bangkok record); the larger candidate queue is still running.
- Both services were rebuilt/restarted with the existing ADC mount. All 76 backend tests including isolated MongoDB integration, frontend production build and Postman HTTP simulation passed. See backend `docs/procurement-source-evaluation.md` and `scripts/report-national-ingestion.js` for scope and live status.

# Retired source notice removal — 28 October 2026

- Removed the national e-GP access-verification notice from the homepage and deleted the unused `IngestionNotice` component. Backend national polling was removed separately; Bangkok and the other three active importers remain running.
- Frontend production build passed. Restarted the local frontend and backend, then checked the live homepage in Chrome: the existing TOR card still loads and the retired-source warning is absent. No additional user restart is needed for this change.
- New-source evaluation is recorded in backend `docs/procurement-source-evaluation.md`; those sources have not been added to this Bangkok-only feed yet.

# Frontend polish — 28 October 2026

- Analysis queue update: frontend project types now accept `skipped`, and detail pages label it as automatic analysis skipped instead of displaying pending. See backend `lastest.md` for the applied newest-20 queue snapshot and startup instructions. The backend is stopped pending the user's Vertex startup; the frontend build passed after this status change.

- Reviewed the merged `aesthetic-fix` changes (theme selectors, hero background parallax, and search-bar cleanup).
- Fixed English search/theme labels and improved the search clear button's light-mode contrast and accessible label.
- Tightened mobile navbar spacing and kept the theme selector in the drawer below the `sm` breakpoint to avoid signed-in navbar overflow. The hero input can shrink without squeezing its action buttons.
- Added reduced-motion handling for hero parallax, entrance/pulse effects, and smooth scrolling.
- Validation: production build passed; targeted ESLint reported no errors and four pre-existing unused-variable warnings in `Navbar.tsx`. Browser checked the desktop homepage and a 375px viewport; document width no longer exceeds the viewport.
- The 27 October data and deadline requirements below still apply.

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
