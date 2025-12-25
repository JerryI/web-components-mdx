#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'posts');
const publicDir = path.join(process.cwd(), 'public', 'posts');

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
    const attachmentsDest = path.join(publicDir, postDir, 'attachments');

    if (fs.existsSync(attachmentsSource)) {
      copyRecursive(attachmentsSource, attachmentsDest);
    }
  });

  console.log('✅ Assets copied successfully');
}

// Replace attachment paths in MDX files
function replaceAssetPaths() {
  if (!fs.existsSync(contentDir)) {
    return;
  }

  const postDirs = fs.readdirSync(contentDir).filter((file) => {
    return fs.statSync(path.join(contentDir, file)).isDirectory();
  });

  postDirs.forEach((postDir) => {
    const postPath = path.join(contentDir, postDir);
    const files = fs.readdirSync(postPath);

    files.forEach((file) => {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(postPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace various attachment path formats with the public path
        const publicPath = `/posts/${postDir}/attachments`;
        
        // First, fix any doubled paths like /posts/example-2//posts/example-2/attachments/
        content = content.replace(new RegExp(`/posts/${postDir}//posts/${postDir}/attachments/`, 'g'), `${publicPath}/`);
        
        // Replace ./attachments/ with /posts/{postDir}/attachments/
        content = content.replace(/\.\/attachments\//g, `${publicPath}/`);
        
        // Replace attachments/ with /posts/{postDir}/attachments/ (but not if already /posts/)
        content = content.replace(/(?<!\/posts\/[^/]+)(?<!\.)\battachments\//g, `${publicPath}/`);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated paths in: ${path.relative(process.cwd(), filePath)}`);
      }
    });
  });

  console.log('✅ Asset paths updated successfully');
}

copyAttachments();
replaceAssetPaths();
