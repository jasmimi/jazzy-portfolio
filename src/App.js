import { useEffect, useMemo, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import JazSpottingsPage from './pages/JazSpottingsPage';
import InsideJazMindPage from './pages/InsideJazMindPage';

const routes = {
  '/': HomePage,
  '/jaz-spottings': JazSpottingsPage,
  '/inside-jazs-mind': InsideJazMindPage,
};

function getRouteFromHash() {
  const raw = window.location.hash.replace('#', '');

  if (!raw) {
    return '/';
  }

  return raw.startsWith('/') ? raw : `/${raw}`;
}

function App() {
  const [currentPath, setCurrentPath] = useState(getRouteFromHash());

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/';
    }

    const handleHashChange = () => {
      setCurrentPath(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const ActivePage = useMemo(() => routes[currentPath] || HomePage, [currentPath]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Jaz Spottings', path: '/jaz-spottings' },
    { label: 'Inside Jazs Mind', path: '/inside-jazs-mind' },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Jasmine Amohia</div>
        <nav aria-label="Main navigation" className="topnav">
          {navItems.map((item) => (
            <a
              className={item.path === currentPath ? 'nav-link active' : 'nav-link'}
              href={`#${item.path}`}
              key={item.path}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="content-wrap">
        <ActivePage />
      </main>
    </div>
  );
}

export default App;
