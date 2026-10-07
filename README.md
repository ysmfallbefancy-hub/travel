# Reisen & Geschichten

Deutschsprachiger Reiseblog auf Basis von [Astro](https://astro.build). Inhalte lassen sich über Sveltia CMS unter `/admin` bearbeiten. Das finale Design und das Deployment auf Cloudflare Pages folgen in eigenen Schritten.

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

## Redaktion (Sveltia CMS)

Das CMS liegt unter `/admin` (`public/admin/index.html` und `public/admin/config.yml`). Es speichert jede Änderung als Commit direkt in `main` dieses Repositorys; Cloudflare Pages baut die Website danach neu.

- **Beiträge** → `src/content/blog/`, Titelbilder → `src/assets/images/blog/`
- **Kategorien** → `src/content/categories/`
- **Autorinnen & Autoren** → `src/content/authors/`, Profilbilder → `src/assets/images/authors/`

Die Felder in `config.yml` müssen zum Schema in `src/content.config.ts` passen. Wer dort ein Feld ergänzt, ergänzt es auch im CMS.

Die Oberfläche ist deutsch, wenn der Browser auf Deutsch eingestellt ist (sonst unter Einstellungen → Sprache).

### Anmelden

- **Lokal:** `npm run dev`, dann http://localhost:4321/admin/ in Chrome oder Edge öffnen und „Mit lokalem Repository arbeiten“ wählen. Änderungen landen direkt im Arbeitsordner.
- **Mit Zugriffstoken:** „Mit Zugriffstoken anmelden“ und ein GitHub-Token (fine-grained, nur dieses Repository, Berechtigung *Contents: Read and write*) eingeben.
- **Mit GitHub-Login (OAuth):** braucht einen kleinen Vermittlungsdienst, siehe unten.

### GitHub-Login auf Cloudflare einrichten (beim Deployment)

GitHub erlaubt den Login nicht direkt aus dem Browser, deshalb braucht es den [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth), einen kostenlosen Cloudflare Worker.

1. Worker aus dem Sveltia-CMS-Auth-Repository in Cloudflare bereitstellen (Button „Deploy to Cloudflare“ in dessen README). Ergebnis: eine URL wie `https://sveltia-cms-auth.<konto>.workers.dev`.
2. Auf GitHub unter *Settings → Developer settings → OAuth Apps* eine neue OAuth-App anlegen:
   - Homepage URL: die Adresse der Website, z. B. `https://reisen-und-geschichten.pages.dev`
   - Authorization callback URL: `https://sveltia-cms-auth.<konto>.workers.dev/callback`
3. Im Worker unter *Settings → Variables* eintragen:
   - `GITHUB_CLIENT_ID` und `GITHUB_CLIENT_SECRET` (als Secret) aus der OAuth-App
   - `ALLOWED_DOMAINS`: die Domain(s) der Website, z. B. `reisen-und-geschichten.pages.dev` (bei eigener Domain auch diese)
4. In `public/admin/config.yml` bei `backend` die Zeile `base_url:` mit der Worker-URL einkommentieren.
5. Bei eigener Domain außerdem `site_url` und `display_url` in `config.yml` sowie `site` in `astro.config.mjs` anpassen.
