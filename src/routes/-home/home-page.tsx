import { ComponentsIndexSection } from './components-index-section'
import { HeroSection } from './hero-section'
import { InsideSection } from './inside-section'

export function HomePage() {
  return (
    <main
      id="main-content"
      className="divide-y divide-border-muted bg-background text-foreground"
    >
      <HeroSection />
      <InsideSection />
      <ComponentsIndexSection />
    </main>
  )
}
