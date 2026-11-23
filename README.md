# TORmax frontend

The TORmax website. It lets people search Thai government IT procurement
documents (TORs) in one place, see how well their skills match each project,
bookmark projects, get notifications, and post their own IT projects.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and
daisyUI. Every page gets its data from the
[TORmax backend](https://github.com/GotAdithep/csp-backend) API.

> **Want to run the whole website?** Follow the
> [main repository README](https://github.com/TORmax-KU/TORmax#readme). It starts
> this website, the backend and MongoDB together with one Docker command. This
> page covers running the frontend on its own.

## Run the frontend

### What you need

- [Node.js 22 or newer](https://nodejs.org/)
- The backend running at http://localhost:5001. See the
  [backend README](https://github.com/GotAdithep/csp-backend#readme). The website
  opens without it, but every page that loads data will show an error.

### Steps

```powershell
cd Untitled-Collab-Project-Frontend
npm ci
if (!(Test-Path .env.local)) { Copy-Item .env.example .env.local }   # macOS/Linux: [ -f .env.local ] || cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**. The page reloads automatically when you edit a
file.

### Settings

`.env.local` has one setting:

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | Backend address, as reached from the browser |

Anything starting with `NEXT_PUBLIC_` is sent to the browser, so never put
secrets in this file. Restart `npm run dev` after changing it. In the root
Docker setup, Compose sets this value for you, so you don't need `.env.local`.

**When hosted** (for example on Vercel, with the backend on Render), set these
two instead:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `/backend` |
| `BACKEND_URL` | The backend address, e.g. `https://your-api.onrender.com` |

The website then forwards every `/backend/...` request to the backend (see
[next.config.ts](next.config.ts)). Browsers only send the login cookie to the
site that set it, so calling the backend directly from another site would log
everyone out straight after signing in. The
[main README](https://github.com/TORmax-KU/TORmax#hosting-vercel--render)
has the full hosting steps.

### Seeing content

A new database has no government TORs. They appear only after the backend's AI
analysis has processed them. To try the site without that, register as a **Job
Lister** at `/login` and create a posting at `/postings/new`; it appears in
search straight away. The
[main README](https://github.com/TORmax-KU/TORmax#2-your-first-visit-why-the-feed-is-empty)
explains this in more detail.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload on port 3000 |
| `npm run build` | Production build. Also catches TypeScript errors |
| `npm start` | Serves the production build (run `npm run build` first) |
| `npm run lint` | ESLint |
| `npm run knip` | Finds unused files, exports and dependencies |
| `npm test` | Unit tests in `test/` (Node's built-in test runner) |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home with search and live opportunities |
| `/search-feed` | Search and filter TORs and postings |
| `/tor-page/[tor-id]` | TOR or posting details, skill match, bookmark and report |
| `/login` | Sign in and register (Vendor or Job Lister) |
| `/profile` | Profile, skills, budget range and alert preferences |
| `/settings` | Account and appearance (theme) |
| `/bookmarks`, `/matches`, `/notifications` | A vendor's saved TORs, matches and alerts |
| `/postings`, `/postings/new`, `/postings/[id]/edit` | A job lister's own postings |
| `/admin` | Admin console (admins only) |

## Project layout

```text
app/          routes (Next.js App Router): one folder per page
component/    React components, grouped by feature (searchfeed/, tordetail/, admin/, …)
context/      React context: signed-in user (AuthContext) and app-wide state (AppContext)
lib/          API calls to the backend, one file per area (projects, auth, bookmarks, …)
utils/        small helpers
types/, interface/   shared TypeScript types
public/       static images and icons
test/         unit tests
```

## Troubleshooting

- **Pages show network or "failed to fetch" errors.** The backend isn't
  reachable. Check that http://localhost:5001/api/projects returns JSON, and that
  `NEXT_PUBLIC_API_URL` in `.env.local` matches.
- **Port 3000 is already in use.** Another dev server, or the Docker frontend,
  is already running. Stop it, or run `npm run dev -- -p 3001`. If you use
  another port, the backend's `FRONTEND_URL` must match it, or login and API
  calls will be blocked.
- **Build fails with a syntax error in `.next/dev/types/validator.ts`.** This is
  stale generated output. Delete the `.next` folder and build again.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security scan (OWASP ZAP DAST)

Run before each release against the local Docker stack. With the stack up
(`docker compose up -d --build` from the root), run from `TORment-Frontend`:

```powershell
.\security\zap\run-zap.ps1
```

The script runs ZAP's passive Baseline scan (`zap-baseline.py`) on `http://localhost:3000`.
The report is saved to `security/zap/reports/zap-frontend-report.html`, which is gitignored.
The Docker image runs `next dev`, so ignore findings that only apply in dev mode.
