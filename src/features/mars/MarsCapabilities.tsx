import { motion } from "framer-motion"
import type { ComponentType } from "react"

import {
  CapabilityIconImage,
  CapabilityIconLightbulb,
  CapabilityIconMovie,
} from "@/features/mars/cinematic-icons"
import { FadingVideo } from "@/features/mars/fading-video"

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"

type CapProps = {
  Icon: ComponentType
  tags: string[]
  title: string
  body: string
}

function CapCard({ Icon, tags, title, body }: CapProps) {
  return (
    <div className="liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="liquid-glass relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[0.75rem]">
          <Icon />
        </div>
        <div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-mars-body text-[11px] text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[1px] flex-1" />

      <div className="mt-6">
        <h3 className="font-mars-heading text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-[32ch] font-mars-body text-sm font-light leading-snug text-white/90">
          {body}
        </p>
      </div>
    </div>
  )
}

export function MarsPageTwo() {
  const peek = {
    initial: { filter: "blur(10px)", opacity: 0, y: 20 },
    whileInView: { filter: "blur(0px)", opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: "easeOut" as const },
  }

  return (
    <section
      id="page-2"
      className="relative min-h-svh overflow-hidden bg-black text-white"
    >
      <FadingVideo
        src={VIDEO}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="relative z-10 flex min-h-svh flex-col pb-10 pt-24 md:min-h-[100vh]">

        <div className="flex min-h-0 flex-1 flex-col px-8 pt-2 md:px-16 lg:px-20">
          <header className="mb-auto shrink-0">
            <motion.div {...peek}>
              <p className="mb-6 font-mars-body text-sm text-white/80">
                // Services
              </p>

              <h2 className="font-mars-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]">
                Web, APIs,
                <br />
                and intelligence
              </h2>
            </motion.div>
          </header>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
            initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          >
            <CapCard
              Icon={CapabilityIconImage}
              tags={[
                "Responsive",
                "Perf budgets",
                "Design systems",
                "A11y-ready",
              ]}
              title="Websites that convert"
              body="Landing pages and product marketing sites engineered for Core Web Vitals, brand clarity, and a component structure your team can extend without starting over."
            />
            <CapCard
              Icon={CapabilityIconMovie}
              tags={[
                "REST & GraphQL",
                "SDKs",
                "Auth patterns",
                "Observability",
              ]}
              title="APIs you can rely on"
              body="Contracts, versioning, docs, and deployment pipelines so integrations stay stable—from first mobile client to partner webhooks across your stack."
            />
            <CapCard
              Icon={CapabilityIconLightbulb}
              tags={[
                "RAG & tools",
                "Guardrails",
                "Eval loops",
                "Human-in-loop",
              ]}
              title="LLMs where they help"
              body="Assistants, embeddings, and internal copilots scoped to real workflows—privacy, prompting, and cost controls baked in, not bolted on after launch."
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
