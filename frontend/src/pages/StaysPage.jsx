import SearchResultsApp from '../SearchResultsApp.jsx';
import PageNav from '../components/pageNav.jsx';

function StaysPage() {
  return (
    <>
      <PageNav />
      <SearchResultsApp apiMode="stays" />
    </>
  );
}

export default StaysPage;
