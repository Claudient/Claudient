#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CWD = process.cwd();

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (q) => new Promise(resolve => rl.question(q, resolve));

  const BOLD = '\x1b[1m';
  const GREEN = '\x1b[32m';
  const YELLOW = '\x1b[33m';
  const RESET = '\x1b[0m';
  const CYAN = '\x1b[36m';

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${GREEN}GITHUB SPEC KIT SPECIFY-WIZARD${RESET}`);
  console.log(`  ${YELLOW}Interactive wizard to generate SPEC.md and CONSTITUTION.md templates${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const projectName = (await ask(`${BOLD}1. Project Name:${RESET} [my-app] `)).trim() || 'my-app';
  
  console.log(`\n${BOLD}2. Core Technology Stack:${RESET}`);
  console.log('   e.g., Next.js 15, FastAPI, Django, Express, Ruby on Rails');
  const techStack = (await ask('   Stack: [Next.js 15] ')).trim() || 'Next.js 15';

  console.log(`\n${BOLD}3. Language Constraints:${RESET}`);
  console.log('   1. TypeScript (strict)');
  console.log('   2. JavaScript (modern)');
  console.log('   3. Python (type hinted)');
  console.log('   4. Other');
  const langChoice = (await ask('   Select: [1] ')).trim() || '1';
  let language = 'TypeScript';
  if (langChoice === '2') language = 'JavaScript';
  else if (langChoice === '3') language = 'Python';
  else if (langChoice === '4') language = (await ask('   Specify language: ')).trim() || 'Other';

  console.log(`\n${BOLD}4. Styling Framework:${RESET}`);
  console.log('   1. Tailwind CSS');
  console.log('   2. CSS Modules');
  console.log('   3. Vanilla CSS');
  console.log('   4. None / Backend only');
  const styleChoice = (await ask('   Select: [1] ')).trim() || '1';
  let styling = 'Tailwind CSS';
  if (styleChoice === '2') styling = 'CSS Modules';
  else if (styleChoice === '3') styling = 'Vanilla CSS';
  else if (styleChoice === '4') styling = 'None / Backend';

  console.log(`\n${BOLD}5. Restricted Libraries / APIs:${RESET}`);
  console.log('   List libraries that Claude is FORBIDDEN to install or use (e.g., Lodash, Axios, Moment):');
  const restrictedLibs = (await ask('   Forbidden (comma-separated): [Lodash] ')).trim() || 'Lodash';

  console.log(`\n${BOLD}6. Security & Compliance Policies:${RESET}`);
  console.log('   List security priorities (e.g., No raw SQL, No inline styles, Sanitize HTML):');
  const securityPolicies = (await ask('   Security: [No inline styles, No raw SQL] ')).trim() || 'No inline styles, No raw SQL';

  rl.close();

  // Create SPEC.md
  const specContent = `# Project Specification: ${projectName}

## 🎯 High-Level Overview
This project is built using **${techStack}** and adheres to strict architecture standards.

## 🛠️ Technology Stack
- **Framework**: ${techStack}
- **Language**: ${language}
- **Styling**: ${styling}

## 📐 Architecture Guidelines
1. Code structure must separate controllers/handlers, business services, and database layers.
2. All new components must have unit test files co-located or under a \`tests/\` folder.
3. Every major system decision must be accompanied by an ADR (Architecture Decision Record) in the docs folder.
`;

  // Create CONSTITUTION.md
  let constContent = `# Codebase Constitution

This file outlines the core invariants and rules of the road for the **${projectName}** repository. These rules are monitored and enforced at checkout/commit time.

## 📜 Core Invariants

### 1. Language Rules
- **Constraint**: Language must be ${language}.
- **Enforcement**: JavaScript (.js) files are blocked if TypeScript is required.

### 2. Styling Rules
- **Constraint**: ${styling === 'Tailwind CSS' ? 'Use Tailwind CSS utility classes.' : `Style using ${styling}`}.
- **Enforcement**: Direct CSS properties or inline styling are flagged.

### 3. Library Constraints
- **Forbidden**: ${restrictedLibs}
- **Enforcement**: Code imports containing forbidden packages will be rejected.

### 4. Security Constraints
- **Rules**: ${securityPolicies}
- **Enforcement**: Non-compliant code structures are blocked by security review hooks.
`;

  const specPath = path.join(CWD, 'SPEC.md');
  const constPath = path.join(CWD, 'CONSTITUTION.md');

  fs.writeFileSync(specPath, specContent, 'utf-8');
  fs.writeFileSync(constPath, constContent, 'utf-8');

  console.log(`\n${GREEN}✓ Success! Created Spec Kit templates in project root:${RESET}`);
  console.log(`  📄 SPEC.md -> ${YELLOW}${specPath}${RESET}`);
  console.log(`  📄 CONSTITUTION.md -> ${YELLOW}${constPath}${RESET}`);
  console.log(`\n${BOLD}Tip:${RESET} Install the \`constitution-guard\` hook to automatically enforce these invariants in Claude Code:`);
  console.log(`  ${CYAN}npx claudient add hooks${RESET}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
