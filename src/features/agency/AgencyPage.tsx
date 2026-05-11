import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useMemo, useRef } from "react"

import { AgencyCoreFeatures } from "@/features/agency/AgencyCoreFeatures"
import { AgencyPortfolioShowcase } from "@/features/agency/AgencyPortfolioShowcase"
import { useMuxHlsPlayback } from "@/features/agency/useMuxHlsPlayback"
import { fadeUp } from "@/lib/motion"

const HERO_MP4 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
const MISSION_MP4 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
const SOLUTION_MP4 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
const MUX_STREAM =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"

function normalizeToken(word: string) {
  return word.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "").toLowerCase()
}

const features = [
  {
    title: "Websites & product UI",
    description:
      "Design systems, CMS wiring, and frontend delivery so your brand reads clearly and loads fast on every device.",
  },
  {
    title: "APIs & integrations",
    description:
      "Backends, gateways, and partner integrations with documentation and monitoring your engineers will actually use.",
  },
  {
    title: "LLM & automation",
    description:
      "Retrieval, tooling, and guarded prompts for support, internal ops, or customer-facing assistants—aligned to your data policies.",
  },
  {
    title: "Managed web operations",
    description:
      "Hosting, SSL, releases, analytics, and iterative improvements so the site and APIs you shipped stay healthy after go-live.",
  },
] as const

function CTASectionBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useMuxHlsPlayback(MUX_STREAM, videoRef)

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        playsInline
        muted
      />
      <div className="absolute inset-0 z-[1] bg-background/45" />
    </>
  )
}

export function AgencyPage() {
  const highlights = useMemo(() => new Set(["ship", "together", "beyond"]), [])

  const paragraphOne =
    "We help teams ship credible web experiences from first brief through production, aligning product, marketing, and engineering together as you push new capabilities beyond launch."

  const paragraphTwo =
    "Beyond launch, FiveO stays embedded for hosting, security patches, API changes, and the next wave of features your roadmap demands."

  const firstWords = useMemo(
    () =>
      paragraphOne.split(/\s+/).map((token) => ({
        text: token,
        emphasis: highlights.has(normalizeToken(token)),
      })),
    [paragraphOne, highlights],
  )

  const secondWords = useMemo(
    () =>
      paragraphTwo.split(/\s+/).map((token) => ({
        text: token,
        emphasis: false,
      })),
    [paragraphTwo],
  )

  return (
    <div id="page-3-agency" className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate min-h-svh overflow-hidden">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src={HERO_MP4}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 flex min-h-svh flex-col items-center px-6 pt-28 md:pt-32">
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
            <div className="isolate flex -space-x-2 rtl:space-x-reverse">
              {["/avatar-1.png", "/avatar-2.png", "/avatar-3.png"].map(
                (avatar, avatarIndex) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt="Client avatar"
                    width={48}
                    height={48}
                    className="h-8 w-8 rounded-full border-2 border-background object-cover ring-2 ring-background"
                    style={{ zIndex: 3 - avatarIndex }}
                  />
                ),
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by teams shipping web, API, and AI work
            </p>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="mx-auto mt-10 max-w-5xl text-center text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
          >
            <span className="font-serif italic font-normal">Websites,</span> APIs, and
            managed web built by FiveO
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mx-auto mt-8 max-w-2xl text-center text-lg text-hero-subtitle"
          >
            Strategy, design, engineering, and ongoing care for the digital surface area
            your customers and partners actually touch.
          </motion.p>
        </div>
      </section>

      {/* Development has changed */}
      <motion.section
        {...fadeUp(0)}
        className="px-6 pt-52 pb-6 md:px-10 md:pb-12 md:pt-64 lg:px-14"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.h2
            {...fadeUp(0)}
            className="text-center text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
          >
            Your stack has{" "}
            <span className="font-serif italic font-normal">evolved.</span> Your
            agency should too.
          </motion.h2>

          <motion.p
            {...fadeUp(0.1)}
            className="mb-10 mt-10 max-w-2xl text-center text-lg text-muted-foreground md:mb-14"
          >
            Modern products need fast sites, dependable APIs, and practical LLM touches—
            owned by the same team that handles hosting, releases, and governance.
            FiveO brings design, engineering, and management under one roof so nothing
            slips between vendors.
          </motion.p>
        </div>

        <AgencyCoreFeatures />

        <div className="mx-auto max-w-5xl text-center">
          <motion.p {...fadeUp(0.55)} className="text-sm text-muted-foreground">
            If your roadmap needs web, APIs, or AI in market this year, tell us what
            you&apos;re building—we&apos;ll propose a clear path.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission — normal document flow (no sticky / tall scroll runway) */}
      <motion.section {...fadeUp(0)} className="relative pb-32 pt-0 md:pb-44">
        <div className="flex flex-col items-center justify-start gap-8 px-4 py-10 md:gap-10 md:px-8 md:py-14 lg:px-12">
          <div className="relative flex w-full justify-center overflow-x-clip md:block">
            <video
              className="aspect-square max-h-none w-[min(100%,min(92vw,28rem))] shrink-0 rounded-[28px] object-cover object-center shadow-2xl md:max-w-none md:w-auto md:rounded-[40px] md:[width:min(138vmin,100vw)]"
              src={MISSION_MP4}
              autoPlay
              muted
              playsInline
              loop
            />
          </div>

          <div className="mx-auto hidden w-full max-w-5xl px-4 text-center md:block">
            <p className="text-xl font-medium tracking-[-1px] text-balance md:text-2xl lg:text-3xl">
              {firstWords.map((wordEntry, idx) => (
                <span
                  key={`${paragraphOne}-${idx}-${wordEntry.text}`}
                  className={wordEntry.emphasis ? "text-foreground" : "text-hero-subtitle"}
                >
                  {wordEntry.text}{" "}
                </span>
              ))}
            </p>

            <p className="mt-10 text-xl font-medium tracking-[-1px] text-balance md:text-2xl lg:text-3xl">
              {secondWords.map((wordEntry, idx) => (
                <span
                  key={`${paragraphTwo}-${idx}-${wordEntry.text}`}
                  className={wordEntry.emphasis ? "text-foreground" : "text-hero-subtitle"}
                >
                  {wordEntry.text}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </motion.section>

      <AgencyPortfolioShowcase />

      {/* Solution */}
      <motion.section
        {...fadeUp(0)}
        className="border-t border-border/30 px-6 py-32 md:px-28 md:py-44"
      >
        <motion.p {...fadeUp(0)} className="text-xs uppercase tracking-[3px] text-muted-foreground">
          What we deliver
        </motion.p>

        <motion.h2 {...fadeUp(0.08)} className="mt-6 max-w-4xl text-4xl font-medium tracking-tight md:text-6xl">
          Full-stack web partners for{" "}
          <span className="font-serif italic font-normal">teams</span>{" "}
          that ship
        </motion.h2>

        <motion.div {...fadeUp(0.14)} className="mt-12 overflow-hidden rounded-2xl">
          <video
            className="aspect-[3/1] w-full object-cover"
            src={SOLUTION_MP4}
            autoPlay
            muted
            playsInline
            loop
          />
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {features.map((feat, fi) => (
            <motion.div key={feat.title} {...fadeUp(0.2 + fi * 0.05)}>
              <h3 className="text-base font-semibold">{feat.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/30 px-6 py-32 md:px-28 md:py-44">
        <CTASectionBackground />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            {...fadeUp(0)}
            aria-hidden="true"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground"
          >
            <span className="h-5 w-5 rounded-full border-2 border-foreground" />
          </motion.div>

          <motion.h2
            {...fadeUp(0.12)}
            className="mt-8 font-serif text-4xl italic md:text-5xl"
          >
            Start a project
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-6 max-w-xl text-center text-muted-foreground"
          >
            Brief us on your website, API, or LLM initiative—we&apos;ll align on scope,
            timelines, and who owns hosting, security, and iteration after launch.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-center sm:gap-10"
          >
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-8 py-3.5 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              Book a call
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="liquid-glass inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-base font-semibold text-foreground"
            >
              See services
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer {...fadeUp(0)}
        id="contact"
        className="flex flex-col gap-10 border-t border-border/40 px-8 py-12 text-sm md:flex-row md:items-center md:justify-between md:px-28"
      >
        <p className="text-muted-foreground">© 2026 FiveO. All rights reserved.</p>

        <div className="flex flex-wrap gap-10 text-muted-foreground">
          <a className="transition-colors hover:text-foreground" href="#">
            Privacy
          </a>
          <a className="transition-colors hover:text-foreground" href="#">
            Terms
          </a>
          <a className="transition-colors hover:text-foreground" href="#">
            Contact
          </a>
        </div>
      </motion.footer>
    </div>
  )
}
