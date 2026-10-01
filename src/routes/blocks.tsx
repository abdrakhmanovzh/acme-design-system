import { createFileRoute } from '@tanstack/react-router'

import { PageContainer } from './-components/page-container'
import { AgentDetail } from './blocks/-blocks/agent-detail'
import { AgentRegistrationForm } from './blocks/-blocks/agent-registration-form'
import { AgentRegistryTable } from './blocks/-blocks/agent-registry-table'
import { AgentSettings } from './blocks/-blocks/agent-settings'
import { AgentWebhookForm } from './blocks/-blocks/agent-webhook-form'
import { ConversationTranscript } from './blocks/-blocks/conversation-transcript'

export const Route = createFileRoute('/blocks')({
  head: () => ({ meta: [{ title: 'Blocks | Acme Registry' }] }),
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main
      id="main-content"
      className="min-h-dvh divide-y divide-border-muted bg-background text-foreground"
    >
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <PageContainer>
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Blocks
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
            Product patterns,{' '}
            <span className="text-muted-foreground">
              assembled from the primitive system.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Copy-ready compositions for forms, registry workflows, dashboards,
            tables, and audio-oriented product surfaces.
          </p>
        </PageContainer>
      </section>

      <BlockSection
        label="Forms"
        title="Registry form examples."
        description="Single-card flows for creating and configuring registry resources."
      >
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-6">
          <BlockPreview
            title="Agent registration form"
            description="A compact product form for registering a model-backed agent."
          >
            <AgentRegistrationForm />
          </BlockPreview>
          <BlockPreview
            title="Webhook endpoint form"
            description="Connect signed event delivery with scoped subscriptions and retry policy."
          >
            <AgentWebhookForm />
          </BlockPreview>
        </div>
      </BlockSection>

      <BlockSection
        label="Audio"
        title="Conversation surfaces."
        description="Playback and review layouts for recorded calls and transcripts."
      >
        <BlockPreview
          title="Conversation transcript"
          description="Recorded call playback with speaker-attributed turns, inline highlights, and search."
        >
          <ConversationTranscript />
        </BlockPreview>
      </BlockSection>

      <BlockSection
        label="Pages"
        title="Product detail surfaces."
        description="Full-page compositions for resource headers, tabs, and settings."
      >
        <BlockPreview
          title="Agent detail page"
          description="Resource header with breadcrumb, status, deprecation alert, tabbed sections, and live metrics."
        >
          <AgentDetail />
        </BlockPreview>
        <BlockPreview
          title="Agent settings page"
          description="Stacked settings with general identity, notification toggles, collapsible advanced sections, and a danger zone."
        >
          <AgentSettings />
        </BlockPreview>
      </BlockSection>

      <BlockSection
        label="Tables"
        title="Dense data surfaces."
        description="Filterable registry views with selection, meters, and row actions."
      >
        <BlockPreview
          title="Agent registry table"
          description="Filterable, paginated registry view with row selection, quota meters, and row-level actions."
        >
          <AgentRegistryTable />
        </BlockPreview>
      </BlockSection>
    </main>
  )
}

function BlockSection({
  label,
  title,
  description,
  children
}: {
  label: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="py-14 sm:py-16">
      <PageContainer>
        <header className="max-w-prose border-b border-border-muted pb-8 sm:pb-10">
          <div className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            {label}
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          ) : null}
        </header>

        <div className="divide-y divide-border-muted">{children}</div>
      </PageContainer>
    </section>
  )
}

function BlockPreview({
  title,
  description,
  children
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <article className="space-y-6 py-10 sm:space-y-8 sm:py-12">
      <header className="max-w-prose">
        <h3 className="text-base font-medium tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </header>

      <div className="min-w-0">{children}</div>
    </article>
  )
}
