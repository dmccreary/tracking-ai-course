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

This MicroSim visualizes the classic "rice on the chessboard" story: place one
grain of rice on the first square of a chess board, two on the second, four
on the third, and keep doubling all the way to the 64th square. Each square
holds twice as many grains as the one before it — the same doubling pattern
often used to describe exponential growth in AI capabilities.

For the first several squares, the grains are drawn individually so you can
count them. Once the count is too large to depict as individual grains, the
square instead shows a number, abbreviated with K (thousand), M (million),
B (billion), T (trillion), Qa (quadrillion), and Qi (quintillion) once it
gets astronomically large. A dashed white line
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
10-15 minutes

### Prerequisites
None — a foundational visualization for discussing exponential growth before
applying it to AI capability trends.

### Key Insight
Something growing exponentially can stay economically unremarkable for a long
stretch, then abruptly become one of the largest forces in the economy —
with no change in the growth *rate*, only in how far along the curve it
already is. Slide to square 32, the last square of the first half, and the
panel shows that square alone is worth about **\$85,900** at today's rice
prices — real money, but nowhere near strategically significant. Slide to
square 64, the last square of the board, and that single square is worth
about **\$369 trillion** — over 4 billion times more than square 32, and more
than nine times the entire U.S. national debt (roughly \$40 trillion as of
2026). Both squares follow the exact same doubling rule; only the square
number differs. Strategically, almost none of the impact shows up until deep
in the second half.

### Activities

1. **Prediction** (2 min): Before moving the slider, ask learners to guess how
   many grains will be on square 20, then on square 40. Reveal the actual
   values and compare.
2. **Exploration** (5 min): Have learners slide to square 32 and read the
   estimated dollar value shown in the green line of the panel. Then continue
   to square 64 and read it again. Ask: how many times larger is the second
   number?
3. **Discussion** (5 min): Connect the metaphor back to AI: ask learners
   where they think we currently sit on this "board" for AI capability
   growth, what it would look like for a capability to still be "in the
   first half" (measurable, but not yet strategically significant), and what
   evidence would tell them a capability has crossed into the second half.

### Assessment
Learners should be able to (a) state the grain count and estimated dollar
value at any given square, (b) explain why square 32 is worth about \$85,900
while square 64 is worth hundreds of trillions of dollars — despite both
following the exact same doubling rule, and (c) articulate why this means an
exponential trend can be safely ignored for a long time and then become
urgent almost overnight, with implications for how organizations should
monitor early-stage AI capabilities.

## References

1. [Wheat and chessboard problem — Wikipedia](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem) — the traditional story this MicroSim visualizes.
2. [Exponential growth — Wikipedia](https://en.wikipedia.org/wiki/Exponential_growth) — background on the underlying mathematical concept.
