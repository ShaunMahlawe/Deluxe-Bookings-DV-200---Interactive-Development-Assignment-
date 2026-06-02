import { useEffect, useState } from 'react';
import SearchResultsApp from './SearchResultsApp.jsx';
import StaysPage from './pages/StaysPage.jsx';
import ApiGuidePage from './pages/ApiGuidePage.jsx';

function normalizePathname(pathname) {
  const path = String(pathname || '/').trim() || '/';
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

function AppRouter() {
  const [pathname, setPathname] = useState(() => normalizePathname(window.location.pathname));

  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(normalizePathname(window.location.pathname));
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  if (pathname === '/stays') {
    return <StaysPage />;
  }

  if (pathname === '/api-guide') {
    return <ApiGuidePage />;
  }

  return <SearchResultsApp />;
}

export default AppRouter;
