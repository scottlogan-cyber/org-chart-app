#!/usr/bin/env bash
# Run Vercel login from home dir to avoid EPERM/uv_cwd; open link in Chrome.
export BROWSER="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$HOME" || exit 1
npx vercel login
