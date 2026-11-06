import pptxgen from 'pptxgenjs';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Deployed Site URL configuration placeholder
const SITE_URL = 'https://khokho-india.org/';

// Palette Constants matching Website Design Tokens
const COLORS = {
  marigold: 'F28C28',
  kumkum: 'C8341C',
  turmeric: 'F5B700',
  indigo: '1B2A5A',
  peacock: '0E7C7B',
  terracotta: 'B5532A',
  paper: 'FFF6E5',
  paperPure: 'FFFCF5',
  charcoal: '2B2B2B',
  white: 'FFFFFF',
  lightGray: 'E8DFD0'
};

const FONTS = {
  header: 'Trebuchet MS',
  body: 'Calibri'
};

async function generateDeck() {
  console.log('Generating KhoKho_India.pptx presentation deck...');

  // 1. Generate QR Code image for slides
  const qrPath = path.join(__dirname, 'assets', 'qr_site.png');
  await QRCode.toFile(qrPath, SITE_URL, {
    color: { dark: '#1B2A5A', light: '#FFF6E5' },
    width: 320,
    margin: 1
  });
  console.log('Generated QR code at:', qrPath);

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9'; // 10" x 5.625"
  pptx.title = "Kho Kho (खो खो): India's Ground Game";
  pptx.subject = "Indigenous Indian Tag Sport Masterclass";
  pptx.author = "Polimera Sai Vatsal (2500040224) - KL University";

  // Helper: Consistent Slide Header with Torana Garland
  function addHeader(slide, title, category = "KHO KHO MASTERCLASS") {
    // Torana Bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 10, h: 0.12,
      fill: { color: COLORS.marigold }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0.12, w: 10, h: 0.04,
      fill: { color: COLORS.kumkum }
    });

    // Category / Eyebrow
    slide.addText(category.toUpperCase(), {
      x: 0.8, y: 0.28, w: 8.4, h: 0.25,
      fontSize: 10, bold: true, color: COLORS.kumkum, fontFace: FONTS.body
    });

    // Title
    slide.addText(title, {
      x: 0.8, y: 0.52, w: 8.4, h: 0.55,
      fontSize: 22, bold: true, color: COLORS.indigo, fontFace: FONTS.header
    });
  }

  // Helper: Consistent Slide Footer with Kolam line
  function addFooter(slide, slideNum) {
    // Kolam accent line
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8, y: 5.15, w: 8.4, h: 0,
      line: { color: COLORS.marigold, width: 1.5, dashType: 'dash' }
    });

    slide.addText("Kho Kho: India's Ground Game  |  Official KKFI & IKKF Data", {
      x: 0.8, y: 5.22, w: 7.0, h: 0.3,
      fontSize: 9, color: '7A7062', fontFace: FONTS.body
    });

    slide.addText(`Slide ${slideNum}`, {
      x: 8.2, y: 5.22, w: 1.0, h: 0.3,
      fontSize: 9, bold: true, color: COLORS.indigo, align: 'right', fontFace: FONTS.body
    });
  }

  // Helper: Browser Frame for Screenshots
  function addBrowserFrame(slide, imgPath, x, y, w, h) {
    // Outer window frame
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x, y: y, w: w, h: h,
      fill: { color: COLORS.paperPure },
      line: { color: COLORS.indigo, width: 1.5 },
      rectRadius: 0.08
    });

    // Top window bar
    slide.addShape(pptx.ShapeType.rect, {
      x: x, y: y, w: w, h: 0.28,
      fill: { color: COLORS.indigo }
    });

    // Window dots
    slide.addShape(pptx.ShapeType.ellipse, { x: x + 0.12, y: y + 0.08, w: 0.12, h: 0.12, fill: { color: COLORS.kumkum } });
    slide.addShape(pptx.ShapeType.ellipse, { x: x + 0.28, y: y + 0.08, w: 0.12, h: 0.12, fill: { color: COLORS.turmeric } });
    slide.addShape(pptx.ShapeType.ellipse, { x: x + 0.44, y: y + 0.08, w: 0.12, h: 0.12, fill: { color: COLORS.peacock } });

    // URL text
    slide.addText("https://khokho-india.org", {
      x: x + 0.65, y: y + 0.06, w: w - 0.8, h: 0.18,
      fontSize: 8, color: COLORS.paper, fontFace: FONTS.body
    });

    // Embedded Screenshot image
    if (fs.existsSync(imgPath)) {
      slide.addImage({
        path: imgPath,
        x: x + 0.02, y: y + 0.29, w: w - 0.04, h: h - 0.31
      });
    }
  }

  // ==========================================
  // SLIDE 1: TITLE SLIDE
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };

    // Decorative Top Arch
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.2, fill: { color: COLORS.marigold } });
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0.2, w: 10, h: 0.06, fill: { color: COLORS.kumkum } });

    s.addText("KHO KHO  |  खो खो", {
      x: 0.8, y: 1.1, w: 8.4, h: 0.4,
      fontSize: 16, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
    });

    s.addText("India's Ground Game", {
      x: 0.8, y: 1.5, w: 8.4, h: 0.9,
      fontSize: 42, bold: true, color: COLORS.indigo, fontFace: FONTS.header
    });

    s.addText("From Red-Clay Roots to the 2025 World Cup & Global Olympic Ambition", {
      x: 0.8, y: 2.45, w: 6.0, h: 0.5,
      fontSize: 15, color: COLORS.terracotta, bold: true, fontFace: FONTS.body
    });

    // 3 Feature Cards
    const features = [
      { t: "27m × 16m Ground", d: "8 seated chasers facing alternate sides with 2 teak poles." },
      { t: "Strict Direction Rule", d: "Never turn back mid-lane without taking a post or giving Kho." },
      { t: "2025 World Champions", d: "India Men & Women swept inaugural double gold in New Delhi." }
    ];
    features.forEach((f, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + i * 2.05, y: 3.2, w: 1.9, h: 1.4,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.marigold, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(f.t, {
        x: 0.9 + i * 2.05, y: 3.3, w: 1.7, h: 0.35,
        fontSize: 11, bold: true, color: COLORS.indigo, fontFace: FONTS.header
      });
      s.addText(f.d, {
        x: 0.9 + i * 2.05, y: 3.7, w: 1.7, h: 0.8,
        fontSize: 9, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    // QR Code on Right
    s.addImage({ path: qrPath, x: 7.2, y: 2.3, w: 1.9, h: 1.9 });
    s.addText("Scan for 3D Experience", {
      x: 7.2, y: 4.25, w: 1.9, h: 0.3,
      fontSize: 8, bold: true, color: COLORS.indigo, align: 'center', fontFace: FONTS.body
    });

    // Presenter placeholder
    s.addText("Presented by: Polimera Sai Vatsal (ID: 2500040224), KL Deemed to be University  |  " + SITE_URL, {
      x: 0.8, y: 5.15, w: 8.4, h: 0.3,
      fontSize: 9, color: '7A7062', fontFace: FONTS.body
    });

    s.addNotes("Welcome to this presentation on Kho Kho, one of India's most exhilarating indigenous sports. Unlike casual tag, Kho Kho is high-speed tactical chess played at thirty kilometers an hour across a twenty-seven by sixteen-meter pitch. Today we will examine its court geometry, strict direction rules, documented history from the 1914 Deccan Gymkhana to the 2025 World Cup in New Delhi, and collegiate talent pipelines including KL University.");
  }

  // ==========================================
  // SLIDE 2: WHY THIS SPORT (THE THESIS)
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Why Kho Kho Matters: Anaerobic Speed & Strategic Feints", "The Sporting Thesis");

    // Left Column: Key Pillars
    s.addText("A 30 km/h Mind Game on Earthen Clay", {
      x: 0.8, y: 1.25, w: 4.2, h: 0.4,
      fontSize: 16, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
    });

    const bullets = [
      "Peak Velocity: Chasers accelerate to 32 km/h across short 2.3m sprint bursts.",
      "Instant Reflexes: Defenders dodge direction cuts with sub-0.20s reaction times.",
      "Zero Gear Barrier: Pure physical willpower; requires only earth, lime chalk, and two posts.",
      "Massive Scale: 164 Million viewers watched Ultimate Kho Kho Season 1."
    ];
    bullets.forEach((b, i) => {
      s.addShape(pptx.ShapeType.ellipse, { x: 0.85, y: 1.8 + i * 0.72, w: 0.12, h: 0.12, fill: { color: COLORS.marigold } });
      s.addText(b, {
        x: 1.05, y: 1.72 + i * 0.72, w: 3.8, h: 0.65,
        fontSize: 11, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    // Right Column: Hero Screenshot in Browser Frame
    const heroImg = path.join(rootDir, 'screenshots', 'hero.png');
    addBrowserFrame(s, heroImg, 5.2, 1.25, 4.0, 3.6);

    addFooter(s, 2);
    s.addNotes("Kho Kho strips away expensive athletic equipment and elevates pure human athleticism. A chaser must sprint at top speed while making split-second tactical calculations. The screenshot on the right showcases our real-time 3D simulation of the official court, showing the eight seated chasers in alternate directions and the two teak posts that anchor the legal turning zones.");
  }

  // ==========================================
  // SLIDE 3: THE GROUND & PLAYERS (DIMENSIONS)
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "The Ground & The Players: Official Court Dimensions", "Pitch Specifications");

    // Native Pitch Diagram
    const px = 0.8, py = 1.3, pw = 4.8, ph = 3.5;
    // Outer lobby
    s.addShape(pptx.ShapeType.rect, {
      x: px, y: py, w: pw, h: ph,
      fill: { color: COLORS.terracotta },
      line: { color: COLORS.white, width: 1.5, dashType: 'dash' }
    });
    // Playing court 27m x 16m
    s.addShape(pptx.ShapeType.rect, {
      x: px + 0.2, y: py + 0.2, w: pw - 0.4, h: ph - 0.4,
      fill: { color: 'A84A22' },
      line: { color: COLORS.white, width: 2 }
    });
    // Central Lane 24m x 0.30m
    s.addShape(pptx.ShapeType.rect, {
      x: px + 0.6, y: py + ph / 2 - 0.15, w: pw - 1.2, h: 0.3,
      fill: { color: COLORS.marigold },
      line: { color: COLORS.white, width: 1 }
    });
    // 8 Cross Lanes
    for (let i = 0; i < 8; i++) {
      const lx = px + 0.85 + i * 0.42;
      s.addShape(pptx.ShapeType.line, {
        x: lx, y: py + 0.2, w: 0, h: ph - 0.4,
        line: { color: COLORS.white, width: 1 }
      });
      // Sitting square
      s.addShape(pptx.ShapeType.rect, {
        x: lx - 0.08, y: py + ph / 2 - 0.08, w: 0.16, h: 0.16,
        fill: { color: COLORS.indigo }
      });
    }
    // Posts
    s.addShape(pptx.ShapeType.ellipse, { x: px + 0.54, y: py + ph / 2 - 0.1, w: 0.2, h: 0.2, fill: { color: COLORS.turmeric } });
    s.addShape(pptx.ShapeType.ellipse, { x: px + pw - 0.74, y: py + ph / 2 - 0.1, w: 0.2, h: 0.2, fill: { color: COLORS.turmeric } });

    // Dimension labels
    s.addText("27m Overall Length (Incl. 1.5m Free Zones)", { x: px, y: py - 0.25, w: pw, h: 0.25, fontSize: 9, bold: true, color: COLORS.indigo, align: 'center' });
    s.addText("16m Width", { x: px - 0.6, y: py + 1.6, w: 1.0, h: 0.25, fontSize: 9, bold: true, color: COLORS.indigo, rotate: 270 });

    // Right Column: Verified Measurements Table
    const specs = [
      { label: "Playing Area", val: "27m × 16m" },
      { label: "Lobby Margin", val: "1.5m perimeter" },
      { label: "Central Lane", val: "24m × 30cm" },
      { label: "8 Cross Lanes", val: "16m × 35cm each" },
      { label: "Lane Interval", val: "2.30m spacing" },
      { label: "Wooden Posts", val: "120–125cm height" },
      { label: "Sitting Blocks", val: "35cm × 30cm" },
      { label: "Squad Roster", val: "12 (9 on court)" }
    ];
    specs.forEach((item, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 6.0 + (i % 2) * 1.6, y: 1.35 + Math.floor(i / 2) * 0.85, w: 1.5, h: 0.72,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.marigold, width: 1 },
        rectRadius: 0.05
      });
      s.addText(item.label, { x: 6.05 + (i % 2) * 1.6, y: 1.4 + Math.floor(i / 2) * 0.85, w: 1.4, h: 0.25, fontSize: 8, color: '7A7062' });
      s.addText(item.val, { x: 6.05 + (i % 2) * 1.6, y: 1.65 + Math.floor(i / 2) * 0.85, w: 1.4, h: 0.35, fontSize: 11, bold: true, color: COLORS.indigo });
    });

    addFooter(s, 3);
    s.addNotes("Here we see the official court dimensions codified by the Kho Kho Federation of India. The field measures twenty-seven meters by sixteen meters. The central lane is twenty-four meters long and thirty centimeters wide, anchored by two teak poles. Notice the eight cross-lanes spaced at two-point-three-meter intervals where the seated chasers sit facing alternate directions.");
  }

  // ==========================================
  // SLIDE 4: RULES IN 60 SECONDS
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Rules in 60 Seconds: Chase, Vocal Call, Direction & Tag", "The Core Mechanics");

    // 4 Step Visual Blocks
    const steps = [
      { num: "01", t: "Pursue & Feint", d: "Active chaser runs along central lane without crossing it." },
      { num: "02", t: "Give 'Kho!'", d: "Tap seated teammate on back and shout 'Kho!' simultaneously." },
      { num: "03", t: "Explosive Swap", d: "Tapped chaser stands and sprints in seated direction." },
      { num: "04", t: "Legal Dismissal", d: "Clean touch tags defender out. No reversing mid-lane!" }
    ];
    steps.forEach((st, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + i * 2.15, y: 1.25, w: 2.0, h: 1.4,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.indigo, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(st.num, { x: 0.9 + i * 2.15, y: 1.3, w: 1.8, h: 0.3, fontSize: 14, bold: true, color: COLORS.kumkum, fontFace: FONTS.header });
      s.addText(st.t, { x: 0.9 + i * 2.15, y: 1.6, w: 1.8, h: 0.3, fontSize: 11, bold: true, color: COLORS.indigo, fontFace: FONTS.header });
      s.addText(st.d, { x: 0.9 + i * 2.15, y: 1.95, w: 1.8, h: 0.65, fontSize: 9, color: COLORS.charcoal, fontFace: FONTS.body });
    });

    // Screenshot of interactive rules demo below
    const rulesImg = path.join(rootDir, 'screenshots', 'rules.png');
    addBrowserFrame(s, rulesImg, 0.8, 2.85, 8.4, 2.15);

    addFooter(s, 4);
    s.addNotes("Kho Kho's tactical gameplay revolves around four core steps. First, the active chaser pursues defenders along the central corridor. Second, they tap a seated teammate on the back while shouting 'Kho!'. Third, that teammate immediately charges forward in their seated direction. Fourth, if the chaser touches a defender cleanly, that defender is dismissed. Any attempt to reverse backward mid-lane triggers an immediate red foul.");
  }

  // ==========================================
  // SLIDE 5: HOW POINTS WORK (SCORING)
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "How Points Work: Traditional Tagging vs. Acrobatic Dives", "Scoring Systems");

    // 2 Column Comparison: Traditional vs Ultimate Kho Kho
    // Left: Traditional
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.3, w: 4.0, h: 3.65,
      fill: { color: COLORS.paperPure },
      line: { color: COLORS.terracotta, width: 1.5 },
      rectRadius: 0.1
    });
    s.addText("Traditional KKFI Official Scoring", {
      x: 1.0, y: 1.45, w: 3.6, h: 0.4,
      fontSize: 14, bold: true, color: COLORS.terracotta, fontFace: FONTS.header
    });
    const tradPoints = [
      "1 Point per defender touched cleanly by hand.",
      "1 Point if a defender steps out-of-bounds.",
      "Match Duration: 2 Innings of 2 turns each.",
      "Turn Duration: 9 minutes for Seniors, 7 mins for Juniors.",
      "Winner: Team with highest cumulative dismissals."
    ];
    tradPoints.forEach((p, i) => {
      s.addText("•  " + p, { x: 1.0, y: 1.95 + i * 0.55, w: 3.6, h: 0.5, fontSize: 10, color: COLORS.charcoal });
    });

    // Right: Ultimate Kho Kho Acrobatic Scoring
    s.addShape(pptx.ShapeType.roundRect, {
      x: 5.2, y: 1.3, w: 4.0, h: 3.65,
      fill: { color: COLORS.paperPure },
      line: { color: COLORS.kumkum, width: 1.5 },
      rectRadius: 0.1
    });
    s.addText("Ultimate Kho Kho (UKK) League Scoring", {
      x: 5.4, y: 1.45, w: 3.6, h: 0.4,
      fontSize: 14, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
    });
    const ukkPoints = [
      "2 Points: Standard running touch.",
      "3 Points: Sky Dive (full aerial acrobatic dive).",
      "3 Points: Pole Dive (body flung outward holding post).",
      "Dream Run Bonus: 1 Pt for surviving over 2m 30s.",
      "Wazir Rule: Designated attacker moves in both directions."
    ];
    ukkPoints.forEach((p, i) => {
      s.addText("★  " + p, { x: 5.4, y: 1.95 + i * 0.55, w: 3.6, h: 0.5, fontSize: 10, color: COLORS.indigo, bold: i < 3 });
    });

    addFooter(s, 5);
    s.addNotes("Scoring in Kho Kho has evolved dramatically. In traditional federation matches, each touch or boundary dismissal awards one point across two nine-minute turns. In the modern Ultimate Kho Kho league, points are tiered: a basic touch is worth two points, while an acrobatic Sky Dive or Pole Dive earns three points, rewarding high-risk aerial athleticism.");
  }

  // ==========================================
  // SLIDE 6: LEGEND VS DOCUMENTED HISTORY
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Legend vs. Documented History: Respecting the Record", "Historiographical Separation");

    // Track A: Oral Folklore
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.3, w: 4.0, h: 3.65,
      fill: { color: 'F7EDE0' },
      line: { color: COLORS.terracotta, width: 2 },
      rectRadius: 0.1
    });
    s.addText("TRACK A: ORAL TRADITION & FOLKLORE", {
      x: 1.0, y: 1.45, w: 3.6, h: 0.3,
      fontSize: 11, bold: true, color: COLORS.terracotta, fontFace: FONTS.body
    });
    s.addText("Ancient Chariot Tactics (Rathachera)", {
      x: 1.0, y: 1.8, w: 3.6, h: 0.4,
      fontSize: 14, bold: true, color: COLORS.indigo, fontFace: FONTS.header
    });
    s.addText("Folk narratives link evasive drills to the Mahabharata chariot maneuvers (breaking the Chakravyuha). Medieval Maharashtra Akhadas in Pune, Baroda, and Satara practiced agility tagging to condition soldiers. These stories reflect cultural heritage but lack written rulebooks from antiquity.", {
      x: 1.0, y: 2.25, w: 3.6, h: 2.4,
      fontSize: 10, color: COLORS.charcoal, fontFace: FONTS.body
    });

    // Track B: Documented History
    s.addShape(pptx.ShapeType.roundRect, {
      x: 5.2, y: 1.3, w: 4.0, h: 3.65,
      fill: { color: 'EFF3FA' },
      line: { color: COLORS.indigo, width: 2 },
      rectRadius: 0.1
    });
    s.addText("TRACK B: DOCUMENTED MODERN HISTORY", {
      x: 5.4, y: 1.45, w: 3.6, h: 0.3,
      fontSize: 11, bold: true, color: COLORS.indigo, fontFace: FONTS.body
    });
    s.addText("Codified Governance (1914–Present)", {
      x: 5.4, y: 1.8, w: 3.6, h: 0.4,
      fontSize: 14, bold: true, color: COLORS.indigo, fontFace: FONTS.header
    });
    s.addText("1914: Deccan Gymkhana (Pune) drafts the first formal written rules.\n\n1955: Kho Kho Federation of India (KKFI) established.\n\n1959–60: Inaugural National Championship in Vijayawada (AP).\n\n1970: First Arjuna Award to Sudhir Parab.\n\nJan 2025: 1st World Cup in New Delhi with 24 nations.", {
      x: 5.4, y: 2.25, w: 3.6, h: 2.4,
      fontSize: 10, color: COLORS.charcoal, fontFace: FONTS.body
    });

    addFooter(s, 6);
    s.addNotes("Rigorous sports scholarship demands separating ancient folklore from verifiable history. While traditions cherish links to Mahabharata chariot warfare and rural gymnasiums, the codified sport began in 1914 when Pune's Deccan Gymkhana club formed a committee to standardize court boundaries and refereeing protocols.");
  }

  // ==========================================
  // SLIDE 7: TIMELINE OF MILESTONES
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Chronology of the Red Clay: 1914 to 2025", "Historical Milestones");

    const timeline = [
      { year: "1914", t: "Deccan Gymkhana", d: "First formal codified rules standardized in Pune." },
      { year: "1955", t: "KKFI Founded", d: "Apex national federation established across Indian states." },
      { year: "1959", t: "1st Nationals", d: "Men's Championship hosted in Vijayawada, Andhra Pradesh." },
      { year: "1970", t: "Arjuna Award", d: "Sudhir Parab wins first-ever civilian national award." },
      { year: "2022", t: "Ultimate Kho Kho", d: "Televised franchise league launched with 164M viewers." },
      { year: "2025", t: "World Cup Gold", d: "India Men & Women win inaugural World Cup in New Delhi." }
    ];

    timeline.forEach((item, i) => {
      const tx = 0.8 + i * 1.45;
      // Milestone card
      s.addShape(pptx.ShapeType.roundRect, {
        x: tx, y: 1.5, w: 1.35, h: 3.2,
        fill: { color: COLORS.paperPure },
        line: { color: i === 5 ? COLORS.kumkum : COLORS.marigold, width: 1.5 },
        rectRadius: 0.08
      });
      // Year badge
      s.addShape(pptx.ShapeType.rect, {
        x: tx, y: 1.5, w: 1.35, h: 0.45,
        fill: { color: i === 5 ? COLORS.kumkum : COLORS.indigo }
      });
      s.addText(item.year, {
        x: tx, y: 1.55, w: 1.35, h: 0.35,
        fontSize: 12, bold: true, color: COLORS.white, align: 'center', fontFace: FONTS.header
      });
      s.addText(item.t, {
        x: tx + 0.08, y: 2.1, w: 1.2, h: 0.5,
        fontSize: 10, bold: true, color: COLORS.indigo, fontFace: FONTS.header
      });
      s.addText(item.d, {
        x: tx + 0.08, y: 2.65, w: 1.2, h: 1.8,
        fontSize: 9, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    addFooter(s, 7);
    s.addNotes("This timeline tracks over a century of sporting evolution. From Pune's Deccan Gymkhana in 1914 to the establishment of the KKFI in 1955, the first national tournament in Vijayawada in 1959, Sudhir Parab's Arjuna Award in 1970, and the modern renaissance with Ultimate Kho Kho and the 2025 World Cup.");
  }

  // ==========================================
  // SLIDE 8: GOVERNING BODIES
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Governing Bodies: Tiered Governance From District to World", "Sports Administration");

    const bodies = [
      {
        abbr: "KKFI",
        title: "Kho Kho Federation of India",
        role: "National Apex Body (Est. 1955)",
        points: ["Governs national championships and referee standards.", "Affiliated with 30+ state associations.", "Recognized by Ministry of Youth Affairs and Sports."]
      },
      {
        abbr: "AKKF",
        title: "Asian Kho Kho Federation",
        role: "Continental Body (Est. 1987)",
        points: ["Organizes Asian Championships.", "Championed inclusion in Asian Games roadmap.", "Member federations: India, Nepal, Sri Lanka, Bangladesh, Korea."]
      },
      {
        abbr: "IKKF",
        title: "International Kho Kho Federation",
        role: "Global Governing Federation",
        points: ["Organized the 2025 World Cup in New Delhi.", "Promotes global expansion across 40+ countries.", "Directs Olympic Charter alignment."]
      },
      {
        abbr: "AIU",
        title: "Association of Indian Universities",
        role: "Collegiate Sports Board",
        points: ["Conducts All India & South Zone Inter-University Meets.", "Talent pipeline for colleges like KL University (KLU).", "Feeder for Khelo India University Games."]
      }
    ];

    bodies.forEach((b, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + (i % 2) * 4.3, y: 1.35 + Math.floor(i / 2) * 1.85, w: 4.1, h: 1.7,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.indigo, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(b.abbr + " — " + b.title, {
        x: 1.0 + (i % 2) * 4.3, y: 1.45 + Math.floor(i / 2) * 1.85, w: 3.7, h: 0.35,
        fontSize: 12, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
      });
      s.addText(b.role, {
        x: 1.0 + (i % 2) * 4.3, y: 1.75 + Math.floor(i / 2) * 1.85, w: 3.7, h: 0.25,
        fontSize: 9, bold: true, color: COLORS.indigo, fontFace: FONTS.body
      });
      b.points.forEach((pt, j) => {
        s.addText("• " + pt, {
          x: 1.0 + (i % 2) * 4.3, y: 2.05 + Math.floor(i / 2) * 1.85 + j * 0.3, w: 3.7, h: 0.3,
          fontSize: 8.5, color: COLORS.charcoal, fontFace: FONTS.body
        });
      });
    });

    addFooter(s, 8);
    s.addNotes("Administrative governance operates in four tiers. At the national level, the KKFI sets rules and certifies referees. At the continental level, the Asian Kho Kho Federation drives Asian Games inclusion. Globally, the International Kho Kho Federation expands national federations worldwide. And crucially, the Association of Indian Universities manages the collegiate tournaments that nurture talent.");
  }

  // ==========================================
  // SLIDE 9: WHERE IT IS PLAYED IN INDIA
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Where Kho Kho Lives: Regional Heartlands & Powerhouses", "Geographic Strongholds");

    // Left Column: Map Screenshot in browser frame
    const mapImg = path.join(rootDir, 'screenshots', 'map.png');
    addBrowserFrame(s, mapImg, 0.8, 1.3, 4.3, 3.65);

    // Right Column: 3 Verified State Callouts
    const callouts = [
      {
        state: "Maharashtra (Founding Heartland)",
        fact: "32+ Senior National titles. Birthplace of modern rules at Deccan Gymkhana (1914). Produced Arjuna awardees Sudhir Parab and Sarika Kale."
      },
      {
        state: "Andhra Pradesh (KLU Hub & 1959 Host)",
        fact: "Hosted 1st Senior Nationals in Vijayawada (1959). Home to KL University (KLEF) sports academy producing South Zone & All India Inter-University medalists."
      },
      {
        state: "Karnataka & Odisha (Franchise Leaders)",
        fact: "Karnataka powers South Zone university titles. Odisha Juggernauts won the inaugural UKK title; Cuttack hosted UKK Season 2."
      }
    ];

    callouts.forEach((c, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 5.3, y: 1.3 + i * 1.25, w: 3.9, h: 1.15,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.marigold, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(c.state, {
        x: 5.45, y: 1.4 + i * 1.25, w: 3.6, h: 0.3,
        fontSize: 11, bold: true, color: COLORS.indigo, fontFace: FONTS.header
      });
      s.addText(c.fact, {
        x: 5.45, y: 1.7 + i * 1.25, w: 3.6, h: 0.65,
        fontSize: 9, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    addFooter(s, 9);
    s.addNotes("Geographically, Kho Kho is celebrated across India. Maharashtra remains the undisputed historic heartland with over thirty-two national titles. Andhra Pradesh holds special distinction as the host of the very first national championship in 1959 and is home to KL University's powerhouse collegiate academy. Meanwhile, Karnataka and Odisha have dominated recent franchise and university circuits.");
  }

  // ==========================================
  // SLIDE 10: ULTRA KHO KHO & MODERNISATION
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Ultimate Kho Kho: Transforming Earthen Play for Prime-Time", "League Modernisation");

    const pillars = [
      {
        t: "The 'Wazir' Super-Attacker",
        d: "Unlike traditional chasers locked into forward direction, the Wazir can sprint in BOTH directions freely, keeping defenders on high alert."
      },
      {
        t: "3-Point Acrobatic Dives",
        d: "Sky Dives and Pole Dives award 3 points instead of 1, rewarding aerial acrobatic lunges on high-density foam mats."
      },
      {
        t: "164 Million Viewers",
        d: "Season 1 broadcast on Sony Sports reached 164M viewers, proving traditional Indian games command massive commercial television audiences."
      },
      {
        t: "Franchise Champions",
        d: "Season 1 (2022): Odisha Juggernauts edged Telugu Yoddhas 46–45. Season 2 (2024): Gujarat Giants defeated Chennai Quick Guns 31–26."
      }
    ];

    pillars.forEach((p, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + (i % 2) * 4.3, y: 1.35 + Math.floor(i / 2) * 1.85, w: 4.1, h: 1.7,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.kumkum, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(p.t, {
        x: 1.0 + (i % 2) * 4.3, y: 1.45 + Math.floor(i / 2) * 1.85, w: 3.7, h: 0.35,
        fontSize: 12, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
      });
      s.addText(p.d, {
        x: 1.0 + (i % 2) * 4.3, y: 1.85 + Math.floor(i / 2) * 1.85, w: 3.7, h: 1.1,
        fontSize: 10, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    addFooter(s, 10);
    s.addNotes("Ultimate Kho Kho has modernized the sport for the twenty-first century. By introducing the 'Wazir' who can move in both directions, awarding three points for acrobatic sky-dives, and laying professional synthetic mats, the league attracted 164 million viewers in its first season. Odisha Juggernauts won Season 1 in a 46-45 thriller, while Gujarat Giants claimed Season 2.");
  }

  // ==========================================
  // SLIDE 11: 2025 WORLD CUP (NATIVE PPTX CHART)
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "2025 Kho Kho World Cup, New Delhi: Double Gold Triumph", "Global Tournament Data");

    // Left Column: Native PPTX Bar Chart
    const chartData = [
      {
        name: "India (Champions)",
        labels: ["Men's Final", "Women's Final"],
        values: [54, 78]
      },
      {
        name: "Nepal (Runners-up)",
        labels: ["Men's Final", "Women's Final"],
        values: [36, 40]
      }
    ];

    s.addChart(pptx.ChartType.bar, chartData, {
      x: 0.8, y: 1.3, w: 4.8, h: 3.65,
      chartColors: [COLORS.marigold, COLORS.indigo],
      barDir: 'col',
      showLegend: true,
      legendPos: 't',
      showTitle: true,
      title: "World Cup Finals Scores (New Delhi, Jan 2025)",
      titleColor: COLORS.indigo,
      titleFontSize: 11
    });

    // Right Column: Story & Facts
    s.addShape(pptx.ShapeType.roundRect, {
      x: 5.8, y: 1.3, w: 3.4, h: 3.65,
      fill: { color: COLORS.paperPure },
      line: { color: COLORS.peacock, width: 1.5 },
      rectRadius: 0.08
    });
    s.addText("Undefeated Campaign in New Delhi", {
      x: 6.0, y: 1.45, w: 3.0, h: 0.4,
      fontSize: 13, bold: true, color: COLORS.indigo, fontFace: FONTS.header
    });
    const wcFacts = [
      "Dates: January 13–19, 2025 at Indira Gandhi Indoor Stadium.",
      "24 Nations participated across 5 continents.",
      "Men's Final: India 54 – 36 Nepal (+18 pts victory margin).",
      "Women's Final: India 78 – 40 Nepal (+38 pts victory margin).",
      "Captains: Pratik Waikar (Men) & Nasreen Shaikh (Women) led both squads undefeated."
    ];
    wcFacts.forEach((f, i) => {
      s.addText("• " + f, {
        x: 6.0, y: 1.95 + i * 0.55, w: 3.0, h: 0.5,
        fontSize: 9.5, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    addFooter(s, 11);
    s.addNotes("The native chart on the left illustrates the final results of the historic inaugural Kho Kho World Cup, held at the Indira Gandhi Indoor Stadium in New Delhi in January 2025. Twenty-four nations competed. In the Men's final, India defeated Nepal 54 to 36. In the Women's final, India triumphed 78 to 40. Both Indian teams completed the tournament completely undefeated.");
  }

  // ==========================================
  // SLIDE 12: THE MINI-GAME
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Interactive Mini-Game: Test Your Tactical Agility", "Gamified Learning");

    // Left Column: Gameplay mechanics
    s.addText("Kho Chaser Arena: 60-Second Challenge", {
      x: 0.8, y: 1.3, w: 4.2, h: 0.4,
      fontSize: 15, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
    });
    const gameBullets = [
      "Role: You control the active chaser on the 27m × 16m pitch.",
      "Objective: Tag 3 dodging defenders before the 60-second turn expires.",
      "Real Constraint: Reversing backward mid-lane causes an immediate foul!",
      "Controls: Arrow keys / WASD + Spacebar to shout 'KHO!'",
      "Mobile Friendly: On-screen touch joystick + Kho button."
    ];
    gameBullets.forEach((g, i) => {
      s.addShape(pptx.ShapeType.ellipse, { x: 0.85, y: 1.85 + i * 0.55, w: 0.1, h: 0.1, fill: { color: COLORS.marigold } });
      s.addText(g, { x: 1.05, y: 1.8 + i * 0.55, w: 3.8, h: 0.5, fontSize: 10, color: COLORS.charcoal });
    });

    // Right Column: Mini-Game Screenshot
    const gameImg = path.join(rootDir, 'screenshots', 'game.png');
    addBrowserFrame(s, gameImg, 5.2, 1.3, 4.0, 3.65);

    addFooter(s, 12);
    s.addNotes("To help students understand the unique constraints of the sport, we built an interactive top-down mini-game directly in code. Players control the chaser and must tag three defenders within sixty seconds. Crucially, the code enforces the authentic direction rule: trying to reverse backward mid-lane triggers a buzzer and red foul flash.");
  }

  // ==========================================
  // SLIDE 13: CHALLENGES & ROAD TO THE OLYMPICS
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };
    addHeader(s, "Challenges & The Road to the Olympics", "Strategic Roadmap");

    const challenges = [
      {
        t: "Infrastructure Transition",
        d: "Transitioning rural talims and district school grounds from uneven dust to standardized synthetic foam mats."
      },
      {
        t: "2026 Aichi-Nagoya Asian Games",
        d: "IKKF and OCA evaluating Kho Kho for full medal inclusion following demonstration status."
      },
      {
        t: "Global Federation Spread",
        d: "Expanding active national federations across 50+ countries to satisfy International Olympic Committee charter criteria."
      },
      {
        t: "Collegiate Athlete Sponsorship",
        d: "Providing university scholarships and corporate sponsorships to ensure athletes like those at KLU sustain professional careers."
      }
    ];

    challenges.forEach((c, i) => {
      s.addShape(pptx.ShapeType.roundRect, {
        x: 0.8 + (i % 2) * 4.3, y: 1.35 + Math.floor(i / 2) * 1.85, w: 4.1, h: 1.7,
        fill: { color: COLORS.paperPure },
        line: { color: COLORS.peacock, width: 1.2 },
        rectRadius: 0.08
      });
      s.addText(c.t, {
        x: 1.0 + (i % 2) * 4.3, y: 1.45 + Math.floor(i / 2) * 1.85, w: 3.7, h: 0.35,
        fontSize: 12, bold: true, color: COLORS.peacock, fontFace: FONTS.header
      });
      s.addText(c.d, {
        x: 1.0 + (i % 2) * 4.3, y: 1.85 + Math.floor(i / 2) * 1.85, w: 3.7, h: 1.1,
        fontSize: 10, color: COLORS.charcoal, fontFace: FONTS.body
      });
    });

    addFooter(s, 13);
    s.addNotes("Looking forward, Kho Kho has clear strategic hurdles on its Olympic roadmap. First, expanding indoor synthetic mats to rural schools. Second, securing full medal status at the 2026 Asian Games in Aichi-Nagoya. Third, meeting the IOC requirement of active competitive federations across fifty nations. And fourth, supporting collegiate athletes with sports science and scholarships.");
  }

  // ==========================================
  // SLIDE 14: CLOSING & THANK YOU
  // ==========================================
  {
    const s = pptx.addSlide();
    s.background = { color: COLORS.paper };

    // Decorative Top Arch
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.15, fill: { color: COLORS.marigold } });
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0.15, w: 10, h: 0.05, fill: { color: COLORS.kumkum } });

    s.addText("धन्यवाद  |  Thank You", {
      x: 0.8, y: 0.8, w: 8.4, h: 0.8,
      fontSize: 38, bold: true, color: COLORS.indigo, fontFace: FONTS.header
    });

    s.addText("Kho Kho: India's Indigenous Tag Sport on the Global Stage", {
      x: 0.8, y: 1.6, w: 8.4, h: 0.4,
      fontSize: 15, bold: true, color: COLORS.kumkum, fontFace: FONTS.header
    });

    s.addText("Project Architect: Polimera Sai Vatsal (ID: 2500040224) • KL Deemed to be University. Explore the 3D interactive court and test your skills in the Kho Chaser Arena.", {
      x: 0.8, y: 2.1, w: 5.5, h: 0.8,
      fontSize: 11, color: COLORS.charcoal, fontFace: FONTS.body
    });

    // QR Code
    s.addImage({ path: qrPath, x: 6.8, y: 1.8, w: 2.2, h: 2.2 });
    s.addText("Scan to Launch Web Experience\n" + SITE_URL, {
      x: 6.8, y: 4.1, w: 2.2, h: 0.5,
      fontSize: 8.5, bold: true, color: COLORS.indigo, align: 'center', fontFace: FONTS.body
    });

    // Sources Summary Box
    s.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 3.1, w: 5.6, h: 1.8,
      fill: { color: COLORS.paperPure },
      line: { color: COLORS.lightGray, width: 1 }
    });
    s.addText("VERIFIED PRIMARY CITATIONS & REPOSITORIES", {
      x: 0.95, y: 3.2, w: 5.3, h: 0.25,
      fontSize: 8.5, bold: true, color: COLORS.indigo
    });
    s.addText("1. Kho Kho Federation of India (KKFI): khokhoindia.in (Rules & Courts)\n2. Asian Kho Kho Federation (AKKF): asiankhokhofederation.com (1914 Deccan Gymkhana)\n3. Olympics.com: 2025 World Cup New Delhi Match Results & Scores\n4. Ministry of Youth Affairs & Sports (MYAS): yas.nic.in (Arjuna Awards Archive)\n5. KL University (KLEF): kluniversity.in (Directorate of Physical Education Archives)", {
      x: 0.95, y: 3.5, w: 5.3, h: 1.3,
      fontSize: 7.5, color: COLORS.charcoal
    });

    addFooter(s, 14);
    s.addNotes("Thank you for your attention. Kho Kho is not merely a traditional game; it is an enduring cultural heritage that embodies India's athletic spirit, tactical ingenuity, and community pride. We invite you to scan the QR code to experience the live 3D web application, play the mini-game, and explore our verified records.");
  }

  // Write presentation file
  const outPath = path.join(__dirname, 'KhoKho_India.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log('Successfully written PPTX presentation to:', outPath);
}

generateDeck().catch((err) => {
  console.error('Fatal error generating deck:', err);
  process.exit(1);
});
