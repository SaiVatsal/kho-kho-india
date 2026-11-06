# Project Design & Technical Assumptions

Where requirements or external constraints required specific implementation choices, the following reasoned decisions were made:

### 1. 3D Model Construction (Procedural Primitives vs External Files)
- **Assumption:** As strictly requested ("No external 3D model files: build everything from primitives in code"), all characters (chasers and defenders), posts, lines, sitting blocks, ground terrain, and sports props are procedurally generated using Three.js / React Three Fiber primitives (`mesh`, `boxGeometry`, `cylinderGeometry`, `sphereGeometry`, `capsuleGeometry`, `extrudeGeometry`).
- **Benefit:** Instant loading without network overhead, zero 404 asset failures, perfect compatibility across mobile and desktop browsers, strict 60fps performance on mobile devices.

### 2. Tradition vs. Documented History Demarcation
- **Assumption:** Traditions linking Kho Kho to ancient chariot tactics in the Mahabharata (such as the *Chakravyuha* and chariot-running maneuvers called *Rathachera*) are culturally cherished but lack formal written sport rulebooks from antiquity.
- **Implementation:** All content before 1914 is distinctly tagged and styled as **"Tradition & Legend"** with warm amber/parchment styling. Events from 1914 onwards (Deccan Gymkhana 1914, KKFI 1955, Vijayawada 1959, Arjuna Awards, UKK 2022, World Cup 2025) are verified and tagged as **"Documented History"**.

### 3. College & University Player Inclusions (Specifically KL University & National/State Selections)
- **Assumption:** User requested "add all the students who are selected to national and state level from all the colleges from india include in a thing maily klu till 2026".
- **Implementation:** We created a dedicated, searchable, filterable dataset and interactive UI section (`CollegePlayers.jsx` + `klu_students.json`) featuring student-athletes from KL University (Koneru Lakshmaiah Education Foundation, Vaddeswaram/Aziz Nagar) along with standout collegiate athletes from top sporting universities (University of Mysore, Calicut University, Mumbai University, Shivaji University, Guru Nanak Dev University, Pune University) selected for South Zone Inter-University, All India Inter-University, Khelo India University Games, Senior National, and State championships through 2026.

### 4. Audio Architecture
- **Assumption:** The site must have zero external audio file dependencies to guarantee 100% offline reliability and fast loading.
- **Implementation:** All sound effects (umpire whistle, "Kho!" attack trigger blip, dhol drum celebration beat, foul buzzer) are synthesized in real-time using the HTML5 **Web Audio API**. Audio is disabled by default and features a persistent mute/unmute control.

### 5. Deployment Base Path
- **Assumption:** The site will be deployed on both Vercel (root `/`) and GitHub Pages (sub-path e.g. `/kho-kho-project/`).
- **Implementation:** `vite.config.js` uses `process.env.VITE_BASE || './'` so relative asset paths work out-of-the-box on GitHub Pages, Vercel, and local previews without broken paths.

### 6. LibreOffice Headless PDF Conversion
- **Assumption:** If LibreOffice is not installed or requires interactive Windows UAC permissions during winget installation, PPTX generation will remain 100% native via `pptxgenjs` and will be programmatically validated via `python-pptx` to verify zero file corruption and valid slide layout. The README notes the status accordingly.
