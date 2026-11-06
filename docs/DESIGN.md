# Design System & Aesthetic Language: Kho Kho (खो खो)

## 1. Design Thesis & Cultural Grounding
Kho Kho is an explosive test of agility, tactical deception, and stamina born from the red-clay grounds of rural and university arenas in India. The design embraces this authentic Indian sporting identity: dusty terracotta earth, freshly drawn white chalk boundary lines, celebratory marigolds, and indigo evening floodlights—avoiding generic corporate templates and clichéd AI tropes.

## 2. Color Palette & Tokens

```css
:root {
  /* Primary Sports Earth & Bloom */
  --color-marigold: #F28C28;       /* Primary active hue / sprint energy */
  --color-kumkum: #C8341C;         /* Accent, foul alerts, high-stakes "Kho!" calls */
  --color-turmeric: #F5B700;       /* Highlights, star badges, achievement gold */
  
  /* Foundation & Atmosphere */
  --color-indigo: #1B2A5A;         /* Primary text, nocturnal court lighting, deep header */
  --color-peacock: #0E7C7B;        /* Secondary tactical accent, defender aura */
  --color-terracotta: #B5532A;     /* The earthen ground, physical clay pitch */
  --color-paper: #FFF6E5;          /* Handmade parchment canvas background */
  --color-charcoal: #2B2B2B;       /* High-contrast accessible body text */
  --color-chalk: #FFFFFF;          /* Court line chalk markings (semi-matte) */
}
```

## 3. Typography Hierarchy
- **Display / Headers:** `Yatra One` & Devanagari typography ("खो खो"), capturing traditional Indian sign-painting strength with clean contemporary geometry.
- **Body Text:** `Poppins`, clear, rounded, energetic, optimized for high legibility across mobile displays.
- **Numbers & Tactical Measurements:** `Poppins SemiBold` / `Mono` for speeds, timers, coordinates, and turn clocks.

## 4. Visual Motifs & Textures (Rendered as Crisp SVGs)
1. **Chalk-Line Court Aesthetic:** Double-stroke boundary lines, dashed cross-lanes, and directional chevrons mimicking traditional lime-powder chalk.
2. **Torana / Marigold Garland Border:** Decorative traditional arch framing the top of the hero section and slide titles.
3. **Warli Stick Athletes:** Iconic tribal athletic silhouettes composed of opposing geometric triangles and circles, used as progress icons and loaders.
4. **Rangoli / Kolam Progress Indicator:** Circular geometric mandala indicating scroll depth and active section.
5. **Jaali Lattice Pattern:** Low-opacity (4%) background filigree evoking Indian pavilion architecture.
6. **Madhubani Peacock Accent:** Graceful finishing motif in the footer and conclusion slide.

## 5. 3D Procedural Primitives
- **Chasers:** Low-poly stylized athletic mannequins in seated posture (alternate facing angles $90^\circ$ and $-90^\circ$), torso capsules, sphere heads, jersey badges.
- **Active Chaser:** Standing athletic pose in marigold jersey with dynamic running stance and golden aura.
- **Defenders:** Agility silhouettes in peacock-teal jerseys positioned within the free zone and dodging diagonally.
- **Pitch Elements:** 27m x 16m clay terrain slab, central lane strip, 8 cross-lane chalk markers, two solid teak wooden posts with turned cap finials.
