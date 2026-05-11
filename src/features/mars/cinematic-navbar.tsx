import { IconArrowUpRight } from "@/features/mars/cinematic-icons"

const links = [
  { label: "Home", href: "#page-1" },
  { label: "Services", href: "#page-3-agency" },
  { label: "API & AI", href: "#page-3-agency" },
  { label: "Managed", href: "#page-3-agency" },
  { label: "Work", href: "#selected-work" },
  { label: "Contact", href: "#contact" },
] as const

export function CinematicNavbar() {
  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-4 z-50 px-8 lg:px-16">
      <div className="relative mx-auto flex w-full max-w-[108rem] items-center justify-between pointer-events-auto">
        <div className="liquid-glass flex h-12 shrink-0 items-center justify-center rounded-full px-3 font-mars-heading text-xs font-semibold italic leading-none tracking-[0.12em] text-white">
          5O
        </div>

        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:pointer-events-auto lg:flex">
          <div className="liquid-glass flex flex-wrap items-center justify-center rounded px-1.5 py-1.5">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap px-3 py-2 font-mars-body text-sm font-medium text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 font-mars-body text-sm font-medium whitespace-nowrap text-black"
            >
              Start a project
              <IconArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="invisible h-12 min-w-[3rem] shrink-0" aria-hidden />
      </div>
    </nav>
  )
}
