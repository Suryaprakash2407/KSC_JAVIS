# KSC JARVIS — AI Marketing Assistant

A web-based marketing workspace for **K. Somu Chetty & Co.**, Chennai.

## MVP goals
- Maintain a reusable company brand profile and product library.
- Compose premium promotional posters for social media and print.
- Preview poster copy and download a PNG.
- Plan daily promotions with a simple content calendar.

## Design direction
Premium, minimal, warm cream/off-white surfaces, restrained gold accents, natural product photography, and the original KSC logo used without alteration. Avoid dark/black themes and clutter.

## Run locally
```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Current MVP
The first version is a frontend prototype. Product edits are saved in the browser's local storage. Poster export runs in the browser. AI image generation, authentication, cloud database, scheduled daily generation, and website publishing are planned integrations and are not yet connected.

## Project structure
- `src/App.tsx` — dashboard, product library, poster studio, calendar, brand memory.
- `src/styles.css` — visual system and responsive layouts.
- `docs/BRAND_GUIDELINES.md` — persistent project-level brand reference.

## Next milestones
1. Connect an AI image-generation provider.
2. Add secure backend storage and user authentication.
3. Add daily content scheduling and approval workflow.
4. Add WhatsApp/Instagram-ready export presets and website publishing integration.
