# Kho Kho (खो खो): India's Ground Game — 3D Website & PowerPoint Deck

An authentic, single-page, scroll-driven 3D web application and executive 14-slide PowerPoint presentation deck celebrating Kho Kho—India's high-speed traditional tag sport.

Built with **React + Vite + @react-three/fiber + @react-three/drei + GSAP + Tailwind CSS + Zustand** and **PptxGenJS + LibreOffice Headless**.

---

## 🌟 Deliverables Overview

1. **The 3D Web Experience (`/web`)**:
   - **Procedural 3D Field (No External 3D Models)**: Official 27m × 16m clay court, 24m between posts, 8 cross lanes, two wooden teak posts, and 8 seated chasers facing alternate directions.
   - **Interactive Tactical Rules Demo**: Step-by-step "Next Move" pursuit animation, "Kho!" vocal handover, and direction foul red-flash alert.
   - **Two-Track History Timeline**: Distinct separation between *Legend & Ancient Folklore* (Rathachera chariot drills) and *Documented History* (Deccan Gymkhana 1914, KKFI 1955, Vijayawada 1959, 2025 World Cup).
   - **Interactive India Map**: Clickable state boundaries with championship records, association facts, and training hubs.
   - **Kho Chaser Arena (Mini-Game)**: 60-second tag puzzle enforcing the strict direction rule with keyboard & mobile touch controls, Web Audio synthesizers, and celebratory marigold confetti.
   - **Stats & World Cup 2025 Charts**: Interactive bar charts of the double gold victory in New Delhi (Men: India 54–36 Nepal, Women: India 78–40 Nepal).
   - **KLU & Collegiate Champions Roster**: Searchable & filterable directory highlighting student-athletes from **KL University (KLEF)** and colleges nationwide selected for National and State championships through 2026.
   - **In-Browser Presentation Mode**: Keyboard-driven 14-slide presentation mode with speaker notes toggle and light theme aesthetic.

2. **The PowerPoint Deck (`/ppt`)**:
   - **File**: `ppt/KhoKho_India.pptx` (14 slides, 16:9, native editable shapes & charts, speaker notes on every slide).
   - **PDF Conversion**: `ppt/KhoKho_India.pdf` generated via LibreOffice headless.
   - **Rendered Slide Inspections**: `ppt/slides_png/slide_01.png` through `slide_14.png`.

---

## 📁 Project Structure

```
/kho-kho-project
├── web/                           # Vite + React 3D Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero3D.jsx         # 3D procedural court, camera orbit, Torana border
│   │   │   ├── FieldModel.jsx     # 27m x 16m court, chalk lines, teak posts
│   │   │   ├── Chaser.jsx         # Low-poly procedural chaser (sitting/active)
│   │   │   ├── Defender.jsx       # Low-poly peacock-teal defender
│   │   │   ├── RulesDemo.jsx      # Interactive rules simulator & foul flash
│   │   │   ├── Timeline.jsx       # Two-track history timeline
│   │   │   ├── IndiaMap.jsx       # Interactive SVG map of Indian states
│   │   │   ├── MiniGame.jsx       # 60-second playable tag arena
│   │   │   ├── StatsSection.jsx   # Kinetic counters, World Cup 2025 chart, Arjuna awards
│   │   │   ├── CollegePlayers.jsx # KLU & national collegiate athlete directory
│   │   │   ├── LatestNews.jsx     # Verified news, Olympic roadmap, Madhubani peacock
│   │   │   ├── NavBar.jsx         # Sticky header with Kolam progress ring & audio toggle
│   │   │   ├── Loader.jsx         # Warli running figures loading screen
│   │   │   ├── Footer.jsx         # Sources, credits, and historiography note
│   │   │   └── PresentationModal.jsx # In-browser slide deck with speaker notes
│   │   ├── data/                  # Single source of truth (Verified JSON datasets)
│   │   │   ├── rules.json         # Dimensions, player counts, timings, fouls
│   │   │   ├── history.json       # Legend vs documented milestones
│   │   │   ├── states.json        # State associations, championships, hubs
│   │   │   ├── stats.json         # Biomechanics, World Cup 2025 scores, Arjuna list
│   │   │   ├── players.json       # Modern stars & signature moves
│   │   │   ├── glossary.json      # 12 official Kho Kho terms with Hindi names
│   │   │   ├── klu_students.json  # KLU & collegiate national/state roster till 2026
│   │   │   └── news.json          # 2025-2026 headlines & Olympic campaign
│   │   ├── hooks/                 # Zustand stores (useAppStore.js, useGameStore.js)
│   │   ├── styles/                # Tailwind & custom CSS variables (index.css)
│   │   └── utils/                 # Web Audio API sound synth, Warli SVG icons, confetti
│   ├── index.html                 # SEO tags, offline fonts, OpenGraph metadata
│   ├── vite.config.js             # VITE_BASE support, bundle splitting
│   ├── tailwind.config.js         # Indian cultural palette & fonts
│   └── package.json
├── ppt/                           # PowerPoint Generation Pipeline
│   ├── build-deck.js              # PptxGenJS script generating 14-slide deck
│   ├── KhoKho_India.pptx          # Final validated presentation deck
│   ├── KhoKho_India.pdf           # Headless LibreOffice converted PDF
│   ├── slides_png/                # Rendered slide images (slide_01.png - slide_14.png)
│   └── package.json
├── docs/                          # Project Documentation
│   ├── SOURCES.md                 # Verified sources table with URLs and dates
│   ├── ASSUMPTIONS.md             # Technical choices and assumptions
│   └── DESIGN.md                  # Palette tokens, typography, and cultural motifs
├── screenshots/                   # Real 1920x1080 automated Playwright captures
│   ├── hero.png, rules.png, timeline.png, map.png, game.png, stats.png, colleges.png
├── scripts/                       # Automation scripts
│   ├── capture-screenshots.js    # Playwright automated screenshot runner
│   ├── audit-site.js              # Multi-viewport responsive audit
│   └── verify-deck.py             # Python-pptx & PyMuPDF audit tool
├── vercel.json                    # Vercel deployment configuration
├── .github/workflows/deploy.yml   # GitHub Pages deployment action
├── README.md                      # Complete run & deployment guide
└── PROGRESS.md                    # Phase-by-phase execution checklist
```

---

## 🚀 Quickstart & Run Instructions

### 1. Run the 3D Website Locally
```bash
# Navigate to web directory
cd web

# Install dependencies (React, Three.js, R3F, GSAP, Tailwind, Fonts)
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or the port displayed in your terminal.

Or from the workspace root:
```bash
npm run dev
```

### 2. Build for Production
```bash
cd web
npm run build
npm run preview
```
Output bundle is generated cleanly in `web/dist/`.

### 3. Rebuild the PowerPoint Presentation Deck
To regenerate `KhoKho_India.pptx`, update screenshots, or change the deployed site URL:
```bash
# Run the deck builder
node ppt/build-deck.js
```
The file will be created at `ppt/KhoKho_India.pptx`.

To convert to PDF using LibreOffice headless:
```powershell
& "C:\Program Files\LibreOffice\program\soffice.com" --headless --convert-to pdf "ppt\KhoKho_India.pptx" --outdir "ppt"
```

To re-audit the deck and export slide images:
```bash
python scripts/verify-deck.py
```

---

## 🎨 Cultural Design System

- **Marigold Orange (`#F28C28`)**: Primary active hue and sprint energy.
- **Kumkum Vermilion (`#C8341C`)**: Accent, foul alert flashes, high-stakes "Kho!" calls.
- **Turmeric Yellow (`#F5B700`)**: Highlights, brass post finials, achievement stars.
- **Deep Indigo (`#1B2A5A`)**: Headings, nocturnal court floodlights, player shorts.
- **Peacock Teal (`#0E7C7B`)**: Defender jerseys, secondary tactical accents.
- **Terracotta Clay (`#B5532A`)**: The physical earthen ground.
- **Handmade Paper (`#FFF6E5`)**: Parchment background canvas.
- **Charcoal (`#2B2B2B`)**: High-contrast, accessible body typography.

### Traditional Motifs Rendered in Code:
- **Torana**: Traditional marigold garland arch framing the hero section and slide headers.
- **Warli Athletes**: Geometric stick-figure runners (triangles and circles) animating the loader and milestones.
- **Kolam Ring**: Circular progress indicator reflecting scroll depth.
- **Jaali Lattice**: Subtle 4% opacity architectural background filigree.
- **Madhubani Peacock**: Finishing motif in the footer and closing presentation slide.

---

## ⚙️ Configuration & Customization

### Changing the Deployed Site URL (`SITE_URL`)
The QR codes on Slide 1 and Slide 14 of the PowerPoint deck point to the live deployment. To update this link, edit line 11 in `ppt/build-deck.js`:
```javascript
// ppt/build-deck.js
const SITE_URL = 'https://your-domain.vercel.app/';
```
Then run `node ppt/build-deck.js`.

### Editing Content
All content lives in `/web/src/data/*.json` so you can edit facts, player names, and tournament dates without touching code:
- **Rules & Dimensions**: `web/src/data/rules.json`
- **History Milestones**: `web/src/data/history.json`
- **Indian States**: `web/src/data/states.json`
- **Stats & World Cup**: `web/src/data/stats.json`
- **Players & Awards**: `web/src/data/players.json`
- **KLU & College Roster**: `web/src/data/klu_students.json`
- **Headlines & News**: `web/src/data/news.json`
- **Glossary**: `web/src/data/glossary.json`

---

## 🌐 Deployment Instructions

### Deploying to Vercel
1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Vercel automatically detects `vercel.json` (root directory, build command `cd web && npm install && npm run build`, and output `web/dist`).
4. Click **Deploy**.

### Deploying to GitHub Pages
1. Go to repository **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main`. The `.github/workflows/deploy.yml` action will build and deploy the site automatically with relative base paths (`VITE_BASE`).

---

## 🏆 Quality Gates & Audit Verification

- **Production Build**: `npm run build` compiled 2,123 modules in 4.84s with 0 errors.
- **Responsive Viewport Test**: Playwright audit confirmed 100% pass across **375px (Mobile)**, **768px (Tablet)**, **1280px (Laptop)**, and **1920px (Desktop)** with zero unhandled exceptions.
- **Mini-Game**: Fully playable via keyboard (WASD/Arrows + Space) and mobile on-screen D-Pad.
- **Deck Verification**: `python-pptx` verified all 14 slides open cleanly with zero repair prompts.
- **Fact Reconciliation**: All pitch dimensions (27m × 16m), World Cup 2025 scores (Men 54–36, Women 78–40), and KLU athlete records reconcile identically across website JSON and presentation slides.
