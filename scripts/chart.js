#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');

const EXCLUDED_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  'out',
  '.vercel',
  '.astro',
  'node_modules'
];

const SUPPORTED_EXTS = ['.js', '.jsx', '.ts', '.tsx', '.py'];

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(CWD, fullPath);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.includes(entry.name)) continue;
      walk(fullPath, fileList);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTS.includes(ext)) {
        fileList.push({ fullPath, relPath, ext });
      }
    }
  }
  return fileList;
}

function parseFile(file) {
  const content = fs.readFileSync(file.fullPath, 'utf-8');
  const lines = content.split('\n');

  const info = {
    id: file.relPath,
    label: path.basename(file.relPath),
    type: 'file',
    ext: file.ext,
    imports: [],
    classes: [],
    functions: []
  };

  const isPy = file.ext === '.py';

  for (let line of lines) {
    line = line.trim();

    if (isPy) {
      // Python imports
      if (line.startsWith('import ') || line.startsWith('from ')) {
        const parts = line.split(/\s+/);
        if (parts[1]) info.imports.push(parts[1].replace(/,$/, ''));
      }
      // Python classes
      if (line.startsWith('class ')) {
        const match = line.match(/^class\s+([a-zA-Z0-9_]+)/);
        if (match) info.classes.push(match[1]);
      }
      // Python functions
      if (line.startsWith('def ')) {
        const match = line.match(/^def\s+([a-zA-Z0-9_]+)/);
        if (match) info.functions.push(match[1]);
      }
    } else {
      // JS/TS imports
      if (line.startsWith('import ') || line.includes('require(')) {
        const importMatch = line.match(/from\s+['"](.+?)['"]/) || line.match(/require\(['"](.+?)['"]\)/);
        if (importMatch) info.imports.push(importMatch[1]);
      }
      // JS/TS classes
      if (line.startsWith('class ') || line.includes('export class ')) {
        const match = line.match(/(?:export\s+)?class\s+([a-zA-Z0-9_]+)/);
        if (match) info.classes.push(match[1]);
      }
      // JS/TS functions
      if (line.startsWith('function ') || line.includes('export function ') || line.includes('const ') && line.includes('=>')) {
        const funcMatch = line.match(/(?:export\s+)?function\s+([a-zA-Z0-9_]+)/) || line.match(/const\s+([a-zA-Z0-9_]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/);
        if (funcMatch) info.functions.push(funcMatch[1]);
      }
    }
  }

  // Deduplicate and filter local imports
  info.imports = [...new Set(info.imports)].filter(imp => {
    return imp.startsWith('.') || imp.startsWith('/') || imp.includes('/') || imp.length > 2;
  });

  return info;
}

function main() {
  const BOLD = '\x1b[1m';
  const GREEN = '\x1b[32m';
  const YELLOW = '\x1b[33m';
  const RESET = '\x1b[0m';
  const CYAN = '\x1b[36m';

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${GREEN}SONAR CODEBASE CARTOGRAPHER${RESET}`);
  console.log(`  ${YELLOW}Mapping directories recursively and generating dependency graph...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const files = walk(CWD);
  console.log(`🔍 Detected ${BOLD}${files.length}${RESET} source files under current workspace.`);

  const nodes = [];
  const edges = [];

  for (const file of files) {
    const node = parseFile(file);
    nodes.push(node);

    // Add edges for local file imports
    node.imports.forEach(imp => {
      // Attempt to resolve local relative path imports
      if (imp.startsWith('.')) {
        const dir = path.dirname(file.fullPath);
        const resolvedPath = path.resolve(dir, imp);
        
        // Try resolving extensions
        let matchRel = null;
        for (const ext of SUPPORTED_EXTS) {
          const testPath = resolvedPath + ext;
          if (fs.existsSync(testPath)) {
            matchRel = path.relative(CWD, testPath);
            break;
          }
          const indexTest = path.join(resolvedPath, 'index' + ext);
          if (fs.existsSync(indexTest)) {
            matchRel = path.relative(CWD, indexTest);
            break;
          }
        }
        if (matchRel) {
          edges.push({
            source: node.id,
            target: matchRel,
            type: 'imports'
          });
        }
      }
    });
  }

  // Summary stats
  const totalClasses = nodes.reduce((sum, n) => sum + n.classes.length, 0);
  const totalFuncs = nodes.reduce((sum, n) => sum + n.functions.length, 0);

  console.log(`✓ Scanned classes: ${BOLD}${totalClasses}${RESET}`);
  console.log(`✓ Scanned functions: ${BOLD}${totalFuncs}${RESET}`);
  console.log(`✓ Mapped import links: ${BOLD}${edges.length}${RESET}`);

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  const mapPath = path.join(CLAUDE_DIR, 'codebase-map.json');
  fs.writeFileSync(mapPath, JSON.stringify({ nodes, edges }, null, 2), 'utf-8');

  console.log(`\n${GREEN}✓ Success! Mapped codebase graph successfully saved to:${RESET}`);
  console.log(`  ${YELLOW}${mapPath}${RESET}\n`);
}

main();
