import {describe, it, expect} from 'vitest'
import {readdir, readFile} from 'node:fs/promises'
import {join, resolve} from 'node:path'

// The Content-Security-Policy nginx sends lives in README.md (Forge config is
// pasted from there). These tests check the built HTML against that policy, so a
// new inline script or a new third-party host fails the build instead of being
// blocked in every visitor's browser.

const ROOT = resolve(import.meta.dirname, '..')
const DIST = join(ROOT, 'dist')

async function readPolicy() {
  const readme = await readFile(join(ROOT, 'README.md'), 'utf-8')
  const value = readme.match(/add_header Content-Security-Policy "([^"]+)"/)?.[1]
  if (!value) throw new Error('No add_header Content-Security-Policy line in README.md')
  const directives = {}
  for (const part of value.split(';')) {
    const [name, ...sources] = part.trim().split(/\s+/)
    if (name) directives[name] = sources
  }
  return directives
}

async function readPages() {
  const files = (await readdir(DIST, {recursive: true})).filter(file => file.endsWith('.html'))
  return Promise.all(files.map(async file => [file, await readFile(join(DIST, file), 'utf-8')]))
}

function inlineScripts(html) {
  return [...html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs = '']) => !/\ssrc=/.test(attrs) && !/type="application\/(ld\+)?json"/.test(attrs))
    .map(([, , source]) => source)
}

function externalHosts(html, tag) {
  const pattern = new RegExp(`<${tag}\\s[^>]*?\\s(?:src|srcset)="(https?://[^/"\\s]+)`, 'g')
  return [...html.matchAll(pattern)].map(([, host]) => host)
}

describe('Content-Security-Policy', async () => {
  const policy = await readPolicy()
  const pages = await readPages()

  it('is in README.md with the directives the site relies on', () => {
    for (const name of ['default-src', 'script-src', 'style-src', 'img-src', 'connect-src']) {
      expect(policy, `${name} should be set explicitly`).toHaveProperty(name)
    }
    expect(policy['default-src']).toEqual(["'self'"])
    for (const name of ['script-src', 'style-src']) {
      expect(policy[name], `${name} should name hosts only`).not.toContain("'unsafe-inline'")
      expect(policy[name].filter(s => s.startsWith("'sha") || s.startsWith("'nonce")), `${name} should need no hashes`).toEqual([])
    }
  })

  it('has no inline scripts, so the header never needs a hash', () => {
    const found = []
    for (const [file, html] of pages) {
      for (const source of inlineScripts(html)) {
        found.push(`${file}: ${source.trim().slice(0, 80)}`)
      }
    }
    expect(found, 'put the script in a file instead, see README').toEqual([])
  })

  it('loads scripts and images only from allowed hosts', () => {
    for (const [file, html] of pages) {
      for (const host of new Set(externalHosts(html, 'script'))) {
        expect(policy['script-src'], `${file} loads a script from ${host}`).toContain(host)
      }
      for (const host of new Set(externalHosts(html, '(?:img|source)'))) {
        expect(policy['img-src'], `${file} loads an image from ${host}`).toContain(host)
      }
    }
  })

  it('has no inline styles, event handlers or javascript: links', () => {
    const found = new Map()
    const patterns = {
      'style attribute': /<[a-z][^>]*\sstyle="/i,
      'style element': /<style[\s>]/i,
      'event handler attribute': /<[a-z][^>]*\son[a-z]+="/i,
      'javascript: link': /href="javascript:/i,
      'data: or blob: src': /\s(?:src|href)="(?:data|blob):/i
    }
    for (const [file, html] of pages) {
      for (const [what, pattern] of Object.entries(patterns)) {
        if (pattern.test(html)) found.set(what, [...(found.get(what) ?? []), file])
      }
    }
    expect(Object.fromEntries(found)).toEqual({})
  })
})
