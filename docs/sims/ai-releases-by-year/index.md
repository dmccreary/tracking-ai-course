---
title: AI Model Releases by Year
description: Interactive bar chart of major AI model releases per year, showing the accelerating release pace from 2022 through partial-year 2026.
image: /sims/ai-releases-by-year/ai-releases-by-year.png
og:image: /sims/ai-releases-by-year/ai-releases-by-year.png
twitter:image: /sims/ai-releases-by-year/ai-releases-by-year.png
social:
   cards: false
quality_score: 0
---

# AI Model Releases by Year

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the AI Model Releases by Year MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This bar chart shows the year-over-year total of major AI model releases tracked
across 11 frontier AI labs (OpenAI, Anthropic, Google, Meta, SpaceXAI, DeepSeek,
Mistral, Moonshot AI, Z.ai, and Qwen). It replicates the "Releases by Year" chart
from [AI Release Tracker](https://aireleasetracker.com/analytics), a public
dashboard that tracks frontier model releases since ChatGPT launched in
November 2022.

The pace of releases accelerated sharply each year: from a single major release
in 2022 to 22 in 2023, 58 in 2024, and 92 in 2025. The 2026 bar (shown in
orange) is a partial-year figure — 76 models had already shipped by
September 11, 2026, already approaching the full-year 2025 total.

## How to Use

Hover over any bar to see the exact release count. The 2026 bar's tooltip
notes that the figure is partial, since the year is still in progress.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-releases-by-year/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Updating the Data

Chart values live in a dataset shared by six MicroSims:
[`../ai-release-data/data.json`](../ai-release-data/data.json). Editing it
updates every sim built on the same underlying release data at once. Add a
new year by appending an entry to the `years` array; mark the current
in-progress year with `"partial": true` and an `"asOf"` date:

```json
{
  "years": [
    { "label": "2022", "value": 1, "partial": false },
    { "label": "2027", "value": 5, "partial": true, "asOf": "Jan 15, 2027" }
  ]
}
```

See [`../ai-release-data/README.md`](../ai-release-data/README.md) for the
full schema and the list of sims that depend on it.

## Related MicroSims

These MicroSims share the same dataset:

- [Combined Cumulative AI Model Releases](../ai-releases-cumulative/index.md)
- [AI Model Releases by Lab Over Time](../ai-releases-by-lab-over-time/index.md)
- [AI Model Releases by Lab](../ai-releases-by-lab/index.md)
- [AI Release Frequency Per Month](../ai-release-frequency-monthly/index.md)
- [AI Model Releases by Day of Week](../ai-releases-by-day-of-week/index.md)

## Lesson Plan

### Grade Level
Adult professional / executive education (organizational AI-tracking course)

### Duration
5-10 minutes

### Prerequisites
None — a starting-point visualization for discussing the pace of AI progress.

### Activities

1. **Exploration** (3 min): Have learners hover over each bar and note how the
   count of major releases changed year over year.
2. **Guided Discussion** (3 min): Ask learners to estimate what the full-year
   2026 total will be if the pace observed through September holds, and
   compare their estimate to the 2025 total of 92.
3. **Assessment** (3 min): Ask learners to describe, in their own words, why a
   partial-year figure (2026) should not be compared directly to a full-year
   figure (2025) without adjustment.

### Assessment
Learners should be able to explain that the 2026 bar represents only ~8.5
months of data and articulate at least one reason the released-models
count is a useful, if imperfect, proxy for the pace of AI capability growth.

## References

1. [AI Release Tracker — Analytics](https://aireleasetracker.com/analytics) — source of the underlying release-count data.
2. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) — charting library used to build this MicroSim.
