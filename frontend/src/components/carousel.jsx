import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.css';

const defaultThingsToDoCards = [
  {
    id: 1,
    title: 'Table Mountain Cableway',
    dates: 'Most recommended in this area',
    count: '1,260 recommendations',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c89a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'V&A Waterfront',
    dates: 'Most recommended in this area',
    count: '1,140 recommendations',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Cape Point Scenic Drive',
    dates: 'Most recommended in this area',
    count: '1,020 recommendations',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Kirstenbosch Gardens',
    dates: 'Most recommended in this area',
    count: '980 recommendations',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Bo-Kaap Walking Tour',
    dates: 'Most recommended in this area',
    count: '940 recommendations',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
  },
];

const AUTO_ROTATE_MS = 4500;
const CARDS_PER_PAGE = 3;
const fallbackThingsImage =
  'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80';

function getThingImage(item) {
  const imageUrl = String(item?.imageUrl || '').trim();
  return imageUrl || fallbackThingsImage;
}

const Carousel = ({ data, areaName = 'Cape Town', className = '' }) => {
  const cardsPerPage = CARDS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(0);
  const resolvedAreaName = String(areaName || '').trim() || 'Cape Town';
  const sectionTitle = data?.title || `Things to do in ${resolvedAreaName}`;
  const thingsToDoCards = data?.cards?.length ? data.cards : defaultThingsToDoCards;
  const pageCount = Math.max(1, Math.ceil(thingsToDoCards.length / cardsPerPage));

  const pages = useMemo(() => {
    return Array.from({ length: pageCount }, (_, pageIndex) => {
      const startIndex = pageIndex * cardsPerPage;
      return thingsToDoCards.slice(startIndex, startIndex + cardsPerPage);
    });
  }, [cardsPerPage, pageCount, thingsToDoCards]);

  const activePageCards = pages[currentPage] || pages[0] || [];

  useEffect(() => {
    setCurrentPage(0);
  }, [thingsToDoCards.length]);

  useEffect(() => {
    if (pageCount <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentPage((current) => (current + 1) % pageCount);
    }, AUTO_ROTATE_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [pageCount]);

  const goPrev = () => {
    setCurrentPage((current) => (current - 1 + pageCount) % pageCount);
  };

  const goNext = () => {
    setCurrentPage((current) => (current + 1) % pageCount);
  };

  return (
    <section className={`area-carousel ${className}`.trim()} aria-label={sectionTitle}>
      <h2>{sectionTitle}</h2>
      <div className="things-carousel-viewport">
        <div className="things-page" key={`page-${currentPage}`}>
          {activePageCards.map((item) => (
            <article className="things-card" key={item.id}>
              <div
                className="things-card-image"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.36) 100%), url('${getThingImage(item)}')`,
                }}
              >
                <button type="button" className="things-card-action" aria-label={`View ${item.title}`}>
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="things-card-body">
                <h3>{item.title}</h3>
                <div className="things-card-rating">Top rated {Number(item.rating || 4.6).toFixed(1)} / 5</div>
                <div className="things-card-meta">
                  <p>{item.dates}</p>
                  <span>{item.count}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="things-controls">
        <button
          type="button"
          className="things-control-button"
          onClick={goPrev}
          aria-label="Previous things to do"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          className="things-control-button"
          onClick={goNext}
          aria-label="Next things to do"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {pageCount > 1 ? (
        <div className="things-pagination" role="tablist" aria-label="Things to do pages">
          {Array.from({ length: pageCount }, (_, pageIndex) => (
            <button
              key={`dot-${pageIndex}`}
              type="button"
              className={`things-dot ${currentPage === pageIndex ? 'is-active' : ''}`}
              aria-label={`Go to slide ${pageIndex + 1}`}
              aria-current={currentPage === pageIndex}
              onClick={() => setCurrentPage(pageIndex)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Carousel;
