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

## Hostinger CI/CD (GitHub Actions)

This repo includes an automated deployment workflow:

- Workflow file: `.github/workflows/deploy-personal-site.yml`
- Auto trigger: push to `main` when site files change
- Manual trigger: `workflow_dispatch` (with optional remote clean)

### Required repository secrets

Set these under GitHub repository settings (`Settings > Secrets and variables > Actions`):

- `HOSTINGER_FTP_HOST`
- `HOSTINGER_FTP_USER`
- `HOSTINGER_FTP_PASSWORD`
- `HOSTINGER_FTP_PROTOCOL` (`ftp` or `ftps`)
- `HOSTINGER_FTP_PORT` (for example `21` or `990`)
- `HOSTINGER_FTP_TARGET` (for example `/public_html/`)

### Deploy behavior

- Uploads site files from repo root to `HOSTINGER_FTP_TARGET`
- Excludes `.git`, `.github`, `scripts`, and `README.md`
- Uses sync state to keep uploads efficient
- Supports a manual "clean remote" mode for full replacement when needed

## Local IIS deploy

Run from an elevated PowerShell window:

```powershell
cd C:\Development\leonardbauling.com
.\scripts\Install-IISPrereqs.ps1
.\scripts\Deploy-LocalIIS.ps1 -Port 5151 -UseSourceAsPhysicalPath
```

Then open `http://localhost:5151/`.

Notes:
- `-UseSourceAsPhysicalPath` points IIS directly to the repo folder for instant local updates.
- Omit `-UseSourceAsPhysicalPath` to use the copy-to-`C:\inetpub\<site>` deployment mode.
