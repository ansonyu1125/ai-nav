---
name: AINav
description: A signal intelligence desk for choosing AI tools with confidence.
colors:
  signal-ink: "#07110f"
  evidence-ink: "#0b1b17"
  evidence-paper: "#f2f4ef"
  field-paper: "#f4f4ef"
  verification-lime: "#d9f99d"
  route-cyan: "#7dd3fc"
  signal-line: "#315148"
  muted-signal: "#9fb3ac"
  warm-evidence: "#f5ead5"
typography:
  display:
    fontFamily: "Signal Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 5.25rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "normal"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  signal-label:
    fontFamily: "ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  status: "3px"
  content: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.verification-lime}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.status}"
    padding: "12px 24px"
  search-field:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.evidence-ink}"
    rounded: "{rounded.status}"
    padding: "6px"
  status-label:
    backgroundColor: "{colors.evidence-paper}"
    textColor: "{colors.evidence-ink}"
    typography: "{typography.signal-label}"
    rounded: "{rounded.status}"
    padding: "4px 6px"
---

# Design System: AINav

## Overview

**Creative North Star: "Signal Intelligence Desk"**

AINav feels like a calm editorial instrument used to inspect a fast-moving market. Dark ink-green fields hold live signals and primary decisions; warm paper surfaces hold evidence, comparisons, and reading. Lime identifies verification and action, while cyan traces routes and links.

The system is technical without pretending that every visitor is technical. Plain-language guidance and generous hierarchy keep it useful for beginners, while fixed data positions, compact labels, and tabular numerals reward fast scanning.

**Key Characteristics:**
- Instrument-like dark fields paired with warm evidence surfaces.
- Sparse lime and cyan accents with explicit functional roles.
- Square, bordered controls and compact status labels.
- Dense data that remains readable and calm.

## Colors

The palette combines an ink-green control room with warm off-white evidence surfaces.

### Primary
- **Signal Ink:** The navigation, hero, footer, and live intelligence fields.
- **Verification Lime:** Primary actions, selected states, verified status, and positive movement.

### Secondary
- **Route Cyan:** Links, focus rings, signal routes, and navigational emphasis.

### Neutral
- **Evidence Paper:** Main reading background and large content bands.
- **Field Paper:** Inputs and high-contrast light controls.
- **Evidence Ink:** Primary text on light surfaces.
- **Signal Line:** Dividers and structural lines on dark surfaces.
- **Muted Signal:** Secondary text on dark surfaces.

**The Functional Accent Rule.** Lime means verification or action; cyan means route, focus, or link. Neither is decoration.

## Typography

**Display Font:** Self-hosted Signal Display (Geist-derived) with system sans-serif fallback
**Body Font:** System sans-serif
**Label/Mono Font:** System monospace

**Character:** Direct, legible sans-serif typography carries editorial guidance. Monospace is reserved for measurements, timestamps, ranks, and status codes.

### Hierarchy
- **Display** (600, responsive up to 5.25rem, 0.98): First-view headlines only.
- **Headline** (600, 2.25-3rem, 1.1): Major section transitions.
- **Title** (600, 1-1.25rem, 1.3): Tool names and list headings.
- **Body** (400, 1rem, 1.6): Explanations and descriptive content, generally constrained to 65-75 characters.
- **Label** (600, 0.625-0.75rem, uppercase): Data labels and status codes.

**The Data Voice Rule.** Monospace appears only where the content behaves like data.

## Layout

Pages use a centered maximum-width shell with full-width dark or light bands. The homepage first viewport pairs task search with a fixed-position signal console; subsequent sections use ruled lists and restrained tool cards. Spacing grows from tight 4-8px data groups to 32px component gaps and roughly 96px section transitions.

At mobile widths, paired columns stack, the navigation collapses, and data rows preserve fixed label and value positions. Fixed-format controls use explicit heights, grid tracks, or minimum widths so changing language and content cannot shift the layout. Horizontal overflow is never permitted.

## Elevation & Depth

The system is flat by default. Tonal contrast and one-pixel structural rules create depth; soft offset shadows are limited to controls that must lift from a dark field, such as search and dropdown surfaces.

**The Evidence Plane Rule.** Content bands remain flat and unframed; elevation is reserved for interactive overlays and prominent controls.

## Shapes

The form language is precise and mostly rectangular. Status labels use 3px corners, content surfaces may use up to 8px, and major page bands remain square. One-pixel borders separate data without turning every section into a card.

## Components

### Buttons
- **Shape:** Compact rectangular control with 3px or smaller corners.
- **Primary:** Verification lime on signal ink, with strong text and stable height.
- **Hover / Focus:** A brighter lime hover and a two-pixel cyan focus ring with visible offset.
- **Secondary:** Transparent or ink-toned with structural borders and cyan link emphasis.

### Chips
- **Style:** Small bordered status codes with 3px corners, uppercase data typography, and semantic green, cyan, or muted amber fills.
- **State:** Color communicates pricing or origin category; chips never act as decorative tags.

### Cards / Containers
- **Corner Style:** Square to gently curved, never pill-shaped.
- **Background:** Evidence paper for comparison content; signal ink for live data.
- **Shadow Strategy:** Flat at rest.
- **Border:** One-pixel structural rules.

### Inputs / Fields
- **Style:** Warm field paper, square composition, embedded search icon, and stable action zone.
- **Focus:** Cyan ring or outline; the layout must not move.

### Navigation
- **Style:** Ink-green sticky bar, lime active state, muted default links, and rectangular hover targets. Mobile navigation expands as a full-width dark list.

### Signal Console

Ranks, categories, and movement values occupy fixed columns inside a ruled dark panel. Lime marks positive movement; cyan carries the route to the complete ranking.

### Product Type Identity

Web tools, mobile apps, browser plugins, desktop clients, and APIs share the official product logo but never share an undifferentiated detail page. A browser-window, phone, plugin, desktop-monitor, or API mark sits beside the logo and title. Lime identifies App destinations; cyan identifies plugin stores; amber identifies API documentation; coral identifies desktop downloads; Web retains the neutral evidence treatment. Version controls always link to separate internal detail pages before an external destination action.

## Do's and Don'ts

### Do:
- **Do** begin discovery flows with a real task and support decisions with structured evidence.
- **Do** reserve lime for verification/action and cyan for routes/focus.
- **Do** use rules, alignment, and tonal bands to organize dense information.
- **Do** keep keyboard focus, selection, scrollbars, and reduced motion consistent with the system.

### Don't:
- **Don't** use purple gradients, glowing decorative blobs, or generic AI imagery.
- **Don't** structure pages as repetitive same-size icon cards.
- **Don't** use rounded pills when a compact rectangular status label is clearer.
- **Don't** place cards inside cards or float entire sections as cards.
- **Don't** use monospace as a general technology costume.

