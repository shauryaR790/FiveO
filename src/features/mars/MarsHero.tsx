import { motion } from "framer-motion"

import {
  IconArrowUpRight,
  IconClockOutline,
  IconGlobeOutline,
  IconPlayFilled,
} from "@/features/mars/cinematic-icons"
import { marsEntrance } from "@/features/mars/cinematic-motion"
import { FadingVideo } from "@/features/mars/fading-video"
import { MarsBlurHeadline } from "@/features/mars/mars-blur-headline"

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"

const CARD =
  "liquid-glass flex w-[220px] flex-col items-start rounded-[1.25rem] p-5"

const partnersRow = ["Websites", "·", "APIs", "·", "LLMs", "·", "Managed", "·", "Care"] as const

export function MarsPageOne() {
  return (
    <section id="page-1" className="relative min-h-svh overflow-hidden bg-black md:min-h-[100vh]">
      <FadingVideo
        src={VIDEO}
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: "120%", height: "120%" }}
      />

      <div className="relative z-10 flex min-h-svh flex-col pt-24 md:min-h-[100vh]">

        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <motion.div {...marsEntrance(0.4)} className="inline-flex rounded-full">
            <div className="liquid-glass flex items-center gap-3 overflow-hidden rounded-full pr-3">
              <span className="rounded-full bg-white px-3 py-1 font-mars-body text-xs font-semibold whitespace-nowrap text-black">
                New
              </span>
              <span className="pr-1 font-mars-body text-sm whitespace-nowrap text-white/90">
                Full-stack web partnerships for teams that ship
              </span>
            </div>
          </motion.div>

          <div className="mt-6 flex w-full justify-center">
            <MarsBlurHeadline
              text="Your product, live on the modern web"
              className="max-w-2xl text-center font-mars-heading text-6xl italic leading-[0.8] tracking-[-4px] text-white md:text-7xl lg:text-[5.5rem]"
            />
          </div>

          <motion.p
            {...marsEntrance(0.8)}
            className="mx-auto mt-4 max-w-2xl text-center font-mars-body text-sm font-light leading-tight text-white md:text-base"
          >
            FiveO is a web agency: we design and build marketing sites, ship APIs, wire
            LLM copilots where they help, and stay on for hosting, security, and roadmap
            iterations.
          </motion.p>

          <motion.div
            {...marsEntrance(1.1)}
            className="mt-6 flex flex-wrap items-center justify-center gap-6"
          >
            <button
              type="button"
              className="liquid-glass-strong inline-flex items-center gap-3 whitespace-nowrap rounded-full px-5 py-2.5 font-mars-body text-sm font-medium text-white"
            >
              Start a project
              <IconArrowUpRight className="h-5 w-5 shrink-0" />
            </button>

            <a
              href="#"
              className="inline-flex items-center gap-2 font-mars-body text-sm text-white md:text-base"
            >
              View recent work
              <IconPlayFilled className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            {...marsEntrance(1.3)}
            className="mt-8 flex flex-wrap items-stretch justify-center gap-4"
          >
            <div className={CARD}>
              <IconClockOutline size={28} />
              <p className="mt-8 font-mars-heading text-4xl italic leading-none tracking-[-1px] text-white">
                99.9%
              </p>
              <p className="mt-2 font-mars-body text-xs font-light text-white">
                Uptime target on managed hosting
              </p>
            </div>
            <div className={CARD}>
              <IconGlobeOutline size={28} />
              <p className="mt-8 font-mars-heading text-4xl italic leading-none tracking-[-1px] text-white">
                24/7
              </p>
              <p className="mt-2 font-mars-body text-xs font-light text-white">
                Response window on retainer plans
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...marsEntrance(1.4)}
          className="flex flex-col items-center gap-4 px-4 pb-8"
        >
          <span className="liquid-glass max-w-xl rounded-full px-3.5 py-1 text-center font-mars-body text-xs font-medium text-white">
            Trusted by founders, marketers, and product teams shipping serious web work
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 font-mars-heading text-2xl italic tracking-tight text-white md:gap-x-16 md:text-3xl">
            {partnersRow.map((segment, idx) => (
              <span key={`partner-${idx}`}>{segment}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
