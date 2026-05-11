import {
  type CSSProperties,
  useEffect,
  useRef,
} from "react"

const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

function fadeTo(
  video: HTMLVideoElement,
  targetOpacity: number,
  duration: number,
  rafIdRef: { current: number | null },
) {
  if (rafIdRef.current != null) {
    cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = null
  }

  let startOpacity = Number.parseFloat(video.style.opacity)
  if (!Number.isFinite(startOpacity)) startOpacity = 0

  const from = startOpacity
  const to = targetOpacity
  const startTime = performance.now()

  const step = (now: number) => {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    video.style.opacity = String(from + (to - from) * t)
    if (t < 1) {
      rafIdRef.current = requestAnimationFrame(step)
    } else {
      rafIdRef.current = null
    }
  }

  rafIdRef.current = requestAnimationFrame(step)
}

type FadingVideoProps = {
  src: string
  className?: string
  style?: CSSProperties
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fadingOutRef = useRef(false)
  const rafCancelRef = useRef<number | null>(null)

  useEffect(() => {
    const el = containerRef.current?.querySelector("video")
    if (!(el instanceof HTMLVideoElement)) return

    const video = el

    video.style.opacity = "0"
    fadingOutRef.current = false

    function onLoadedData() {
      fadingOutRef.current = false
      video.style.opacity = "0"
      void video.play().catch(() => {})
      fadeTo(video, 1, FADE_MS, rafCancelRef)
    }

    function onTimeUpdate() {
      if (!video.duration || !Number.isFinite(video.duration)) return
      const remaining = video.duration - video.currentTime
      if (
        !fadingOutRef.current &&
        remaining <= FADE_OUT_LEAD &&
        remaining > 0
      ) {
        fadingOutRef.current = true
        fadeTo(video, 0, FADE_MS, rafCancelRef)
      }
    }

    function onEnded() {
      video.style.opacity = "0"
      setTimeout(() => {
        fadingOutRef.current = false
        video.currentTime = 0
        void video.play().catch(() => {})
        fadeTo(video, 1, FADE_MS, rafCancelRef)
      }, 100)
    }

    video.addEventListener("loadeddata", onLoadedData)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)

    return () => {
      if (rafCancelRef.current != null) {
        cancelAnimationFrame(rafCancelRef.current)
        rafCancelRef.current = null
      }
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <video
        src={src}
        muted
        autoPlay
        playsInline
        preload="auto"
        className={className}
        style={style}
      />
    </div>
  )
}
