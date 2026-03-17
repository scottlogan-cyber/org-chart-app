#!/usr/bin/env bash
# Deploy from /tmp to avoid EPERM when running from Desktop "org chart app" folder.
set -e
PROJECT_SOURCE="/Users/scott.logan/Desktop/org chart app"
DEPLOY_DIR="/tmp/org-chart-deploy-$$"
cp -R "$PROJECT_SOURCE" "$DEPLOY_DIR"
cd "$DEPLOY_DIR"
npm run build
export NODE_TLS_REJECT_UNAUTHORIZED=0
npx vercel --yes --prod
rm -rf "$DEPLOY_DIR"
echo ""
echo "Deploy complete. Use the URL above with your team."
