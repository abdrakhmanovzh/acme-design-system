import {
  componentCatalog,
  componentCategories
} from '#/registry/component-catalog'

const componentItems = componentCatalog.map((entry) => ({
  id: entry.id,
  path: `/components/${entry.id}`,
  name: entry.name,
  description: entry.description,
  category: entry.category
}))

type ComponentItem = (typeof componentItems)[number]
type ComponentId = ComponentItem['id']

const componentsByCategory = componentCategories.map((category) => ({
  category,
  items: componentItems
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item.category === category)
}))

export { componentItems, componentCategories, componentsByCategory }
export type { ComponentId, ComponentItem }
