import './App.css';
import SearchResultsPage from './components/searchResults';
import HeroHeader from './components/heroheader';

function App() {
  return (
    <>
      <HeroHeader />
      <main className="App">
        <SearchResultsPage />
      </main>
    </>
  );
}

export default App;
