# SIGIL.FORGE
**Austin Osman Spare Sigil Method — Digital Implementation v1.0**

*"Morphysm arises from the refusal of the human as measure. It seeks to twist and corrupt the prison, to explore its cracks, and to force the system toward dissolution."*  
— The Black Book of Morphysm

---

## I. OVERVIEW

SIGIL.FORGE is a web-based implementation of Austin Osman Spare's sigilization technique, combined with a tarot-based reflection system inspired by Morphystic philosophy. The tool reduces linguistic intent to its core symbolic form and generates a visual sigil for ritual use.

---

## II. THE PROCESS

### 1. Intent Reduction (`[ EXECUTE.REDUCTION ]`)
Enter your statement of intent. The system removes spaces and duplicate letters, following Spare's original method of distilling desire to its essential symbolic components.

### 2. Sigil Generation (`[ FORGE SIGIL ]`)
The reduced letters are mapped to randomized coordinates on a canvas, creating a unique geometric form. The visual output uses high-contrast red (`#c70c0c`) on black to create a stark, memorable image. 

**Traditional charging methods apply:**
- Download and print the sigil, then burn it to release the intent
- Delete the digital file immediately after viewing to enforce conscious forgetting
- Following Spare's doctrine, the sigil must be charged through focused attention and then banished from conscious memory to work at the subconscious level

### 3. Resonance Analysis (`[ ANALYZE.RESONANCE ]`)
The unique letters are converted to numerical values (A=1, B=2... Z=26), summed, and mapped via modulo 22 to one of the Major Arcana. Each card has been reinterpreted through a Morphystic lens, offering a diagnostic reading of psychological patterns rather than fortune-telling.

---

## III. TECHNICAL NOTES

### Visual Design
- **Atari 2600 / ZX Spectrum aesthetic**: Low-resolution (64×64) pixel canvas evokes early 1980s home computing limitations
- **Mirrored composition**: X-axis symmetry evokes Rorschach-style psychological projection
- **VHS effects**: Flicker and scanline filters at 0.66s cycles create visual instability
- **Glitch animations**: CSS transforms simulate cognitive disruption during the reveal

### Audio
Each Major Arcana card includes an associated ambient sound file (e.g., `tesla-coil-crackle.mp3`, `black-lodge-hum.mp3`) to enhance immersion in the reading.

---

## IV. THE MORPHYSTIC ARCANA

The traditional tarot has been recontextualized through Morphystic philosophy:

- **THE FOOL** → Forma Nihil (The unformed, pre-symbolic state)
- **WHEEL OF FORTUNE** → Endless Repetition (Cyclical entrapment)
- **THE TOWER** → Annihilation Of Structures (Breaking of constructed reality)
- **THE WORLD** → Ouroboros — The Network Trap (Total enclosure)

Full interpretations appear during the Resonance Analysis phase.

---

## V. SETUP

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/sigil-forge.git
cd sigil-forge
```

2. Install dependencies:
```bash
npm install
```

3. Place audio files in `/public/sounds/`:
   - `static-void-hum.mp3`
   - `tesla-coil-crackle.mp3`
   - `black-lodge-hum.mp3`
   - etc. (see `App.jsx` for full list)

4. Run the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## VI. A WARNING ON OVERUSE

**The sigil is not a toy.**

Repeated, mindless generation transforms a ritual tool into mere digital distraction—a pixelated Commodore 64 game reducing sacred practice to screen-staring compulsion. Spare's method demands singular focus: one intent, one sigil, one act of destruction (burn/delete), then deliberate forgetting.

Mass production of sigils without genuine intent or proper banishment creates psychic clutter, not liberation. The screen becomes a mirror-trap, the interface becomes the prison. Use sparingly. Use seriously. Or don't use at all.

---

## LICENSE

MIT License - See LICENSE file for details

---

*// AOS METHODOLOGY • CHAOS PROTOCOL • FORGET TO REMEMBER //*  
*// NORRLAND XXVI //*
