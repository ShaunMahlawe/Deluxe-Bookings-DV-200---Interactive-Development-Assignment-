import React from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.css';

const defaultThingsToDoCards = [
  {
    id: 1,
    title: 'Hotels',
    dates: '14 Dec - 17 Dec, 2 adults',
    count: '313 available',
  },
  {
    id: 2,
    title: 'Apartments',
    dates: '14 Dec - 17 Dec, 2 adults',
    count: '313 available',
  },
  {
    id: 3,
    title: 'Resorts',
    dates: '14 Dec - 17 Dec, 2 adults',
    count: '313 available',
  },
  {
    id: 4,
    title: 'Villas',
    dates: '14 Dec - 17 Dec, 2 adults',
    count: '313 available',
  },
  {
    id: 5,
    title: 'Cottages',
    dates: '14 Dec - 17 Dec, 2 adults',
    count: '313 available',
  },
];

const Carousel = ({ data }) => {
  const sectionTitle = data?.title || 'Things to do in Cape Town';
  const thingsToDoCards = data?.cards?.length ? data.cards : defaultThingsToDoCards;

  return (
    <section className="carousel" aria-label={sectionTitle}>
      <h2>{sectionTitle}</h2>
    <div className="things-track">
      {thingsToDoCards.map((item) => (
        <article className="things-card" key={item.id}>
          <div className="things-card-image">
            <button type="button" className="things-card-action" aria-label={`View ${item.title}`}>
              <ArrowUpRight size={20} />
            </button>
          </div>
          <div className="things-card-body">
            <h3>{item.title}</h3>
            <p>{item.dates}</p>
            <span>{item.count}</span>
          </div>
        </article>
      ))}
    </div>
    <div className="things-controls" aria-hidden="true">
      <button type="button" className="things-control-button">
        <ChevronLeft size={16} />
      </button>
      <button type="button" className="things-control-button things-control-button-active">
        <ChevronRight size={16} />
      </button>
    </div>
    </section>
  );
};

export default Carousel;
