---
title: AI Model Releases by Lab
description: Horizontal bar leaderboard of total major AI model releases per lab since November 2022.
image: /sims/ai-releases-by-lab/ai-releases-by-lab.png
og:image: /sims/ai-releases-by-lab/ai-releases-by-lab.png
twitter:image: /sims/ai-releases-by-lab/ai-releases-by-lab.png
social:
   cards: false
quality_score: 0
---

# AI Model Releases by Lab

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the AI Model Releases by Lab MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This horizontal bar chart ranks the 11 frontier AI labs tracked by
[AI Release Tracker](https://aireleasetracker.com/analytics) — OpenAI,
Mistral, Google, Anthropic, Qwen, DeepSeek, SpaceXAI, Meta, Z.ai, Moonshot
AI, and NVIDIA — by their total major model releases since November 2022.

It answers a simple but important org-impact question: of the 249 major
releases tracked, who is actually shipping the most? OpenAI leads with 44,
but the next several labs are close behind, and no single lab accounts for
even a fifth of all tracked releases.

## How to Use

Hover over any bar to see its exact count and share of all tracked releases.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-releases-by-lab/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Updating the Data

Chart values live in a dataset shared by six MicroSims:
[`../ai-release-data/data.json`](../ai-release-data/data.json). This chart
reads the `labTotals` array — update a lab's `value` there, or add a new lab
entry (and to `meta.labs`) as the tracked lab list grows. See
[`../ai-release-data/README.md`](../ai-release-data/README.md) for the full
schema.

## Related MicroSims

These MicroSims share the same dataset:

- [AI Model Releases by Year](../ai-releases-by-year/index.md)
- [Combined Cumulative AI Model Releases](../ai-releases-cumulative/index.md)
- [AI Model Releases by Lab Over Time](../ai-releases-by-lab-over-time/index.md)
- [AI Release Frequency Per Month](../ai-release-frequency-monthly/index.md)
- [AI Model Releases by Day of Week](../ai-releases-by-day-of-week/index.md)

## Lesson Plan

### Grade Level
Adult professional / executive education (organizational AI-tracking course)

### Duration
5-10 minutes

### Prerequisites
None.

### Activities

1. **Exploration** (3 min): Have learners rank the top 3 labs by release
   count before looking, then compare to the chart.
2. **Guided Discussion** (3 min): Discuss why release *count* is an
   imperfect proxy for capability leadership (it says nothing about model
   quality or adoption).
3. **Assessment** (3 min): Ask learners to name one other metric that would
   complement this leaderboard for judging lab competitiveness.

### Assessment
Learners should be able to articulate at least one limitation of using raw
release counts as a leadership indicator.

## References

1. [AI Release Tracker — Analytics](https://aireleasetracker.com/analytics) — source of the underlying release-count data.
2. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) — charting library used to build this MicroSim.
