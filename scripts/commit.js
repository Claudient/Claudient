#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

async function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${CYAN}SAFE COMMIT: LINT-ON-COMMIT ENFORCER${RESET}`);
  console.log(`  ${YELLOW}Verifying codebase integrity before committing changes...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const args = process.argv.slice(2);
  let commitMessage = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-m' || args[i] === '--message') {
      commitMessage = args[i + 1] || '';
      break;
    }
  }

  if (!commitMessage) {
    commitMessage = args.filter(a => !a.startsWith('-')).join(' ');
  }

  if (!commitMessage) {
    console.error(`${RED}Error: Commit message is required.${RESET}`);
    console.error(`Usage: npx uitkit commit -m "your message"`);
    process.exit(1);
  }

  console.log(`${CYAN}Starting pre-commit verification...${RESET}`);

  const steps = [
    { name: 'Core validations', cmd: 'npm run validate' },
    { name: 'Catalog structure validation', cmd: 'npm run validate:catalog' },
    { name: 'Workspace stacks verification', cmd: 'npm run validate:stacks' }
  ];

  if (process.env.UITKIT_TEST_SUITE !== 'true') {
    steps.push({ name: 'CLI smoke tests', cmd: 'npm run test' });
  }

  let failedStep = null;

  for (let step of steps) {
    console.log(`  Running: ${BOLD}${step.name}${RESET}...`);
    try {
      execSync(step.cmd, { stdio: 'ignore' });
      console.log(`  ${GREEN}✔ ${step.name} passed.${RESET}`);
    } catch (error) {
      console.log(`  ${RED}✗ ${step.name} failed!${RESET}`);
      failedStep = step;
      break;
    }
  }

  if (failedStep) {
    console.error(`\n${RED}🛑 Pre-commit verification FAILED at step: ${failedStep.name}.${RESET}`);
    console.error(`${YELLOW}Aborting commit operation. Running diagnostics via "npx uitkit repair"...${RESET}\n`);
    
    try {
      execSync('npx uitkit repair', { stdio: 'inherit' });
    } catch (e) {
      // ignore
    }
    
    process.exit(1);
  }

  console.log(`\n${GREEN}✔ All checks passed! Proceeding with commit...${RESET}`);
  console.log(`Commit Message: "${BOLD}${commitMessage}${RESET}"`);

  try {
    const output = execSync(`git commit --author="tushar2704 <tushar.inseec@gmail.com>" -m "${commitMessage.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    console.log(`\n${GREEN}✔ Git commit succeeded!${RESET}`);
    console.log(`${DIM}${output.trim()}${RESET}\n`);
  } catch (error) {
    console.error(`\n${RED}Error executing git commit:${RESET}`);
    console.error(error.stdout || '');
    console.error(error.stderr || error.message);
    process.exit(1);
  }
}

main();
