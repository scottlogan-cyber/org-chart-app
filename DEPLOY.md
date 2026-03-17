# Deploy via Vercel (no terminal)

We deploy this app by **importing the Git repository** in the Vercel dashboard.

## 1. Put this project on GitHub

1. On [github.com](https://github.com), click **+** → **New repository**.
2. Name it (e.g. `org-chart-app`), leave it empty, and create it.
3. Copy the **repository URL** GitHub shows, e.g.:
   ```text
   https://github.com/YOUR_USERNAME/org-chart-app
   ```
4. In Terminal (one time only), from this folder run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/org-chart-app.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
   If Git asks for your identity, run: `git config --global user.email "your@email.com"` and `git config --global user.name "Your Name"` (use your GitHub email/name), then run the `git commit` and `git push` again.
   (If your default branch is `master`, use `git push -u origin master`.)

## 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. In **“Enter a Git repository URL to deploy”**, paste your repo URL:
   ```text
   https://github.com/YOUR_USERNAME/org-chart-app
   ```
3. Click **Import**.
4. Leave **Build Command** as `npm run build` and **Output Directory** as `dist`. Click **Deploy**.
5. When it finishes, Vercel gives you the app URL (e.g. `https://org-chart-app-xxx.vercel.app`). Share that with your team.

Future pushes to the same branch will trigger new deployments automatically.
