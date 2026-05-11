import Hls from "hls.js"
import type { RefObject } from "react"
import { useEffect } from "react"

export function useMuxHlsPlayback(
  muxSrc: string,
  videoRef: RefObject<HTMLVideoElement | null>,
): void {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    let hls: Hls | null = null

    video.muted = true
    video.loop = true
    video.playsInline = true
    video.controls = false

    const startPlayback = () => {
      void video.play().catch(() => {})
    }

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false })
      hls.loadSource(muxSrc)
      hls.attachMedia(video)
      hls.on(Hls.Events.ERROR, (...args: unknown[]) => {
        console.error("Mux HLS error:", args)
      })
      startPlayback()
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = muxSrc
      startPlayback()
    } else {
      console.warn("HLS playback is unsupported in this environment.")
    }

    return () => {
      hls?.destroy()
      hls = null
      video.pause()
      video.removeAttribute("src")
      video.load()
    }
  }, [muxSrc, videoRef])
}
