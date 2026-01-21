# Learning Graph for Tracking AI Course

This section contains the learning graph for this textbook. A learning graph is
a graph of concepts used in this textbook. Each concept is represented by a
node in a network graph. Concepts are connected by directed edges that indicate
what concepts each node depends on before that concept is understood by the student.

A learning graph is the foundational data structure for intelligent textbooks that can recommend learning paths.
A learning graph is like a roadmap of concepts to help students arrive at their learning goals.

At the left of the learning graph are prerequisite or foundational concepts. They
have no outbound edges. They only have inbound edges for other concepts that depend on
understanding these foundational prerequisite concepts. At the far right
we have the most advanced concepts in the course. To master these concepts you
must understand all the concepts that they point to.

## Course Overview

This learning graph supports a three-day intensive course on **Exponential AI: Strategic Implications for Knowledge Organizations**. The course explores:

- Day 1: Understanding AI's Exponential Growth
- Day 2: Organizational Impact Assessment
- Day 3: Strategic Response Planning

## Learning Graph Statistics

- **Total Concepts**: 250
- **Foundational Concepts**: 3 (Artificial Intelligence, Exponential Growth, Knowledge Organizations)
- **Taxonomy Categories**: 12
- **Maximum Learning Path**: 23 concepts
- **Average Dependencies per Concept**: 2.50

## Learning Graph Files

### Course Description

We use the [Course Description](../course-description.md) as
the source document for the concepts that are included in this course.
The course description uses the 2001 Bloom taxonomy to order learning objectives.

### List of Concepts

We use generative AI to convert the course description into a [Concept List](./concept-list.md).
Each concept is in the form of a short Title Case label with most labels under 32 characters long.

### Concept Dependency List

We next use generative AI to create a Directed Acyclic Graph (DAG). DAGs do not have cycles where
concepts depend on themselves. We provide the DAG in two formats. One is a [CSV file](learning-graph.csv) and the other
format is a [JSON file](learning-graph.json) that uses the vis-network JavaScript library format. The vis-network format uses `nodes`, `edges` and `metadata`
elements with edges containing `from` and `to` properties. This makes it easy for you to view and edit the learning
graph using an editor built with the vis-network tools.

## Analysis & Documentation

### Learning Graph Quality Validation

This report gives you an overall assessment of the quality of the learning graph.
It uses graph algorithms to look for specific quality patterns in the graph.

- Graph structure validation - all concepts are connected
- DAG validation
- Foundational concepts: 3 entry points
- Indegree distribution analysis
- Longest dependency chains: 23 concepts
- Connectivity: 100% of nodes connected to the main cluster

[View the Learning Graph Quality Validation](quality-metrics.md)

### Concept Taxonomy

In order to see patterns in the learning graph, it is useful to assign colors
to each concept based on the concept type. We use generative AI to
create about a dozen categories for our concepts and then place each concept
into a single primary classifier.

Our 12 taxonomy categories are:

1. Foundational Concepts
2. AI Evolution and History
3. AI Architectures and Technologies
4. AI Capabilities and Applications
5. Content Generation and Creativity
6. Knowledge Management and Organization
7. Educational Transformation
8. Organizational Strategy
9. Performance Evaluation and Benchmarking
10. Ethical and Regulatory Considerations
11. Future Trends and Projections
12. Implementation and Management Practices

### Taxonomy Distribution

This report shows how many concepts fit into each category of the taxonomy.
Our goal is a somewhat balanced taxonomy where each category holds an
equal number of concepts. We also don't want any category to contain
over 30% of our concepts.

- All categories under 30% threshold
- Spread between categories: 9.2% (excellent balance)
- No MISC category needed

[View the Taxonomy Distribution Report](./taxonomy-distribution.md)

## Top 10 Most Connected Concepts

These concepts are prerequisites for the most other concepts:

| Rank | Concept | Indegree |
|------|---------|----------|
| 1 | Large Language Models | 39 |
| 2 | Generative AI | 29 |
| 3 | Artificial Intelligence | 24 |
| 4 | Knowledge Management | 13 |
| 5 | Content Generation | 13 |
| 6 | Change Management | 13 |
| 7 | Strategic Implications | 12 |
| 8 | Hyperpersonalized Learning | 12 |
| 9 | Deep Learning | 11 |
| 10 | Natural Language Processing | 11 |
