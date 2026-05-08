function PixelSparkles() {
  return (
    <div className="pixel-sparkles" aria-hidden="true">
      <span className="sparkle sparkle-one" />
      <span className="sparkle sparkle-two" />
      <span className="sparkle sparkle-three" />
      <span className="sparkle sparkle-four" />
      <span className="sparkle sparkle-five" />
    </div>
  );
}

function PixelBow() {
  return (
    <span className="pixel-bow" aria-hidden="true">
      <span className="bow-loop bow-left" />
      <span className="bow-knot" />
      <span className="bow-loop bow-right" />
      <span className="bow-tail bow-tail-left" />
      <span className="bow-tail bow-tail-right" />
    </span>
  );
}

function PixelBookNook({ routes, selectedPath, onSelectRoute, wipMode }) {
  return (
    <main className="pixel-nook" data-testid="pixel-book-nook" data-wip-mode={String(wipMode)}>
      <section className="nook-intro" aria-labelledby="site-title">
        <div className="intro-copy">
          <PixelBow />
          <p className="kicker">Welcome to the digital book nook of...</p>
          <h1 id="site-title">Jasmine Amohia</h1>
          <p>
            My corner of the internet for however long Github wishes to freely support it. 
            Learn about where I've been, what I'm thinking, and others thoughts that I'm enjoying.
          </p>
        </div>

        <div className="library-card" aria-label="Reading note">
          <p className="card-label">Thursay 21st May, 2026</p>
          <p className="card-title">Air New Zealands Tech Week Showcase and Panel</p>
          <p>
            In my first stint in AirNZ's Women in Digital Network, my coworker Manasija
            and I are hosting a Techweek event in our Auckland City office.&nbsp;
            <a
              href="https://events.humanitix.com/tech-week-airnz-digital-showcase-and-panel"
              target="_blank"
              rel="noopener noreferrer">
                  Read more here
            </a>
          </p>
        </div>
      </section>

      <section className="nook-scene" aria-label="Site sections">
        <PixelSparkles />
        <div className="pixel-moon" aria-hidden="true" />
        <div className="pixel-shelf">
          <nav className="book-nav" aria-label="Main pages">
            {routes.map((route, index) => (
              <button
                className={`pixel-book book-${index + 1}${selectedPath === route.path ? ' is-active' : ''}`}
                disabled={wipMode}
                key={route.path}
                onClick={() => onSelectRoute(route.path)}
                type="button"
              >
                <span className="book-stripe" aria-hidden="true" />
                <span className="book-label">{route.label}</span>
              </button>
            ))}
          </nav>
          <div className="shelf-plank" aria-hidden="true" />
          <div className="desk-items" aria-hidden="true">
            <span className="tea-cup" />
            <span className="journal" />
            <span className="pencil" />
          </div>
        </div>
        {wipMode && <p className="wip-ribbon">WIP</p>}
      </section>
    </main>
  );
}

export default PixelBookNook;
