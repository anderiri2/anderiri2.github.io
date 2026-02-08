---
name: update-research
description: Helps updating the research section of the webpage.
---

# Update Research Skill

Whenever you are requested to update the research section (publications), use this skill.

## When to use this skill

- Use this when requested to add, remove, or modify publications.
- This is helpful for keeping `research.html` synchronized with `_research.md`.

## How to use it

1. Read the [_research.md] file.
2. Synchronize the [research.html] file.
3. **Ordering**: Maintain the order present in `_research.md`.
4. **HTML Format**:
   - The publications should be placed under the `<h2 id='publications' class="page-heading">Selected Publications</h2>` heading.
   - For each publication item in `_research.md`:
     ```html
     <div class="publication-card">
       <img src="IMAGE_PATH" class="publication-image" alt="Research thumbnail">
       <div class="publication-content">
         <div class="publication-title">TITLE</div>
         <div class="publication-authors">AUTHORS</div>
         <a href="LINK" class="publication-venue">VENUE</a>
       </div>
     </div>
     ```
5. **Clean management**: Remove any items in `research.html` (within the publication section) that are not in `_research.md` to ensure consistent management.

## Example Markdown Format:

```markdown
---
title: "Toward the Decarbonization of the Steel Sector..."
authors: "Borja de la Peña, Ander Iriondo, ..."
venue: "Steel Research International"
link: "https://doi.org/10.1002/srin.202200943"
image: "/images/research/steel_research_international.png"
---
```
