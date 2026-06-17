#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const REPO_ROOT = path.resolve(__dirname, '..');

const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function getAvailableStacks() {
  const stacksDir = path.join(REPO_ROOT, 'professional-stacks');
  if (!fs.existsSync(stacksDir)) return [];
  return fs.readdirSync(stacksDir).filter(f => {
    return fs.statSync(path.join(stacksDir, f)).isDirectory();
  });
}

function findStack(query) {
  const stacks = getAvailableStacks();
  const normalizedQuery = query.toLowerCase().replace(/[\s-_]/g, '');

  // 1. Exact match
  let matched = stacks.find(s => s.toLowerCase().replace(/[\s-_]/g, '') === normalizedQuery);
  if (matched) return matched;

  // 2. Contains query
  matched = stacks.find(s => s.toLowerCase().replace(/[\s-_]/g, '').includes(normalizedQuery));
  if (matched) return matched;

  // 3. Try appending _stack
  matched = stacks.find(s => s.toLowerCase().replace(/[\s-_]/g, '').includes(normalizedQuery + 'stack'));
  if (matched) return matched;

  return null;
}

function parseClaudeMd(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const data = {
    title: '',
    tagline: '',
    persona: '',
    skills: [],
    commands: [],
    hooks: []
  };

  data.title = lines[0].replace(/^#\s+/, '').trim();
  
  // Find tagline
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l && !l.startsWith('---') && !l.startsWith('#')) {
      data.tagline = l;
      break;
    }
  }

  // Section parsing
  let currentSection = '';
  let sectionLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      // Process previous section
      processSection(currentSection, sectionLines, data);
      currentSection = line.replace('## ', '').trim().toLowerCase();
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }
  // Process last section
  processSection(currentSection, sectionLines, data);

  return data;
}

function processSection(name, lines, data) {
  if (!name) return;
  const content = lines.join('\n').trim();

  if (name.includes('identity') || name.includes('persona')) {
    data.persona = content;
  } else if (name.includes('skills')) {
    // Parse markdown table rows
    const rows = content.split('\n').slice(2); // Skip header and separator
    for (const r of rows) {
      const parts = r.split('|').map(p => p.trim());
      if (parts.length >= 4) {
        data.skills.push({
          name: parts[1].replace(/`/g, ''),
          trigger: parts[2],
          purpose: parts[3]
        });
      }
    }
  } else if (name.includes('commands')) {
    const items = content.split('\n');
    for (const item of items) {
      const match = item.match(/^-\s+\*\*(.+?)\*\*\s+—\s+(.+)$/);
      if (match) {
        data.commands.push({ name: match[1], desc: match[2] });
      } else {
        const fallbackMatch = item.match(/^-\s+(.+?)\s+—\s+(.+)$/);
        if (fallbackMatch) {
          data.commands.push({ name: fallbackMatch[1], desc: fallbackMatch[2] });
        }
      }
    }
  } else if (name.includes('hooks')) {
    const items = content.split('\n');
    for (const item of items) {
      const match = item.match(/^-\s+\*\*(.+?)\*\*\s+—\s+(.+)$/);
      if (match) {
        data.hooks.push({ name: match[1], desc: match[2] });
      } else {
        const fallbackMatch = item.match(/^-\s+(.+?)\s+—\s+(.+)$/);
        if (fallbackMatch) {
          data.hooks.push({ name: fallbackMatch[1], desc: fallbackMatch[2] });
        }
      }
    }
  }
}

async function promptObjective() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`\n${BOLD}Define the Swarm Objective/Task:${RESET}\n> `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function makeProgressBar(percent, width = 20) {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return '[' + GREEN + '#'.repeat(filled) + RESET + '-'.repeat(empty) + ']';
}

async function main() {
  const args = process.argv.slice(2);
  const query = args[0];

  if (!query) {
    console.error(`Error: Specify a domain stack name to trigger the Claude Council.
Available domains:
  sdr, devops, fullstack, founder, compliance, data_engineer, qa_testing, etc.

Example:
  npx claudient council sdr`);
    process.exit(1);
  }

  const stackName = findStack(query);
  if (!stackName) {
    console.error(`Error: Could not find domain stack matching "${query}".
Run ${BOLD}npx claudient list structures${RESET} to view all available workspaces.`);
    process.exit(1);
  }

  const stackPath = path.join(REPO_ROOT, 'professional-stacks', stackName);
  const claudeMdPath = path.join(stackPath, 'CLAUDE.md');
  const stackData = parseClaudeMd(claudeMdPath);

  if (!stackData) {
    console.error(`Error: Failed to parse CLAUDE.md for stack "${stackName}" at ${claudeMdPath}`);
    process.exit(1);
  }

  console.log(`\n${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}`);
  console.log(`  ${BOLD}${MAGENTA}ASSEMBLING CLAUDE COUNCIL: ${stackData.title.toUpperCase()}${RESET}`);
  console.log(`  ${DIM}${stackData.tagline}${RESET}`);
  console.log(`${BOLD}${CYAN}══════════════════════════════════════════════════════════════════════════════════${RESET}\n`);

  // Loading animation logs
  console.log(`${GREEN}✔${RESET} Resolved stack folder: ${YELLOW}${stackName}${RESET}`);
  
  // Loading Persona
  console.log(`${GREEN}✔${RESET} Loading primary persona...`);
  console.log(`  ${DIM}"${stackData.persona.slice(0, 150)}..."${RESET}`);

  // Loading Skills
  if (stackData.skills.length > 0) {
    console.log(`${GREEN}✔${RESET} Deploying specialized skills (${stackData.skills.length}):`);
    stackData.skills.forEach(s => console.log(`  ${CYAN}•${RESET} ${BOLD}${s.name}${RESET} — ${DIM}${s.purpose}${RESET}`));
  }

  // Loading Commands
  if (stackData.commands.length > 0) {
    console.log(`${GREEN}✔${RESET} Initializing command mapping (${stackData.commands.length}):`);
    stackData.commands.forEach(c => console.log(`  ${YELLOW}•${RESET} ${BOLD}${c.name}${RESET} — ${DIM}${c.desc}${RESET}`));
  }

  // Loading Hooks
  if (stackData.hooks.length > 0) {
    console.log(`${GREEN}✔${RESET} Activating runtime security hooks (${stackData.hooks.length}):`);
    stackData.hooks.forEach(h => console.log(`  ${RED}•${RESET} ${BOLD}${h.name}${RESET} — ${DIM}${h.desc}${RESET}`));
  }

  const objective = await promptObjective();
  if (!objective) {
    console.log(`${RED}✗${RESET} Objective cancelled. Exiting.`);
    process.exit(0);
  }

  // Compile collaborative prompt instructions
  let instructions = `# Claude Council Swarm Objective & Instructions

## Objective
**${objective}**

---

## Domain Framework: ${stackData.title}
*Tagline:* ${stackData.tagline}

### Primary Swarm Persona
${stackData.persona}

---

## Swarm Division of Labor (Sequence of Play)

To complete the objective, Claude will simulate a collaborative council of roles. Execute the following sequential steps:

`;

  // Map steps dynamically based on available skills
  let stepNum = 1;
  if (stackData.skills.length > 0) {
    instructions += `### Phase 1: Research & Setup\n`;
    const setupSkills = stackData.skills.filter(s => s.name.includes('score') || s.name.includes('research') || s.name.includes('analyzer') || s.name.includes('auditor'));
    if (setupSkills.length > 0) {
      setupSkills.forEach(s => {
        instructions += `${stepNum++}. **Activate ${s.name}**: ${s.purpose} (Trigger: ${s.trigger || 'Manual'})\n`;
      });
    } else {
      instructions += `${stepNum++}. Research current status and check target audience requirements.\n`;
    }
    instructions += `\n`;

    instructions += `### Phase 2: Design & Content Drafting\n`;
    const draftSkills = stackData.skills.filter(s => s.name.includes('personalizer') || s.name.includes('writer') || s.name.includes('generator') || s.name.includes('builder') || s.name.includes('designer'));
    if (draftSkills.length > 0) {
      draftSkills.forEach(s => {
        instructions += `${stepNum++}. **Invoke ${s.name}**: ${s.purpose} (Trigger: ${s.trigger || 'Manual'})\n`;
      });
    } else {
      instructions += `${stepNum++}. Build structured drafts or code components matching specifications.\n`;
    }
    instructions += `\n`;

    instructions += `### Phase 3: Validation & Logging\n`;
    const validateSkills = stackData.skills.filter(s => s.name.includes('logger') || s.name.includes('tracker') || s.name.includes('classifier') || s.name.includes('handler') || s.name.includes('validator') || s.name.includes('checker'));
    if (validateSkills.length > 0) {
      validateSkills.forEach(s => {
        instructions += `${stepNum++}. **Deploy ${s.name}**: ${s.purpose} (Trigger: ${s.trigger || 'Manual'})\n`;
      });
    } else {
      instructions += `${stepNum++}. Perform final quality gates and log the results into session tracker.\n`;
    }
    instructions += `\n`;
  }

  // Commands
  if (stackData.commands.length > 0) {
    instructions += `## Commands Mapping\n`;
    instructions += `You can trigger these commands during execution:\n`;
    stackData.commands.forEach(c => {
      instructions += `- **${c.name}**: ${c.desc}\n`;
    });
    instructions += `\n`;
  }

  // Active Hooks
  if (stackData.hooks.length > 0) {
    instructions += `## Runtime Quality Hooks (Simulated Gates)\n`;
    stackData.hooks.forEach(h => {
      instructions += `- **${h.name}**: ${h.desc}\n`;
    });
    instructions += `\n`;
  }

  instructions += `## Expected Outputs
Upon completion, write a full summary of results to \`session-log.md\` and output final assets in compliance with the rules.
`;

  const outputPath = path.join(process.cwd(), 'COUNCIL_INSTRUCTIONS.md');
  fs.writeFileSync(outputPath, instructions, 'utf-8');

  console.log(`\n${GREEN}✔${RESET} ${BOLD}Claude Council Swarm instructions formulated successfully!${RESET}`);
  console.log(`Saved instructions file to: ${YELLOW}${outputPath}${RESET}`);
  console.log(`\nTo run the swarm, start your Claude Code session and instruct it:
  ${CYAN}"Read COUNCIL_INSTRUCTIONS.md and execute the swarm workflow steps to achieve the objective."${RESET}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
