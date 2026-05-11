import { AgencyPage } from "@/features/agency/AgencyPage"
import { CinematicNavbar } from "@/features/mars/cinematic-navbar"
import { MarsPageOne, MarsPageTwo } from "@/features/mars/MarsSlides"

export default function Home() {
  return (
    <div className="min-w-0 overflow-x-clip bg-black">
      <CinematicNavbar />
      <main>
        <MarsPageOne />
        <MarsPageTwo />
        <AgencyPage />
      </main>
    </div>
  )
}
