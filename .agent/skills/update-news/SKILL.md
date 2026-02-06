---
name: update-news
description: Helps updating the news section of the webpage.
---

# Update News

This skill updates the news section of the webpage. It reads the news.md file and updates the news section of the index.html file. The style of the news section has to be consistent with the rest of the webpage.

## When to use this skill

- Use this when its requested to update the news section.

## How to use it

Whenever you are requested to update the news section, use this skill. First, read the _news.md file and synchronize the news section of the index.html file. You should REMOVE any news in index.html that are not present in _news.md to keep the section clean and managed solely via _news.md. The style of the news section has to be consistent with the rest of the webpage. The _news.md file has the following format: 

```markdown
---
date: 2024-03-21
type: "Ph.D Defense"
title: "On the 21st of march I defended my Ph.D thesis entitled 'Advances in flexible manipulation through the application of AI-based techniques'. Cum Laude!"
link: # Optional URL
---
```

And then add a new news item to the index.html file in the following format:

```html
<div class="news-item">
	<strong>2024-03-21:</strong> [Type] On the 21st of march I defended my Ph.D thesis entitled "Advances in flexible manipulation through the application of AI-based techniques". Cum Laude! <a href="#">More info here</a>
</div>
``` 