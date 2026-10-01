// oxlint-disable import/default -- Vite ?raw imports expose file contents as default strings.
import styles from '../styles.css?raw'

function parseBlock(selector: string) {
  const start = styles.indexOf(`${selector} {`)
  const body = styles.slice(start, styles.indexOf('}', start))
  const vars: Record<string, string> = {}

  for (const match of body.matchAll(/--([\w-]+):([^;]+);/g)) {
    vars[match[1]] = match[2].replace(/\s+/g, ' ').trim()
  }

  return vars
}

export const cssVars = {
  theme: parseBlock('@theme'),
  light: parseBlock(':root'),
  dark: parseBlock('.dark')
}
