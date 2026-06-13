#!/usr/bin/env node

/**
 * validate-manifests.js
 * Validates consistency across package.json, plugin.json, and marketplace.json.
 *
 * Checks:
 * 1. All three files are valid JSON (implicit via require)
 * 2. Version numbers are aligned
 * 3. Every skill/agent "file" path in plugin.json exists on disk
 * 4. No stub entries (missing file paths) in plugin.json
 * 5. Marketplace plugins all have required fields
 *
 * Exits 0 on success, 1 on any failure.
 */

const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '..')

let errors = []

function report(context, message) {
  errors.push(`  [${context}] ${message}`)
}

// --- Load manifests ---

function loadJSON(file) {
  const fullPath = path.join(REPO_ROOT, file)
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
  } catch (e) {
    report(file, `Invalid JSON: ${e.message}`)
    return null
  }
}

const pkg = loadJSON('package.json')
const plugin = loadJSON('.claude-plugin/plugin.json')
const marketplace = loadJSON('.claude-plugin/marketplace.json')

if (!pkg || !plugin || !marketplace) {
  console.error(`\n${errors.length} manifest error(s):\n`)
  for (const err of errors) console.error(err)
  process.exit(1)
}

// --- Check 1: Version alignment ---

console.log('Checking version alignment...')

const pkgVersion = pkg.version
const pluginVersion = plugin.version

if (pkgVersion !== pluginVersion) {
  report('version', `package.json (${pkgVersion}) != plugin.json (${pluginVersion})`)
}

const marketplaceVersions = new Set()
for (const p of marketplace.plugins) {
  marketplaceVersions.add(p.version)
}

if (marketplaceVersions.size !== 1) {
  report('version', `marketplace.json has mixed plugin versions: ${[...marketplaceVersions].join(', ')}`)
} else {
  const mktVersion = [...marketplaceVersions][0]
  if (mktVersion !== pkgVersion) {
    report('version', `marketplace plugins (${mktVersion}) != package.json (${pkgVersion})`)
  }
}

// --- Check 2: plugin.json file paths exist ---

console.log('Checking plugin.json file paths...')

let stubCount = 0
let missingCount = 0

if (plugin.skills) {
  for (const skill of plugin.skills) {
    if (!skill.file) {
      stubCount++
      report('plugin.json/skills', `Stub entry without "file": ${skill.name || skill.id || '(unknown)'}`)
    } else {
      const filePath = path.join(REPO_ROOT, skill.file)
      if (!fs.existsSync(filePath)) {
        missingCount++
        report('plugin.json/skills', `File not found: ${skill.file}`)
      }
    }
  }
}

if (plugin.agents) {
  for (const agent of plugin.agents) {
    if (!agent.file) {
      stubCount++
      report('plugin.json/agents', `Stub entry without "file": ${agent.name || agent.id || '(unknown)'}`)
    } else {
      const filePath = path.join(REPO_ROOT, agent.file)
      if (!fs.existsSync(filePath)) {
        missingCount++
        report('plugin.json/agents', `File not found: ${agent.file}`)
      }
    }
  }
}

if (plugin.rules) {
  for (const rule of plugin.rules) {
    if (!rule.file) {
      stubCount++
      report('plugin.json/rules', `Stub entry without "file": ${rule.name || rule.id || '(unknown)'}`)
    } else {
      const filePath = path.join(REPO_ROOT, rule.file)
      if (!fs.existsSync(filePath)) {
        missingCount++
        report('plugin.json/rules', `File not found: ${rule.file}`)
      }
    }
  }
}

// --- Check 3: Marketplace plugins have required fields ---

console.log('Checking marketplace.json plugin fields...')

const REQUIRED_PLUGIN_FIELDS = ['name', 'source', 'description', 'category', 'version', 'author']

for (const p of marketplace.plugins) {
  for (const field of REQUIRED_PLUGIN_FIELDS) {
    if (!p[field]) {
      report('marketplace.json', `Plugin "${p.name || '(unknown)'}" missing field: ${field}`)
    }
  }
}

// --- Summary ---

console.log(`\nManifests: package.json v${pkgVersion}, plugin.json v${pluginVersion}`)
console.log(`Marketplace: ${marketplace.plugins.length} plugins`)
if (plugin.skills) console.log(`Plugin.json: ${plugin.skills.length} skills registered`)
if (plugin.agents) console.log(`Plugin.json: ${plugin.agents.length} agents registered`)
if (plugin.rules) console.log(`Plugin.json: ${plugin.rules.length} rules registered`)

if (errors.length > 0) {
  console.error(`\n${errors.length} manifest error(s):\n`)
  for (const err of errors) {
    console.error(err)
  }
  process.exit(1)
} else {
  console.log('\nAll manifest checks pass.')
}
