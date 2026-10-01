import { PageContainer } from '../-components/page-container'
import {
  PrimitivePreview,
  ThemePreview,
  TokenPreview,
  TypePreview
} from './preview-tiles'
import { Tile } from './tile'

export function InsideSection() {
  return (
    <section className="py-20 sm:py-24">
      <PageContainer>
        <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
          Inside
        </div>
        <h2 className="mt-5 mb-8 text-section">
          What you get when you install it.
        </h2>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Tile
            framed
            title="OKLCH colour, radius, spacing"
            body="Themed CSS variables consumed by Tailwind. Edit one place, the system updates."
            preview={<TokenPreview />}
          />
          <Tile
            framed
            title="Geist & Geist Mono"
            body="One sans, one mono — paired throughout. Variable axes available where supported."
            preview={<TypePreview />}
          />
          <Tile
            framed
            title="Light & dark, equal-weight"
            body="Class-scoped tokens keep each mode distinct while surfaces, text, and borders move together."
            preview={<ThemePreview />}
          />
          <Tile
            framed
            title="Built on Base UI"
            body="Accessible by default — keyboard, ARIA, and focus handled at the part level."
            preview={<PrimitivePreview />}
          />
        </div>
      </PageContainer>
    </section>
  )
}
