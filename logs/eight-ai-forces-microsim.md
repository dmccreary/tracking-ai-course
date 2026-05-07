# Session Log: Eight AI Forces MicroSim

**Date**: May 7, 2026
**Project**: Tracking AI Course
**Task**: Create an interactive infographic-overlay MicroSim ("eight-ai-forces") visualizing the four reinforcing and four balancing loops from the *Winner Takes All?* causal-loop analysis.

---

## Overview

Generated a complete dual-panel diagram-overlay MicroSim using the `interactive-infographic-overlay` skill. The MicroSim shows a central "AI Model Capability" robot medallion with four reinforcing forces (R1–R4, warm palette) on the left and four balancing forces (B1–B4, cool palette) on the right. Clicking any of the eight icons reveals an infobox with the force's full description and current May-2026 status.

**Source article**: `docs/articles/winner-takes-all.md`

---

## Files Created

### 1. `docs/sims/shared-libs/` (copied dependency)
The diagram-overlay skill requires a shared library that did not exist in this project. Copied the entire `shared-libs` directory from the biology textbook project at `/Users/dan/Documents/ws/biology/docs/sims/shared-libs/`:
- `diagram.js` — interactive overlay engine (markers, leader lines, label panel, explore/quiz/edit modes, `reportHeight()` iframe pinning)
- `style.css` — shared styles for all diagram-overlay MicroSims
- `README.md`, `plan.md` — library documentation

This is now a project-wide dependency for any future diagram-overlay sims.

### 2. `docs/sims/eight-ai-forces/image-prompt.md`
Detailed text-to-image prompt for generating the background infographic. Notable deviations from the standard skill template:

- **Text IS allowed in this image** — the user explicitly requested labels and icons baked into the artwork. The skill's default rule is "no text in image"; this prompt overrides that rule with an explanatory note at the top.
- **Allowed text**: title bar ("Eight AI Forces" + subtitle), "AI Model Capability" label above the medallion, and 8 two-line force labels (R/B code + name).
- **Image specs**: 1400 × 900 PNG, off-white background (#FBFAF7) with faint hex/circuit watermark, flat-vector infographic style.
- **Composition**: symmetric two-column layout (icons centered at x=14% and x=86%, rows at y=24/40/56/72%); central medallion at exact center with friendly robot illustration; thin dashed leader lines between each icon and the medallion.
- **Color rules**: warm palette for reinforcing (orange #F97316, red-orange #EF4444, deep red #DC2626, amber #F59E0B); cool palette for balancing (steel blue #3B82F6, teal #14B8A6, emerald #10B981, deep cyan #0891B2).

### 3. `docs/sims/eight-ai-forces/data.json`
Overlay configuration with eight callouts using `layout: "dual-panel"`:

- 4 callouts with `panel: "left"` for R1–R4
- 4 callouts with `panel: "right"` for B1–B4
- Initial marker positions placed over the icon centers (estimates — to be calibrated with `?edit=true` once the image lands)
- Each callout includes `label`, `hint` (visual cue for quiz mode), `description` (full text drawn from the article), and `ap_tip` (the May-2026 status row from the article's status table)

### 4. `docs/sims/eight-ai-forces/main.html`
Standard diagram-overlay HTML shell from the skill's template. Loads `eight-forces.png` as the background image, references `../shared-libs/style.css` and `../shared-libs/diagram.js`. Controls (Explore/Quiz toggle) placed at the bottom of the canvas per the project-wide MicroSim accessibility convention (smartboard reach + visual hierarchy).

### 5. `docs/sims/eight-ai-forces/index.md`
Documentation page with:
- Embedded iframe (`height="720px"`, blue 2px border per project standard)
- Fullscreen button
- Brief description of reinforcing vs balancing dynamics
- Numbered list of all eight forces with one-line summaries
- Cross-link back to the `winner-takes-all.md` article

---

## mkdocs.yml Updates

Two changes:

1. **Nav** — added `Eight AI Forces: sims/eight-ai-forces/index.md` to the MicroSims block, between `Winner-Takes-All CLD` and `MicroSim Templates`.
2. **exclude_docs** — created a new `exclude_docs:` block (none existed previously) with `sims/eight-ai-forces/image-prompt.md` so MkDocs does not render the prompt as a published page.

---

## The Eight Forces (content mapping)

Drawn from the article's loop-by-loop walkthrough and status table.

| ID | Code | Name | Type | 2026 Status |
|----|------|------|------|-------------|
| 1 | R1 | Recursive Self-Improvement | Reinforcing | Strong |
| 2 | R2 | Autonomous Research | Reinforcing | Emerging (the supercritical loop) |
| 3 | R3 | Capital → Compute | Reinforcing | Strong, asymmetric |
| 4 | R4 | Data Flywheel | Reinforcing | Strong, accelerating |
| 5 | B1 | Compute Constraint | Balancing | Very strong |
| 6 | B2 | Evaluation Bottleneck | Balancing | Very strong |
| 7 | B3 | Diffusion / Fast-Follow | Balancing | Weakening |
| 8 | B4 | Cost-Performance Friction | Balancing | Strong |

---

## Workflow Notes

- The skill's default "no text in image" rule was deliberately overridden because the user wanted icons + labels baked into the background. The clickable overlay then sits on top of those baked icons as small numbered markers.
- Initial marker coordinates (x=14% / 86%, y=24/40/56/72%) match the positions described in the image prompt, so as long as the generated image follows the prompt, calibration drift should be minimal.
- The `dual-panel` layout was the natural fit: it places labels in left and right gutters, mirroring the article's "four loops trying to run away vs four loops keeping them in check" framing.

---

## Next Steps for the User

1. Copy the contents of `image-prompt.md` into a text-to-image tool (DALL-E, Midjourney, Imagen, etc.).
2. Save the generated PNG as `eight-forces.png` in the same directory (filename referenced by both `data.json` and `main.html`).
3. View the MicroSim at `http://127.0.0.1:8000/tracking-ai-course/sims/eight-ai-forces/main.html`.
4. If marker positions are off, append `?edit=true` to the URL, drag each marker onto its icon, click **Copy JSON**, and paste back into `data.json`.
5. Optionally link the new MicroSim from inside `winner-takes-all.md` as a "summary view" alongside the existing per-loop CLDs.
