import "./AgencyCoreFeatures.css"

const NETWORK_SVG =
  "https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg"
const FOLDER_SVG =
  "https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg"

/** Static “Core Features” trio — standalone visual system; renders on dark shell behind light cards */
export function AgencyCoreFeatures() {
  return (
    <div className="agency-core-shell relative left-1/2 mb-24 w-screen -translate-x-1/2 bg-[#000000] px-5 py-20 [-webkit-font-smoothing:antialiased] [font-family:Inter,system-ui,sans-serif]">
      <div className="c1-container">
        <div className="c1-grid">
          <article className="c1-card c1-card-1">
            <div className="c1-prompt-box">
              A marketing site that highlights our{" "}
              <span className="c1-blur-text">SaaS pricing</span> with{" "}
              <span className="c1-blur-text">API documentation</span>{" "}
              <span className="c1-blur-text">embedded next to</span> a concierge
              LLM assistant for logged-in admins
            </div>

            <div className="c1-pill-add" aria-hidden="true">
              <span className="c1-star">✦</span>
              Add acceptance criteria
            </div>

            <svg
              className="c1-cursor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 2L20 11L11 13L9 22L4 2Z" />
            </svg>

            <h3>Specifications your team agrees on</h3>
          </article>

          <article className="c1-card c1-card-2">
            <div className="c1-api-visual">
              <img
                className="c1-network-img"
                src={NETWORK_SVG}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3>First-party APIs &amp; gateways</h3>
          </article>

          <article className="c1-card c1-card-3">
            <div className="c1-mesh" aria-hidden />
            <img className="c1-folder" src={FOLDER_SVG} alt="" loading="lazy" decoding="async" />
            <div className="c1-search" aria-hidden="true">
              <svg
                className="c1-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21L16.65 16.65" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Search engagements
            </div>
            <h3>Deployments &amp; lifecycle library</h3>
          </article>
        </div>
      </div>
    </div>
  )
}
