# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Burro & Ansia` — an Italian-language food blog (`hugo.toml` `defaultContentLanguage = "it"`) built as a Hugo static site. The current content was migrated from WordPress via the `wp2static` tooling, which is why posts are HTML files (not Markdown) with TOML front matter, and why the theme stack contains scaffolded WordPress skeletons.

Hugo extended ≥ v0.128.0 is required (`/usr/local/bin/hugo`).

## Common commands

```bash
hugo server -D            # dev server with drafts on http://localhost:1313
hugo                      # build to ./public (the committed output dir)
hugo --gc --minify        # production build
hugo new posts/<slug>.md  # scaffold from themes/bea/archetypes/default.md
```

There is no test suite, linter, or package manager — the repo is plain Hugo + static assets.

## Architecture

### Three-theme chain

`hugo.toml` declares `theme = ["bea", "bard-pro-premium", "wp2static-defaults"]`. Hugo resolves layouts/partials in that priority order, so understanding which theme owns a template matters when editing:

1. **`themes/bea/`** — the live, hand-written theme. A Bard-Pro look-alike with a featured slider, blog grid + right sidebar, single post layout. This is where most layout edits should land. Entry points: `layouts/_default/{baseof,list,single}.html`, `layouts/index.html`, `layouts/partials/{top-bar,main-nav,header,slider,post-card,sidebar,footer}.html`.
2. **`themes/bard-pro-premium/`** — a `wp2static`-scaffolded skeleton of the original WordPress theme. Most of its `layouts/partials/templates/**` files contain `wp2static unmapped` markers for PHP calls (Customizer options, widget areas, ACF fields) that could not be auto-translated. Read `themes/bard-pro-premium/MIGRATION.md` first if you need to port a piece of original-theme behaviour — it lists every dropped PHP call by file. Do **not** treat this theme as production-ready; in practice `bea` overrides anything that matters.
3. **`themes/wp2static-defaults/`** — bare list/single fallbacks that render only when neither of the above has a matching template.

The shortcode `layouts/shortcodes/gallery.html` is also part of the wp2static contract: it is emitted whenever a migrated post contained a WordPress `[gallery]` or `[FinalTilesGallery]` shortcode. Its parameters (`images` = comma-separated URLs, optional `title`) are produced by wp2static, so don't change the parameter names without updating the migration tooling.

### Content conventions

- Posts live in `content/posts/*.html` (one file per article, ~54 today). Each starts with TOML front matter delimited by `+++`. The `bea` theme reads these front-matter keys: `title`, `date`, `slug`, `lastmod`, `categories`, `tags`, `image`, `author`, and `featured` (boolean).
- The homepage slider (`themes/bea/layouts/partials/slider.html`) shows up to 6 posts where `featured = true`. Setting `featured = true` on a post is the only way to surface it there.
- Taxonomies are `category` and `tag` (see `[taxonomies]` in `hugo.toml`). Category/tag links in single.html are constructed manually via `printf "categories/%s" (urlize $cat)` rather than `.RelPermalink`, so renaming the taxonomy slugs requires editing the templates too.
- Image paths in front matter and post bodies are typically `/uploads/YYYY/MM/...`, served from `static/uploads/`. The legacy `https://burroeansia.files.wordpress.com/...` URLs still appear inline in some migrated posts.
- The archetype at `themes/bea/archetypes/default.md` is the canonical front-matter shape for new posts (uses YAML, even though existing migrated posts use TOML — both are valid).

### Menus and site config

- `hugo.toml` defines `[menu.main]` inline. `config/_default/menu.toml` defines a richer menu (including a `[[top]]` social menu) and **overrides** the inline definition because `config/_default/` takes precedence. When editing nav, edit `config/_default/menu.toml`.
- `[markup.goldmark.renderer]` has `unsafe = true` because migrated WordPress HTML is embedded directly inside Markdown/HTML content; do not turn this off without re-auditing every post.

### Generated output

`public/` is the built site and is checked in. If you change layouts or content, rebuild with `hugo` so the committed output stays in sync — downstream deployment likely consumes `public/` directly rather than re-running Hugo.
