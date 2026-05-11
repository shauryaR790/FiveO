/**
 * Portfolio tiles — swap `href` for each live deployment.
 * Images live in `/public/portfolio/project-01.png` … `project-09.png`.
 */
export type PortfolioProject = {
  id: string
  title: string
  href: string
  image: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "1",
    title: "Marketing site — brand launch",
    href: "https://example.com",
    image: "/portfolio/project-01.png",
  },
  {
    id: "2",
    title: "Product landing — conversion focus",
    href: "https://example.com",
    image: "/portfolio/project-02.png",
  },
  {
    id: "3",
    title: "SaaS marketing — motion & depth",
    href: "https://example.com",
    image: "/portfolio/project-03.png",
  },
  {
    id: "4",
    title: "Commerce experience",
    href: "https://example.com",
    image: "/portfolio/project-04.png",
  },
  {
    id: "5",
    title: "Editorial narrative site",
    href: "https://example.com",
    image: "/portfolio/project-05.png",
  },
  {
    id: "6",
    title: "Compact product microsite",
    href: "https://example.com",
    image: "/portfolio/project-06.png",
  },
  {
    id: "7",
    title: "Dark-mode product story",
    href: "https://example.com",
    image: "/portfolio/project-07.png",
  },
  {
    id: "8",
    title: "High-trust institutional web",
    href: "https://example.com",
    image: "/portfolio/project-08.png",
  },
  {
    id: "9",
    title: "Interactive showcase",
    href: "https://example.com",
    image: "/portfolio/project-09.png",
  },
]

/** Fisher–Yates shuffle (caller should run once per mount if order should vary per visit). */
export function shufflePortfolio<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
