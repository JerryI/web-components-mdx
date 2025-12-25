# MDX Blog Template with WLJS Notebooks

A basic MDX blog template example that uses exported WLJS Notebooks stored as MDX files with assets, served as blog posts. This showcases how to integrate interactive Jupyter-style notebooks into a modern blog setup using Next.js and MDX.

## Overview

This project demonstrates a blog application built with Next.js and MDX where blog posts are generated from WLJS (Wolfram Language Jupyter) Notebooks. Each notebook is exported to MDX format with associated assets (kernel files, notebooks, attachments) that are served alongside the blog post content.

## Features

- 📝 Blog posts from exported WLJS Notebooks in MDX format (Markdown + JSX + LaTeX + WLJS code blocks)
- 🚀 Interactive notebook content rendered alongside traditional blog post content
- Assets are loaded lazily, while valid input expressions are shown in code blocks
- 📦 Automatic asset management for notebook files and attachments (no need to think about what to put into `public` folder)
- 🏷️ Support for post metadata (title, date, author, tags)
- 🔍 Automatic blog post discovery from `content/posts`
- 🧑‍🚀 Export to Github Pages (recipy included)

## Project Structure

```
.
├── content/
│   └── posts/           # Your notebook posts in .mdx format
├── src/
│   ├── app/
│   │   ├── blog/        # Blog listing and post pages
│   │   ├── page.tsx     # Home page
│   │   └── layout.tsx   # Root layout with navigation
│   ├── components/      # React components
│   ├── lib/
│   │   └── mdx.ts       # MDX utilities for reading posts
│   └── styles/
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 22+ and npm/yarn/pnpm
- WLJS Notebook >= 2.9.2

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Deployment (Github Pages)

1. Edit the repository name at
```bash
./next.config.ts
```

2. Commit and push

### Deployment (Any)

1. Edit the relative path at
```bash
./next.config.ts
```

2. Build and export
```bash
npm run export
```

3. Test locally (optional)

*remove relative path from next.config.ts to make it work locally*

```bash
npx serve out
```


## Creating Blog Posts

Blog posts are MDX files stored in the `content/posts` directory.

### Post Format

Each post should have frontmatter at the top:

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

## Available Scripts

- `npm run dev` - Start the development server
- `npm run export` - Export statics for Github Pages

## License

MIT
