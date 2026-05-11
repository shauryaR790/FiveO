import {
  portfolioProjects,
  shufflePortfolio,
  type PortfolioProject,
} from "@/features/agency/portfolio-projects"
import { fadeUp } from "@/lib/motion"
import { motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const GUTTER = 6

export function AgencyPortfolioShowcase() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState({ ratio: 1, offset: 0 })

  const syncFromViewport = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const maxScroll = el.scrollHeight - el.clientHeight
    if (maxScroll <= 0.5) {
      setThumb({ ratio: 1, offset: 0 })
      return
    }
    setThumb({
      ratio: el.clientHeight / el.scrollHeight,
      offset: el.scrollTop / maxScroll,
    })
  }, [])

  /** Body drag → scroll viewport */
  const bodyDrag = useRef({ active: false, sy: 0, st: 0 })
  /** Rail / thumb drag */
  const railDrag = useRef({ active: false, sy: 0, scroll0: 0, pxPerScroll: 1 })

  const items = useMemo(
    (): PortfolioProject[] => shufflePortfolio(portfolioProjects),
    [],
  )

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    syncFromViewport()
    el.addEventListener("scroll", syncFromViewport, { passive: true })
    const ro = new ResizeObserver(syncFromViewport)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", syncFromViewport)
      ro.disconnect()
    }
  }, [syncFromViewport, items])

  const geom = () => {
    const v = viewportRef.current
    const t = trackRef.current
    if (!v || !t) return { maxScroll: 0, thumbTravel: 100, thumbH: 20, pxPerScroll: 1 }
    const maxScroll = Math.max(0, v.scrollHeight - v.clientHeight)
    const inner = Math.max(0, t.clientHeight - GUTTER * 2)
    const thumbH =
      maxScroll <= 0 ? inner : Math.max(inner * (v.clientHeight / v.scrollHeight), 44)
    const thumbTravel = Math.max(inner - thumbH, 1)
    const pxPerScroll = maxScroll <= 0 ? 1 : thumbTravel / maxScroll
    return { maxScroll, thumbTravel, thumbH, pxPerScroll }
  }

  const clampScrollTop = (st: number) => {
    const v = viewportRef.current
    if (!v) return
    const max = v.scrollHeight - v.clientHeight
    v.scrollTop = Math.max(0, Math.min(max, st))
  }

  const onPointerDownViewport = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      const v = viewportRef.current
      if (!v) return
      bodyDrag.current = { active: true, sy: e.clientY, st: v.scrollTop }
      v.style.cursor = "grabbing"
      v.setPointerCapture(e.pointerId)
    },
    [],
  )

  const onPointerMoveViewport = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!bodyDrag.current.active) return
    const dy = bodyDrag.current.sy - e.clientY
    clampScrollTop(bodyDrag.current.st + dy)
    syncFromViewport()
  }, [syncFromViewport])

  const releaseBody = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    bodyDrag.current.active = false
    const v = viewportRef.current
    if (!v) return
    v.style.cursor = ""
    try {
      v.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }, [])

  const onPointerDownThumb = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      e.stopPropagation()
      const v = viewportRef.current
      const track = trackRef.current
      if (!v || !track) return
      const { maxScroll, pxPerScroll } = geom()
      if (maxScroll <= 0) return
      railDrag.current = {
        active: true,
        sy: e.clientY,
        scroll0: v.scrollTop,
        pxPerScroll,
      }
      track.setPointerCapture(e.pointerId)
    },
    [],
  )

  const onPointerDownTrackHole = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-thumb]")) return
      const v = viewportRef.current
      const track = trackRef.current
      if (!v || !track) return
      const { maxScroll, thumbH, thumbTravel } = geom()
      if (maxScroll <= 0) return
      const rect = track.getBoundingClientRect()
      const innerTop = rect.top + GUTTER
      const y = e.clientY - innerTop
      const nextTop = Math.max(
        0,
        Math.min(thumbTravel - thumbH, y - thumbH / 2),
      )
      const rel = thumbTravel <= 0 ? 0 : nextTop / thumbTravel
      v.scrollTop = rel * maxScroll
      syncFromViewport()
      railDrag.current = {
        active: true,
        sy: e.clientY,
        scroll0: v.scrollTop,
        pxPerScroll: thumbTravel / maxScroll,
      }
      track.setPointerCapture(e.pointerId)
    },
    [syncFromViewport],
  )

  const onPointerMoveRail = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!railDrag.current.active) return
      const v = viewportRef.current
      if (!v) return
      const dy = e.clientY - railDrag.current.sy
      const next = railDrag.current.scroll0 + dy / railDrag.current.pxPerScroll
      clampScrollTop(next)
      syncFromViewport()
    },
    [syncFromViewport],
  )

  const onPointerUpRail = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      railDrag.current.active = false
      try {
        trackRef.current?.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    },
    [],
  )

  useEffect(() => {
    const end = () => {
      bodyDrag.current.active = false
      railDrag.current.active = false
      if (viewportRef.current) viewportRef.current.style.cursor = ""
    }
    window.addEventListener("pointerup", end)
    window.addEventListener("pointercancel", end)
    return () => {
      window.removeEventListener("pointerup", end)
      window.removeEventListener("pointercancel", end)
    }
  }, [])

  const thumbHPctRounded = thumb.ratio >= 0.999 ? 100 : Math.max(12, thumb.ratio * 100)
  const thumbTopPct =
    thumb.ratio >= 0.999 ? 0 : (100 - thumbHPctRounded) * thumb.offset

  return (
    <motion.section
      {...fadeUp(0)}
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="border-t border-border/25 px-4 py-24 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Selected work
        </p>
        <h2
          id="selected-work-heading"
          className="mt-4 font-serif text-4xl italic tracking-tight text-foreground md:text-5xl"
        >
          Shipped sites and previews
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Drag the previews or the glowing rail — each card links out to production.
          Update titles and URLs in{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/85">
            portfolio-projects.ts
          </code>
          .
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-5xl justify-center gap-0 md:justify-start md:gap-10">
        <div
          id="selected-work-scroll"
          ref={viewportRef}
          tabIndex={0}
          role="region"
          aria-label="Portfolio screenshots"
          className="showcase-no-scrollbar relative max-h-[min(72vh,720px)] min-h-[300px] w-full touch-pan-y cursor-grab overflow-y-auto overflow-x-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[0_36px_100px_-50px_rgba(125,211,252,0.25)] active:cursor-grabbing md:min-h-[300px] md:flex-1 md:rounded-[36px]"
          onPointerDown={onPointerDownViewport}
          onPointerMove={onPointerMoveViewport}
          onPointerUp={releaseBody}
          onPointerCancel={releaseBody}
        >
          <div
            aria-hidden
            className="pointer-events-none sticky top-0 z-[1] h-px w-full bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent"
          />
          <ul className="relative z-0 space-y-5 p-5 pb-8 md:space-y-8 md:p-8 md:pb-12">
            {items.map((p, idx) => (
              <li key={`${p.id}-${idx}`}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="group block overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-br from-white/[0.06] via-transparent to-fuchsia-500/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition-[border-color,box-shadow] hover:border-teal-300/40 hover:shadow-[0_0_0_1px_rgba(94,234,212,0.22),0_28px_80px_-52px_rgba(236,72,153,0.45)] focus-visible:ring-2 focus-visible:ring-cyan-200/35"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[1920/1000]">
                    <img
                      src={p.image}
                      alt=""
                      draggable={false}
                      className="h-full w-full object-cover object-top opacity-[0.93] transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                      loading={idx < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black via-black/85 to-transparent p-4 pb-5 pt-24 md:block md:p-6 md:pb-6 md:pt-32">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                        Deployed site
                      </p>
                      <p className="mt-2 text-base font-medium tracking-tight text-white md:text-lg">
                        {p.title}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden w-7 shrink-0 flex-col items-center pt-1 md:flex">
          <span
            aria-hidden
            className="select-none pb-5 text-[11px] font-semibold italic text-white/35 [writing-mode:vertical-rl]"
            style={{ fontFamily: "Instrument Serif,Georgia,serif", letterSpacing: "0.32em" }}
          >
            5O
          </span>

          <div
            ref={trackRef}
            role="scrollbar"
            aria-hidden={thumb.ratio >= 0.999}
            aria-controls="selected-work-scroll"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(thumb.offset * 100)}
            aria-orientation="vertical"
            className="relative h-full min-h-[220px] w-full flex-1 rounded-[999px] border border-white/[0.1] bg-gradient-to-b from-zinc-900/95 to-black p-[6px] shadow-[inset_0_12px_32px_rgba(0,0,0,0.85)]"
            onPointerDownCapture={onPointerDownTrackHole}
            onPointerMove={onPointerMoveRail}
            onPointerUp={onPointerUpRail}
            onPointerCancel={onPointerUpRail}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-3 top-[6px] bottom-[6px] rounded-full opacity-70 blur-[10px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,61,119,0.22) 0%, rgba(125,211,252,0.15) 50%, rgba(99,102,241,0.22) 100%)",
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[10px] bottom-[10px] w-px max-w-none -translate-x-1/2 bg-gradient-to-b from-white/[0.2] via-white/[0.04] to-fuchsia-200/15"
            />

            {thumb.ratio < 0.999 && (
              <div
                className="absolute inset-x-[3px]"
                style={{
                  top: `${thumbTopPct}%`,
                  height: `${thumbHPctRounded}%`,
                }}
              >
                <button
                  type="button"
                  data-thumb
                  tabIndex={-1}
                  className="relative h-full w-full cursor-grab rounded-full px-px active:cursor-grabbing"
                  onPointerDown={onPointerDownThumb}
                >
                  <div
                    className="h-full w-full rounded-full shadow-[0_0_34px_-6px_rgba(125,211,252,0.55)]"
                    style={{
                      background:
                        "linear-gradient(160deg,#fff 0%,#a5f3fc 42%,#f9a8d4 92%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -2px 6px rgba(15,23,42,0.15), 0 0 28px rgba(125,211,252,0.45)",
                    }}
                  >
                    <div className="absolute inset-x-1 top-1/2 mx-auto flex h-[26px] w-[6px] -translate-y-1/2 justify-center rounded-full bg-white/60 shadow-[inset_0_0_12px_white]" />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
