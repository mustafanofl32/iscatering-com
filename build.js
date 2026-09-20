const fs = require("fs");
const path = require("path");
const { guides, tools } = require("./data.js");
const credits = require("./assets/img/credits.json");

const ORIGIN = "https://iscatering.com";
const OUT = __dirname;
const { sceneMarkup, REEL_CSS } = require("./reel.js");
const { MOTION } = require("./motion.js");

/* blocks of ordinary content ride up over the pinned scenes, same as the other site */
const HOME_CSS = `
.block{position:relative;z-index:5;background:var(--bg);border-radius:clamp(26px,3.4vw,52px) clamp(26px,3.4vw,52px) 0 0;
  margin-top:calc(-1 * clamp(26px,3.4vw,52px));padding-block:clamp(56px,7vw,110px);box-shadow:0 -30px 60px -30px rgba(0,0,0,.45)}
.block section:first-child{margin-top:0}
.block--last{padding-bottom:clamp(30px,4vw,60px)}
main.home{padding-block:0}
main.home + .foot{margin-top:0}
`;
const today = "2026-09-18";
const todayLong = "18 September 2026";

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Photographs: free Unsplash images of tables, kitchens and venues. No caterer, company or
   product is depicted as a client or endorsement. */
const CAPTION = {
  home: "A banquet table laid for service", quantities: "A buffet line", staffing: "Staff plating during service",
  drinks: "Wine poured at an event", budget: "Working out a budget", portions: "A plated course",
  "service-styles": "Servers finishing a table", contract: "Signing a contract", timeline: "Planning notes",
  rentals: "A marquee before an event", dietary: "A salad course", space: "A room set with round tables",
  about: "A chef plating", acquire: "A place setting"
};
const photo = key => ({ src: `/assets/img/${key}.jpg`, sm: `/assets/img/${key}-sm.jpg`, cap: CAPTION[key], by: credits[key] });
const credit = by => `Photo: <a href="${by.photo}" rel="noopener">${esc(by.user)} / Unsplash</a>`;

const crumbs = trail => ({ "@type": "BreadcrumbList", itemListElement: trail.map(([name, url], i) =>
  ({ "@type": "ListItem", position: i + 1, name, item: ORIGIN + url })) });

const guideUrl = g => `/guides/${g.slug}`;
const toolUrl = t => `/tools/${t.slug}`;

/* ------------------------------------------------------------------ CSS */
const CSS = `:root{
  color-scheme:light;
  --bg:#F4F3EF; --surface:#FFFFFF; --surface-2:#EAE8E1;
  --ink:#1A1C1A; --ink-2:#4F554F; --ink-3:#6C726B;
  --line:rgba(26,28,26,.10); --line-strong:rgba(26,28,26,.22);
  --accent:#2F6B4F; --accent-ink:#FFFFFF; --accent-soft:rgba(47,107,79,.10);
  --glass:rgba(255,255,255,.58); --glass-strong:rgba(255,255,255,.76);
  --glass-edge:rgba(255,255,255,.75); --glass-line:rgba(26,28,26,.08);
  --glass-shadow:0 1px 1px rgba(26,28,26,.04),0 10px 30px -8px rgba(26,28,26,.18);
  --amb-1:rgba(150,190,160,.42); --amb-2:rgba(214,190,150,.38); --amb-3:rgba(150,175,205,.26);
  --r-sm:10px; --r-md:16px; --r-lg:24px; --r-pill:999px;
  --ease:cubic-bezier(.2,.8,.2,1);
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  color-scheme:dark;
  --bg:#101210; --surface:#181A18; --surface-2:#1F221F;
  --ink:#E9EAE6; --ink-2:#AFB4AD; --ink-3:#8C918A;
  --line:rgba(233,234,230,.10); --line-strong:rgba(233,234,230,.22);
  --accent:#86C9A3; --accent-ink:#0B1710; --accent-soft:rgba(134,201,163,.12);
  --glass:rgba(26,30,27,.52); --glass-strong:rgba(26,30,27,.72);
  --glass-edge:rgba(255,255,255,.14); --glass-line:rgba(255,255,255,.08);
  --glass-shadow:0 1px 1px rgba(0,0,0,.3),0 14px 40px -10px rgba(0,0,0,.6);
  --amb-1:rgba(50,120,85,.22); --amb-2:rgba(150,110,60,.20); --amb-3:rgba(60,90,140,.18);
}}
:root[data-theme="dark"]{
  color-scheme:dark;
  --bg:#101210; --surface:#181A18; --surface-2:#1F221F;
  --ink:#E9EAE6; --ink-2:#AFB4AD; --ink-3:#8C918A;
  --line:rgba(233,234,230,.10); --line-strong:rgba(233,234,230,.22);
  --accent:#86C9A3; --accent-ink:#0B1710; --accent-soft:rgba(134,201,163,.12);
  --glass:rgba(26,30,27,.52); --glass-strong:rgba(26,30,27,.72);
  --glass-edge:rgba(255,255,255,.14); --glass-line:rgba(255,255,255,.08);
  --glass-shadow:0 1px 1px rgba(0,0,0,.3),0 14px 40px -10px rgba(0,0,0,.6);
  --amb-1:rgba(50,120,85,.22); --amb-2:rgba(150,110,60,.20); --amb-3:rgba(60,90,140,.18);
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-padding-top:96px}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"Instrument Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:16px;line-height:1.6;overflow-x:hidden;transition:background-color .3s var(--ease),color .3s var(--ease)}
body::before{content:"";position:fixed;inset:-20vmax;z-index:-1;pointer-events:none;
  background:radial-gradient(40vmax 30vmax at 10% 6%,var(--amb-1),transparent 70%),
             radial-gradient(38vmax 30vmax at 92% 20%,var(--amb-2),transparent 70%),
             radial-gradient(40vmax 34vmax at 55% 100%,var(--amb-3),transparent 70%)}
img{max-width:100%;display:block}
a{color:var(--accent);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
a:hover{text-decoration-thickness:2px}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
.wrap{max-width:1180px;margin-inline:auto;padding-inline:clamp(16px,4vw,32px)}
.mono{font-family:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.5}
h1,h2,h3{font-family:"Newsreader",Georgia,serif;font-weight:500;line-height:1.12;margin:0;letter-spacing:-.01em;text-wrap:balance}
h1{font-size:clamp(2.2rem,5.2vw,3.7rem)}
h2{font-size:clamp(1.5rem,2.8vw,2rem);margin-bottom:12px}
h3{font-size:1.2rem}
p{margin:0 0 1em}
.muted{color:var(--ink-2)}
.skip{position:absolute;left:-9999px}
.skip:focus{left:12px;top:12px;background:var(--ink);color:var(--bg);padding:10px 14px;border-radius:8px;z-index:100}

.glass{position:relative;background:var(--glass);border:1px solid var(--glass-line);box-shadow:var(--glass-shadow),inset 0 1px 0 var(--glass-edge);
  -webkit-backdrop-filter:blur(22px) saturate(170%);backdrop-filter:blur(22px) saturate(170%)}
.glass::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(160deg,rgba(255,255,255,.22),rgba(255,255,255,0) 38%)}
:root[data-theme="dark"] .glass::after{background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,0) 38%)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .glass::after{background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,0) 38%)}}
.glass--strong{background:var(--glass-strong)}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.glass{background:var(--glass-strong)}}
@media (prefers-reduced-transparency:reduce){.glass{background:var(--surface);-webkit-backdrop-filter:none;backdrop-filter:none}}


/* A quiet, permanent line at the top of every page. The highest-intent visitor this domain
   will ever get is someone who typed it in, and until now nothing told them it was available.
   Deliberately not a parking banner: the site itself is the argument for the price. */
.sale-bar{display:flex;align-items:center;gap:12px;max-width:1180px;margin:0 auto 8px;
  padding:7px 8px 7px 18px;border-radius:999px;font-size:.84rem;line-height:1.3;
  background:color-mix(in srgb,var(--accent) 16%,var(--bg));
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 34%,transparent);color:var(--ink)}
.sale-bar__msg{flex:1;min-width:0;color:inherit;text-decoration:none}
.sale-bar__msg b{font-weight:600}
.sale-bar__go{flex:none;padding:5px 14px;border-radius:999px;font-weight:600;white-space:nowrap;
  background:var(--accent);color:var(--on-accent,#1a1509);text-decoration:none}
.sale-bar__go:hover{filter:brightness(1.07);text-decoration:none}
.sale-bar__x{flex:none;width:28px;height:28px;border:0;border-radius:50%;cursor:pointer;
  background:transparent;color:inherit;opacity:.5;font-size:19px;line-height:1}
.sale-bar__x:hover{opacity:1;background:color-mix(in srgb,var(--ink) 10%,transparent)}
[data-sale="off"] .sale-bar{display:none}
@media (max-width:560px){.sale-bar__more{display:none}}
@media (max-width:680px){
  .sale-bar{gap:8px;padding:6px 6px 6px 14px;font-size:.78rem;border-radius:18px}
  .sale-bar__go{display:none}
}
.nav-shell{position:sticky;top:12px;z-index:50;padding-inline:clamp(10px,3vw,24px);margin-top:12px}
.navbar{max-width:1180px;margin-inline:auto;border-radius:var(--r-pill);display:flex;align-items:center;gap:8px;padding:6px 6px 6px 20px}

/* the long "Buy this domain" label does not fit a phone nav, and the bar above already
   carries the message, so it is a desktop affordance only */
@media (max-width:760px){ .nav .nav--wide{display:none} }
.logo{display:inline-flex;align-items:center;gap:10px;min-width:0;font-family:"Newsreader",Georgia,serif;font-weight:600;font-size:1.3rem;color:var(--ink);text-decoration:none;margin-right:auto;white-space:nowrap}
.logo .mark{width:28px;height:28px;flex:none;border-radius:7px;display:block;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.logo:hover .mark{transform:translateY(-1px)}
@media (max-width:520px){.logo{font-size:1.15rem;gap:8px}.logo .mark{width:24px;height:24px;border-radius:6px}}
.logo:hover{text-decoration:none}
.nav{display:flex;gap:2px}
.nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:var(--r-pill);color:var(--ink-2);text-decoration:none;font-size:.95rem;font-weight:500;transition:background-color .2s var(--ease),color .2s}
.nav a:hover{color:var(--ink);background:var(--accent-soft)}
.nav a[aria-current]{color:var(--ink);background:var(--glass-strong);box-shadow:inset 0 0 0 1px var(--glass-line)}
.theme-btn{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:0;background:transparent;color:var(--ink);cursor:pointer;transition:background-color .2s}
.theme-btn:hover{background:var(--accent-soft)}
.theme-btn svg{width:20px;height:20px}
.theme-btn .i-sun{display:none}
:root[data-theme="dark"] .theme-btn .i-sun{display:block}
:root[data-theme="dark"] .theme-btn .i-moon{display:none}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .theme-btn .i-sun{display:block}:root:not([data-theme="light"]) .theme-btn .i-moon{display:none}}
@media (max-width:640px){
  .navbar{flex-wrap:nowrap;border-radius:var(--r-pill);padding:5px 5px 5px 12px;gap:4px}
  .nav{order:0;width:auto;justify-content:flex-end;margin:0;gap:0}
  .nav a{padding:7px 9px;font-size:.84rem}
  .logo{font-size:1.02rem;gap:7px}
  .logo .mark{width:22px;height:22px;border-radius:6px}
  .nav a{padding:0 10px;font-size:.9rem}
}

main{padding-block:28px 72px}
/* a domain name is one unbreakable word; the sale page needs a heading sized to fit it */
.stage--tight .stage__panel{max-width:min(880px,94%)}
.stage--tight h1{font-size:clamp(1.8rem,4.6vw,3.6rem);line-height:1.05;text-wrap:balance}
.stage{position:relative;border-radius:var(--r-lg);overflow:hidden;min-height:clamp(400px,58vh,560px);display:flex;align-items:flex-end;background:#15170f;isolation:isolate}
.stage>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1}
.stage--short{min-height:clamp(280px,38vh,400px)}
.stage__panel{margin:clamp(12px,2.4vw,24px);padding:clamp(20px,3vw,32px);border-radius:var(--r-lg);max-width:660px;width:100%}
.stage__cap{position:absolute;right:14px;top:14px;border-radius:var(--r-pill);padding:6px 12px;color:var(--ink-2)}
.stage__cap a{color:inherit}
.lede{font-size:clamp(1.05rem,1.6vw,1.2rem);color:var(--ink-2);max-width:40em;margin:12px 0 0}
.crumbs{margin:0 0 12px;color:var(--ink-3)}
.crumbs a{color:var(--ink-2)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 20px;border-radius:var(--r-pill);border:0;
  background:var(--ink);color:var(--bg);font:inherit;font-weight:600;font-size:.95rem;text-decoration:none;cursor:pointer;transition:transform .15s var(--ease),opacity .15s}
.btn:hover{text-decoration:none;opacity:.9}
.btn:active{transform:scale(.97)}
.btn--quiet{background:var(--accent-soft);color:var(--ink)}
.cta-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}

section{margin-top:clamp(52px,7vw,88px)}
.sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:22px}
.sec-head p{margin:0;max-width:40em}
.cards{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(270px,1fr))}
.card{display:flex;flex-direction:column;border-radius:var(--r-lg);overflow:hidden;text-decoration:none;color:var(--ink);transition:transform .2s var(--ease)}
.card:hover{text-decoration:none;transform:translateY(-2px)}
.card img{aspect-ratio:16/10;object-fit:cover;width:100%}
.card__b{padding:18px 20px 22px}
.card__b b{display:block;font-family:"Newsreader",Georgia,serif;font-weight:500;font-size:1.3rem;line-height:1.15}
.card__b span{display:block;margin-top:6px;color:var(--ink-2);font-size:.94rem}
.card__b em{font-style:normal;font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--accent);text-transform:uppercase;letter-spacing:.08em}

/* calculator */
.calc{display:grid;gap:24px;margin-top:28px;align-items:start}
@media (min-width:900px){.calc{grid-template-columns:minmax(0,420px) minmax(0,1fr);gap:40px}}
.form{border-radius:var(--r-lg);padding:22px}
@media (min-width:900px){.form{position:sticky;top:100px}}
.field{margin-bottom:18px}
.field:last-child{margin-bottom:0}
.field label{display:block;font-weight:600;font-size:.92rem;margin-bottom:6px}
.field .hint{display:block;font-weight:400;color:var(--ink-3);font-size:.85rem;margin-top:2px}
.field input,.field select{width:100%;min-height:44px;padding:0 12px;border-radius:var(--r-sm);border:1px solid var(--line-strong);background:var(--surface);color:var(--ink);font:inherit;font-size:1rem}
.field input:focus,.field select:focus{outline:2px solid var(--accent);outline-offset:1px}
.out{border-radius:var(--r-lg);padding:22px 24px}
.out h2{margin-top:0}
.rows{list-style:none;margin:0;padding:0}
.rows li{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-top:1px solid var(--line)}
.rows li:first-child{border-top:0}
.rows b{font-family:"Newsreader",Georgia,serif;font-weight:500;font-size:1.25rem;font-variant-numeric:tabular-nums;white-space:nowrap}
.rows span small{display:block;color:var(--ink-3);font-size:.84rem;margin-top:2px}
.assume{margin-top:22px;padding-top:16px;border-top:1px solid var(--line);color:var(--ink-3);font-size:.9rem}
.assume ul{margin:8px 0 0;padding-left:1.1em}
.big{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:20px}
.big div{border-radius:var(--r-md);padding:14px 16px;background:var(--accent-soft)}
.big b{display:block;font-family:"Newsreader",Georgia,serif;font-size:1.9rem;font-weight:500;line-height:1.1;font-variant-numeric:tabular-nums}
.big span{display:block;font-size:.85rem;color:var(--ink-2);margin-top:2px}

/* article */
.entry{display:grid;gap:28px;margin-top:28px;align-items:start}
@media (min-width:920px){.entry{grid-template-columns:minmax(0,1fr) 300px;gap:48px}}
.prose{font-family:"Newsreader",Georgia,serif;font-size:1.2rem;line-height:1.65}
.prose p{max-width:34em}
.prose h2{margin-top:38px;font-size:1.5rem}
.prose ul{margin:0 0 1em;padding-left:1.1em}
.toc{border-radius:var(--r-lg);padding:18px 20px;font-size:.95rem}
@media (min-width:920px){.toc{position:sticky;top:100px}}
.toc p{font-family:"IBM Plex Mono",monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);margin:0 0 10px}
.toc ol{margin:0;padding:0;list-style:none;counter-reset:t}
.toc li{counter-increment:t;border-top:1px solid var(--line)}
.toc li:first-child{border-top:0}
.toc a{display:block;padding:9px 0;color:var(--ink);text-decoration:none}
.toc a:hover{color:var(--accent)}
.toc a::before{content:counter(t) ". ";color:var(--ink-3)}
.revised{margin-top:36px;padding-top:14px;border-top:1px solid var(--line);color:var(--ink-3);font-family:"IBM Plex Mono",monospace;font-size:12.5px}
.notice{border-radius:var(--r-lg);padding:20px 22px;margin-top:26px;max-width:42em;font-family:"Instrument Sans",sans-serif;font-size:1rem}
.notice h2{font-size:1.3rem}
.credits{list-style:none;padding:0;margin:0;columns:2 250px;column-gap:28px;font-family:"Instrument Sans",sans-serif;font-size:.9rem;color:var(--ink-2)}
.credits li{break-inside:avoid;padding:3px 0}

.foot{margin-top:24px;padding:0 clamp(10px,3vw,24px) 24px}
.foot__in{max-width:1180px;margin-inline:auto;border-radius:var(--r-lg);padding:22px 26px;display:grid;gap:14px;color:var(--ink-2);font-size:.92rem}
.foot__row{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.foot nav{display:flex;flex-wrap:wrap;gap:4px}
.foot nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 10px;color:var(--ink-2);text-decoration:none;border-radius:var(--r-pill)}
.foot nav a:hover{color:var(--ink);background:var(--accent-soft)}
.foot .dis{margin:0;font-size:.84rem;color:var(--ink-3);max-width:62em}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}}
`;

const SHEET = CSS + REEL_CSS + HOME_CSS;
const CSS_V = require("crypto").createHash("sha1").update(SHEET).digest("hex").slice(0, 8);


/* ------------------------------------------------------------ templates */
const ICON = {
  sun: `<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>`,
  moon: `<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.4 14.6A8.5 8.5 0 0 1 9.4 3.6a8.5 8.5 0 1 0 11 11Z"/></svg>`
};
const THEME_HEAD = `<script>(function(){try{var t=localStorage.getItem('isc-sale')==='off'&&document.documentElement.setAttribute('data-sale','off');localStorage.getItem('isc-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()</script>`;
const THEME_BODY = `<script>
(function(){
  var b=document.getElementById('theme'); if(!b) return;
  var root=document.documentElement, mq=window.matchMedia('(prefers-color-scheme: dark)');
  function current(){ return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light'); }
  function label(){ var d=current()==='dark'; b.setAttribute('aria-label', d ? 'Switch to light theme' : 'Switch to dark theme'); b.setAttribute('aria-pressed', d ? 'true' : 'false'); }
  b.addEventListener('click', function(){
    var next=current()==='dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('isc-theme', next); }catch(e){}
    label();
  });
  if(mq.addEventListener) mq.addEventListener('change', label);
  label();
})();
</script>`;

function shell({title, desc, canonical, body, jsonld, current, ogImage, script, home, noindex}) {
  const og = ORIGIN + (ogImage || "/assets/img/home.jpg");
  const nav = [["tools", "/#tools", "Calculators"], ["guides", "/#guides", "Guides"], ["about", "/about", "About"], ["acquire", "/acquire", "Buy this domain"]];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">${noindex ? '<meta name="robots" content="noindex, follow">' : ""}
<meta name="color-scheme" content="light dark">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F3EF">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#101210">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ISCatering">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
${THEME_HEAD}
<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/mark-32.png">
<link rel="icon" type="image/png" sizes="64x64" href="/assets/brand/mark-64.png">
<link rel="apple-touch-icon" href="/assets/brand/mark-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Instrument+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap">
<link rel="stylesheet" href="/assets/site.css?v=${CSS_V}">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="nav-shell">
  <div class="sale-bar" id="sale-bar">
  <a class="plain sale-bar__msg" href="/acquire"><b>ISCatering.com</b> is for sale &mdash; $1,195<span class="sale-bar__more">, or in monthly instalments</span></a>
  <a class="plain sale-bar__go" href="/acquire">See the details</a>
  <button class="sale-bar__x" type="button" aria-label="Dismiss">&times;</button>
</div>
  <header class="navbar glass">
    <a class="logo" href="/"><img class="mark" src="/assets/brand/mark-512.png" alt="" width="28" height="28" decoding="async"><span>IS<span style="color:var(--accent)">Catering</span></span></a>
    <nav class="nav" aria-label="Primary">${nav.map(([k, href, label]) => `<a${k === "acquire" ? ' class="nav--wide"' : ""} href="${href}"${current === k ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
    <button class="theme-btn" id="theme" type="button" aria-label="Switch theme">${ICON.moon}${ICON.sun}</button>
  </header>
</div>
<main id="main"${home ? ' class="home"' : ""}>${home ? "" : '<div class="wrap">'}
${body}
${home ? "" : "</div>"}</main>
<footer class="foot"><div class="foot__in glass">
  <div class="foot__row">
    <span><strong style="color:var(--ink)">ISCatering.com</strong> <span class="mono">&middot; catering planning reference &middot; revised ${todayLong}</span></span>
    <nav aria-label="Footer"><a href="/#tools">Calculators</a><a href="/#guides">Guides</a><a href="/about">About</a><a href="/about#photographs">Photographs</a><a href="/acquire">Buy this domain</a></nav>
  </div>
  <p class="dis">Planning figures on this site are conventional industry rules of thumb for estimating, not guarantees, quotes or professional advice. Food safety, alcohol licensing, allergen labelling and employment rules differ by country and venue; local requirements always take priority. This site does not sell catering and is not a caterer.</p>
</div></footer>
${THEME_BODY}
<script>(function(){var b=document.getElementById('sale-bar');if(!b)return;
b.querySelector('.sale-bar__x').addEventListener('click',function(){
try{localStorage.setItem('isc-sale','off')}catch(e){}document.documentElement.setAttribute('data-sale','off')})})()</script>
${MOTION}
${script || ""}
</body>
</html>
`;
}

const stage = (p, inner, {short = false, tight = false} = {}) => `<div class="stage${short ? " stage--short" : ""}${tight ? " stage--tight" : ""}">
  <img src="${p.src}" alt="${esc(p.cap)}" fetchpriority="high">
  <p class="stage__cap glass mono">${esc(p.cap)} &middot; <a href="${p.by.photo}" rel="noopener">${esc(p.by.user)}</a></p>
  <div class="stage__panel glass glass--strong">${inner}</div>
</div>`;

const card = (href, kind, title, lede, p) => `<a class="card glass" href="${href}">
  <img src="${p.sm}" alt="" loading="lazy">
  <div class="card__b"><em>${esc(kind)}</em><b>${esc(title)}</b><span>${esc(lede)}</span></div>
</a>`;

/* ----------------------------------------------------------- calculators */
const field = (id, label, hint, input) => `<div class="field">
  <label for="${id}">${label}${hint ? `<span class="hint">${hint}</span>` : ""}</label>
  ${input}
</div>`;
const num = (id, value, min, max, step = "1") => `<input id="${id}" type="number" inputmode="numeric" value="${value}" min="${min}" max="${max}" step="${step}">`;
const sel = (id, opts) => `<select id="${id}">${opts.map(([v, t, s]) => `<option value="${v}"${s ? " selected" : ""}>${t}</option>`).join("")}</select>`;

const CALC = {
  "food-quantity-calculator": {
    desc: "Estimate how much food to order from the guest count, service style and event length. Shows protein, starch, vegetables, bread and dessert per head.",
    intro: "Quantities are planning weights, not serving sizes: they include the margin caterers leave so that nothing runs out. Adjust for your own menu and your own crowd.",
    form: [
      field("adults", "Adults", "", num("adults", 100, 1, 5000)),
      field("children", "Children under 12", "Counted at half an adult portion", num("children", 0, 0, 5000)),
      field("style", "Service style", "", sel("style", [["buffet", "Buffet", true], ["plated", "Plated"], ["family", "Family style"], ["stations", "Stations"], ["canapes", "Canapes only"]])),
      field("hours", "Hours of food service", "", num("hours", 3, 1, 12)),
      field("appetite", "Crowd", "", sel("appetite", [["light", "Lighter (lunch, older or mixed corporate)"], ["normal", "Average", true], ["hearty", "Heavier (evening, younger, manual work)"]])),
      field("alcohol", "Alcohol served", "", sel("alcohol", [["no", "No"], ["yes", "Yes", true]]))
    ],
    script: `
  var f=['adults','children','style','hours','appetite','alcohol'].map(function(i){return document.getElementById(i)});
  function kg(g){ return g>=1000 ? (g/1000).toFixed(1)+' kg' : Math.round(g)+' g'; }
  function lb(g){ return (g/453.592).toFixed(1)+' lb'; }
  function calc(){
    var a=+f[0].value||0, c=+f[1].value||0, style=f[2].value, hours=+f[3].value||1, app=f[4].value, alc=f[5].value;
    var eaters=a+c*0.5;
    var m={buffet:1.15, plated:1, family:1.12, stations:1.1, canapes:0.55}[style];
    m*= {light:0.85, normal:1, hearty:1.15}[app];
    if(hours>3) m*= 1+Math.min(hours-3,3)*0.05;
    if(alc==='yes') m*=1.05;
    var protein=170*eaters*m, starch=140*eaters*m, veg=140*eaters*m;
    var rolls=Math.ceil(1.5*eaters*m), dessert=Math.ceil(1.15*eaters*(style==='canapes'?0.6:1));
    var pieces=Math.ceil((style==='canapes'? (hours<=2?12:14) : 5)*eaters);
    var total=protein+starch+veg;
    var rows=[
      ['Total food (planning weight)', kg(total)+'  ·  '+lb(total), 'All courses except bread and dessert'],
      ['Boneless protein', kg(protein)+'  ·  '+lb(protein), 'Bone-in: order about twice this raw weight'],
      ['Starch', kg(starch)+'  ·  '+lb(starch), 'Potato, rice, pasta or grain'],
      ['Vegetables and salad', kg(veg)+'  ·  '+lb(veg), 'Prepared weight'],
      ['Bread rolls', rolls, 'About 1.5 per adult'],
      ['Dessert portions', dessert, 'Includes a small over-count'],
      [style==='canapes'?'Canape pieces':'Reception canapes', pieces, style==='canapes'?'Across at least six varieties':'For a one-hour reception before the meal']
    ];
    document.getElementById('big').innerHTML='<div><b>'+Math.round(eaters)+'</b><span>portion equivalents</span></div>'+
      '<div><b>'+kg(total)+'</b><span>total food</span></div>'+
      '<div><b>'+lb(total)+'</b><span>in pounds</span></div>';
    document.getElementById('rows').innerHTML=rows.map(function(r){
      return '<li><span>'+r[0]+'<small>'+r[2]+'</small></span><b>'+r[1]+'</b></li>'}).join('');
  }
  f.forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}); calc();`,
    assumptions: [
      "Base plate of 170 g protein, 140 g starch and 140 g vegetables per adult, before adjustments.",
      "Buffet and family style add 12 to 15 percent because guests serve themselves.",
      "Events longer than three hours add 5 percent per extra hour, up to three hours.",
      "Children are counted as half an adult portion.",
      "Alcohol adds 5 percent."
    ]
  },
  "staffing-calculator": {
    desc: "Estimate how many servers, bartenders and kitchen staff an event needs, and the total paid hours including setup and breakdown.",
    intro: "Staff numbers come from the service style, not only the guest count. The hours matter as much as the headcount: setup, briefing and breakdown are paid time.",
    form: [
      field("guests", "Guests", "", num("guests", 100, 1, 5000)),
      field("style", "Service style", "", sel("style", [["buffet", "Buffet", true], ["plated", "Plated"], ["family", "Family style"], ["stations", "Stations"], ["canapes", "Passed canapes"]])),
      field("bar", "Bar", "", sel("bar", [["none", "No alcohol"], ["beerwine", "Beer and wine", true], ["full", "Full bar"]])),
      field("event", "Hours of service", "", num("event", 4, 1, 14)),
      field("setup", "Setup hours", "Per staff member, before guests arrive", num("setup", 2, 0, 8, "0.5")),
      field("down", "Breakdown hours", "", num("down", 1.5, 0, 8, "0.5")),
      field("rate", "Hourly rate (optional)", "In your currency, for a rough labour total", num("rate", 0, 0, 1000, "0.5"))
    ],
    script: `
  var ids=['guests','style','bar','event','setup','down','rate'], f=ids.map(function(i){return document.getElementById(i)});
  function calc(){
    var g=+f[0].value||0, style=f[1].value, bar=f[2].value, ev=+f[3].value||0, su=+f[4].value||0, dn=+f[5].value||0, rate=+f[6].value||0;
    var per={plated:10, buffet:22, family:14, stations:20, canapes:25}[style];
    var servers=Math.max(2, Math.ceil(g/per));
    var bartenders = bar==='none' ? 0 : Math.max(1, Math.ceil(g/(bar==='full'?45:60)));
    var barback = (bar!=='none' && g>=150) ? Math.ceil(g/300) : 0;
    var kitchen = Math.max(2, Math.ceil(g/(style==='plated'?28:45))+1);
    var leads = g>=75 ? Math.max(1, Math.ceil(g/175)) : 0;
    var dish = g>=80 ? 1 + (g>=250?1:0) : 0;
    var total=servers+bartenders+barback+kitchen+leads+dish;
    var hours=(ev+su+dn)*total;
    document.getElementById('big').innerHTML='<div><b>'+total+'</b><span>staff on site</span></div>'+
      '<div><b>'+hours.toFixed(1)+'</b><span>paid hours</span></div>'+
      (rate>0?'<div><b>'+Math.round(hours*rate).toLocaleString()+'</b><span>labour cost</span></div>':'');
    var rows=[
      ['Servers', servers, '1 per '+per+' guests for this style'],
      ['Bartenders', bartenders, bar==='none'?'No alcohol service':'1 per '+(bar==='full'?'45':'60')+' guests'],
      ['Barbacks', barback, g>=150?'Stock and ice runner':'Not needed below about 150 guests'],
      ['Kitchen staff', kitchen, 'Chef plus support, menu dependent'],
      ['Floor leads', leads, g>=75?'Runs the timeline instead of serving':'The chef or owner usually runs the floor'],
      ['Dishwashers', dish, g>=80?'Assumes real china':'Not needed at this size'],
      ['Hours each', (ev+su+dn).toFixed(1), su+' setup + '+ev+' service + '+dn+' breakdown']
    ];
    document.getElementById('rows').innerHTML=rows.map(function(r){
      return '<li><span>'+r[0]+'<small>'+r[2]+'</small></span><b>'+r[1]+'</b></li>'}).join('');
  }
  f.forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}); calc();`,
    assumptions: [
      "Servers: one per 10 guests plated, 14 family style, 20 stations, 22 buffet, 25 passed canapes.",
      "Bartenders: one per 60 guests for beer and wine, one per 45 for a full bar.",
      "Kitchen staff scale with the menu; the figure here assumes a conventional three-course or buffet menu.",
      "A floor lead is added from about 75 guests, and dishwashers from about 80 with real china.",
      "Travel time, minimum call-out hours and overtime premiums are not included."
    ]
  },
  "drinks-calculator": {
    desc: "Estimate drinks, wine and spirit bottles, ice and glassware for an event, based on guest count and hours.",
    intro: "The standard planning rate is one drink per guest in the first hour and one per hour after that. Everything below follows from that, then splits by drink type.",
    form: [
      field("guests", "Drinking-age guests", "", num("guests", 100, 1, 5000)),
      field("hours", "Hours the bar is open", "", num("hours", 4, 1, 12)),
      field("crowd", "Crowd", "", sel("crowd", [["light", "Light drinkers (lunch, corporate)"], ["normal", "Average", true], ["heavy", "Heavy (evening, wedding)"]])),
      field("mix", "Drink mix", "", sel("mix", [["beerwine", "Beer and wine only"], ["mixed", "Wine, beer and spirits", true], ["wine", "Mostly wine"]])),
      field("toast", "Sparkling wine toast", "", sel("toast", [["no", "No"], ["yes", "Yes", true]])),
      field("nonalc", "Non-drinkers and soft drinks", "Percent of guests", num("nonalc", 25, 0, 100))
    ],
    script: `
  var ids=['guests','hours','crowd','mix','toast','nonalc'], f=ids.map(function(i){return document.getElementById(i)});
  function calc(){
    var g=+f[0].value||0, h=+f[1].value||1, crowd=f[2].value, mix=f[3].value, toast=f[4].value, na=(+f[5].value||0)/100;
    var rate={light:0.7, normal:1, heavy:1.3}[crowd];
    var drinkers=g*(1-na*0.5);
    var drinks=Math.ceil(drinkers*(1+(h-1))*rate);
    var split={beerwine:{wine:.55,beer:.45,spirit:0}, mixed:{wine:.5,beer:.3,spirit:.2}, wine:{wine:.75,beer:.15,spirit:.1}}[mix];
    var wineGlasses=Math.ceil(drinks*split.wine), beers=Math.ceil(drinks*split.beer), spiritDrinks=Math.ceil(drinks*split.spirit);
    var wineBottles=Math.ceil(wineGlasses/5), spiritBottles=Math.ceil(spiritDrinks/16);
    var toastBottles = toast==='yes' ? Math.ceil(g/6) : 0;
    var soft=Math.ceil(g*Math.max(na,0.2)*h*0.8);
    var iceKg=Math.ceil(g*0.9), iceLb=Math.ceil(iceKg*2.205);
    var glasses=Math.ceil(g*1.7);
    var rows=[
      ['Total drinks', drinks, '1 in the first hour, then 1 per hour, adjusted for the crowd'],
      ['Wine (glasses)', wineGlasses, '150 ml pour'],
      ['Wine bottles', wineBottles, '5 glasses per 750 ml bottle'],
      ['Beers', beers, 'Bottles or cans'],
      ['Spirit drinks', spiritDrinks, '45 ml measure'],
      ['Spirit bottles', spiritBottles, '16 drinks per 750 ml bottle'],
      ['Sparkling for the toast', toastBottles, toast==='yes'?'One glass each, 6 per bottle':'No toast selected'],
      ['Soft drinks and water', soft, 'Servings, plus water available throughout'],
      ['Ice', iceKg+' kg  ·  '+iceLb+' lb', 'Chilling and drinks combined; more in hot weather'],
      ['Glasses to rent', glasses, 'About 1.7 per guest, glasses get abandoned']
    ];
    document.getElementById('big').innerHTML='<div><b>'+drinks+'</b><span>drinks total</span></div>'+
      '<div><b>'+wineBottles+'</b><span>wine bottles</span></div>'+
      '<div><b>'+iceKg+' kg</b><span>ice</span></div>';
    document.getElementById('rows').innerHTML=rows.map(function(r){
      return '<li><span>'+r[0]+'<small>'+r[2]+'</small></span><b>'+r[1]+'</b></li>'}).join('');
  }
  f.forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}); calc();`,
    assumptions: [
      "One drink per guest in the first hour, one per hour after that, multiplied by 0.7 for a light crowd and 1.3 for a heavy one.",
      "Five 150 ml glasses per 750 ml wine bottle; sixteen 45 ml measures per 750 ml spirit bottle; six glasses per sparkling bottle.",
      "Ice at about 0.9 kg per guest, covering both chilling and drinks.",
      "Glassware at 1.7 per guest for self-service bars.",
      "Alcohol licensing and service rules are local and are not covered here."
    ]
  },
  "cost-per-head-calculator": {
    desc: "Work out the cost per guest for an event from food, labour, rentals and overhead, and see the price needed for a target margin.",
    intro: "Enter your own numbers in any currency. The calculator keeps the arithmetic honest: it separates direct costs from overhead and shows the margin the price actually produces.",
    form: [
      field("guests", "Guests", "", num("guests", 100, 1, 5000)),
      field("food", "Food cost per guest", "Raw ingredients only", num("food", 14, 0, 10000, "0.5")),
      field("labour", "Total labour cost", "Staff hours x rate, all roles", num("labour", 1600, 0, 1000000, "10")),
      field("rentals", "Rentals and equipment", "Tables, linen, china, chafers", num("rentals", 900, 0, 1000000, "10")),
      field("other", "Transport, fuel, disposables", "", num("other", 250, 0, 1000000, "10")),
      field("overhead", "Overhead", "Percent added for insurance, kitchen, admin", num("overhead", 15, 0, 100)),
      field("price", "Price charged per guest", "Leave at 0 to see a suggested price", num("price", 0, 0, 100000, "0.5")),
      field("target", "Target margin", "Percent", num("target", 25, 0, 90))
    ],
    script: `
  var ids=['guests','food','labour','rentals','other','overhead','price','target'], f=ids.map(function(i){return document.getElementById(i)});
  function money(n){ return (Math.round(n*100)/100).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function calc(){
    var g=+f[0].value||1, food=+f[1].value||0, lab=+f[2].value||0, rent=+f[3].value||0, oth=+f[4].value||0,
        ovh=(+f[5].value||0)/100, price=+f[6].value||0, target=(+f[7].value||0)/100;
    var direct=food*g+lab+rent+oth;
    var total=direct*(1+ovh);
    var perHead=total/g;
    var suggested= target<1 ? perHead/(1-target) : perHead;
    var used= price>0 ? price : suggested;
    var revenue=used*g, profit=revenue-total, margin=revenue>0 ? profit/revenue*100 : 0;
    document.getElementById('big').innerHTML='<div><b>'+money(perHead)+'</b><span>cost per guest</span></div>'+
      '<div><b>'+money(suggested)+'</b><span>price for '+Math.round(target*100)+'% margin</span></div>'+
      '<div><b>'+margin.toFixed(1)+'%</b><span>margin at '+money(used)+'</span></div>';
    var rows=[
      ['Food', money(food*g), money(food)+' per guest'],
      ['Labour', money(lab), money(lab/g)+' per guest'],
      ['Rentals', money(rent), money(rent/g)+' per guest'],
      ['Transport and disposables', money(oth), money(oth/g)+' per guest'],
      ['Direct cost', money(direct), 'Before overhead'],
      ['Overhead', money(total-direct), Math.round(ovh*100)+'% of direct cost'],
      ['Total cost', money(total), money(perHead)+' per guest'],
      ['Revenue at '+money(used)+' per guest', money(revenue), price>0?'Your price':'Suggested price'],
      ['Profit', money(profit), margin.toFixed(1)+'% margin'],
      ['Food cost as share of price', (used>0?(food/used*100).toFixed(1):'0')+'%', 'Often kept near 25 to 35 percent']
    ];
    document.getElementById('rows').innerHTML=rows.map(function(r){
      return '<li><span>'+r[0]+'<small>'+r[2]+'</small></span><b>'+r[1]+'</b></li>'}).join('');
  }
  f.forEach(function(el){el.addEventListener('input',calc);el.addEventListener('change',calc)}); calc();`,
    assumptions: [
      "Margin is calculated on revenue, not as a markup on cost.",
      "Overhead is applied as a percentage of direct costs.",
      "Taxes, service charges and payment fees are not included.",
      "The food cost share is shown because it is the number most often used as a sanity check."
    ]
  }
};

function toolPage(t) {
  const c = CALC[t.slug];
  const p = photo(t.img);
  const canonical = ORIGIN + toolUrl(t);
  const body = `
${stage(p, `
  <p class="crumbs mono"><a href="/">ISCatering</a> / <a href="/#tools">Calculators</a></p>
  <h1>${esc(t.title)}</h1>
  <p class="lede">${esc(t.lede)}</p>
`, { short: true })}

<div class="calc">
  <form class="form glass" id="form" novalidate>
    <h2 style="font-size:1.25rem;margin-bottom:16px">Your event</h2>
    ${c.form.join("\n    ")}
  </form>
  <div>
    <div class="out glass">
      <h2>Estimate</h2>
      <p class="muted" style="max-width:38em">${esc(c.intro)}</p>
      <div class="big" id="big"></div>
      <ul class="rows" id="rows"></ul>
      <div class="assume">
        <strong>What this assumes</strong>
        <ul>${c.assumptions.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
        <p style="margin-top:10px">These are estimating rules of thumb, not guarantees. Check the numbers against your own menu, your own staff and your own suppliers.</p>
      </div>
    </div>
    <section style="margin-top:40px">
      <div class="sec-head"><h2>Related reading</h2></div>
      <div class="cards">
        ${guides.slice(0, 3).map(g => card(guideUrl(g), "Guide", g.title, g.lede, photo(g.img))).join("\n        ")}
      </div>
    </section>
    <p class="revised">Page revised ${todayLong}.</p>
  </div>
</div>
`;
  return shell({
    title: `${t.title} | ISCatering`, desc: c.desc, canonical, body, current: "tools", ogImage: p.src,
    script: `<script>(function(){${c.script}\n})();</script>`,
    jsonld: { "@context": "https://schema.org", "@graph": [
      crumbs([["ISCatering", "/"], ["Calculators", "/#tools"], [t.title, toolUrl(t)]]),
      { "@type": "WebApplication", name: t.title, url: canonical,
        applicationCategory: "BusinessApplication", operatingSystem: "Any", description: c.desc,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] }
  });
}

function guidePage(g, prev, next) {
  const p = photo(g.img);
  const canonical = ORIGIN + guideUrl(g);
  /* a lede written for the page can be too short to be a useful search snippet; the first
     section heading tells the reader what else is inside */
  let desc = g.lede;
  if (desc.length < 110 && Array.isArray(g.body) && g.body.length) {
    const more = g.body.map(s => s[0]).filter(Boolean).slice(0, 3).join(", ");
    if (more) desc = desc.replace(/.$/, "") + ". Covers " + more + ".";
  }
  if (desc.length > 158) desc = desc.slice(0, 155).replace(/[s,;:]+$/, "") + "…";
  const body = `
${stage(p, `
  <p class="crumbs mono"><a href="/">ISCatering</a> / <a href="/#guides">Guides</a></p>
  <h1>${esc(g.title)}</h1>
  <p class="lede">${esc(g.lede)}</p>
`, { short: true })}

<div class="entry">
  <article class="prose">
    ${g.body.map(([h, ps], i) => `<h2 id="s${i + 1}">${esc(h)}</h2>\n    ${ps.map(t => `<p>${esc(t)}</p>`).join("\n    ")}`).join("\n    ")}
    <p class="revised">Guide revised ${todayLong}. Figures here are planning rules of thumb, not guarantees. <a href="/acquire">Send a correction</a>.</p>
    <div class="cta-row">
      ${prev ? `<a class="btn btn--quiet" href="${guideUrl(prev)}">&larr; ${esc(prev.title)}</a>` : ""}
      ${next ? `<a class="btn btn--quiet" href="${guideUrl(next)}">${esc(next.title)} &rarr;</a>` : ""}
    </div>
  </article>
  <aside class="toc glass" aria-label="On this page">
    <p>On this page</p>
    <ol>${g.body.map(([h], i) => `<li><a href="#s${i + 1}">${esc(h)}</a></li>`).join("")}</ol>
  </aside>
</div>

<section>
  <div class="sec-head"><h2>Calculators</h2></div>
  <div class="cards">${tools.slice(0, 3).map(t => card(toolUrl(t), "Calculator", t.title, t.lede, photo(t.img))).join("\n  ")}</div>
</section>
`;
  return shell({
    title: `${g.title} | ISCatering`, desc, canonical, body, current: "guides", ogImage: p.src,
    jsonld: { "@context": "https://schema.org", "@graph": [
      crumbs([["ISCatering", "/"], ["Guides", "/#guides"], [g.title, guideUrl(g)]]),
      { "@type": "Article", headline: g.title, description: desc,
      image: ORIGIN + p.src, dateModified: today, mainEntityOfPage: canonical,
      isPartOf: { "@type": "WebSite", name: "ISCatering", url: ORIGIN + "/" } }] }
  });
}

/* ------------------------------------------------------------ home page */
const homeBody = `
${sceneMarkup({ key: "table", index: 1, tall: true, hero: true, steps: [
  `<p class="kicker">Planning reference</p>
   <h1>Catering planning, worked out</h1>
   <p class="lede">Four calculators and nine guides for planning an event: how much food to order, how many staff to book, what the drinks come to, and what it all costs per guest.</p>
   <div class="cta-row">
     <a class="btn btn--accent plain" href="#tools">Open a calculator</a>
     <a class="btn btn--ghost plain" href="#guides">Read the guides</a>
   </div>`,
  `<p class="kicker">What it is</p>
   <h2>Rules of thumb, written down</h2>
   <p class="lede">The numbers a caterer starts from before adjusting for the menu, the venue and the crowd. Each one states the assumption behind it.</p>`
] })}

<div class="block">
  <div class="wrap">
    <section id="tools" style="scroll-margin-top:96px">
      <div class="sec-head"><h2>Calculators</h2><p class="muted">Type in your event. The numbers update as you go, and every calculator shows the assumptions behind them.</p></div>
      <div class="cards">${tools.map(t => card(toolUrl(t), "Calculator", t.title, t.lede, photo(t.img))).join("")}</div>
    </section>
  </div>
</div>

${sceneMarkup({ key: "pass", index: 2, steps: [
  `<p class="kicker">Quantities</p>
   <h2>How much actually goes out</h2>
   <p class="lede">Portions per head, canapes per hour, how the numbers move with a long drinks reception or a seated dinner.</p>`,
  `<p class="kicker">Staffing</p>
   <h2>And how many hands it takes</h2>
   <p class="lede">Servers per guest by service style, kitchen cover, and the hours that get billed either side of the event.</p>`
] })}

<div class="block">
  <div class="wrap">
    <section id="guides" style="scroll-margin-top:96px">
      <div class="sec-head"><h2>Guides</h2><p class="muted">The decisions behind the numbers, written for whoever is organising the event.</p></div>
      <div class="cards">${guides.map(g => card(guideUrl(g), "Guide", g.title, g.lede, photo(g.img))).join("")}</div>
    </section>
  </div>
</div>

${sceneMarkup({ key: "pour", index: 3, steps: [
  `<p class="kicker">Drinks</p>
   <h2>Bottles, ice and glassware</h2>
   <p class="lede">What a bar gets through per guest per hour, and how much of it you have to buy rather than hire.</p>
   <div class="cta-row"><a class="btn btn--accent plain" href="/tools/drinks-calculator">Open the drinks calculator</a></div>`,
  `<p class="kicker">Cost</p>
   <h2>What it comes to per head</h2>
   <p class="lede">Food, staff, hire and drinks added up, so a quote can be checked against something.</p>
   <div class="cta-row"><a class="btn btn--accent plain" href="/tools/cost-per-head-calculator">Open the cost calculator</a></div>`
] })}

<div class="block block--last">
  <div class="wrap">
    <section>
      <div class="sec-head"><h2>How to use this</h2></div>
      <div class="entry">
        <div class="prose">
          <p>Every figure on this site is an estimating rule of thumb: the kind of number a caterer starts from before adjusting for the menu, the venue and the crowd. They are useful for a first order, a budget or a sanity check on a quote. They are not guarantees.</p>
          <p>The calculators run in your browser. Nothing is sent anywhere, nothing is stored, and there is no sign-up.</p>
        </div>
      </div>
    </section>
  </div>
</div>
`;

const aboutBody = `
${stage(photo("about"), `
  <h1>About</h1>
  <p class="lede">A free planning reference for anyone organising catering, from a caterer quoting a job to someone feeding a hundred people once in their life.</p>
`, { short: true })}
<div class="entry">
  <article class="prose">
    <p>Catering planning runs on rules of thumb that are held in kitchens and passed between staff: how much food per head, how many servers, how much ice. They are rarely written down in one place, and the versions online are usually buried in a sales page.</p>
    <p>This site collects them, states the assumption behind each one, and puts the arithmetic in calculators so the numbers can be adjusted rather than copied.</p>
    <h2>What this site is not</h2>
    <p>It is not a catering company. It does not sell food, take bookings, accept advertising or earn commission, and it does not recommend suppliers. No company, menu, price or review on this site is invented, because there are none.</p>
    <h2>Accuracy and limits</h2>
    <p>The figures are conventional planning ranges, and reasonable caterers differ on them. Food safety, alcohol licensing, allergen labelling and employment rules vary by country, state and venue, and local requirements always take priority over anything written here. Nothing here is legal, health or financial advice.</p>
    <p>If something is wrong or a range looks off, <a href="/acquire">send a correction</a> and it will be fixed.</p>
    <h2 id="photographs">Photographs and clips</h2>
    <p>Photographs show tables, venues and kitchens. None is a client, a supplier or an endorsement. All are from Unsplash and used under the Unsplash licence.</p>
    <p>The three moving scenes on the front page are <strong>generated</strong>, not filmed: they were made with Google's video model and cut into still frames. They are atmosphere, nothing more. No scene shows a real event, a real kitchen or a real dish, and nothing in them should be read as a photograph of anything that exists.</p>
    <ul class="credits">
      ${Object.entries(credits).map(([k, v]) => `<li>${esc(CAPTION[k] || k)}, by <a href="${v.link}" rel="noopener">${esc(v.user)}</a></li>`).join("\n      ")}
    </ul>
    <p class="revised">Page revised ${todayLong}.</p>
  </article>
</div>
`;

const acquireBody = `
${stage(photo("acquire"), `
  <h1>ISCatering.com is for sale</h1>
  <p class="lede">A short, plain .com for the catering trade, with a working set of planning tools already on it.</p>
`, { short: true, tight: true })}
<div class="entry">
  <article class="prose">
    <div class="notice glass" style="margin-top:0">
      <h2 style="margin-top:0">$1,195 to buy outright</h2>
      <p>Or in monthly instalments through Afternic’s lease-to-own, which transfers the name at the end of the term. Either way GoDaddy/Afternic hold the payment and move the domain, so neither side has to trust the other.</p>
      <p style="margin:0">
        <a class="btn" href="https://www.afternic.com/domain/iscatering.com" rel="noopener">Buy or make an offer</a>
        <a class="btn btn--quiet" href="mailto:mustafanofl32@gmail.com?subject=ISCatering.com">Email me directly</a>
      </p>
    </div>

    <h2>What comes with it</h2>
    <ul>
      <li><strong>The name.</strong> iscatering.com, registered and clean — no trade mark dispute, no penalty history, nothing to unwind.</li>
      <li><strong>The site on it.</strong> ${tools.length} working calculators and ${guides.length} guides, and the code that builds them. Yours if you want it, deleted if you do not.</li>
      <li><strong>A head start with Google.</strong> Indexed, a submitted sitemap, clean URLs and structured data already in place. A new domain starts from nothing; this one does not.</li>
    </ul>

    <h2>Who it fits</h2>
    <p>A catering company, a booking or quoting platform, catering software, or an events business that wants the plain words instead of a coined name it has to teach people. The calculators are proof the name reads as a brand; they are not a condition of the sale.</p>

    <h2>How it goes</h2>
    <p>Buy it outright and Afternic moves it, usually within a day or two of payment clearing. On lease-to-own you pay monthly and it transfers when the last payment lands. Offers are welcome; I answer every one, including the low ones, and I answer within a day.</p>

    <h2>Corrections to a figure</h2>
    <p>Separate from any of the above: if a planning figure here does not match your experience, email <a href="mailto:mustafanofl32@gmail.com">mustafanofl32@gmail.com</a> and say what you see in practice. Figures are revised when the correction holds up.</p>
  </article>
</div>
`;

/* --------------------------------------------------------------- writing */
fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
fs.mkdirSync(path.join(OUT, "guides"), { recursive: true });
fs.mkdirSync(path.join(OUT, "tools"), { recursive: true });
fs.writeFileSync(path.join(OUT, "assets", "site.css"), SHEET);

fs.writeFileSync(path.join(OUT, "index.html"), shell({
  home: true,
  title: "ISCatering: catering calculators and planning guides",
  desc: "Free catering planning tools: food quantity, staffing, drinks and cost-per-head calculators, plus guides to service styles, portions, contracts and rentals.",
  canonical: ORIGIN + "/", current: "tools", body: homeBody,
  jsonld: {
    "@context": "https://schema.org", "@type": "WebSite", name: "ISCatering", url: ORIGIN + "/", dateModified: today,
    description: "Catering planning calculators and guides."
  }
}));

tools.forEach(t => fs.writeFileSync(path.join(OUT, "tools", t.slug + ".html"), toolPage(t)));
guides.forEach((g, i) => fs.writeFileSync(path.join(OUT, "guides", g.slug + ".html"), guidePage(g, guides[i - 1], guides[i + 1])));

fs.writeFileSync(path.join(OUT, "about.html"), shell({
  title: "About | ISCatering", current: "about", body: aboutBody, ogImage: "/assets/img/about.jpg",
  desc: "What the ISCatering planning reference covers, how the figures should be used, and photo credits.",
  canonical: ORIGIN + "/about",
  jsonld: { "@context": "https://schema.org", "@type": "AboutPage", name: "About ISCatering", url: ORIGIN + "/about",
    isPartOf: { "@type": "WebSite", name: "ISCatering", url: ORIGIN + "/" } }
}));
fs.writeFileSync(path.join(OUT, "acquire.html"), shell({
  title: "ISCatering.com is for sale | ISCatering", body: acquireBody, ogImage: "/assets/img/acquire.jpg", current: "acquire",
  desc: "ISCatering.com, a short plain .com for the catering trade, is for sale at $1,195 or in monthly instalments through Afternic. The calculators come with it.",
  canonical: ORIGIN + "/acquire",
  jsonld: { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact", url: ORIGIN + "/acquire",
    isPartOf: { "@type": "WebSite", name: "ISCatering", url: ORIGIN + "/" } }
}));

fs.writeFileSync(path.join(OUT, "404.html"), shell({
  title: "Page not found | IS Catering",
  noindex: true,
  desc: "That page is not here.",
  canonical: ORIGIN + "/404",
  body: `<div class="wrap"><section style="margin-top:clamp(60px,12vh,140px)">
    <p class="kicker">404</p>
    <h1>That page is not here</h1>
    <p class="lede" style="margin-top:20px">The link may be old, or the calculator may have been renamed.</p>
    <div class="cta-row">
      <a class="btn btn--accent" href="/">Back to the calculators</a>
      <a class="btn btn--ghost" href="/#guides">Browse the guides</a>
    </div>
  </section></div>`
}));

const urls = [ORIGIN + "/", ORIGIN + "/about", ORIGIN + "/acquire",
  ...tools.map(t => ORIGIN + toolUrl(t)), ...guides.map(g => ORIGIN + guideUrl(g))];
fs.writeFileSync(path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

console.log(`Built ${tools.length} calculators + ${guides.length} guides + 3 others = ${urls.length} URLs`);
