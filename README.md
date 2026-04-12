# leonardbauling.com

Static, AI-forward personal/professional portfolio site for Leonard Bauling.

## Stack

- HTML
- CSS
- Minimal JavaScript

## Structure

```text
.
|-- index.html
|-- robots.txt
|-- sitemap.xml
`-- assets
    |-- css/main.css
    |-- js/main.js
    |-- data/projects.json
    `-- img/
```

## Local run

Serve the folder with any static server.

```powershell
# Example with Python
python -m http.server 8080
```

Open `http://localhost:8080`.

## Content updates

- Edit hero/section copy in `index.html`.
- Edit project cards in `assets/data/projects.json`.
- Keep contact links and metadata current before go-live.

## Deployment

Deploy as static hosting (GitHub Pages, Cloudflare Pages, Netlify, or Hostinger static path).
