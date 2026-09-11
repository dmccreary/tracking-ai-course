---
title: Combined Cumulative AI Model Releases
description: Line chart of the compounding total of major AI model releases across 11 labs, month by month since November 2022.
image: /sims/ai-releases-cumulative/ai-releases-cumulative.png
og:image: /sims/ai-releases-cumulative/ai-releases-cumulative.png
twitter:image: /sims/ai-releases-cumulative/ai-releases-cumulative.png
social:
   cards: false
quality_score: 0
---

# Combined Cumulative AI Model Releases

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the Combined Cumulative AI Model Releases MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This line chart plots the running total of major AI model releases across 11
frontier AI labs (OpenAI, Anthropic, Google, Meta, SpaceXAI, DeepSeek,
Mistral, Moonshot AI, Z.ai, Qwen, and NVIDIA), month by month since ChatGPT
launched in November 2022. It replicates the "Combined Cumulative Releases
Over Time" chart from [AI Release Tracker](https://aireleasetracker.com/analytics).

Where the [AI Model Releases by Year](../ai-releases-by-year/index.md) chart
shows the *rate* of releases, this chart shows the *compounding* effect: the
curve visibly steepens each year, illustrating why the AI field feels like
it is accelerating rather than growing at a steady pace.

## How to Use

Hover anywhere on the line to see the exact cumulative total as of that
month. The curve reaches 249 releases by September 2026.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-releases-cumulative/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Updating the Data

Chart values live in a dataset shared by six MicroSims:
[`../ai-release-data/data.json`](../ai-release-data/data.json). This chart
reads the `months[].cumulative` field, which is precomputed — add a new
month to the `months` array with its `cumulative` value equal to the
previous month's cumulative plus the new month's `value`. See
[`../ai-release-data/README.md`](../ai-release-data/README.md) for the full
schema.

## Related MicroSims

These MicroSims share the same dataset:

- [AI Model Releases by Year](../ai-releases-by-year/index.md)
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
None — pairs well with [AI Model Releases by Year](../ai-releases-by-year/index.md).

### Activities

1. **Exploration** (3 min): Have learners trace the curve from 2022 to 2026
   and note where it visibly steepens.
2. **Guided Discussion** (4 min): Compare this chart to the "AI Model
   Releases by Year" bar chart — ask learners which view makes the
   acceleration feel more dramatic, and why.
3. **Assessment** (3 min): Ask learners to estimate the cumulative total at
   the end of 2026 by extrapolating the current slope.

### Assessment
Learners should be able to explain the difference between a rate chart
(releases per year) and a cumulative chart (running total), and why both
are useful for tracking AI capability growth.

## References

1. [AI Release Tracker — Analytics](https://aireleasetracker.com/analytics) — source of the underlying release-count data.
2. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) — charting library used to build this MicroSim.
