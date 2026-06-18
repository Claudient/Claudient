#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const CLAUDE_DIR = path.join(CWD, '.claude');

function main() {
  const BOLD = '\x1b[1m';
  const GREEN = '\x1b[32m';
  const YELLOW = '\x1b[33m';
  const RED = '\x1b[31m';
  const CYAN = '\x1b[36m';
  const RESET = '\x1b[0m';

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${RED}AUTONOMOUS SELF-HEALING REPAIR RUNNER${RESET}`);
  console.log(`  ${YELLOW}Executing project tests and capturing failures for AI diagnostics...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  console.log('⚡ Running test harness (npm test)...');

  // Choose npm command according to platform
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(npmCmd, ['test'], { cwd: CWD, stdio: 'pipe' });

  let stdout = '';
  let stderr = '';

  child.stdout.on('data', (data) => {
    stdout += data.toString();
    process.stdout.write(data);
  });

  child.stderr.on('data', (data) => {
    stderr += data.toString();
    process.stderr.write(data);
  });

  child.on('close', (code) => {
    console.log(`\n${BOLD}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
    if (code === 0) {
      console.log(`\n${GREEN}✓ SUCCESS! All tests passed cleanly. No self-healing repair necessary.${RESET}\n`);
      process.exit(0);
    }

    console.log(`\n${RED}✗ FAILURE! Test suite exited with non-zero code: ${code}${RESET}`);
    console.log(`Analyzing output logs for diagnostic patterns...`);

    const fullLog = stdout + '\n' + stderr;
    const errors = [];

    // Parse JS/TS stack trace / assertion failures
    const errorMatches = fullLog.matchAll(/(Error|AssertionError|TypeError): ([^\n]+)/g);
    for (const match of errorMatches) {
      errors.push({ type: match[1], message: match[2] });
    }

    // Try finding file paths with line numbers (e.g. at /path/to/file.js:42:15)
    const fileMatches = fullLog.matchAll(/at\s+.*?\s*\((.*?):(\d+):(\d+)\)/g) || [];
    const filesInvolved = [];
    for (const match of fileMatches) {
      const filePath = match[1];
      if (filePath.startsWith('/') && !filePath.includes('node_modules')) {
        filesInvolved.push({
          path: path.relative(CWD, filePath),
          line: parseInt(match[2]),
          column: parseInt(match[3])
        });
      }
    }

    // Deduplicate files
    const uniqueFiles = Array.from(new Set(filesInvolved.map(f => f.path)))
      .map(p => filesInvolved.find(f => f.path === p))
      .slice(0, 5);

    const diagnostics = {
      exitCode: code,
      summary: errors[0]?.message || 'Unknown test runner error assertion',
      errors: errors.slice(0, 5),
      files: uniqueFiles,
      timestamp: new Date().toISOString()
    };

    if (!fs.existsSync(CLAUDE_DIR)) {
      fs.mkdirSync(CLAUDE_DIR, { recursive: true });
    }

    const contextPath = path.join(CLAUDE_DIR, 'repair-context.json');
    fs.writeFileSync(contextPath, JSON.stringify(diagnostics, null, 2), 'utf-8');

    console.log(`\n${BOLD}--- AI SELF-HEALING DIAGNOSTIC ---${RESET}`);
    console.log(`⚠️  ${BOLD}Primary Issue:${RESET} ${diagnostics.summary}`);
    if (diagnostics.files.length > 0) {
      console.log(`📂  ${BOLD}Impacted Files:${RESET}`);
      diagnostics.files.forEach(f => console.log(`    - ${CYAN}${f.path}${RESET}:${f.line}`));
    }
    console.log(`\n💾 Saved diagnostic context payload to: ${YELLOW}${contextPath}${RESET}`);
    console.log(`\n${BOLD}To self-heal this error, trigger Claude Code to run:${RESET}`);
    console.log(`   ${CYAN}"Read .claude/repair-context.json, analyze the logs, and apply code edits to fix the failure."${RESET}\n`);
    
    // Exit with code 1 to indicate failure
    process.exit(1);
  });
}

main();
