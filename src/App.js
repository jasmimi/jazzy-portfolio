import { useEffect, useMemo, useState } from 'react';
import './App.css';
import PixelBookNook from './components/PixelBookNook';
import HomePage from './pages/HomePage';
import JazSpottingsPage from './pages/JazSpottingsPage';
import InsideJazMindPage from './pages/InsideJazMindPage';
import OthersMindsPage from './pages/OthersMindsPage';
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
    label: "Inside Jaz's Mind",
    path: '/inside-jazs-mind',
    component: InsideJazMindPage,
    color: '#6e6232',
    shadowColor: '#403a1f',
    lean: -0.8,
  },
  {
    label: "Others' Minds",
    path: '/others-minds',
    component: OthersMindsPage,
    color: '#4f6459',
    shadowColor: '#2b372e',
    lean: 0.8,
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

function App({ wipMode = isWipMode }) {
  const [selectedPath, setSelectedPath] = useState(() => {
    if (wipMode) {
      return null;
    }

    return getRouteFromHash() || '/';
  });

  useEffect(() => {
    if (wipMode) {
      setSelectedPath(null);
      return undefined;
    }

    const handleHashChange = () => {
      setSelectedPath(getRouteFromHash() || '/');
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [wipMode]);

  const ActivePage = useMemo(() => {
    if (!selectedPath || wipMode) {
      return null;
    }

    return routes[selectedPath]?.component || null;
  }, [selectedPath, wipMode]);

  const handleSelectRoute = (path) => {
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

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  };

  return (
    <div className="app-shell">
      <PixelBookNook
        onSelectRoute={handleSelectRoute}
        routes={routeItems}
        selectedPath={selectedPath}
        wipMode={wipMode}
      />

      {ActivePage && (
        <aside className="page-reader" data-testid="page-reader">
          <button className="reader-close" onClick={handleCloseReader} type="button">
            Minimize
          </button>
          <ActivePage />
        </aside>
      )}
    </div>
  );
}

export default App;
