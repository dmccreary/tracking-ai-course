---
title: AI Release Frequency Per Month
description: Line chart of new AI models shipped each calendar month since November 2022, showing month-to-month release cadence.
image: /sims/ai-release-frequency-monthly/ai-release-frequency-monthly.png
og:image: /sims/ai-release-frequency-monthly/ai-release-frequency-monthly.png
twitter:image: /sims/ai-release-frequency-monthly/ai-release-frequency-monthly.png
social:
   cards: false
quality_score: 0
---

# AI Release Frequency Per Month

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the AI Release Frequency Per Month MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This line chart shows how many major AI models shipped in each individual
calendar month since November 2022, across the 11 frontier labs tracked by
[AI Release Tracker](https://aireleasetracker.com/analytics). It replicates
that site's "Release Frequency (Per Month)" chart.

Where [AI Model Releases by Year](../ai-releases-by-year/index.md) smooths
everything into five annual totals, this view exposes the volatility
underneath: some months ship a dozen or more models, others ship almost
none. The month-to-month noise is real — the underlying trend is still
upward, but it is not a smooth climb.

## How to Use

Hover along the line to see the exact release count for any month. The most
recent month is marked as partial while it is still in progress.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-release-frequency-monthly/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Updating the Data

Chart values live in a dataset shared by six MicroSims:
[`../ai-release-data/data.json`](../ai-release-data/data.json). This chart
reads the `months[].value` field. Add a new month to the `months` array
(and recompute `cumulative` if you also use the
[cumulative chart](../ai-releases-cumulative/index.md)). See
[`../ai-release-data/README.md`](../ai-release-data/README.md) for the full
schema.

## Related MicroSims

These MicroSims share the same dataset:

- [AI Model Releases by Year](../ai-releases-by-year/index.md)
- [Combined Cumulative AI Model Releases](../ai-releases-cumulative/index.md)
- [AI Model Releases by Lab Over Time](../ai-releases-by-lab-over-time/index.md)
- [AI Model Releases by Lab](../ai-releases-by-lab/index.md)
- [AI Model Releases by Day of Week](../ai-releases-by-day-of-week/index.md)

## Lesson Plan

### Grade Level
Adult professional / executive education (organizational AI-tracking course)

### Duration
5-10 minutes

### Prerequisites
None — pairs well with [Combined Cumulative AI Model Releases](../ai-releases-cumulative/index.md).

### Activities

1. **Exploration** (3 min): Have learners identify the highest-volume and
   lowest-volume months on the chart.
2. **Guided Discussion** (4 min): Discuss why release cadence is noisy
   month-to-month even when the year-over-year trend is clearly upward.
3. **Assessment** (3 min): Ask learners why a single slow month should not
   be read as evidence that AI progress is stalling.

### Assessment
Learners should be able to explain the difference between short-term noise
and long-term trend in a time series, using this chart as the example.

## References

1. [AI Release Tracker — Analytics](https://aireleasetracker.com/analytics) — source of the underlying release-count data.
2. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) — charting library used to build this MicroSim.
