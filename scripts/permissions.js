#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

const CWD = process.cwd();
const LOCAL_SETTINGS = path.join(CWD, '.claude', 'settings.local.json');
const REGULAR_SETTINGS = path.join(CWD, '.claude', 'settings.json');
const GLOBAL_SETTINGS = path.join(os.homedir(), '.claude', 'settings.json');

function getSettingsPath() {
  if (fs.existsSync(LOCAL_SETTINGS)) return LOCAL_SETTINGS;
  if (fs.existsSync(REGULAR_SETTINGS)) return REGULAR_SETTINGS;
  if (fs.existsSync(GLOBAL_SETTINGS)) return GLOBAL_SETTINGS;
  return null;
}

function loadSettings(settingsPath) {
  if (!settingsPath || !fs.existsSync(settingsPath)) {
    return { permissions: { allow: [], deny: [] } };
  }
  try {
    return JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  } catch (e) {
    console.error(`${RED}Error parsing settings file at ${settingsPath}:${RESET}`, e.message);
    return { permissions: { allow: [], deny: [] } };
  }
}

function saveSettings(settingsPath, settings) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error(`${RED}Error writing settings file at ${settingsPath}:${RESET}`, e.message);
    return false;
  }
}

function listPermissions(allow, deny) {
  console.log(`${BOLD}${GREEN}Allowed Permission Rules (${allow.length}):${RESET}`);
  if (allow.length === 0) {
    console.log(`  ${DIM}(none)${RESET}`);
  } else {
    const groups = {};
    allow.forEach(p => {
      let type = 'Other';
      let match = p.match(/^([a-zA-Z0-9]+)\((.*)\)$/);
      if (match) {
        type = match[1];
        p = match[2];
      }
      if (!groups[type]) groups[type] = [];
      groups[type].push(p);
    });

    Object.keys(groups).forEach(type => {
      console.log(`\n  ${BOLD}${CYAN}• ${type}:${RESET}`);
      groups[type].forEach(rule => {
        console.log(`    - ${rule}`);
      });
    });
  }

  console.log(`\n${BOLD}${RED}Denied Permission Rules (${deny.length}):${RESET}`);
  if (deny.length === 0) {
    console.log(`  ${DIM}(none)${RESET}`);
  } else {
    deny.forEach(p => console.log(`  - ${p}`));
  }
  console.log();
}

function main() {
  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${CYAN}CLAUDE CODE PERMISSION EDITOR${RESET}`);
  console.log(`  ${YELLOW}Track and edit tool permissions given to your model...${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  const settingsPath = getSettingsPath();
  if (!settingsPath) {
    console.error(`${RED}Error: No settings.json or settings.local.json file found in workspace or ~/.claude directory.${RESET}`);
    console.error(`Please make sure Claude Code is installed and initialized.`);
    process.exit(1);
  }

  console.log(`Using settings file: ${YELLOW}${settingsPath}${RESET}\n`);
  const settings = loadSettings(settingsPath);
  
  if (!settings.permissions) {
    settings.permissions = { allow: [], deny: [] };
  }
  if (!settings.permissions.allow) settings.permissions.allow = [];
  if (!settings.permissions.deny) settings.permissions.deny = [];

  const args = process.argv.slice(2);
  const action = args[0];

  if (!action || action === 'list') {
    listPermissions(settings.permissions.allow, settings.permissions.deny);
    process.exit(0);
  }

  if (action === 'add' || action === 'allow') {
    const pattern = args.slice(1).join(' ');
    if (!pattern) {
      console.error(`${RED}Error: You must specify a permission pattern (e.g. "Bash(npm run *)" or "WebSearch").${RESET}`);
      process.exit(1);
    }
    if (settings.permissions.allow.includes(pattern)) {
      console.log(`${YELLOW}Rule already exists in ALLOW list: "${pattern}"${RESET}\n`);
    } else {
      settings.permissions.allow.push(pattern);
      if (saveSettings(settingsPath, settings)) {
        console.log(`  ${GREEN}✔ Added rule to ALLOW list: "${pattern}"${RESET}\n`);
      }
    }
    process.exit(0);
  }

  if (action === 'deny') {
    const pattern = args.slice(1).join(' ');
    if (!pattern) {
      console.error(`${RED}Error: You must specify a permission pattern to deny.${RESET}`);
      process.exit(1);
    }
    if (settings.permissions.deny.includes(pattern)) {
      console.log(`${YELLOW}Rule already exists in DENY list: "${pattern}"${RESET}\n`);
    } else {
      settings.permissions.deny.push(pattern);
      if (saveSettings(settingsPath, settings)) {
        console.log(`  ${GREEN}✔ Added rule to DENY list: "${pattern}"${RESET}\n`);
      }
    }
    process.exit(0);
  }

  if (action === 'remove' || action === 'revoke' || action === 'delete') {
    const pattern = args.slice(1).join(' ');
    if (!pattern) {
      console.error(`${RED}Error: You must specify the permission pattern to remove.${RESET}`);
      process.exit(1);
    }
    
    let removed = false;
    
    const allowIdx = settings.permissions.allow.indexOf(pattern);
    if (allowIdx > -1) {
      settings.permissions.allow.splice(allowIdx, 1);
      removed = true;
    }
    
    const denyIdx = settings.permissions.deny.indexOf(pattern);
    if (denyIdx > -1) {
      settings.permissions.deny.splice(denyIdx, 1);
      removed = true;
    }

    if (removed) {
      if (saveSettings(settingsPath, settings)) {
        console.log(`  ${GREEN}✔ Revoked permission rule: "${pattern}"${RESET}\n`);
      }
    } else {
      console.log(`${YELLOW}No matching permission rule found for: "${pattern}"${RESET}\n`);
    }
    process.exit(0);
  }

  console.error(`${RED}Unknown action: "${action}"${RESET}`);
  console.error(`Available commands:`);
  console.error(`  npx uitkit permissions list`);
  console.error(`  npx uitkit permissions allow <rule>`);
  console.error(`  npx uitkit permissions deny <rule>`);
  console.error(`  npx uitkit permissions remove <rule>`);
  process.exit(1);
}

main();
