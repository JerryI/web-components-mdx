# MDX Blog

A simple, modern blog application built with Next.js and MDX. Write your blog posts in Markdown with the power of React components.

## Features

- 📝 Write blog posts in MDX format (Markdown + JSX)
- 🎨 Clean, responsive design with Tailwind CSS
- ⚡ Fast performance with Next.js App Router
- 🏷️ Support for post metadata (title, date, author, tags)
- 🔍 Automatic blog post discovery from `content/posts`
- 📱 Fully responsive design
- 🔗 SEO-friendly with proper metadata

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

3. Open http://localhost:3000 in your browser

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
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Technologies

- **Next.js 15** - React framework with App Router
- **MDX** - Markdown + JSX support
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **next-mdx-remote** - MDX rendering in Next.js
- **gray-matter** - YAML front matter parsing

## Deployment

Build and deploy to any platform supporting Next.js (Vercel, Netlify, etc.)

```bash
npm run build
npm start
```

## License

MIT
