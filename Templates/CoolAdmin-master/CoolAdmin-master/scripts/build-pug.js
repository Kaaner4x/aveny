#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pug from 'pug';
import chokidar from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const pugRoot = path.join(repoRoot, 'src/pug');
const pagesDir = path.join(pugRoot, 'pages');

const watchMode = process.argv.includes('--watch');
let hadError = false;

async function compilePage(pugPath) {
  const name = path.basename(pugPath, '.pug');
  const htmlPath = path.join(repoRoot, `${name}.html`);
  try {
    const html = pug.renderFile(pugPath, {
      pretty: true,
      basedir: pugRoot,
      filename: pugPath,
      self: false
    });
    await fs.writeFile(htmlPath, html.trimStart(), 'utf8');
    process.stdout.write(`\x1b[32m✓\x1b[0m ${name}.pug → ${name}.html\n`);
  } catch (err) {
    hadError = true;
    process.stderr.write(`\x1b[31m✗\x1b[0m ${name}.pug — ${err.message}\n`);
  }
}

async function compileAll() {
  hadError = false;
  const files = await fs.readdir(pagesDir);
  const pugFiles = files.filter(f => f.endsWith('.pug')).sort();
  for (const f of pugFiles) {
    await compilePage(path.join(pagesDir, f));
  }
}

await compileAll();

if (watchMode) {
  process.stdout.write('\x1b[2m  watching src/pug/ for changes…\x1b[0m\n');
  chokidar.watch(`${pugRoot}/**/*.{pug,html}`, { ignoreInitial: true })
    .on('all', async (event, filepath) => {
      process.stdout.write(`\n[${event}] ${path.relative(repoRoot, filepath)}\n`);
      await compileAll();
    });
} else if (hadError) {
  process.exit(1);
}
