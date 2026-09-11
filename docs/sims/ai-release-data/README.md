# AI Release Data (shared)

This folder holds one shared dataset, `data.json`, consumed by six MicroSims
in `docs/sims/`. It is not itself a MicroSim (no `main.html`), so it does not
appear in navigation or the MicroSims gallery.

Editing `data.json` updates every dependent sim the next time its page is
loaded — no need to edit each sim's JavaScript.

## Source

[AI Release Tracker — Analytics](https://aireleasetracker.com/analytics),
retrieved 2026-09-11. Figures cover 249 major model releases across 11
frontier labs (OpenAI, Anthropic, Google, Meta, SpaceXAI, DeepSeek, Mistral,
Moonshot AI, Z.ai, Qwen, NVIDIA) since ChatGPT launched on November 30, 2022.

Per-quarter and per-month figures were read directly from that site's chart
tooltips (it has no public data export/API) and cross-validated: monthly
values sum to the published quarterly totals, quarterly values sum to the
published yearly totals, and everything sums to the published grand total of
249 releases.

## Schema

```json
{
  "meta": { "title": "...", "totalReleases": 249, "labs": ["OpenAI", "..."] },
  "source": { "name": "...", "url": "...", "retrieved": "YYYY-MM-DD" },
  "years":     [ { "label": "2022", "value": 1, "partial": false } ],
  "months":    [ { "label": "Nov 22", "monthName": "November", "year": 2022,
                   "value": 1, "cumulative": 1, "partial": false } ],
  "quarters":  [ { "label": "Q4 22", "total": 1, "byLab": { "OpenAI": 1, "...": 0 } } ],
  "labTotals": [ { "lab": "OpenAI", "value": 44 } ],
  "dayOfWeek": [ { "day": "Monday", "value": 48, "weekend": false } ]
}
```

- `years[].partial` / `months[].partial` mark the current in-progress period;
  pair with `asOf` (years only) for a tooltip note.
- `months[].cumulative` is precomputed (running sum) so consumers don't need
  to recompute it.
- `quarters[].byLab` keys always include every lab in `meta.labs`, using `0`
  for labs that shipped nothing that quarter.

## Dependent MicroSims

- [`ai-releases-by-year`](../ai-releases-by-year/index.md) — uses `years`
- [`ai-releases-cumulative`](../ai-releases-cumulative/index.md) — uses `months` (`cumulative`)
- [`ai-release-frequency-monthly`](../ai-release-frequency-monthly/index.md) — uses `months` (`value`)
- [`ai-releases-by-lab-over-time`](../ai-releases-by-lab-over-time/index.md) — uses `quarters`
- [`ai-releases-by-lab`](../ai-releases-by-lab/index.md) — uses `labTotals`
- [`ai-releases-by-day-of-week`](../ai-releases-by-day-of-week/index.md) — uses `dayOfWeek`

## Updating

To refresh with newer figures from the source site, append new `months`
entries (recomputing `cumulative`), extend `quarters` and `years` as
periods close out, and update `labTotals` and `dayOfWeek`. Re-run the
per-sim validation in `microsim-utils` after editing.
