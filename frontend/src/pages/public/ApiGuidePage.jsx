import PageNav from '../../components/common/pageNav.jsx';
import './ApiGuidePage.css';

const endpoints = [
  ['GET', '/api/stays', 'Primary stays feed from Deluxe API, Google fallback when needed.'],
  ['GET', '/api/stays/areas', 'Area totals used by filters and counts.'],
  ['GET', '/api/stays/things-to-do', 'Things-to-do cards per selected area.'],
  ['GET', '/api/properties', 'Legacy endpoint kept for compatibility.'],
  ['GET', '/api/things-to-do', 'Legacy endpoint kept for compatibility.'],
];

function ApiGuidePage() {
  return (
    <div className="api-guide-page">
      <PageNav />
      <main className="api-guide-content">
        <h1>Deluxe Stays API Guide</h1>
        <p>
          The application now uses the in-house Deluxe API as the main source.
          Google Places is used as fallback only when Deluxe data is unavailable.
        </p>
        <section className="api-guide-table" aria-label="API endpoint list">
          {endpoints.map(([method, path, description]) => (
            <article key={path} className="api-guide-row">
              <span className="api-guide-method">{method}</span>
              <span className="api-guide-path">{path}</span>
              <p>{description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ApiGuidePage;
