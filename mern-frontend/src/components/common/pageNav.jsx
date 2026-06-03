import './pageNav.css';

const links = [
  { href: '/restored-search-results', label: 'Search Results' },
  { href: '/stays', label: 'Stays' },
  { href: '/api-guide', label: 'API Guide' },
];

function PageNav() {
  const activePath = window.location.pathname;

  return (
    <div className="page-nav-shell">
      <nav className="page-nav" aria-label="Page navigation">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`page-nav-link ${activePath === link.href ? 'page-nav-link-active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default PageNav;
