#!/usr/bin/env node

/**
 * validate-frontmatter.js
 * Validates that skill, agent, and hook markdown files follow Claudient's format.
 *
 * Skills:  YAML frontmatter (name + description) + 4 required sections
 * Agents:  5 required sections (Purpose, Model guidance, Tools, When to delegate, Example)
 * Hooks:   JSON settings snippet + event reference
 *
 * Exits 0 on success, 1 on any validation failure.
 * Translation directories (fr/, de/, es/, nl/) are skipped.
 */

const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')
const TRANSLATION_DIRS = new Set(['fr', 'de', 'es', 'nl'])

const SKILL_REQUIRED_SECTIONS = [
  'when to activate',
  'when not to use',
  'instructions',
  'example',
]

const AGENT_REQUIRED_SECTIONS = [
  'purpose',
  'model guidance',
  'tools',
  'when to delegate',
  'example',
]

const HOOK_REQUIRED_PATTERNS = [
  { type: 'heading', pattern: /##\s+(event|settings\.json|trigger|when it fires)/i },
  { type: 'code', pattern: /```json/ },
]

let errors = []
let filesChecked = 0

// --- Helpers ---

function walkMarkdown(dir, callback) {
  if (!fs.existsSync(dir)) return
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!TRANSLATION_DIRS.has(entry.name)) {
        walkMarkdown(fullPath, callback)
      }
    } else if (entry.name.endsWith('.md')) {
      callback(fullPath)
    }
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const fm = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)/)
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return fm
}

function extractH2Sections(content) {
  const sections = []
  const regex = /^##\s+(.+)$/gm
  let match
  while ((match = regex.exec(content)) !== null) {
    sections.push(match[1].trim().toLowerCase())
  }
  return sections
}

function hasSectionMatching(sections, required) {
  return sections.some(s => s.includes(required))
}

function report(file, message) {
  const rel = path.relative(REPO_ROOT, file)
  errors.push(`  ${rel}: ${message}`)
}

// --- Validators ---

function validateSkill(file) {
  filesChecked++
  const content = fs.readFileSync(file, 'utf8')

  const fm = parseFrontmatter(content)
  if (!fm) {
    report(file, 'Missing YAML frontmatter (---)')
  } else {
    if (!fm.name) report(file, 'Frontmatter missing "name"')
    if (!fm.description) report(file, 'Frontmatter missing "description"')
  }

  const sections = extractH2Sections(content)
  for (const req of SKILL_REQUIRED_SECTIONS) {
    if (!hasSectionMatching(sections, req)) {
      report(file, `Missing required section: "## ${req}"`)
    }
  }
}

function validateAgent(file) {
  filesChecked++
  const content = fs.readFileSync(file, 'utf8')
  const sections = extractH2Sections(content)

  for (const req of AGENT_REQUIRED_SECTIONS) {
    if (!hasSectionMatching(sections, req)) {
      report(file, `Missing required section: "## ${req}"`)
    }
  }
}

function validateHook(file) {
  filesChecked++
  const content = fs.readFileSync(file, 'utf8')

  for (const { type, pattern } of HOOK_REQUIRED_PATTERNS) {
    if (!pattern.test(content)) {
      report(file, `Missing required ${type}: ${pattern}`)
    }
  }
}

// --- Main ---

console.log('Validating skill files...')
walkMarkdown(path.join(REPO_ROOT, 'skills'), validateSkill)
console.log('Validating agent files...')
walkMarkdown(path.join(REPO_ROOT, 'agents'), validateAgent)
console.log('Validating hook files...')
walkMarkdown(path.join(REPO_ROOT, 'hooks'), validateHook)

console.log(`\nChecked ${filesChecked} files.`)

if (errors.length > 0) {
  console.error(`\n${errors.length} validation error(s):\n`)
  for (const err of errors) {
    console.error(err)
  }
  process.exit(1)
} else {
  console.log('All files pass format validation.')
}
