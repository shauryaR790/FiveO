import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export function MarsBlurHeadline({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const rootRef = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)

  const words = useMemo(
    () => text.split(/\s+/).filter(Boolean),
    [text],
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setVisible(true)
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [text])

  return (
    <p
      ref={rootRef}
      className={`flex flex-wrap justify-center gap-y-[0.1em] ${className ?? ""}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: 50,
          }}
          animate={
            visible
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : {
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 50,
                }
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: idx * 0.1,
          }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
