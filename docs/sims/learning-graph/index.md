---
title: Learning Graph for Tracking AI Course
description: Interactive visualization of concept dependencies in the Tracking AI curriculum
image: /sims/learning-graph/learning-graph.png
og:image: /sims/learning-graph/learning-graph.png
---

# Learning Graph for Tracking AI Course

<iframe src="./view-graph.html" width="100%" height="600px" scrolling="no"
  style="overflow: hidden; border: 1px solid lightgray;"></iframe>

[Open Full Screen](./view-graph.html){ .md-button }

## About This Visualization

This interactive network graph visualizes the **251 concepts** covered in the Tracking AI Course and their dependencies. It provides a visual map of how ideas connect and build upon each other, helping learners understand the prerequisite relationships between topics.

## Understanding the Graph

### Nodes (Concepts)

Each **node** (circle) in the graph represents a concept covered in the course. Nodes are color-coded by category to help you quickly identify related topics:

| Color | Category | Description |
|-------|----------|-------------|
| Red | Foundational Concepts | Core AI principles like Artificial Intelligence, Machine Learning, Neural Networks |
| Orange | AI Evolution and History | Historical milestones including Dartmouth Conference, AI Winters, AlphaGo |
| Gold | AI Architectures and Technologies | Technical implementations like Transformers, GPT, BERT, Diffusion Models |
| Green | AI Capabilities and Applications | Practical applications including Code Generation, Speech Recognition, Question Answering |
| Blue | Content Generation and Creativity | Creative AI applications for generating text, summaries, and educational content |
| Deep Sky Blue | Image Generation | Visual AI including DALL-E, Midjourney, Stable Diffusion |
| Royal Blue | Language Generation | Natural language processing and text generation |
| Indigo | Knowledge Management | Organizational knowledge, knowledge graphs, institutional memory |
| Violet | Educational Transformation | AI in education including personalized learning, adaptive systems, curriculum development |
| Brown | Organizational Strategy | Business strategy, competitive advantage, change management |
| Gray | Performance Evaluation | Benchmarks, metrics, ROI analysis |
| Black | Ethical and Regulatory | AI safety, bias, governance, privacy regulations like FERPA |
| Olive | Best Practices | Quality assurance, testing protocols, version control |
| Teal | Future Trends | Predictions about AGI timelines, workforce transformation, AI forecasting |
| Slate Gray | Implementation | Technical infrastructure, API management, deployment strategies |
| Gold (star) | Final Goals | Ultimate outcomes like Innovation Strategy, Future Readiness |

### Edges (Dependencies)

The **arrows** (edges) connecting nodes represent prerequisite relationships. An arrow pointing from Concept A to Concept B means:

- **Concept A should be understood before Concept B**
- B builds upon or requires knowledge of A
- When learning the material, follow the arrows to find a logical learning path

## Using the Interface

### Left Sidebar

The left sidebar contains:

1. **Legend & Controls** - Color-coded legend showing all concept categories
2. **Check All / Uncheck All** - Buttons to quickly show or hide all categories
3. **Category Checkboxes** - Toggle individual categories on/off
4. **Graph Statistics** - Live counts of visible nodes, edges, and orphan nodes

### Search Function

The **search bar** at the top allows you to find specific concepts:

1. Start typing a concept name (e.g., "neural" or "GPT")
2. Matching concepts appear in a dropdown list
3. Click a result to zoom and focus on that node
4. The graph will animate to center on your selection

### Filtering by Category

Use the **checkboxes** in the sidebar to filter the graph by concept category:

1. **Uncheck a category** to hide all concepts in that group
2. **Check a category** to show those concepts
3. Use **Uncheck All** to clear the graph, then selectively enable categories you want to explore
4. The statistics update in real-time to show how many nodes and edges are currently visible

**Tip:** Try unchecking all categories, then enabling just "Foundational Concepts" to see the core building blocks of AI knowledge.

### Interacting with the Graph

- **Drag nodes** to rearrange the layout
- **Scroll** to zoom in/out
- **Click and drag** the background to pan
- **Click a node** to select it and see its connections highlighted
- The graph **stabilizes after 5 seconds** to prevent continuous movement

## Learning Paths

The graph reveals natural learning progressions. Some suggested paths:

1. **AI Foundations Path**: Start with red (Foundational) nodes, then follow arrows to orange (History) and gold (Architectures)

2. **Practical Applications Path**: Begin with Foundational Concepts, move to AI Capabilities (green), then explore Content Generation (blue)

3. **Strategic Planning Path**: Start with Organizational Strategy (brown), connect to Performance Evaluation (gray), and end with Future Trends (teal)

4. **Education Focus Path**: Begin with Educational Transformation (violet), explore Knowledge Management (indigo), and connect to Implementation (slate gray)

## Data Source

The graph data is stored in `tracking-ai.json` and contains:

- **251 nodes** representing course concepts
- **618 edges** representing prerequisite dependencies
- **16 concept categories** for organization

This visualization was generated using the vis-network JavaScript library.
