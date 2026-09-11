---
title: Second Half of the Chess Board
description: Interactive chessboard MicroSim showing rice grains doubling on every square, illustrating why exponential growth explodes in the second half of the board.
image: /sims/second-half-of-chessboard/second-half-of-chessboard.png
og:image: /sims/second-half-of-chessboard/second-half-of-chessboard.png
twitter:image: /sims/second-half-of-chessboard/second-half-of-chessboard.png
social:
   cards: false
quality_score: 0
---

# Second Half of the Chess Board

<iframe src="main.html" height="632px" width="100%" scrolling="no"></iframe>

[Run the Second Half of the Chess Board MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes the classic "wheat and chessboard" story: place one
grain of rice on the first square of a chess board, two on the second, four
on the third, and keep doubling all the way to the 64th square. Each square
holds twice as many grains as the one before it — the same doubling pattern
often used to describe exponential growth in AI capabilities.

For the first several squares, the grains are drawn individually so you can
count them. Once the count is too large to depict as individual grains, the
square instead shows a number, abbreviated with K, M, B, T, Qa (quadrillion),
and Qi (quintillion) once it gets astronomically large. A dashed white line
marks the boundary between the first half of the board (squares 1-32) and the
second half (squares 33-64) — the point where the totals stop looking
manageable and start looking impossible.

By square 32, the board holds about 4.3 billion grains — already a lot of
rice, but still something you could picture. By square 64, a single square
holds over 9.2 quintillion grains, and the whole board holds
18,446,744,073,709,551,615 grains in total — enough rice to cover the entire
Earth. The lesson: a constant doubling rate looks harmless for a long time,
right up until it doesn't.

## How to Use

Drag the **Doubling Step** slider to reveal the board one square at a time,
starting at square 1 (upper left) and moving left-to-right, top-to-bottom
through square 64 (lower right). The panel below the board shows the exact
grain count and running total for the currently revealed square.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/second-half-of-chessboard/main.html"
        height="632px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Adult professional / executive education (organizational AI-tracking course)

### Duration
5-10 minutes

### Prerequisites
None — a foundational visualization for discussing exponential growth before
applying it to AI capability trends.

### Activities

1. **Prediction** (2 min): Before moving the slider, ask learners to guess how
   many grains will be on square 20, then on square 40. Reveal the actual
   values and compare.
2. **Exploration** (4 min): Have learners slide from square 1 to square 64,
   pausing at the dashed halfway line, and describe in their own words how
   the visual experience changes between the first and second half.
3. **Discussion** (3 min): Connect the metaphor back to AI: ask learners
   where they think we currently sit on this "board" for AI capability
   growth, and what evidence would suggest we are approaching the second
   half.

### Assessment
Learners should be able to state the grain count (or its abbreviation) at any
given square, explain why the abbreviation switches from raw numbers to K,
M, B, T, and beyond, and articulate why the second half of a doubling
sequence carries disproportionately more impact than the first half.

## References

1. [Wheat and chessboard problem — Wikipedia](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem) — the traditional story this MicroSim visualizes.
2. [Exponential growth — Wikipedia](https://en.wikipedia.org/wiki/Exponential_growth) — background on the underlying mathematical concept.
