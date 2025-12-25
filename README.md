# MDX Blog Template with WLJS Notebooks

A basic MDX blog template example that uses exported WLJS Notebooks stored as MDX files with assets, served as blog posts. This showcases how to integrate interactive Jupyter-style notebooks into a modern blog setup using Next.js and MDX.

## Overview

This project demonstrates a blog application built with Next.js and MDX where blog posts are generated from WLJS (Wolfram Language Jupyter) Notebooks. Each notebook is exported to MDX format with associated assets (kernel files, notebooks, attachments) that are served alongside the blog post content.

## Features

- 📝 Blog posts from exported WLJS Notebooks in MDX format (Markdown + JSX)
- 📦 Asset management for notebook files and attachments
- 🏷️ Support for post metadata (title, date, author, tags)
- 🔍 Automatic blog post discovery from `content/posts`
- 💻 Interactive notebook content rendered alongside traditional blog post content

## Project Structure

```
.
├── content/
│   └── posts/           # Your blog posts in .mdx format
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

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Deployment

1. Build static:
```bash
npm run export 
```

2. Upload to Github Pages or preview
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

Your content goes here. You can use standard Markdown syntax.
```

### Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date in YYYY-MM-DD format
- `description` (optional): Short description for the post listing
- `author` (optional): Author name
- `tags` (optional): Array of tags for categorization

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run export` - Export statics for Github Pages

## Technologies

- **Next.js 15** - React framework with App Router
- **MDX** - Markdown + JSX support
- **TypeScript** - Type-safe JavaScript
- **next-mdx-remote** - MDX rendering in Next.js
- **gray-matter** - YAML front matter parsing

## License

MIT
