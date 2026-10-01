export const navItems = [
  { to: '/', label: 'Index' },
  { to: '/integrate', label: 'Get started' },
  { to: '/colors', label: 'Colors' },
  { to: '/typography', label: 'Typography' },
  { to: '/components', label: 'Components' },
  { to: '/blocks', label: 'Blocks' }
] as const

export function isActivePath(
  pathname: string,
  to: (typeof navItems)[number]['to']
) {
  return to === '/'
    ? pathname === '/'
    : pathname === to || pathname.startsWith(`${to}/`)
}
