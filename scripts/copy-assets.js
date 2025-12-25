#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'posts');
// For static export, assets should live under public/blog/{slug}/attachments
const publicBlogDir = path.join(process.cwd(), 'public', 'blog');

function copyRecursive(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      // Only copy attachments (files in attachments folders)
      if (src.includes('attachments')) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied: ${path.relative(process.cwd(), destFile)}`);
      }
    }
  });
}

// Only copy attachments directories
function copyAttachments() {
  if (!fs.existsSync(contentDir)) {
    console.log('Content directory not found');
    return;
  }

  const postDirs = fs.readdirSync(contentDir).filter((file) => {
    return fs.statSync(path.join(contentDir, file)).isDirectory();
  });

  postDirs.forEach((postDir) => {
    const attachmentsSource = path.join(contentDir, postDir, 'attachments');
    const attachmentsDestBlog = path.join(publicBlogDir, postDir, 'attachments');

    if (fs.existsSync(attachmentsSource)) {
      copyRecursive(attachmentsSource, attachmentsDestBlog);
    }
  });

  console.log('✅ Assets copied successfully');
}

// For static export we keep MDX paths relative (attachments/...), so no rewriting.
copyAttachments();

