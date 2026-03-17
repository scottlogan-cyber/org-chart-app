# Org Chart App

Single-page app to build org charts by filling a number-to-name table. No manual positioning: position 1 = CEO, 2–5 = C-suite, 6–8 = managers, 9–10 = team. Export to PDF or CSV; re-upload CSV to update.

## Get your shareable URL — deploy via Vercel (no terminal)

We deploy by **importing this app’s Git repo** in the Vercel dashboard.

1. Put this project on GitHub (new repo, then push this folder — see **[DEPLOY.md](DEPLOY.md)** for step-by-step).
2. On Vercel: **[vercel.com/new](https://vercel.com/new)** → paste your **repository URL** (e.g. `https://github.com/YOUR_USERNAME/org-chart-app`) → Import → Deploy.
3. Use the URL Vercel gives you (e.g. `https://org-chart-app-xxx.vercel.app`) and share it with your team.

Full instructions: **[DEPLOY.md](DEPLOY.md)**.

## Local build

- `npm run build` — output in `dist/`
- `npm run preview` — serve `dist/` locally (optional)
