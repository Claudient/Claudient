#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const GITHUB_WORKFLOW_DIR = path.join(CWD, '.github', 'workflows');
const CI_WORKFLOW_PATH = path.join(GITHUB_WORKFLOW_DIR, 'uitkit-ci.yml');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

const WORKFLOW_YAML = `name: UitKit CI validation

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci || npm install

    - name: Run Core Codebase Validations
      run: npm run validate

    - name: Run Catalog Structure Validations
      run: npm run validate:catalog

    - name: Run Workspace Stacks Audits
      run: npm run validate:stacks

    - name: Execute CLI Smoke Tests
      id: run_tests
      run: npm test

    - name: Execute Self-Healing Repair Diagnostics on Failure
      if: failure() && steps.run_tests.outcome == 'failure'
      run: |
        echo "================================================================="
        echo "🚨 CI BUILD DETECTED TEST HARNESS REGRESSION!"
        echo "Running UitKit Self-Healing Diagnostician..."
        echo "================================================================="
        npx uitkit repair || true
        echo "Diagnostic logs compiled inside .claude/repair-context.json."
        echo "Pull this branch locally and execute 'npx uitkit repair' to auto-fix."
`;

function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${CYAN}SELF-HEALING CI PIPELINE SCAFFOLDER${RESET}`);
  console.log(`  ${YELLOW}Configuring GitHub Actions workspace with auto-healing diagnostic hooks...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  if (!fs.existsSync(GITHUB_WORKFLOW_DIR)) {
    fs.mkdirSync(GITHUB_WORKFLOW_DIR, { recursive: true });
  }

  try {
    fs.writeFileSync(CI_WORKFLOW_PATH, WORKFLOW_YAML, 'utf-8');
    console.log(`  ${GREEN}✔ GitHub Actions workflow created successfully:${RESET}`);
    console.log(`    ${CI_WORKFLOW_PATH}\n`);
    console.log(`  ${BOLD}The pipeline includes automatic 'npx uitkit repair' diagnostic captures${RESET}`);
    console.log(`  ${BOLD}that run on test failures, simplifying PR debugging workflows.${RESET}\n`);
  } catch (error) {
    console.error(`  ${RED}✗ Failed to scaffold GitHub Actions workflow:${RESET}`, error.message);
    process.exit(1);
  }
}

main();
