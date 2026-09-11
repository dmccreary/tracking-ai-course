---
title: AI Model Releases by Lab Over Time
description: Stacked area chart of quarterly AI model releases broken down by lab, showing the field getting more crowded since November 2022.
image: /sims/ai-releases-by-lab-over-time/ai-releases-by-lab-over-time.png
og:image: /sims/ai-releases-by-lab-over-time/ai-releases-by-lab-over-time.png
twitter:image: /sims/ai-releases-by-lab-over-time/ai-releases-by-lab-over-time.png
social:
   cards: false
quality_score: 0
---

# AI Model Releases by Lab Over Time

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the AI Model Releases by Lab Over Time MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This stacked area chart breaks quarterly AI model release counts down by lab
— OpenAI, Mistral, Google, Anthropic, Qwen, DeepSeek, SpaceXAI, Meta, Z.ai,
Moonshot AI, and NVIDIA — from Q4 2022 through Q2 2026. It replicates the
"Releases by Lab Over Time" chart from
[AI Release Tracker](https://aireleasetracker.com/analytics).

Two things stand out: the total height of the stack is rising (more releases
each quarter), and the number of differently-colored bands doing meaningful
work is growing too (more labs shipping every quarter). That second trend —
the field getting more crowded, not just busier — is the main strategic
signal this chart is built to surface. A dashed trend line shows the
3-quarter moving average of the total.

## How to Use

Hover over any quarter to see a full per-lab breakdown for that quarter, plus
the quarter's total in the tooltip footer. Click a legend entry to hide or
show that lab's band.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-releases-by-lab-over-time/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Updating the Data

Chart values live in a dataset shared by six MicroSims:
[`../ai-release-data/data.json`](../ai-release-data/data.json). This chart
reads the `quarters` array, where each entry has a `byLab` object keyed by
lab name. Add a new quarter by appending an entry with a `byLab` value (use
`0` for labs that shipped nothing) for every lab listed in `meta.labs`. See
[`../ai-release-data/README.md`](../ai-release-data/README.md) for the full
schema.

## Related MicroSims

These MicroSims share the same dataset:

- [AI Model Releases by Year](../ai-releases-by-year/index.md)
- [Combined Cumulative AI Model Releases](../ai-releases-cumulative/index.md)
- [AI Model Releases by Lab](../ai-releases-by-lab/index.md)
- [AI Release Frequency Per Month](../ai-release-frequency-monthly/index.md)
- [AI Model Releases by Day of Week](../ai-releases-by-day-of-week/index.md)

## Lesson Plan

### Grade Level
Adult professional / executive education (organizational AI-tracking course)

### Duration
10-15 minutes

### Prerequisites
Familiarity with the overall release counts from
[AI Model Releases by Year](../ai-releases-by-year/index.md) is helpful but
not required.

### Activities

1. **Exploration** (5 min): Have learners hover across several quarters and
   note which labs appear, disappear, or grow within the stack.
2. **Guided Discussion** (5 min): Ask learners to identify the quarter where
   a new lab first appears in meaningful volume, and discuss what that
   signals about barriers to entry in frontier AI.
3. **Assessment** (5 min): Ask learners to argue, using the chart, whether
   the AI frontier is consolidating around one or two labs or becoming more
   competitive over time.

### Assessment
Learners should be able to distinguish "the market is growing" from "the
market is getting more competitive" and point to specific chart evidence
for each.

## References

1. [AI Release Tracker — Analytics](https://aireleasetracker.com/analytics) — source of the underlying release-count data.
2. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) — charting library used to build this MicroSim.
