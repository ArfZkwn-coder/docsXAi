---
title: "Build an Arcade-Style Investor Website with Multi-Portal Navigation"
description: "Step-by-step tutorial to build an arcade game website for investors, with Main Menu, Games, Investors, About, Careers and Contact Us portals, using plain HTML, CSS and JavaScript."
---

# Build an Arcade-Style Investor Website with Multi-Portal Navigation

In this tutorial you will build a website for an **arcade game company** that is aimed at **investors**. The look and feel is inspired by browser-game portals such as [Poki](https://poki.com/): a bold header, a category strip, a grid of game tiles, and a footer split into "Help and Support" and "Get To Know Us". The main goal is **reliable navigation between portals**:

| Portal | Page | Purpose |
|---|---|---|
| Main Menu | `index.html` | Landing page with hero, featured games and key numbers |
| Games | `games.html` | Searchable, filterable arcade grid (the product demo) |
| Investors | `investors.html` | Metrics, why invest, investor relations contact |
| About | `about.html` | Story, mission, team |
| Careers | `careers.html` | Open roles with department filter |
| Contact Us | `contact.html` | Validated enquiry form |
| Not found | `404.html` | Friendly dead-end that routes users back |

You only need a text editor and a browser. No frameworks, no build step.

> **Important:** use the reference site for *inspiration of layout and structure only*. Do not copy its logo, game thumbnails, text or code. Poki's assets and brand belong to Poki. This tutorial uses emoji tiles and original placeholder names so the project is safely yours.

---

## What you will learn

1. Planning a site map before writing code
2. Creating a shared header and footer so every portal navigates the same way
3. Styling an arcade theme (dark background, neon accents, tile grid)
4. Building a games grid with search and category filters
5. Building an investor portal with a metrics section
6. Building Careers and Contact Us pages
7. Testing every link, then deploying

---

## Step 1: Plan the site map

Navigation problems usually come from skipping this step. Write down every page and who it serves.

```
Home (Main Menu)
├── Games           (product demo for investors)
├── Investors       (metrics, thesis, IR contact)
├── About           (story, team)
├── Careers         (open roles)
└── Contact Us      (form)
```

**Rules to follow:**

- Every page is reachable from the top menu in **one click**.
- Every page has the **same header and footer**.
- The current page is **highlighted** in the menu.
- Every page ends with a clear next action (a button to Contact Us or Investors).

---

## Step 2: Create the project folder

```
arcade-investor-site/
├── index.html
├── games.html
├── investors.html
├── about.html
├── careers.html
├── contact.html
├── 404.html
├── css/
│   └── style.css
└── js/
    ├── components.js   (shared header and footer)
    ├── games.js        (game data and filtering)
    └── careers.js      (job data and filtering)
```

Create the folders and empty files first. Having the structure in place makes the later steps quick.

---

## Step 3: Build the shared header and footer

If you paste the header into six HTML files, one menu change means six edits and eventually a broken link. Instead, write the header and footer **once** in JavaScript and inject them on every page.

Create `js/components.js`:

```javascript
const NAV_LINKS = [
  { label: "Main Menu", href: "index.html" },
  { label: "Games", href: "games.html" },
  { label: "Investors", href: "investors.html" },
  { label: "About", href: "about.html" },
  { label: "Careers", href: "careers.html" },
  { label: "Contact Us", href: "contact.html" }
];

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

function renderHeader() {
  const active = currentPage();
  const links = NAV_LINKS.map(function (link) {
    const isActive = link.href === active;
    return '<a href="' + link.href + '"' +
      (isActive ? ' class="active" aria-current="page"' : "") + ">" +
      link.label + "</a>";
  }).join("");

  document.getElementById("site-header").innerHTML =
    '<div class="header-inner">' +
      '<a class="logo" href="index.html">PIXEL<span>PLAY</span></a>' +
      '<button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
      '<nav id="main-nav" aria-label="Main">' + links + "</nav>" +
    "</div>";

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML =
    '<div class="footer-grid">' +
      "<div><h4>PixelPlay</h4><p>Instant arcade games, in any browser.</p></div>" +
      '<div><h4>Explore</h4><a href="games.html">All Games</a>' +
        '<a href="about.html">About</a><a href="careers.html">Careers</a></div>' +
      '<div><h4>Investors</h4><a href="investors.html">Overview</a>' +
        '<a href="contact.html">Investor Relations</a></div>' +
      '<div><h4>Help and Support</h4><a href="contact.html">Contact Us</a>' +
        '<a href="#">Privacy Statement</a><a href="#">Terms of Use</a></div>' +
    "</div>" +
    '<p class="copyright">© ' + new Date().getFullYear() + " PixelPlay. All rights reserved.</p>";
}

document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderFooter();
});
```

Every page will contain two empty placeholders, `site-header` and `site-footer`, and load this script. That is the whole trick: **one menu, edited in one place**.

> Replace "PixelPlay" with your company name. The two `#` links in the footer are placeholders for your legal pages.

---

## Step 4: Write the arcade stylesheet

Create `css/style.css`. The theme is dark with neon accents, which gives the "arcade cabinet" feel.

```css
:root {
  --bg: #0b0f1f;
  --panel: #151b33;
  --text: #eaf0ff;
  --muted: #9aa6cf;
  --neon: #00f5d4;
  --pink: #ff4fa3;
  --yellow: #ffd84d;
  --radius: 16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Segoe UI", system-ui, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }

/* ---------- Header ---------- */
#site-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(11, 15, 31, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid var(--neon);
}
.header-inner {
  max-width: 1200px; margin: 0 auto; padding: 14px 20px;
  display: flex; align-items: center; justify-content: space-between;
}
.logo { font-size: 1.6rem; font-weight: 900; letter-spacing: 2px; }
.logo span { color: var(--neon); }
#main-nav { display: flex; gap: 6px; }
#main-nav a {
  padding: 8px 14px; border-radius: 999px; font-weight: 600; color: var(--muted);
  transition: background 0.2s, color 0.2s;
}
#main-nav a:hover { background: var(--panel); color: var(--text); }
#main-nav a.active { background: var(--neon); color: #04110e; }
.menu-toggle {
  display: none; background: none; border: 0; color: var(--text); font-size: 1.8rem; cursor: pointer;
}

/* ---------- Layout ---------- */
main { max-width: 1200px; margin: 0 auto; padding: 32px 20px 60px; }
section { margin-bottom: 56px; }
h1 { font-size: clamp(2rem, 5vw, 3.4rem); line-height: 1.1; }
h2 { font-size: 1.7rem; margin-bottom: 18px; }
.lead { color: var(--muted); font-size: 1.15rem; max-width: 640px; margin: 14px 0 24px; }

.btn {
  display: inline-block; padding: 12px 24px; border-radius: 999px; border: 0;
  font-weight: 800; cursor: pointer; font-size: 1rem;
  background: var(--yellow); color: #231a00;
  box-shadow: 0 4px 0 #b8941f; transition: transform 0.1s;
}
.btn:hover { transform: translateY(-2px); }
.btn.secondary { background: transparent; color: var(--text); border: 2px solid var(--neon); box-shadow: none; }

/* ---------- Hero ---------- */
.hero {
  padding: 56px 32px; border-radius: 24px;
  background: radial-gradient(circle at 80% 20%, #3a1d6e 0%, var(--panel) 60%);
  border: 1px solid #2a3366;
}
.hero h1 em { color: var(--pink); font-style: normal; }
.hero .actions { display: flex; gap: 14px; flex-wrap: wrap; }

/* ---------- Category chips ---------- */
.chips { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.chip {
  padding: 8px 16px; border-radius: 999px; background: var(--panel);
  border: 1px solid #2a3366; color: var(--text); cursor: pointer; font-weight: 600;
}
.chip.active, .chip:hover { background: var(--pink); border-color: var(--pink); }

/* ---------- Game grid ---------- */
.grid {
  display: grid; gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}
.tile {
  background: var(--panel); border-radius: var(--radius); padding: 18px 12px;
  text-align: center; border: 2px solid transparent;
  transition: transform 0.15s, border-color 0.15s;
}
.tile:hover { transform: scale(1.05); border-color: var(--neon); }
.tile .emoji { font-size: 3rem; }
.tile h3 { font-size: 1rem; margin-top: 8px; }
.tile small { color: var(--muted); }

/* ---------- Stats and cards ---------- */
.stats { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.stat { background: var(--panel); border-radius: var(--radius); padding: 24px; text-align: center; }
.stat strong { display: block; font-size: 2.2rem; color: var(--neon); }
.stat span { color: var(--muted); }
.card { background: var(--panel); border-radius: var(--radius); padding: 24px; border: 1px solid #2a3366; }
.cards { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }

/* ---------- Forms ---------- */
form { display: grid; gap: 16px; max-width: 620px; }
label { font-weight: 600; display: grid; gap: 6px; }
input, select, textarea {
  padding: 12px 14px; border-radius: 10px; border: 2px solid #2a3366;
  background: var(--panel); color: var(--text); font: inherit;
}
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--neon); }
.error { color: #ff8a8a; font-size: 0.9rem; min-height: 1.1em; }
.success { background: #0e3b2f; border: 1px solid var(--neon); padding: 16px; border-radius: 10px; }

/* ---------- Footer ---------- */
#site-footer { background: #070a16; border-top: 2px solid var(--pink); padding: 40px 20px 20px; }
.footer-grid {
  max-width: 1200px; margin: 0 auto; display: grid; gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.footer-grid h4 { color: var(--neon); margin-bottom: 10px; }
.footer-grid a { display: block; color: var(--muted); padding: 3px 0; }
.footer-grid a:hover { color: var(--text); }
.copyright { text-align: center; color: var(--muted); margin-top: 30px; font-size: 0.85rem; }

/* ---------- Mobile ---------- */
@media (max-width: 800px) {
  .menu-toggle { display: block; }
  #main-nav {
    display: none; position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; background: var(--bg); padding: 12px 20px 20px;
    border-bottom: 2px solid var(--neon);
  }
  #main-nav.open { display: flex; }
  .hero { padding: 36px 20px; }
}
```

The `@media` block at the bottom is what turns the menu into a hamburger on phones. Investors will often open your link on a phone first, so do not skip it.

---

## Step 5: Build the Main Menu (home page)

Create `index.html`. The home page has four jobs: say what you do, show the product, show numbers, and point to the other portals.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PixelPlay | Instant Arcade Games</title>
  <meta name="description" content="Instant browser arcade games. Learn about our investor opportunities.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header id="site-header"></header>

  <main>
    <section class="hero">
      <h1>Play instantly. <em>Scale globally.</em></h1>
      <p class="lead">A browser arcade platform where millions of players find their next favourite game in seconds. No downloads required.</p>
      <div class="actions">
        <a class="btn" href="games.html">Play Now</a>
        <a class="btn secondary" href="investors.html">For Investors</a>
      </div>
    </section>

    <section>
      <h2>Featured games</h2>
      <div class="grid" id="featured-grid"></div>
    </section>

    <section>
      <h2>Platform at a glance</h2>
      <div class="stats">
        <div class="stat"><strong>1,500+</strong><span>Games in library</span></div>
        <div class="stat"><strong>12M</strong><span>Monthly players</span></div>
        <div class="stat"><strong>68%</strong><span>Mobile traffic</span></div>
        <div class="stat"><strong>4.4 ★</strong><span>Average rating</span></div>
      </div>
      <p class="lead">Sample figures. Replace them with your real, audited numbers before sharing with investors.</p>
    </section>

    <section>
      <h2>Explore PixelPlay</h2>
      <div class="cards">
        <a class="card" href="investors.html"><h3>💼 Investors</h3><p>Metrics, growth thesis and investor relations.</p></a>
        <a class="card" href="careers.html"><h3>🚀 Careers</h3><p>Join the team building the next arcade.</p></a>
        <a class="card" href="contact.html"><h3>✉️ Contact Us</h3><p>Questions? We reply within two working days.</p></a>
      </div>
    </section>
  </main>

  <footer id="site-footer"></footer>

  <script src="js/components.js"></script>
  <script src="js/games.js"></script>
  <script>
    // Show the first 8 games on the home page
    renderGames("featured-grid", GAMES.slice(0, 8));
  </script>
</body>
</html>
```

> **Warning on the numbers:** the statistics above are made-up placeholders. Putting unverified figures in front of investors is a serious problem. Always use real, verifiable data and add dates and sources.

---

## Step 6: Build the Games portal

The games page is your live product demo. It mirrors the arcade-portal pattern: category chips on top, a tile grid below, plus a search box.

### 6a. Game data

Create `js/games.js`:

```javascript
const GAMES = [
  { name: "Turbo Drift", category: "Racing", emoji: "🏎️", rating: 4.5 },
  { name: "Block Blaster", category: "Puzzle", emoji: "🧩", rating: 4.3 },
  { name: "Space Dash", category: "Action", emoji: "🚀", rating: 4.4 },
  { name: "Penalty Hero", category: "Sports", emoji: "⚽", rating: 4.2 },
  { name: "Mini Chess", category: "Puzzle", emoji: "♟️", rating: 4.6 },
  { name: "Slime Rush", category: "Action", emoji: "🟢", rating: 4.1 },
  { name: "Hoop Stars", category: "Sports", emoji: "🏀", rating: 4.3 },
  { name: "Monster Kart", category: "Racing", emoji: "🛻", rating: 4.4 },
  { name: "Gem Merge", category: "Puzzle", emoji: "💎", rating: 4.2 },
  { name: "Ninja Jump", category: "Action", emoji: "🥷", rating: 4.0 },
  { name: "Tank Duel", category: "Multiplayer", emoji: "🪖", rating: 4.3 },
  { name: "Pixel Arena", category: "Multiplayer", emoji: "🎮", rating: 4.5 }
];

function renderGames(containerId, list) {
  const box = document.getElementById(containerId);
  if (!box) return;
  if (list.length === 0) {
    box.innerHTML = '<p class="lead">No games match your search.</p>';
    return;
  }
  box.innerHTML = list.map(function (g) {
    return '<a class="tile" href="#" title="Demo tile">' +
      '<div class="emoji">' + g.emoji + "</div>" +
      "<h3>" + g.name + "</h3>" +
      "<small>" + g.category + " · " + g.rating + " ★</small></a>";
  }).join("");
}
```

### 6b. The games page

Create `games.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Games | PixelPlay</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header id="site-header"></header>

  <main>
    <h1>All games</h1>
    <p class="lead">Browse the library. Filter by category or search by name.</p>

    <input id="search" type="search" placeholder="Search games..." aria-label="Search games">
    <div class="chips" id="chips" style="margin-top:16px"></div>
    <div class="grid" id="game-grid"></div>
  </main>

  <footer id="site-footer"></footer>

  <script src="js/components.js"></script>
  <script src="js/games.js"></script>
  <script>
    const categories = ["All"].concat(
      Array.from(new Set(GAMES.map(function (g) { return g.category; })))
    );
    let activeCategory = "All";
    const searchBox = document.getElementById("search");

    function update() {
      const term = searchBox.value.trim().toLowerCase();
      const result = GAMES.filter(function (g) {
        const matchCat = activeCategory === "All" || g.category === activeCategory;
        const matchName = g.name.toLowerCase().includes(term);
        return matchCat && matchName;
      });
      renderGames("game-grid", result);
    }

    function renderChips() {
      const chips = document.getElementById("chips");
      chips.innerHTML = categories.map(function (c) {
        return '<button class="chip' + (c === activeCategory ? " active" : "") +
          '" data-cat="' + c + '">' + c + "</button>";
      }).join("");
      chips.querySelectorAll(".chip").forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeCategory = btn.dataset.cat;
          renderChips();
          update();
        });
      });
    }

    searchBox.addEventListener("input", update);
    renderChips();
    update();
  </script>
</body>
</html>
```

**Next step for real games:** each tile can link to a page that embeds a playable HTML5 game in an `iframe`. Only embed games you built or have written permission to distribute.

---

## Step 7: Build the Investors portal

Investors want answers fast: *What is it? How big is it? Where is it going? Who do I talk to?* Structure the page in that order.

Create `investors.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Investors | PixelPlay</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header id="site-header"></header>

  <main>
    <h1>Investor relations</h1>
    <p class="lead">Everything you need to evaluate PixelPlay in one place.</p>

    <section>
      <h2>Key metrics</h2>
      <div class="stats">
        <div class="stat"><strong>12M</strong><span>Monthly active players</span></div>
        <div class="stat"><strong>1,500+</strong><span>Games</span></div>
        <div class="stat"><strong>+85%</strong><span>Year-over-year growth</span></div>
        <div class="stat"><strong>6 min</strong><span>Average session</span></div>
      </div>
      <p class="lead">Sample figures only. Add the reporting period and data source beneath each real metric.</p>
    </section>

    <section>
      <h2>Why invest</h2>
      <div class="cards">
        <div class="card"><h3>Large, growing market</h3><p>Casual browser gaming reaches every device with no install barrier.</p></div>
        <div class="card"><h3>Multiple revenue streams</h3><p>Advertising, in-game purchases and developer partnerships.</p></div>
        <div class="card"><h3>Efficient growth</h3><p>Instant play drives organic discovery and low acquisition cost.</p></div>
      </div>
    </section>

    <section>
      <h2>Documents</h2>
      <div class="cards">
        <a class="card" href="docs/pitch-deck.pdf">📄 Pitch deck (PDF)</a>
        <a class="card" href="docs/financial-summary.pdf">📊 Financial summary (PDF)</a>
      </div>
    </section>

    <section>
      <h2>Talk to investor relations</h2>
      <p class="lead">Interested in learning more? Send us a message and the founding team will respond.</p>
      <a class="btn" href="contact.html?topic=investor">Contact Investor Relations</a>
    </section>
  </main>

  <footer id="site-footer"></footer>
  <script src="js/components.js"></script>
</body>
</html>
```

Notes:

- Create a `docs/` folder and put your real PDFs there, or remove the Documents section until they exist. A broken download link looks bad to an investor.
- The button links to `contact.html?topic=investor`. In Step 9 the form reads that value and pre-selects "Investor enquiry". This is a good example of **navigating between portals with context**.
- Check with a lawyer before publishing forward-looking statements or financial claims. Regulations on investor communications vary by country.

---

## Step 8: Build About and Careers

### About page

Create `about.html` with the same header, footer and script tags as before, and this inside `main`:

```html
<main>
  <h1>About PixelPlay</h1>
  <p class="lead">We believe great games should be one click away.</p>

  <section>
    <h2>Our story</h2>
    <p>Write two or three short paragraphs: why you started, what problem you solve and what you have achieved so far.</p>
  </section>

  <section>
    <h2>Leadership</h2>
    <div class="cards">
      <div class="card"><h3>👤 Name Surname</h3><p>Chief Executive Officer. One line of relevant experience.</p></div>
      <div class="card"><h3>👤 Name Surname</h3><p>Chief Technology Officer. One line of relevant experience.</p></div>
      <div class="card"><h3>👤 Name Surname</h3><p>Head of Games. One line of relevant experience.</p></div>
    </div>
  </section>

  <section>
    <a class="btn" href="careers.html">See open roles</a>
    <a class="btn secondary" href="contact.html">Contact Us</a>
  </section>
</main>
```

Investors read the leadership section closely. Use real names, roles and credible one-line backgrounds.

### Careers page with department filter

Create `js/careers.js`:

```javascript
const JOBS = [
  { title: "Senior Game Developer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Frontend Engineer", dept: "Engineering", location: "Kuala Lumpur", type: "Full-time" },
  { title: "Game Designer", dept: "Design", location: "Kuala Lumpur", type: "Full-time" },
  { title: "UI Artist", dept: "Design", location: "Remote", type: "Contract" },
  { title: "Growth Marketer", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Investor Relations Associate", dept: "Finance", location: "Kuala Lumpur", type: "Full-time" }
];

function renderJobs(dept) {
  const list = JOBS.filter(function (j) { return dept === "All" || j.dept === dept; });
  document.getElementById("job-list").innerHTML = list.map(function (j) {
    return '<div class="card"><h3>' + j.title + "</h3>" +
      "<p>" + j.dept + " · " + j.location + " · " + j.type + "</p>" +
      '<p><a class="btn" href="contact.html?topic=career&role=' +
      encodeURIComponent(j.title) + '">Apply</a></p></div>';
  }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const depts = ["All"].concat(Array.from(new Set(JOBS.map(function (j) { return j.dept; }))));
  const chips = document.getElementById("dept-chips");
  chips.innerHTML = depts.map(function (d, i) {
    return '<button class="chip' + (i === 0 ? " active" : "") + '" data-dept="' + d + '">' + d + "</button>";
  }).join("");
  chips.addEventListener("click", function (e) {
    if (!e.target.dataset.dept) return;
    chips.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    e.target.classList.add("active");
    renderJobs(e.target.dataset.dept);
  });
  renderJobs("All");
});
```

Create `careers.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Careers | PixelPlay</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header id="site-header"></header>
  <main>
    <h1>Careers</h1>
    <p class="lead">Help us build the world's most fun instant arcade.</p>
    <div class="chips" id="dept-chips"></div>
    <div class="cards" id="job-list"></div>
  </main>
  <footer id="site-footer"></footer>
  <script src="js/components.js"></script>
  <script src="js/careers.js"></script>
</body>
</html>
```

Each **Apply** button sends the visitor to the Contact page with `topic=career` and the role name in the address. Again, navigation carries context.

---

## Step 9: Build the Contact Us page

Create `contact.html`. It validates input in the browser and pre-fills the topic from the address.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact Us | PixelPlay</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header id="site-header"></header>

  <main>
    <h1>Contact Us</h1>
    <p class="lead">Investors, candidates and players are all welcome.</p>

    <form id="contact-form" novalidate>
      <label>Your name
        <input id="name" type="text" autocomplete="name">
        <span class="error" id="err-name"></span>
      </label>

      <label>Email
        <input id="email" type="email" autocomplete="email">
        <span class="error" id="err-email"></span>
      </label>

      <label>Topic
        <select id="topic">
          <option value="general">General question</option>
          <option value="investor">Investor enquiry</option>
          <option value="career">Career application</option>
          <option value="support">Player support</option>
        </select>
      </label>

      <label>Message
        <textarea id="message" rows="6"></textarea>
        <span class="error" id="err-message"></span>
      </label>

      <button class="btn" type="submit">Send message</button>
    </form>

    <div id="result"></div>
  </main>

  <footer id="site-footer"></footer>
  <script src="js/components.js"></script>
  <script>
    const params = new URLSearchParams(location.search);
    const topicParam = params.get("topic");
    const roleParam = params.get("role");

    if (topicParam) document.getElementById("topic").value = topicParam;
    if (roleParam) {
      document.getElementById("message").value = "I would like to apply for: " + roleParam + ".\n\n";
    }

    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      let ok = true;

      document.getElementById("err-name").textContent = "";
      document.getElementById("err-email").textContent = "";
      document.getElementById("err-message").textContent = "";

      if (name.length < 2) {
        document.getElementById("err-name").textContent = "Please enter your name.";
        ok = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("err-email").textContent = "Please enter a valid email address.";
        ok = false;
      }
      if (message.length < 10) {
        document.getElementById("err-message").textContent = "Message should be at least 10 characters.";
        ok = false;
      }
      if (!ok) return;

      // TODO: send the data to a real service (see below). For now, show a confirmation.
      document.getElementById("result").innerHTML =
        '<div class="success">Thank you, ' + name.replace(/</g, "&lt;") +
        '. Your message has been received.</div>';
      this.reset();
    });
  </script>
</body>
</html>
```

**Making the form actually send email.** A static site has no server, so connect the form to a form service such as Formspree or Netlify Forms, or to your own backend. Replace the `TODO` with a `fetch` call to the endpoint they give you. Until you do this, **messages are not delivered anywhere**, so do not launch with the placeholder.

---

## Step 10: Add a 404 page

Create `404.html` so that a wrong address never strands a visitor:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found | PixelPlay</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header id="site-header"></header>
  <main style="text-align:center">
    <h1>👾 Game over</h1>
    <p class="lead" style="margin-left:auto;margin-right:auto">That page does not exist. Let's get you back in the game.</p>
    <a class="btn" href="/index.html">Back to Main Menu</a>
  </main>
  <footer id="site-footer"></footer>
  <script src="/js/components.js"></script>
</body>
</html>
```

The 404 page uses `/` at the start of its paths because it can be shown from any folder depth. Hosts such as GitHub Pages and Netlify serve `404.html` automatically.

---

## Step 11: Run and test locally

Opening files by double-click works for this project, but a local server is closer to real hosting. From the project folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

### Navigation test checklist

Go through this list on **desktop and a phone-sized window**:

- [ ] Main Menu, Games, Investors, About, Careers and Contact Us all open from the header
- [ ] The current page is highlighted in the menu
- [ ] The logo returns to the home page
- [ ] The hamburger button opens and closes the menu on a narrow screen
- [ ] Home page buttons (Play Now, For Investors) go to the right pages
- [ ] Every footer link either works or is intentionally a placeholder
- [ ] Games search and category chips filter correctly
- [ ] Clicking Apply on Careers opens Contact with the topic and role filled in
- [ ] Contact Investor Relations opens Contact with "Investor enquiry" selected
- [ ] Form shows errors for empty fields and success for valid input
- [ ] A made-up address shows the 404 page
- [ ] Browser back button behaves normally everywhere
- [ ] You can reach any page using only the keyboard (Tab and Enter)

---

## Step 12: Deploy

Because the site is static, hosting is free and quick. Pick one:

1. **GitHub Pages:** push the folder to a repository, then enable Pages in the repository settings.
2. **Netlify:** drag the project folder onto the Netlify dashboard. Netlify Forms can also receive your contact form submissions.
3. **Cloudflare Pages or Vercel:** connect a repository and deploy with no build command.

After deploying, repeat the navigation checklist on the **live URL**, especially the 404 page and the form.

If you use GitHub Pages under a project address such as `username.github.io/repo-name/`, absolute paths starting with `/` will break. In that case use relative paths everywhere, including in `404.html`.

---

## Step 13: Polish before showing investors

| Area | What to do |
|---|---|
| **Real data** | Replace every sample number, name and document. Add dates and sources. |
| **Legal pages** | Add Privacy Statement and Terms of Use. Add a cookie notice if you use analytics or ads. |
| **Branding** | Use your own logo and original game art. Never reuse another company's assets. |
| **Performance** | Compress images, keep pages light, test on a slow phone connection. |
| **SEO** | Unique title and description per page, and an `og:image` for link previews. |
| **Accessibility** | Good colour contrast, alt text for images, visible focus outlines. |
| **Analytics** | Add privacy-friendly analytics so you can show real traffic later. |
| **Security** | Serve over HTTPS, and never put secrets or private investor documents in a public folder. |

> Confidential material such as detailed financials should **not** sit on a public page. Put it behind a login or share it by request through Investor Relations.

---

## Where to go next

- Add a **login-protected investor area** using a service like Auth0, Firebase Authentication or Supabase.
- Move `GAMES` and `JOBS` into a JSON file or a headless CMS so non-developers can edit them.
- Add real playable games on a `game.html?id=...` page using an `iframe` or canvas.
- Add a **Press** or **News** portal and a **Developers** portal to attract game creators.
- Move to a framework such as Astro, Next.js or Eleventy once the site grows beyond a few pages. Your site map and components carry over directly.

You now have a fast, consistent, arcade-themed website where every portal is one click away and visitors can always find their way back.
