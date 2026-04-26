# burroeansia.github.io

Source for [burroeansia.github.io](https://burroeansia.github.io/) — the Italian-language food blog *Burro & Ansia*, by Davide & Selena.

Built with [Hugo](https://gohugo.io/) (extended, ≥ 0.128.0). Content was migrated from a WordPress export via `wp2static`, which is why posts are HTML files with TOML front matter and why the theme stack contains scaffolded WordPress skeletons.

## Local development

~~~bash
hugo server -D       # serves on http://localhost:1313 with drafts on
hugo --gc --minify   # one-shot production build into ./public
~~~

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml). The workflow installs Hugo extended, runs `hugo --gc --minify` with `--baseURL` set from `actions/configure-pages`, and uploads `./public` via `actions/deploy-pages`.

GitHub repository **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Repository layout

- `content/posts/` — articles (HTML body + TOML front matter).
- `themes/bea/` — the live theme (a hand-written Bard Pro look-alike).
- `themes/bard-pro-premium/` — the original WordPress theme as scaffolded by `wp2static`; mostly superseded by `bea`. See [`themes/bard-pro-premium/MIGRATION.md`](themes/bard-pro-premium/MIGRATION.md) for the list of PHP calls that could not be auto-translated.
- `themes/wp2static-defaults/` — bare fallback layouts that render only when neither of the above has a matching template.
- `static/uploads/` — image uploads carried over from WordPress.
- `static/images/social_share.png` — social share / Open Graph image used by the home page.

`hugo.toml` declares `theme = ["bea", "bard-pro-premium", "wp2static-defaults"]`; layouts and partials resolve in that order.

See [`CLAUDE.md`](CLAUDE.md) for deeper architecture notes (front-matter conventions, the `gallery` shortcode contract, menu config precedence).
