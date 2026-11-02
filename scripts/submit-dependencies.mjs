// Sends package-lock.json to GitHub's dependency submission API, so the
// dependency graph and Dependabot alerts match what is on main.
//
// Why: GitHub stopped parsing this repo's lockfile in May 2026 (its graph was
// stuck on astro 6.1.7 while main had 7.4.4), which left two dozen alerts
// for versions long gone. Nothing in the lockfile explained it, and a public
// repo cannot toggle the graph off and on. A snapshot we send ourselves
// replaces that parse. Runs from `postversion`, after the push, and never
// fails the release: a missing `gh` or a network error only prints a warning.
//
// Run by hand: node scripts/submit-dependencies.mjs
// See what would be sent without sending it: node scripts/submit-dependencies.mjs --dry-run

import {readFile} from 'node:fs/promises'
import {execFileSync, spawnSync} from 'node:child_process'

const lock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf-8'))
const root = lock.packages['']
const direct = new Set([...Object.keys(root.dependencies ?? {}), ...Object.keys(root.devDependencies ?? {})])

const purl = (name, version) => `pkg:npm/${name.replace('@', '%40')}@${version}`

// A dependency resolves the way Node does: the nearest node_modules walking up
function resolve(fromPath, name) {
  let base = fromPath
  while (true) {
    const candidate = `${base}/node_modules/${name}`
    if (lock.packages[candidate]) return candidate
    const idx = base.lastIndexOf('/node_modules/')
    if (idx === -1) {
      return lock.packages[`node_modules/${name}`] ? `node_modules/${name}` : null
    }
    base = base.slice(0, idx)
  }
}

const resolved = {}
for (const [path, info] of Object.entries(lock.packages)) {
  if (path === '' || info.link) continue
  const name = path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length)
  const dependencies = [...Object.keys(info.dependencies ?? {}), ...Object.keys(info.optionalDependencies ?? {})]
    .map(dep => resolve(path, dep))
    .filter(Boolean)
    .map(depPath => {
      const depName = depPath.slice(depPath.lastIndexOf('node_modules/') + 'node_modules/'.length)
      return purl(depName, lock.packages[depPath].version)
    })
  resolved[path] = {
    package_url: purl(name, info.version),
    relationship: path.startsWith('node_modules/') && !path.slice('node_modules/'.length).includes('node_modules/') && direct.has(name) ? 'direct' : 'indirect',
    scope: info.dev ? 'development' : 'runtime',
    dependencies
  }
}

const git = args => execFileSync('git', args, {encoding: 'utf-8'}).trim()
const sha = git(['rev-parse', 'HEAD'])
const branch = git(['rev-parse', '--abbrev-ref', 'HEAD'])
const repo = git(['remote', 'get-url', 'origin']).match(/github\.com[:/](.+?)(?:\.git)?$/)?.[1]
if (!repo) {
  console.warn('submit-dependencies: origin is not a GitHub remote, skipped')
  process.exit(0)
}

const snapshot = {
  version: 0,
  sha,
  ref: `refs/heads/${branch}`,
  job: {correlator: 'release', id: `${lock.version}-${sha.slice(0, 7)}`},
  detector: {name: 'submit-dependencies', version: '1.0.0', url: `https://github.com/${repo}`},
  scanned: new Date().toISOString(),
  manifests: {
    'package-lock.json': {
      name: 'package-lock.json',
      file: {source_location: 'package-lock.json'},
      resolved
    }
  }
}

if (process.argv.includes('--dry-run')) {
  const entries = Object.values(resolved)
  const count = (key, value) => entries.filter(e => e[key] === value).length
  console.log(JSON.stringify({...snapshot, manifests: `${entries.length} packages: ${count('relationship', 'direct')} direct, ${count('scope', 'development')} development, ${entries.reduce((n, e) => n + e.dependencies.length, 0)} edges`}, null, 2))
  console.log('astro:', JSON.stringify(resolved['node_modules/astro']).slice(0, 300))
  process.exit(0)
}

const result = spawnSync('gh', ['api', '-X', 'POST', `repos/${repo}/dependency-graph/snapshots`, '--input', '-'], {
  input: JSON.stringify(snapshot),
  encoding: 'utf-8'
})

if (result.error || result.status !== 0) {
  console.warn(`submit-dependencies: could not send the snapshot (${result.error?.message ?? result.stderr.trim()}). Run it again with: node scripts/submit-dependencies.mjs`)
  process.exit(0)
}

const reply = JSON.parse(result.stdout)
console.log(`submit-dependencies: sent ${Object.keys(resolved).length} packages for ${sha.slice(0, 7)}, GitHub says: ${reply.message ?? reply.result}`)
