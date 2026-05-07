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
          <p className="kicker">Jaz's digital book nook</p>
          <h1 id="site-title">Jasmine Amohia</h1>
          <p>
            A soft little corner for brain dumps, library energy, local arts spottings, and the
            parts of life worth sticking into a journal.
          </p>
        </div>

        <div className="library-card" aria-label="Reading note">
          <p className="card-label">Library card</p>
          <p className="card-title">Currently shelved</p>
          <p>Reading, journalling, walking, swimming, and collecting tiny souvenirs from the day.</p>
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
