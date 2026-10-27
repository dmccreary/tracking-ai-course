---
name: panel-interest-venn-generator
description: Research every speaker on a panel, analyze where their interests overlap, and generate an interactive p5.js Venn Diagram Interest Overlap MicroSim plus an intro email to the panelists. Use this skill whenever the user says they are speaking on a panel, joining a panel discussion, moderating a multi-speaker session, or asks how their interests overlap with co-speakers, even if they do not say "Venn" or "MicroSim".
---

# Panel Interest Venn Generator

Turn a panel invitation into (1) a sourced interest analysis, (2) an interactive
Venn Diagram Interest Overlap MicroSim in an intelligent-textbook repo, and
(3) a draft intro email to the other panelists. The **overlap analysis is the heart
of this skill**: the diagram is only as good as the shared interests you find and
justify. Score every run with the 1-100 rubric in `references/quality-rubric.md`.

## Inputs to gather
- Event name, date, time, venue, organizer, host, panel topic, event URL.
- Every panelist's full name, affiliation, and email (if known).
- The user's own current interest list (from memory, a knowledge graph, or ask).
- Target repo and folder for MicroSims (e.g. `docs/sims/`) and the feedback email address.

## Workflow

### Step 1: Identify the panel
Find the event page and the invitation email. Record every panelist and the panel
topic. Note who organized and who hosts.

### Step 2: Research each panelist
Use faculty pages, company bios, talk listings, LinkedIn posts, GitHub, and the
user's email. Record 5-10 interests per person, each with a source URL.
- Never invent facts. If two people share a name, state your confidence and why.
- Note missing email addresses instead of guessing them.

### Step 3: Overlap analysis (KEY STEP, 40 of 100 points)
This step decides whether the result is insightful or just a picture.
1. **Normalize interests** into comparable concepts. "LLM agents", "agentic workflows" and
   "autonomous AI" are one concept: *Agentic AI*. Keep a mapping table of raw phrase to
   normalized concept, so merges are transparent.
2. **Build the membership matrix**: rows = concepts, columns = people, cells = evidence
   (source URL or quote). A concept counts for a person only with evidence.
3. **Classify every concept** by set: shared by all, shared by a subset (name the subset),
   or unique.
4. **Explain each overlap** in one sentence: *why* these people meet here, and what a
   joint project or panel discussion thread could look like.
5. **Rank overlaps** by strength (number of people x strength of evidence) and by
   relevance to the panel topic. Pick the 3-5 strongest as discussion themes.
6. **Check for missed bridges**: look for near-overlaps (adjacent concepts such as
   *knowledge graphs* and *trustworthy AI*) and mention them as opportunities.
7. Save as `analysis.md` with sections: Panel, People (with sources), Normalization
   table, Membership matrix, Overlaps (ranked, explained), Discussion themes, Gaps.

### Step 4: Knowledge graph (optional)
If the user keeps a personal knowledge graph, add Person nodes for new people and an
Event node, linked with `panelist at`, `hosted`, and `collaborates with`. If someone else
maintains the graph, send them the nodes instead of editing it.

### Step 5: Build the MicroSim
Create `docs/sims/<event-slug>-panelist-venn/` following the repo's existing sim conventions.
Templates are in `assets/`.
- `main.html`: loads p5.js and the sketch, with a fixed **Send Feedback** mailto link.
- `<slug>.js`:
  - One translucent, color-coded circle per person (2-4 people; for 5 or more use ellipses
    or switch to an UpSet-style chart).
  - Gold labels for concepts everyone shares.
  - Hovering a label shows a tooltip with who shares it.
  - Width-responsive canvas.
- **Label layout**: place each label at the centroid of its members' circles. Put
  diagonal pairs (people whose circles touch only in the middle) just below the center, and
  push pair labels outward. Then verify that no labels overlap.
- `index.md`: front matter (title, description, image), an iframe, a Fullscreen button, a
  Send Feedback button, Description, How to Use, **Sources as working Markdown links**,
  and a Lesson Plan prompt.
- Render a headless-Chrome screenshot, inspect it for overlaps, and save it as the preview image.
- Add the mkdocs nav entry. Commit, or tell the user to push.

### Step 6: Draft the intro email (never send)
Save it as a draft in the user's mail, with full names in To. Greet every panelist
(note any without an email address).
1. Say it's an honor to share the stage.
2. Explain that a MicroSim is a fun way to see the overlaps, and that the interests do overlap
   (name the top themes).
3. Link the live MicroSim.
4. Explain how to update their interests (feedback address or the Send Feedback button).
5. Optionally offer an xAPI event stream to predict concept understanding.
6. Close by looking forward to the panel. Add the assistant's signature or icon if the user wants it.

### Step 7: Score and report
Score the run with `references/quality-rubric.md` and record the score in `index.md`
front matter as `quality_score`. Report the page URL, the draft subject, the score with a
short breakdown, and any open gaps.
