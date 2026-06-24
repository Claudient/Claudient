#!/usr/bin/env node

/**
 * generate-changelog.js
 * Reads git log and generates a CHANGELOG.md grouped by conventional commit types.
 *
 * Usage:
 *   node scripts/generate-changelog.js              # Output to stdout
 *   node scripts/generate-changelog.js --write       # Write to CHANGELOG.md
 *
 * Commit types recognized:
 *   feat: → Features
 *   fix: → Bug Fixes
 *   chore: → Chores
 *   ci: → CI/CD
 *   docs: → Documentation
 *   refactor: → Refactoring
 *   perf: → Performance
 *   test: → Testing
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')
const WRITE = process.argv.includes('--write')

// --- Get git log ---

let log
try {
  log = execSync(
    'git log --pretty=format:"%H|%h|%ai|%s" --no-merges',
    { cwd: REPO_ROOT, encoding: 'utf8' }
  )
} catch (e) {
  console.error('Failed to read git log. Is this a git repository?')
  process.exit(1)
}

// --- Parse commits ---

const TYPE_MAP = {
  feat: 'Features',
  fix: 'Bug Fixes',
  chore: 'Chores',
  ci: 'CI/CD',
  docs: 'Documentation',
  refactor: 'Refactoring',
  perf: 'Performance',
  test: 'Testing',
  style: 'Style',
  build: 'Build',
}

const commits = []
for (const line of log.split('\n')) {
  if (!line.trim()) continue
  const parts = line.split('|')
  if (parts.length < 4) continue

  const [hash, short, date, ...rest] = parts
  const subject = rest.join('|') // In case subject contains |

  // Parse conventional commit type
  const match = subject.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)/)
  const type = match ? match[1].toLowerCase() : 'other'
  const scope = match ? match[2] || '' : ''
  const description = match ? match[3] : subject

  commits.push({
    hash,
    short,
    date: date.slice(0, 10), // YYYY-MM-DD
    type,
    scope,
    description,
  })
}

// --- Group by type then date ---

const grouped = new Map()
for (const commit of commits) {
  const typeName = TYPE_MAP[commit.type] || 'Other'
  if (!grouped.has(typeName)) grouped.set(typeName, [])
  grouped.get(typeName).push(commit)
}

// Sort each group by date descending
for (const [, items] of grouped) {
  items.sort((a, b) => b.date.localeCompare(a.date))
}

// --- Generate markdown ---

const lines = []
lines.push('# Changelog')
lines.push('')
lines.push('All notable changes to UitKit are documented in this file.')
lines.push('')
lines.push(`Generated: ${new Date().toISOString().slice(0, 10)} | ${commits.length} commits`)
lines.push('')

// Order: Features first, then fixes, then infrastructure
const typeOrder = ['Features', 'Bug Fixes', 'CI/CD', 'Documentation', 'Chores', 'Refactoring', 'Performance', 'Testing', 'Build', 'Style', 'Other']

for (const typeName of typeOrder) {
  const items = grouped.get(typeName)
  if (!items || items.length === 0) continue

  lines.push(`## ${typeName}`)
  lines.push('')

  for (const commit of items) {
    const scope = commit.scope ? `**${commit.scope}:** ` : ''
    lines.push(`- ${scope}${commit.description} (\`${commit.short}\`) — ${commit.date}`)
  }

  lines.push('')
}

const output = lines.join('\n')

if (WRITE) {
  const outPath = path.join(REPO_ROOT, 'CHANGELOG.md')
  fs.writeFileSync(outPath, output, 'utf8')
  console.log(`CHANGELOG.md written (${commits.length} commits, ${grouped.size} categories)`)
} else {
  console.log(output)
}
