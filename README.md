# MDX Blog Template with WLJS Notebooks

***RELEASE IS NOT STABLE, PLEASE WAIT***

A basic MDX blog template that uses exported [WLJS Notebooks](https://wljs.io) as MDX files with assets, served as blog posts. This showcases how to integrate interactive Jupyter-style notebooks into a static blog setup using Next.js and MDX with minimal JS.

Each notebook is exported to MDX with associated assets (kernel files, original notebooks, attachments), which are served alongside the blog post content.

## Features

- 📝 SSG blog posts from exported WLJS Notebooks in MDX format
- 🚀 Interactive notebook content rendered alongside traditional blog post content
- 🧮 LaTeX and admonitions support
- WLJS blocks load lazily, while valid input expressions are shown as code blocks
- Low FCP (First Contentful Paint) and TTI (Time to Interactive) time
- 📦 Automatic asset management for notebook files and attachments (no need to manually place assets in the `public` folder)
- 🏷️ Support for basic post metadata (title, date, author, tags)
- 🔍 Automatic blog post discovery from `content/posts`
- 🧑‍🚀 Ready-to-go workflow for publishing the blog on GitHub Pages

## Project Structure

```
.
├── content/
│   └── posts/           # Your notebook posts in .mdx format
│       └──notebook-1/
│          ├── index.mdx      # Post in MDX
│          └── attachments/   # Any related assets
├── src/
│   ├── app/
│   │   ├── blog/        # Blog listing and post pages
│   │   ├── page.tsx     # Home page
│   │   ├── layout.tsx   # Root layout with navigation
│   │   └── globals.css  # Root styles
│   ├── components/      # React components
│   ├── lib/
│   │   └── mdx.ts       # MDX utilities for reading posts
│   └── styles/
└── public/              # Static assets (managed)
```

## Online demo
Please visit [wljsteam.github.io/web-components-mdx](https://wljsteam.github.io/web-components-mdx)

## Getting Started

### Prerequisites

- Node.js 22+ and npm/yarn/pnpm
- WLJS Notebook 2.9.2+ (only if WLJS features are needed)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Deployment (GitHub Pages)

1. Edit the repository name in
```bash
./next.config.ts
```

2. Commit and push

### Deployment (Any)

1. Edit the relative path in
```bash
./next.config.ts
```

2. Build and export
```bash
npm run export
```


## Creating Blog Posts

Blog posts are MDX files stored in the `content/posts` directory.

### Post Format

Each post can have frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2024-12-25"
description: "A brief description of your post"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Title

Your content goes here or generated data from WLJS Notebook
```

### Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date in YYYY-MM-DD format
- `description` (optional): Short description for the post listing
- `author` (optional): Author name
- `tags` (optional): Array of tags for categorization

### How to export WLJS notebooks
1. Open your notebook with WLJS app
2. Click `Share` and choose `MDX` (Static or Interactive)
3. Export to a new folder at `content/posts/` as `index.mdx`

All assets will be copied automatically.

## WLJS Code Block Renderer
Notebook interactivity, plots, and 2D/3D graphics are provided by a supporting [web component library](https://github.com/WLJSTeam/web-components) served as a single-entry JavaScript file loaded via CDN:

```
https://cdn.jsdelivr.net/gh/WLJSTeam/web-components@latest/src/common/app.js
```

In this template, it is included in the footer of `layout.tsx`.

```
├── src/
│   ├── app/
│   │   ├── layout.tsx   # <----------
```


This web component library is **framework-agnostic**; therefore, it is not directly integrated into the React ecosystem as a component. Instead, it is loaded as a script that registers a few custom elements required to render the notebook’s interactive building blocks.

By default, the web components are unstyled; you are free to customize them:

```
├── src/
│   ├── app/
│   │   └── globals.css  # <----------
```

The current styling in this template is designed to avoid major layout shifts during loading. It is important to show meaningful content before WLJS components are fully loaded.


## Available Scripts

- `npm run dev` - Start the development server
- `npm run export` - Export statics for Github Pages

## License

MIT
