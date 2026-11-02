# Rodolph Mesadieu · Portfolio

A React 18 + TypeScript + Tailwind CSS + Vite portfolio, redesigned with editorial typography and horizontally scrollable work cards inspired by the supplied layout reference.

## Run locally

```powershell
npm install
npm run dev
```

Build with `npm run build`, then deploy the `dist` directory to Vercel (Framework preset: Vite).

## Customize

- **Project content:** `src/data.ts`
- **Experience:** `src/data.ts`
- **Intro, about, contact:** `src/App.tsx`
- **Colors, layout, theme:** `tailwind.config.js` and `src/styles.css`
- **Metadata and domain:** `index.html`

### Important placeholders

- `hello@rmesadieu.com` is a placeholder: verify the mailbox or replace it.
- LinkedIn and GitHub links currently lead to their homepages: replace with your exact profile URLs.
- A typographic RM placeholder replaces a real portrait and project images. Add licensed/local assets if desired.
- Project descriptions are an editorial adaptation of the portfolio/project context, not a verbatim reconstruction of every file from the original dump.

## Domain migration

Set `rmesadieu.com` as the primary production domain in your Vercel project and redirect `rudymesadieu.com` to it. The canonical URL already points to `rmesadieu.com`. Domain registration and DNS changes must be done in your registrar/Vercel account.

## Original infrastructure

The original dump contained Next.js middleware and Supabase-based visitor auditing. This redesign intentionally does **not** carry that middleware into a client-only Vite app: moving server-side IP analytics into the browser would be insecure and would not preserve its behavior. If visitor auditing is required, implement it separately using a serverless endpoint and privacy-conscious collection.

## Accessibility

Keyboard-accessible buttons and modal, Escape to dismiss, accessible labels, reduced-motion support, semantic sections and native scrolling.
