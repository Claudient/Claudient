#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');
const COB_MAP_PATH = path.join(CLAUDE_DIR, 'codebase-map.json');
const JIT_CONTEXT_PATH = path.join(CLAUDE_DIR, 'jit-context.md');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function main() {
  const args = process.argv.slice(2);
  const targetFile = args[0];

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${CYAN}JIT CONTEXT INJECTOR${RESET}`);
  console.log(`  ${YELLOW}Dynamically fetching dependency signatures to secure active file edit...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  if (!targetFile) {
    console.error(`${RED}Error: You must specify a target file path to run JIT context injection.${RESET}`);
    console.error(`Usage: npx uitkit jit <filepath>`);
    process.exit(1);
  }

  const relativePath = path.isAbsolute(targetFile) ? path.relative(CWD, targetFile) : targetFile;

  if (!fs.existsSync(path.join(CWD, relativePath))) {
    console.error(`${RED}Error: File not found at path: ${relativePath}${RESET}`);
    process.exit(1);
  }

  if (!fs.existsSync(COB_MAP_PATH)) {
    console.error(`${YELLOW}Warning: .claude/codebase-map.json not found. Run "npx uitkit map" to generate it.${RESET}`);
    process.exit(1);
  }

  let map = { nodes: [], edges: [] };
  try {
    map = JSON.parse(fs.readFileSync(COB_MAP_PATH, 'utf-8'));
  } catch (e) {
    console.error(`${RED}Error parsing codebase-map.json:${RESET}`, e.message);
    process.exit(1);
  }

  const targetNode = map.nodes.find(n => n.id === relativePath);
  
  const targetImports = map.edges
    .filter(e => e.source === relativePath && e.type === 'imports')
    .map(e => e.target);

  const targetDependents = map.edges
    .filter(e => e.target === relativePath && e.type === 'imports')
    .map(e => e.source);

  console.log(`Target: ${BOLD}${YELLOW}${relativePath}${RESET}`);
  console.log(`  - Direct Imports (Dependencies): ${GREEN}${targetImports.length}${RESET} files`);
  console.log(`  - Direct Dependents (Importers):  ${RED}${targetDependents.length}${RESET} files\n`);

  let mdContext = `# JIT Context Payload for \`${relativePath}\`\n\n`;
  mdContext += `Generated: ${new Date().toISOString()} | Reference Workspace: \`${CWD}\`\n\n`;

  if (targetNode) {
    mdContext += `## 📄 Target File Structure\n`;
    mdContext += `- **Path**: \`${targetNode.id}\`\n`;
    if (targetNode.classes && targetNode.classes.length > 0) {
      mdContext += `- **Classes**: ${targetNode.classes.map(c => `\`${c}\``).join(', ')}\n`;
    }
    if (targetNode.functions && targetNode.functions.length > 0) {
      mdContext += `- **Functions**: ${targetNode.functions.map(f => `\`${f}\``).join(', ')}\n`;
    }
    mdContext += `\n`;
  }

  mdContext += `## ⬅️ Dependencies (Modules Imported by Target)\n`;
  if (targetImports.length === 0) {
    mdContext += `*No direct workspace dependencies detected.*\n\n`;
  } else {
    targetImports.forEach(imp => {
      mdContext += `### 📁 \`${imp}\`\n`;
      const node = map.nodes.find(n => n.id === imp);
      if (node) {
        if (node.classes && node.classes.length > 0) {
          mdContext += `- **Classes**: ${node.classes.map(c => `\`${c}\``).join(', ')}\n`;
        }
        if (node.functions && node.functions.length > 0) {
          mdContext += `- **Functions**: ${node.functions.map(f => `\`${f}\``).join(', ')}\n`;
        }
      }
      
      const fullImpPath = path.join(CWD, imp);
      if (fs.existsSync(fullImpPath)) {
        const content = fs.readFileSync(fullImpPath, 'utf-8');
        const lines = content.split('\n');
        const exportLines = lines.filter(l => l.trim().startsWith('export') || l.trim().startsWith('module.exports'));
        if (exportLines.length > 0) {
          mdContext += `- **Exports detected**:\n  \`\`\`javascript\n  ${exportLines.map(l => l.trim()).join('\n  ')}\n  \`\`\`\n`;
        }
      }
      mdContext += `\n`;
    });
  }

  mdContext += `## ➡️ Dependents (Modules Importing Target)\n`;
  if (targetDependents.length === 0) {
    mdContext += `*No downstream dependents found. Leaf node.*\n\n`;
  } else {
    targetDependents.forEach(dep => {
      mdContext += `### 📁 \`${dep}\`\n`;
      const node = map.nodes.find(n => n.id === dep);
      if (node) {
        if (node.classes && node.classes.length > 0) {
          mdContext += `- **Classes**: ${node.classes.map(c => `\`${c}\``).join(', ')}\n`;
        }
        if (node.functions && node.functions.length > 0) {
          mdContext += `- **Functions**: ${node.functions.map(f => `\`${f}\``).join(', ')}\n`;
        }
      }
      mdContext += `\n`;
    });
  }

  if (!fs.existsSync(CLAUDE_DIR)) {
    fs.mkdirSync(CLAUDE_DIR, { recursive: true });
  }

  fs.writeFileSync(JIT_CONTEXT_PATH, mdContext, 'utf-8');
  
  console.log(`${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`📄 Saved JIT context compilation to: ${YELLOW}${JIT_CONTEXT_PATH}${RESET}`);
  console.log(`💡 You can now reference this context payload to avoid breaking changes.\n`);
}

main();
