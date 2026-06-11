# STRUCTURE — structurelogistics.com

The main marketing site for **Structure** (AI for Logistics) with a dedicated
**LoadHawk** product page.

## Stack

Pure static site — zero build step, zero dependencies to install.

- `index.html` — main Structure site (hero network canvas, horizontal platform
  scroll, inverted LoadHawk feature, impact metrics, process, footer)
- `loadhawk.html` — LoadHawk product page (radar canvas hero, 7 agents,
  pipeline, $30K guarantee, fit criteria)
- `css/style.css` — monochrome design system with electric-cyan/violet accent layer (Archivo + Instrument Serif + Fragment Mono)
- `js/fx.js` — canvas VFX engine (logistics network map, radar sweep)
- `js/main.js` — Lenis smooth scroll + GSAP ScrollTrigger orchestration
  (preloader, custom cursor, magnetic buttons, split-text reveals, counters,
  scroll-velocity marquees, pinned horizontal section)

GSAP and Lenis load from CDN. Fonts load from Google Fonts.

## Preview locally

```bash
python3 -m http.server 8743
# open http://localhost:8743
```

## Deploy

Any static host works. Examples:

**Netlify:** drag the folder into the Netlify dashboard, or
`netlify deploy --prod --dir .` — then point structurelogistics.com at it.

**Vercel:** `vercel --prod`

No environment variables, no build command. Publish directory is the repo root.

## Lead capture

The home page form (`#contact`) is Netlify Forms-ready (`data-netlify="true"` +
honeypot). Deploy to Netlify and submissions appear under Site → Forms with
zero extra setup (enable email notifications there). On any other host, the
form gracefully falls back to opening a pre-filled email to
sales@structurelogistics.com. LoadHawk page CTAs go to
book.structurelogistics.com.

## SEO / AI-search layer

- JSON-LD on both pages: Organization, WebSite, Service, SoftwareApplication
  (LoadHawk with pricing), FAQPage, BreadcrumbList
- Visible FAQ + About sections mirror the schema (extractable answer blocks)
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, Bingbot, CCBot and more
- `sitemap.xml`, `llms.txt`, `llms-full.txt`, `pricing.md` (machine-readable
  for AI agents)
- After deploy: submit sitemap in Google Search Console + Bing Webmaster Tools

## Notes

- All CTAs point to https://book.structurelogistics.com
- Contact: sales@structurelogistics.com · support@structurelogistics.com · +1 442 237 8419
- Respects `prefers-reduced-motion` (all animation disabled, content fully visible)
- Mobile: horizontal platform section becomes a native swipe carousel; agent
  cards expand by tap
