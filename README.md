# iscatering.com

A planning reference for catering: four calculators that run in the browser — food quantity,
staffing, drinks, cost per head — and nine guides to the decisions behind the numbers. Three
scroll-scrubbed film scenes on the front page.

The domain and this site are for sale: <https://iscatering.com/acquire>

It is not a catering company: it sells nothing, takes no bookings and carries no advertising. Every
figure is labelled as an estimating rule of thumb rather than a guarantee.

## How it works

No framework, no build step beyond Node. `build.js` reads `data.js` and writes plain HTML next to
itself.

```
node build.js        # writes 16 pages, sitemap.xml and robots.txt into this folder
```

| file | what it is |
| --- | --- |
| `data.js` | the calculators and the guide copy |
| `build.js` | page templates, CSS, the sitemap and the structured data |
| `reel.js` | the scroll-scrubbed scenes: markup, CSS and the scrub/settle script |
| `motion.js` | the anime.js layer, which embeds `reel.js` |
| `assets/scenes/` | the film, cut to frames: 96 desktop (1600×900) and 72 phone (940×1015) per scene |
| `assets/video/` | the masters those frames were cut from |
| `assets/brand/` | the logo mark at 512 / 180 / 64 / 32 |

Each calculator is self-contained: its inputs, its arithmetic and the assumptions it prints are all
in one record in `data.js`, and the script for it is inlined into that page only.

## The scenes

Each scene is a `300vh`–`360vh` section with a pinned viewport inside it. Scrolling scrubs a frame
sequence on a `<canvas>`; the two frames either side of the scroll position are cross-faded so the
motion is continuous rather than stepping. When a scroll ends inside a scene the page eases onto the
nearest of eight beats. The canvas is sized to the frame, not the stage, so each paint is a 1:1 blit.

Data-saver, 2G and `prefers-reduced-motion` get the poster frame and no scrubbing.

## Deploying

Cloudflare Workers static assets. The worker (`worker.js`) 301s `www` and `http` to the canonical
apex and hands everything else to the asset store; it needs `run_worker_first: true`, otherwise
assets are served before the script ever runs. `wrangler.deploy.jsonc` is the config.

Two things to remember:

- **Renaming beats purging.** `_headers` gives `/assets/` a thirty day cache. If you replace a frame
  in place, visitors keep the old one for a month — bump the suffix in `reel.js` instead
  (`d2`/`m3` today) and let the old paths 404.
- The stylesheet link carries a hash of its own contents, so CSS changes never go stale.

## Credits

Photographs are from Unsplash under the Unsplash licence, credited on `/about`. The three moving
scenes are generated, not filmed — stated on `/about` as well.
