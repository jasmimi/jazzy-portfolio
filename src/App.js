import { useEffect, useMemo, useState } from 'react';
import './App.css';
import BookshelfScene from './components/BookshelfScene';
import HomePage from './pages/HomePage';
import JazSpottingsPage from './pages/JazSpottingsPage';
import InsideJazMindPage from './pages/InsideJazMindPage';
import { isWipMode } from './siteConfig';

const routeItems = [
  {
    label: 'Home',
    path: '/',
    component: HomePage,
    color: '#276f73',
    shadowColor: '#174449',
    lean: -1.5,
  },
  {
    label: 'Jaz Spottings',
    path: '/jaz-spottings',
    component: JazSpottingsPage,
    color: '#a84f3d',
    shadowColor: '#6f3027',
    lean: 1,
  },
  {
    label: 'Inside Jazs Mind',
    path: '/inside-jazs-mind',
    component: InsideJazMindPage,
    color: '#6e6232',
    shadowColor: '#403a1f',
    lean: -0.8,
  },
];

const routes = routeItems.reduce((routeMap, route) => {
  routeMap[route.path] = route;
  return routeMap;
}, {});

function getRouteFromHash() {
  const raw = window.location.hash.replace('#', '');

  if (!raw) {
    return null;
  }

  const path = raw.startsWith('/') ? raw : `/${raw}`;

  return routes[path] ? path : null;
}

function App({ readerDelayMs = 650, wipMode = isWipMode }) {
  const [selectedPath, setSelectedPath] = useState(() => (wipMode ? null : getRouteFromHash()));
  const [readerPath, setReaderPath] = useState(null);

  useEffect(() => {
    if (wipMode) {
      setSelectedPath(null);
      return undefined;
    }

    const handleHashChange = () => {
      setSelectedPath(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [wipMode]);

  useEffect(() => {
    if (!selectedPath || wipMode) {
      setReaderPath(null);
      return undefined;
    }

    setReaderPath(null);
    const openTimer = window.setTimeout(() => {
      setReaderPath(selectedPath);
    }, readerDelayMs);

    return () => {
      window.clearTimeout(openTimer);
    };
  }, [readerDelayMs, selectedPath, wipMode]);

  const ActivePage = useMemo(() => {
    if (!readerPath) {
      return null;
    }

    return routes[readerPath]?.component || null;
  }, [readerPath]);

  const handleSelectBook = (path) => {
    if (wipMode || !routes[path]) {
      return;
    }

    setSelectedPath(path);

    if (window.location.hash !== `#${path}`) {
      window.location.hash = path;
    }
  };

  const handleCloseReader = () => {
    setSelectedPath(null);
    setReaderPath(null);

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  };

  return (
    <div className="app-shell">
      <BookshelfScene
        books={routeItems}
        onSelectBook={handleSelectBook}
        selectedPath={selectedPath}
        wipMode={wipMode}
      />

      <header className="site-mark" aria-label="Site identity">
        <p>Jasmine Amohia</p>
        {wipMode && <span className="status-pill">WIP</span>}
      </header>

      {ActivePage && (
        <aside className="page-reader" data-testid="page-reader">
          <button className="reader-close" onClick={handleCloseReader} type="button">
            Close
          </button>
          <ActivePage />
        </aside>
      )}
    </div>
  );
}

export default App;
