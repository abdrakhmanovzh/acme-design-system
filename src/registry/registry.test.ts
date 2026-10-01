import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  componentCatalog,
  documentedComponentIds,
  registryOnlyUiItems
} from '#/registry/component-catalog'
import { cssVars } from '#/registry/css-vars'
import {
  getRegistryIndex,
  getRegistryItem,
  getRegistryItems,
  getRegistryUiItems,
  withResolvedRegistryDependencies
} from '#/registry/items'

const projectRoot = join(import.meta.dirname, '../..')

function resolveRegistryDependencies(
  name: string,
  resolved = new Set<string>()
) {
  for (const dependency of getRegistryItem(name)?.registryDependencies ?? []) {
    if (!resolved.has(dependency)) {
      resolved.add(dependency)
      resolveRegistryDependencies(dependency, resolved)
    }
  }

  return [...resolved]
}

describe('component catalog', () => {
  it('uses unique component ids', () => {
    const ids = componentCatalog.map((entry) => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('maps every documented component to a registry ui item', () => {
    for (const entry of componentCatalog) {
      const registryItem = getRegistryItem(entry.id)
      expect(registryItem).toBeDefined()
      expect(registryItem?.type).toBe('registry:ui')
      expect(registryItem?.title).toBe(entry.name)
    }
  })

  it('maps every documented component to a route and preview', () => {
    for (const id of documentedComponentIds) {
      expect(
        existsSync(join(projectRoot, 'src/routes/components', `${id}.tsx`)),
        `missing route for ${id}`
      ).toBe(true)
      expect(
        existsSync(
          join(
            projectRoot,
            'src/routes/components/-docs/previews',
            `${id}-preview.tsx`
          )
        ),
        `missing preview for ${id}`
      ).toBe(true)
    }
  })

  it('keeps registry-only ui items explicit', () => {
    const uiItemNames = getRegistryUiItems().map((item) => item.name)
    const undocumented = uiItemNames.filter(
      (name) => !documentedComponentIds.includes(name)
    )

    expect(undocumented.sort()).toEqual([...registryOnlyUiItems].sort())
  })
})

describe('registry items', () => {
  it('resolves every registry dependency', () => {
    for (const item of getRegistryItems()) {
      for (const dependency of item.registryDependencies ?? []) {
        expect(getRegistryItem(dependency)).toBeDefined()
      }
    }
  })

  it('ships file content for every ui item', () => {
    for (const item of getRegistryUiItems()) {
      expect(item.files?.length).toBeGreaterThan(0)

      for (const file of item.files ?? []) {
        expect(file.content?.length).toBeGreaterThan(0)
      }
    }
  })

  it('gives every registry:file file a target', () => {
    const untargeted = getRegistryItems().flatMap((item) =>
      (item.files ?? [])
        .filter((file) => file.type === 'registry:file' && !file.target)
        .map((file) => `${item.name}: ${file.path}`)
    )

    expect(untargeted).toEqual([])
  })

  it('leaves no #/ alias in any shipped file', () => {
    const aliased = getRegistryItems().flatMap((item) =>
      (item.files ?? [])
        .filter((file) => /['"`]#\//.test(file.content ?? ''))
        .map((file) => `${item.name}: ${file.path}`)
    )

    expect(aliased).toEqual([])
  })

  it('declares every import as a dependency or registry dependency', () => {
    const undeclared = getRegistryItems().flatMap((item) => {
      const registryDependencies = resolveRegistryDependencies(item.name)
      const sourceFiles = (item.files ?? []).filter((file) =>
        /\.tsx?$/.test(file.path)
      )

      return sourceFiles.flatMap((file) =>
        Array.from(
          (file.content ?? '').matchAll(/from\s+['"]([^'"]+)['"]/g),
          ([, specifier]) => specifier
        )
          .filter((specifier) => {
            if (specifier.startsWith('.')) {
              return false
            }

            if (specifier === '@/lib/utils') {
              return !registryDependencies.includes('utils')
            }

            if (specifier.startsWith('@/components/ui/')) {
              const dependency = specifier.split('/')[3]
              return (
                dependency !== item.name &&
                !registryDependencies.includes(dependency)
              )
            }

            const parts = specifier.split('/')
            const packageName = specifier.startsWith('@')
              ? parts.slice(0, 2).join('/')
              : parts[0]

            return (
              packageName !== 'react' &&
              packageName !== 'react-dom' &&
              !item.dependencies?.includes(packageName)
            )
          })
          .map((specifier) => `${item.name}: ${file.path} imports ${specifier}`)
      )
    })

    expect(undeclared).toEqual([])
  })

  it('includes base and every ui item in all', () => {
    expect(getRegistryItem('all')?.registryDependencies).toEqual([
      'base',
      ...getRegistryUiItems().map((item) => item.name)
    ])
  })

  it('keeps project files out of base', () => {
    expect(getRegistryItem('base')?.registryDependencies).toEqual([
      'font-geist',
      'font-geist-mono',
      'utils'
    ])
  })

  it('keeps every item field except file content in the index', () => {
    const index = getRegistryIndex('https://example.com')

    expect(index.items).toEqual(
      getRegistryItems().map(({ $schema: _schema, ...item }) => ({
        ...item,
        files: item.files?.map(({ content: _content, ...file }) => file)
      }))
    )
    expect(
      index.items.filter((item) => item.type === 'registry:font' && !item.font)
    ).toEqual([])
  })

  it('derives base css variables from styles.css', () => {
    const {
      'font-sans': _fontSans,
      'font-mono': _fontMono,
      ...theme
    } = cssVars.theme
    const declarations = readFileSync(
      join(projectRoot, 'src/styles.css'),
      'utf8'
    ).match(/^\s+--[\w-]+:/gm)

    expect(getRegistryItem('base')?.cssVars).toEqual({
      theme,
      light: cssVars.light,
      dark: cssVars.dark
    })
    expect(cssVars.theme['font-sans']).toBeDefined()
    expect(cssVars.light.primary).toMatch(/^oklch\(/)
    expect(cssVars.dark.primary).toMatch(/^oklch\(/)
    expect(
      Object.keys(cssVars.theme).length +
        Object.keys(cssVars.light).length +
        Object.keys(cssVars.dark).length
    ).toBe(declarations?.length)
  })

  it('rewrites registry dependencies to absolute urls', () => {
    const button = getRegistryItem('button')

    expect(button).toBeDefined()

    const resolved = withResolvedRegistryDependencies(
      button!,
      'https://example.com'
    )

    expect(resolved.registryDependencies).toEqual([
      'https://example.com/r/base.json'
    ])
  })
})
