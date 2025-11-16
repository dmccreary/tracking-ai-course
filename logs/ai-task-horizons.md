# Session Log: AI Task Horizons MicroSim

**Date**: November 16, 2025
**Project**: Tracking AI Course
**Task**: Create interactive Chart.js visualization of AI task completion time horizons

---

## Overview

Created a comprehensive MicroSim that replicates the interactive chart from METR's research on AI ability to complete long tasks. The visualization shows 30 AI models spanning from GPT-2 (2019) to GPT-5 (2025), demonstrating exponential growth in task-completion capabilities.

**Data Source**: [METR Research - Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)

---

## Files Created

### 1. `/docs/sims/ai-task-horizons/main.html` (1.9KB)
- Clean HTML structure with minimal inline content
- Links to external CSS and JavaScript files
- Chart.js CDN import (v4.4.0)
- Canvas element for chart rendering
- Interactive control buttons (scale toggle, success probability toggle)
- Legend showing frontier vs non-frontier models

### 2. `/docs/sims/ai-task-horizons/style.css` (2.1KB)
- Modern, responsive design
- Aliceblue background with blue border
- Button styles with hover effects
- Chart container sizing (500px desktop, 390px mobile)
- Flexbox layouts for controls and legend
- Mobile-responsive media queries (@max-width: 768px)

### 3. `/docs/sims/ai-task-horizons/script.js` (6.3KB)
- Complete dataset of 30 AI models (14 frontier, 16 non-frontier)
- Time horizons in minutes (50% and 80% success rates)
- Chart.js scatter plot configuration
- Interactive toggle functions:
  - `setScale(scale)` - Switch between linear and logarithmic y-axis
  - `setProbability(probability)` - Toggle between 50% and 80% success metrics
- Responsive chart with custom tooltips
- Chronological sorting by model release date

### 4. `/docs/sims/ai-task-horizons/index.md` (6.4KB)
- Comprehensive documentation
- Embedded iframe (588px height)
- Model data tables with time horizons
- Customization guide
- Technical details and interpretation guide
- Use cases and references

---

## Key Features Implemented

### Interactive Controls
1. **Scale Toggle**: Linear vs Logarithmic y-axis
   - Linear: Shows absolute differences
   - Log: Better visualizes exponential growth

2. **Success Probability Toggle**: 50% vs 80%
   - 50%: Model has 50% chance of task completion
   - 80%: More conservative 80% success threshold

3. **Hover Tooltips**: Display model details
   - Model name
   - Time horizon in minutes and hours
   - Release date
   - Success probability level

### Visual Design
- **Color Coding**:
  - Green (#27ae60): Frontier models (state-of-the-art)
  - Gray (#95a5a6): Non-frontier models
- **Point Styling**: 6px radius, 10px hover radius
- **Responsive Layout**: Adapts to mobile and desktop screens

---

## Dataset Details

### Complete Model List (30 total)

#### Frontier Models (14)
| Model | 50% Horizon | 80% Horizon | Release Date |
|-------|-------------|-------------|--------------|
| GPT-5 | 8,239 min (137 hrs) | 1,582 min (26 hrs) | 2025-08-07 |
| Grok-4 | 6,605 min (110 hrs) | 895 min (15 hrs) | 2025-07-09 |
| o3 | 5,531 min (92 hrs) | 1,223 min (20 hrs) | 2025-04-16 |
| Claude 3.7 Sonnet | 3,254 min (54 hrs) | 909 min (15 hrs) | 2025-02-24 |
| o1-elicited | 2,352 min (39 hrs) | 358 min (6 hrs) | 2024-12-05 |
| Claude 3.5 Sonnet 20241022 | 1,739 min (29 hrs) | 279 min (5 hrs) | 2024-10-22 |
| o1-preview | 1,326 min (22 hrs) | 277 min (5 hrs) | 2024-09-12 |
| Claude 3.5 Sonnet | 1,093 min (18 hrs) | 192 min (3 hrs) | 2024-06-20 |
| GPT-4o | 550 min (9 hrs) | 101 min (2 hrs) | 2024-05-13 |
| GPT-4 1106 | 513 min (9 hrs) | 87 min (1.5 hrs) | 2023-11-06 |
| GPT-4 | 322 min (5 hrs) | 58 min (1 hr) | 2023-03-14 |
| GPT-3.5 Turbo Instruct | 36 min | 10 min | 2022-03-15 |
| davinci-002 | 9 min | 2 min | 2020-05-28 |
| GPT-2 | 2.4 min | 0.3 min | 2019-02-14 |

#### Non-Frontier Models (16)
| Model | 50% Horizon | 80% Horizon | Release Date |
|-------|-------------|-------------|--------------|
| Claude Sonnet 4.5 | 6,798 min | 1,209 min | 2025-09-29 |
| Claude 4.1 Opus | 6,330 min | 1,265 min | 2025-08-05 |
| Claude 4 Opus | 4,792 min | 1,218 min | 2025-05-22 |
| o4-mini | 4,654 min | 903 min | 2025-04-16 |
| Claude 4 Sonnet | 4,063 min | 1,000 min | 2025-05-22 |
| GPT-OSS-120B | 2,519 min | 398 min | 2025-08-05 |
| Gemini 2.5 Pro Preview | 2,324 min | 552 min | 2025-06-05 |
| DeepSeek R1 0528 | 1,870 min | 225 min | 2025-05-28 |
| DeepSeek R1 | 1,616 min | 260 min | 2025-01-20 |
| DeepSeek V3 0324 | 1,387 min | 318 min | 2025-03-24 |
| DeepSeek V3 | 1,108 min | 232 min | 2024-12-26 |
| GPT-4 Turbo | 394 min | 91 min | 2024-04-09 |
| Claude 3 Opus | 385 min | 68 min | 2024-03-04 |
| GPT-4 0125 | 322 min | 72 min | 2024-01-25 |
| Qwen 2.5 72B | 310 min | 56 min | 2024-09-19 |
| Qwen 2 72B | 135 min | 26 min | 2024-06-07 |

### Time Range
- **Minimum**: 0.3 minutes (GPT-2 at 80% success)
- **Maximum**: 8,239 minutes / 137 hours (GPT-5 at 50% success)

---

## Development Process

### Phase 1: Initial Setup
1. Used `chartjs-generator` skill to create foundation
2. Created directory structure: `/docs/sims/ai-task-horizons/`
3. Built initial HTML with embedded CSS/JavaScript

### Phase 2: Bug Fixes
**Problem**: Chart rendering as blank white area with controls visible
- **Cause**: JavaScript error - `chart.data.labels` referenced before `chart` existed
- **Fix**: Stored `chartData` in variable before chart creation
- **Additional Fix**: Set proper `min` value for logarithmic scale (1 instead of 0)

### Phase 3: Layout Adjustments
**User Requests**:
1. Move legend above chart, controls below chart
2. Make controls horizontal side-by-side
3. Minimize vertical spacing

**Changes Made**:
- Swapped legend and controls positions in HTML
- Changed `flex-wrap: wrap` to `flex-wrap: nowrap` for controls
- Adjusted margins: `margin-top: 15px`, `margin-bottom: 10px`
- Added mobile breakpoint to allow wrapping on small screens

### Phase 4: Code Refactoring
**Separated concerns into external files**:
- Extracted CSS to `style.css` (2.1KB)
- Extracted JavaScript to `script.js` (6.3KB)
- Reduced `main.html` from 13KB to 1.9KB

**Benefits**:
- Better code organization
- Easier maintenance
- Reusability of components

### Phase 5: Data Expansion
**Initial Dataset**: 10 models (incomplete, incorrect values)
**Final Dataset**: 30 models (complete METR dataset)

**Iterations**:
1. First fetch: 10 models with small values
2. Second fetch: 13 models with corrected values
3. Third fetch: Complete 30-model dataset

**Data Corrections**:
- Original values were off by orders of magnitude
- Updated all time horizons to match METR source
- Added historical models (GPT-2, davinci-002, GPT-3.5)
- Added recent models (DeepSeek, Gemini, Qwen variants)

### Phase 6: Documentation Updates
1. Updated model count: 10 → 13 → 30
2. Added data source attribution to METR
3. Updated time range specifications
4. Created comprehensive model tables in index.md
5. Fixed reference from `main.html` to `script.js` in customization guide

### Phase 7: Integration
**Updated `/docs/sims/index.md`**:
- Added entry for AI Task Horizons MicroSim
- Followed existing format (heading, 2-sentence description, link)
- Positioned at top of list as newest MicroSim
- Updated all other 23 MicroSims with descriptions

---

## Technical Specifications

### Libraries & Dependencies
- **Chart.js**: v4.4.0 (CDN)
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive**: Yes, mobile-optimized

### Chart Configuration
```javascript
{
    type: 'scatter',
    data: {
        labels: [...model names...],
        datasets: [
            {
                label: 'Frontier Models',
                backgroundColor: 'rgba(39, 174, 96, 0.8)',
                borderColor: 'rgba(39, 174, 96, 1)',
                pointRadius: 6,
                pointHoverRadius: 10
            },
            {
                label: 'Non-Frontier Models',
                backgroundColor: 'rgba(149, 165, 166, 0.8)',
                borderColor: 'rgba(149, 165, 166, 1)',
                pointRadius: 6,
                pointHoverRadius: 10
            }
        ]
    }
}
```

### Data Structure
```javascript
const modelData = {
    frontier: [
        {
            name: 'Model Name',
            horizon50: 1234.5,  // 50% success time in minutes
            horizon80: 567.8,   // 80% success time in minutes
            date: 'YYYY-MM-DD'  // Release date
        }
    ],
    nonFrontier: [...]
};
```

---

## Key Insights from Data

1. **Exponential Growth**: Task-completion capability doubles approximately every 7 months
2. **Recent Acceleration**: 2024-2025 models show dramatic improvements
3. **Model Diversity**: Includes OpenAI, Anthropic, Google, DeepSeek, Alibaba models
4. **Success Threshold Impact**: 80% success requires ~5-6x shorter time horizons than 50%
5. **Historical Context**: GPT-2 (2019) could handle <3 minutes; GPT-5 (2025) handles 137+ hours

---

## Design Decisions

### Why Chart.js?
- Native support for scatter plots
- Built-in tooltip system
- Easy toggle controls implementation
- Similar visual quality to METR original
- Widely supported, actively maintained

### Why Separate Files?
- **Maintainability**: Easier to update CSS or JS independently
- **Best Practices**: Separation of concerns (HTML/CSS/JS)
- **Reusability**: CSS and JS can be shared/modified independently
- **Performance**: Better caching with separate files

### Why Scatter Plot?
- Best represents discrete data points (individual models)
- Supports chronological ordering on X-axis
- Allows clear color coding by category
- Supports both linear and logarithmic scales

### Color Scheme Rationale
- **Green for Frontier**: Universally understood as "go", "success", "leading"
- **Gray for Non-Frontier**: Neutral, non-distracting
- **High Contrast**: Ensures accessibility and clarity
- **Consistent with Industry**: Common pattern in AI benchmarking

---

## Files Modified

### New Files Created
- `/docs/sims/ai-task-horizons/main.html`
- `/docs/sims/ai-task-horizons/style.css`
- `/docs/sims/ai-task-horizons/script.js`
- `/docs/sims/ai-task-horizons/index.md`

### Existing Files Modified
- `/docs/sims/index.md` - Added comprehensive entries for all 24 MicroSims

---

## Usage Instructions

### Embedding in Web Pages
```html
<iframe src="https://dmccreary.github.io/tracking-ai-course/sims/ai-task-horizons/main.html"
        width="100%"
        height="588">
</iframe>
```

### Local Development
```bash
# Navigate to MicroSim directory
cd docs/sims/ai-task-horizons

# Open in browser
open main.html

# Or serve with MkDocs
mkdocs serve
```

### Customizing Data
Edit `script.js` modelData object:
```javascript
const modelData = {
    frontier: [
        { name: 'New Model', horizon50: 1000, horizon80: 200, date: '2025-01-01' }
    ],
    nonFrontier: [...]
};
```

---

## Lessons Learned

1. **Always verify data sources**: Initial extraction had incorrect values
2. **Test in browser immediately**: Caught JavaScript error early
3. **Separate concerns early**: Refactoring from embedded to external files was smooth
4. **Progressive enhancement**: Started with basic functionality, added features iteratively
5. **Document as you go**: Comprehensive index.md helps future users

---

## Future Enhancements (Not Implemented)

### Potential Features
1. **Downloadable CSV**: Export data for offline analysis
2. **Custom Filtering**: Filter by model family (Claude, GPT, etc.)
3. **Date Range Slider**: Focus on specific time periods
4. **Confidence Intervals**: Show uncertainty in measurements
5. **Trend Lines**: Display exponential growth curve
6. **Model Comparison**: Select two models for direct comparison
7. **Animation**: Animated timeline showing growth over years

### Technical Improvements
1. **Data Loading**: Fetch from JSON file instead of embedded
2. **Chart Responsiveness**: Better mobile optimization
3. **Accessibility**: ARIA labels, keyboard navigation
4. **Performance**: Canvas optimization for large datasets
5. **Internationalization**: Multi-language support

---

## References

- **Primary Data Source**: [METR - Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
- **Chart.js Documentation**: [https://www.chartjs.org/docs/latest/](https://www.chartjs.org/docs/latest/)
- **MkDocs Material Theme**: [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/)
- **Project Repository**: [https://github.com/dmccreary/tracking-ai-course](https://github.com/dmccreary/tracking-ai-course)

---

## Summary

Successfully created a production-ready, interactive MicroSim that visualizes AI task-completion capabilities across 30 models spanning 6 years of AI development. The visualization demonstrates the exponential growth in AI capabilities with a doubling time of approximately 7 months, using clean, maintainable code following web development best practices.

**Final Statistics**:
- **30 models** (14 frontier, 16 non-frontier)
- **4 files** (HTML, CSS, JS, MD)
- **~16KB total** (before compression)
- **2 interactive toggles** (scale, success probability)
- **6+ years** of AI history (2019-2025)
- **3400x improvement**: From GPT-2's 2.4 minutes to GPT-5's 8,239 minutes at 50% success

---

**Session Completed**: November 16, 2025
**Claude Code Version**: Sonnet 4.5
