#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const os = require('os')

const REPO_ROOT = path.resolve(__dirname, '..')
const CLAUDE_DIR = path.join(os.homedir(), '.claude')
const SKILLS_DEST = path.join(CLAUDE_DIR, 'skills')

const VALID_CATEGORIES = [
  'backend',
  'devops-infra',
  'data-ml',
  'database',
  'finance-payments',
  'ai-engineering',
]

function usage() {
  console.log(`
claudient — Claude Code knowledge system installer

Usage:
  npx claudient add <category>   Add skills from a specific category
  npx claudient add all          Add all skills
  npx claudient list             List available categories and skills
  npx claudient help             Show this help

Categories:
  ${VALID_CATEGORIES.join('\n  ')}

Examples:
  npx claudient add backend
  npx claudient add ai-engineering
  npx claudient add all
`)
}

function checkClaudeInstalled() {
  if (!fs.existsSync(CLAUDE_DIR)) {
    console.error(`
Error: ~/.claude directory not found.

Claude Code must be installed first. Install it from:
  https://claude.ai/code

Or install the CLI:
  npm install -g @anthropic-ai/claude-code
`)
    process.exit(1)
  }
}

function copyDir(src, dest, prefix = '') {
  if (!fs.existsSync(src)) return 0
  fs.mkdirSync(dest, { recursive: true })

  let count = 0
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      count += copyDir(srcPath, destPath, prefix + entry.name + '/')
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`  + ${prefix}${entry.name}`)
      count++
    }
  }
  return count
}

function addCategory(category) {
  checkClaudeInstalled()

  if (category === 'all') {
    let total = 0
    console.log(`Installing all Claudient skills to ${SKILLS_DEST}...\n`)
    for (const cat of VALID_CATEGORIES) {
      const src = path.join(REPO_ROOT, 'skills', cat)
      const dest = path.join(SKILLS_DEST, cat)
      const count = copyDir(src, dest, cat + '/')
      if (count > 0) console.log(`  ✓ ${cat} (${count} files)`)
    }
    console.log(`\nDone. Skills installed to: ${SKILLS_DEST}`)
    console.log('Restart Claude Code to activate the new skills.')
    return
  }

  if (!VALID_CATEGORIES.includes(category)) {
    console.error(`Unknown category: "${category}"`)
    console.error(`Valid categories: ${VALID_CATEGORIES.join(', ')}`)
    process.exit(1)
  }

  const src = path.join(REPO_ROOT, 'skills', category)
  if (!fs.existsSync(src)) {
    console.error(`Category directory not found: ${src}`)
    process.exit(1)
  }

  const dest = path.join(SKILLS_DEST, category)
  console.log(`Installing ${category} skills to ${dest}...\n`)
  const count = copyDir(src, dest, category + '/')
  console.log(`\nInstalled ${count} skill file(s).`)
  console.log('Restart Claude Code to activate the new skills.')
}

function listSkills() {
  console.log('Available Claudient skill categories:\n')
  for (const cat of VALID_CATEGORIES) {
    const catDir = path.join(REPO_ROOT, 'skills', cat)
    if (!fs.existsSync(catDir)) continue
    const files = getSkillFiles(catDir, '')
    console.log(`${cat}/ (${files.length} skills)`)
    for (const f of files) {
      console.log(`  ${f}`)
    }
  }
}

function getSkillFiles(dir, prefix) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...getSkillFiles(p, prefix + entry.name + '/'))
    } else if (entry.name.endsWith('.md')) {
      results.push(prefix + entry.name)
    }
  }
  return results
}

const [, , command, ...args] = process.argv

switch (command) {
  case 'add':
    if (!args[0]) {
      console.error('Usage: claudient add <category|all>')
      process.exit(1)
    }
    addCategory(args[0])
    break
  case 'list':
    listSkills()
    break
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    usage()
    break
  default:
    console.error(`Unknown command: ${command}`)
    usage()
    process.exit(1)
}
