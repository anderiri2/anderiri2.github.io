---
name: update-talks
description: Helps updating the talks section of the webpage.
---

# Update Talks Skill

Whenever you are requested to update the talks section, use this skill.

## When to use this skill

- Use this when requested to update the invited or contributed talks.
- This is helpful for keeping `talks.html` synchronized with `talks.md`.

## How to use it

1. Read the [talks.md] file.
2. Synchronize the [talks.html] file.
3. **Ordering**: Group talks by `year` in descending order. Within each year, maintain the order present in `talks.md`.
4. **HTML Format**:
   - For each group of talks in the same year:
     - The year starts with a single heading: `<h2 class="talk-year-heading">YEAR</h2>`
     - Followed by one or more talk items:
       ```html
       <div class="talk-item">
         Talk on <a href="LINK">"TITLE"</a> at VENUE.
       </div>
       ```
       (If no link is provided, omit the `<a>` tag: `Talk on "TITLE" at VENUE.`)
5. **Clean management**: Like the news skill, you should remove any items in `talks.html` that are not in `talks.md` to ensure consistent management.

## Example Markdown Format:

```markdown
---
year: 2022
title: "Inteligencia artificial en robótica industrial"
venue: "the KISA master of the University of the Basque Country (UPV/EHU)"
link: # Optional
---
```
