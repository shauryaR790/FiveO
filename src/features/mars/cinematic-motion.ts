export function marsEntrance(delaySeconds: number) {
  return {
    initial: { filter: "blur(10px)", opacity: 0, y: 20 },
    animate: { filter: "blur(0px)", opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: delaySeconds, ease: "easeOut" as const },
  }
}
