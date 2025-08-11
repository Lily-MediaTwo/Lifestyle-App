# 4-Week Fat Loss Tracker

This bundle contains an updated `index.html` plus a minimal PWA setup:

- Fix: dialog submit buttons now set `value="default"` so the `dialog` close listeners fire as intended.
- Fix: added missing Daily Log inputs (weight, waist, hips, chest, thigh, arm) so `loadLog()`/`saveLog()` work.
- Added: `manifest.webmanifest`, icons, and `service-worker.js` for installability and basic offline use.
- Added: a `<noscript>` notice for users with JavaScript disabled.

To run locally, just open `index.html`. For service worker to cache, serve via a local server (e.g., `python -m http.server`) and load at `http://localhost:8000`.