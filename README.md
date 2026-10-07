# Reisen & Geschichten

Deutschsprachiger Reiseblog auf Basis von [Astro](https://astro.build). Sveltia CMS (`/admin`), das finale Design und das Deployment auf Cloudflare Pages folgen in eigenen Schritten.

## Entwicklung

Voraussetzung: Node.js 22.12 oder neuer.

```sh
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # statische Website nach ./dist
npm run check    # Typprüfung
```

## Inhalte

| Ordner | Inhalt |
| --- | --- |
| `src/content/blog/` | Blogbeiträge als Markdown (`title`, `description`, `date`, `cover`, `coverAlt`, `category`, `author`, `tags`, `featured`, `draft`) |
| `src/content/categories/` | Kategorien als JSON, der Dateiname ist der Slug |
| `src/content/authors/` | Autorinnen und Autoren als JSON |
| `src/assets/images/` | Bilder, werden von Astro optimiert |

Das Schema steht in `src/content.config.ts`, Website-Titel und Navigation in `src/consts.ts`.

## Seiten

| Route | Seite |
| --- | --- |
| `/` | Startseite |
| `/blog/` | Alle Beiträge (mit Seitennavigation) |
| `/blog/<slug>/` | Beitrag |
| `/kategorien/` | Übersicht der Kategorien |
| `/kategorie/<slug>/` | Beiträge einer Kategorie |
| `/ueber-uns/` | Über uns / Autoren |
| `/impressum/`, `/datenschutz/` | Rechtliches (Platzhalter) |
| `/rss.xml`, `/sitemap-index.xml` | Feed und Sitemap |
