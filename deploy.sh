#!/usr/bin/env bash
# Build and deploy to Vercel. Run once: npm run vercel:login (then sign in in the browser).
set -e
cd "$(dirname "$0")"
npm run build
# Work around "unable to get local issuer certificate" on some networks
export NODE_TLS_REJECT_UNAUTHORIZED=0
npx vercel --yes --prod
