<div align="center">

<a href="https://thugg.lol"><img src="./assets/header.svg" width="100%" alt="m6jo9 — platform engineering / defensive security" /></a>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=17&duration=2600&pause=900&center=true&vCenter=true&width=680&height=38&color=26F7C7&lines=Platform+Engineering+%7C+Backend+Systems;Defensive+Security+%7C+Hardening+%7C+Observability;Single-operator+builds+%7C+Private+core+repos;Ship+small.+Measure+everything.+Trust+nothing." alt="" />

<br/>

<a href="https://thugg.lol"><img src="https://img.shields.io/badge/thugg.lol-live-0b0f14?style=for-the-badge&logo=vercel&logoColor=26f7c7&labelColor=0b0f14&color=26f7c7" alt="thugg.lol" /></a>
<a href="https://github.com/m6jo9"><img src="https://img.shields.io/badge/github-m6jo9-0b0f14?style=for-the-badge&logo=github&logoColor=26f7c7&labelColor=0b0f14&color=26f7c7" alt="github" /></a>
<a href="https://github.com/m6jo9?tab=followers"><img src="https://img.shields.io/github/followers/m6jo9?style=for-the-badge&logo=github&logoColor=26f7c7&labelColor=0b0f14&color=26f7c7&label=followers" alt="followers" /></a>
<img src="https://komarev.com/ghpvc/?username=m6jo9&style=for-the-badge&color=26f7c7&labelColor=0b0f14&label=visitors" alt="visitors" />

<img src="./assets/rule.svg" width="100%" alt="" />

</div>

### ▸ Operating Focus

```txt
> Infrastructure as code       reproducible, reviewable, disposable
> Hardened backend systems     least privilege by default, secrets never in transit
> Observability first          if it is not measured, it is not shipped
> Minimal surface              every dependency earns its place
```

<div align="center"><img src="./assets/rule.svg" width="100%" alt="" /></div>

### ▸ Selected Work

**[thugg.lol](https://thugg.lol)** — a full platform, run solo, end to end.

| Surface | What it is | Built with |
| :-- | :-- | :-- |
| Web | profiles, file host, storefront, admin plane | Next.js App Router, Supabase, Cloudflare R2 |
| Desktop | native capture and instant share client, signed auto-updates | Tauri v2, Rust, React, TypeScript |
| Automation | giveaways, moderation, delivery pipelines | Node, Discord API, Postgres |
| Delivery | tagged releases, CDN fan-out, staged rollout | GitHub Actions, R2, minisign |

<div align="center"><img src="./assets/rule.svg" width="100%" alt="" /></div>

### ▸ Systems Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=linux,docker,kubernetes,terraform,nginx,cloudflare,githubactions&theme=dark" alt="" />
  <br/>
  <img src="https://skillicons.dev/icons?i=go,rust,ts,js,nextjs,react,tauri&theme=dark" alt="" />
  <br/>
  <img src="https://skillicons.dev/icons?i=postgres,redis,supabase,prometheus,grafana,git,bash&theme=dark" alt="" />
</div>

```mermaid
%%{init:{"theme":"base","themeVariables":{"fontFamily":"Fira Code, monospace","primaryColor":"#0f1720","primaryTextColor":"#e6f7f3","primaryBorderColor":"#26f7c7","secondaryColor":"#101a22","tertiaryColor":"#0b0f14","lineColor":"#4b8f85","clusterBkg":"#0b0f14","clusterBorder":"#1f2b33"}}}%%
flowchart LR
  C(["clients"]) --> E["edge<br/>cdn · waf · rate limit"]
  E --> A["runtime<br/>next.js · rust · go"]
  A --> D[("state<br/>postgres · redis · object store")]
  A --> T["telemetry<br/>otel to prometheus"]
  T --> G["grafana<br/>slo · alerts"]
  G -. "feedback" .-> A
```

<div align="center"><img src="./assets/rule.svg" width="100%" alt="" /></div>

### ▸ Signals

<div align="center">

<img width="100%" src="https://raw.githubusercontent.com/m6jo9/m6jo9/output/stats.svg" alt="contribution telemetry: contributions, streaks, active days and a per-week bar chart" />

</div>

<div align="center"><img src="./assets/rule.svg" width="100%" alt="" /></div>

### ▸ Contribution Arcade

> The grid below is my real contribution graph, rerendered every night by a workflow in this repo and played back as three games.

<div align="center">

**pacman clears the year**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/m6jo9/m6jo9/output/pacman-contribution-graph-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/m6jo9/m6jo9/output/pacman-contribution-graph.svg" />
  <img src="https://raw.githubusercontent.com/m6jo9/m6jo9/output/pacman-contribution-graph-dark.svg" width="100%" alt="pacman eating my contribution graph" />
</picture>

**the snake eats the commits**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/m6jo9/m6jo9/output/snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/m6jo9/m6jo9/output/snake.svg" />
  <img src="https://raw.githubusercontent.com/m6jo9/m6jo9/output/snake-dark.svg" width="100%" alt="snake eating my contribution graph" />
</picture>

**breakout, for the ones that got away**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/m6jo9/m6jo9/output/breakout-contribution-graph-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/m6jo9/m6jo9/output/breakout-contribution-graph.svg" />
  <img src="https://raw.githubusercontent.com/m6jo9/m6jo9/output/breakout-contribution-graph-dark.svg" width="100%" alt="breakout played on my contribution graph" />
</picture>

</div>

<details>
<summary><b>How this page builds itself</b></summary>

<br/>

The header and the dividers are hand-authored SVG in [`assets/`](./assets) — SMIL and CSS keyframes only, no runtime and no third party, and they honour `prefers-reduced-motion`.

The telemetry card and the arcade are built by [`.github/workflows/contribution-graph.yml`](./.github/workflows/contribution-graph.yml). It reads the contribution calendar, renders the stat card with [`scripts/render-stats.mjs`](./scripts/render-stats.mjs), plays pacman, breakout and the snake over the same grid, then force-pushes the frames to a single-commit `output` branch — so the animations stay fresh while the repository history stays clean.

Nothing here depends on a third-party stats service. Most of them are paused, rate-limited or gone; this page renders its own.

```txt
cron 03:41  ->  render stats card          ->  collect  ->  force-push output
                render pacman + breakout
                render snake
push main   ->  same job, immediately
```

</details>

<div align="center">

<img src="./assets/rule.svg" width="100%" alt="" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=15&duration=3000&pause=1200&center=true&vCenter=true&width=560&height=32&color=26F7C7&lines=root%40thugg%3A~%23+build+something+that+stays+up." alt="" />

</div>
