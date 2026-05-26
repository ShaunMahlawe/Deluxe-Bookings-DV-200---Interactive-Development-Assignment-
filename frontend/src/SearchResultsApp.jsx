import './App.css';
import { useEffect, useState } from 'react';
import SearchResultsPage from './components/searchResults.jsx';
import HeroHeader from './components/heroheader.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

function App() {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadCatalog() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/catalog`);

        if (!response.ok) {
          throw new Error('Failed to load catalog data.');
        }

        const payload = await response.json();

        if (mounted) {
          setCatalog(payload.catalog || null);
          setErrorMessage('');
        }
      } catch (error) {
        if (mounted) {
          setErrorMessage(error.message || 'Unable to load catalog data.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <HeroHeader heroData={catalog?.hero} navbarData={catalog?.navbar} />
      <main className="App">
        {loading ? <p className="app-status-message">Loading hospitality listings...</p> : null}
        {errorMessage ? <p className="app-status-message">{errorMessage}</p> : null}
        <SearchResultsPage
          searchData={catalog?.search}
          filterData={catalog?.filters}
          thingsToDoData={catalog?.thingsToDo}
          footerData={catalog?.footer}
        />
      </main>
    </>
  );
}

export default App;
