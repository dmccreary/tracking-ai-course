# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a three-day educational course on tracking AI capabilities and organizational impact, built using MkDocs with the Material theme. The site is deployed to GitHub Pages and features interactive MicroSims (educational simulations built with p5.js), comprehensive chapter content, and AI-related case studies.

## Common Commands

### Local Development
```bash
# Build the site (generates /site directory)
mkdocs build

# Run local development server at http://localhost:8000
mkdocs serve

# Deploy to GitHub Pages
mkdocs gh-deploy
```

### Environment Setup
The project uses Python with MkDocs. Set up with:
```bash
# Using conda (recommended by project)
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"

# For social card image generation (macOS with Apple Silicon)
brew install cairo freetype libffi libjpeg libpng zlib
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

### Custom Plugin Installation
The project has a custom `social_override` plugin:
```bash
pip install -e .
```

## Architecture

### Content Organization

**docs/** - All content lives here, organized into:
- **chapters/** - Course chapters (Day 1-3 content)
- **sims/** - Interactive MicroSims (p5.js visualizations)
- **stories/** - Historical AI case studies (AI Winters, AlexNet, Yann LeCun, etc.)
- **prompts/** - AI prompt templates for content generation
- **img/** - Images and graphics

### MicroSim Pattern

MicroSims are self-contained interactive visualizations in `docs/sims/[name]/`:
- **main.html** - Standalone HTML file with embedded styles
- **[name].js** - p5.js sketch file
- **index.md** - Documentation page with iframe embed

Each MicroSim index.md embeds the simulation:
```html
<iframe src="./main.html" height="450px" scrolling="no"
  style="overflow: hidden;"></iframe>
```

MicroSims use p5.js (loaded from CDN in main.html):
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.js"></script>
```

### Custom Plugin: social_override

Located in `plugins/social_override.py`, this plugin overrides Material theme's auto-generated social card images. It allows pages to specify custom Open Graph images via frontmatter:
```yaml
---
image: /path/to/custom/image.png
---
```

The plugin hooks into MkDocs lifecycle:
- `on_page_context` - Saves custom image from page metadata
- `on_post_page` - Replaces auto-generated social tags with custom image URL

Registered in `setup.py` and enabled in `mkdocs.yml` plugins section.

### Theme Configuration

The site uses Material theme with specific features enabled in `mkdocs.yml`:
- Code copy buttons
- Navigation expansion and path
- Edit action (links to GitHub)
- Navigation footer with prev/next
- Social card generation

Custom CSS/JS in `docs/css/extra.css` and `docs/js/extra.js` extend the theme.

### Content Types

**Chapters** - Main educational content following course structure (Day 1: AI Growth, Day 2: Organizational Impact, Day 3: Strategic Response)

**MicroSims** - Interactive visualizations covering:
- AI benchmarks and timelines (MMLU, LM Arena)
- Growth patterns (Moore's Law, exponential growth)
- Strategic frameworks (Porter's Five Forces, SWOT, Hype Cycle)
- Educational concepts (Bloom's Taxonomy, Book Generation Workflow)

**Stories** - Historical narratives providing context (AI Winters, breakthrough moments)

**Prompts** - Templates for AI-assisted content generation (concept enumeration, dependencies, taxonomy, glossary)

## Navigation Structure

Defined in `mkdocs.yml` nav section. The site has hierarchical navigation:
- Home/About/Course Description
- Chapters (15+ chapters)
- Stories (4 historical narratives)
- MicroSims (20+ interactive simulations)
- Prompts (AI generation templates)
- Supporting pages (Glossary, References, How We Built This Site)

## Deployment

The site deploys to GitHub Pages via `mkdocs gh-deploy` command. This:
1. Builds the site to `/site` directory
2. Pushes to `gh-pages` branch
3. GitHub Pages serves from that branch

Note: `mkdocs gh-deploy` does NOT commit source changes to the main branch. You must separately commit and push source changes.

## Key Design Decisions

**MkDocs over Docusaurus** - Chosen for Python ecosystem alignment and ease of use for documentation

**Material Theme** - Selected for social card support (Open Graph tags) and extensive feature set (16K+ GitHub stars)

**Conda over venv** - Preferred for potential multi-language support beyond pure Python

**GitHub Pages** - Low-cost hosting for public educational content

**p5.js for MicroSims** - Accessible JavaScript library for interactive educational visualizations
