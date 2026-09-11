---
title: AI Model Releases by Day of Week
description: Bar chart showing which days of the week AI labs ship major model releases on, highlighting the weekday-heavy shipping cadence.
image: /sims/ai-releases-by-day-of-week/ai-releases-by-day-of-week.png
og:image: /sims/ai-releases-by-day-of-week/ai-releases-by-day-of-week.png
twitter:image: /sims/ai-releases-by-day-of-week/ai-releases-by-day-of-week.png
social:
   cards: false
quality_score: 0
---

# AI Model Releases by Day of Week

<iframe src="main.html" height="472px" width="100%" scrolling="no"></iframe>

[Run the AI Model Releases by Day of Week MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This bar chart tallies all 249 tracked AI model releases by the day of the
week they shipped on, replicating the "Releases by Day of Week" chart from
[AI Release Tracker](https://aireleasetracker.com/analytics).

The pattern is a familiar one to anyone who works in software: releases
cluster heavily on weekdays (Tuesday and Thursday lead, with 61 and 62
releases respectively) and drop off sharply on weekends (only 4 releases
combined across Saturday and Sunday). It's a small but concrete illustration
that even frontier AI labs ship on ordinary engineering-team schedules.

## How to Use

Hover over any bar to see its exact count and share of all tracked releases.
Weekend bars are shown in purple.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-releases-by-day-of-week/main.html"
        height="472px"
        width="100%"
        scrolling="no"></iframe>
```

## Updating the Data

Chart values live in a dataset shared by six MicroSims:
[`../ai-release-data/data.json`](../ai-release-data/data.json). This chart
reads the `dayOfWeek` array. See
[`../ai-release-data/README.md`](../ai-release-data/README.md) for the full
schema.

## Related MicroSims

These MicroSims share the same dataset:

- [AI Model Releases by Year](../ai-releases-by-year/index.md)
- [Combined Cumulative AI Model Releases](../ai-releases-cumulative/index.md)
- [AI Model Releases by Lab Over Time](../ai-releases-by-lab-over-time/index.md)
- [AI Model Releases by Lab](../ai-releases-by-lab/index.md)
- [AI Release Frequency Per Month](../ai-release-frequency-monthly/index.md)

## Lesson Plan

### Grade Level
Adult professional / executive education (organizational AI-tracking course)

### Duration
5 minutes

### Prerequisites
None — a light, engaging warm-up chart.

### Activities

1. **Exploration** (2 min): Have learners guess which day has the most
   releases before revealing the chart.
2. **Guided Discussion** (3 min): Discuss what the weekday-heavy pattern
   suggests about how AI labs operate (deliberate release scheduling,
   normal engineering cadence, avoiding weekend on-call incidents).

### Assessment
Learners should be able to state the day with the most releases and offer
one plausible organizational reason for the weekday/weekend pattern.

## References

1. [AI Release Tracker — Analytics](https://aireleasetracker.com/analytics) — source of the underlying release-count data.
2. [Chart.js Documentation](https://www.chartjs.org/docs/latest/) — charting library used to build this MicroSim.
