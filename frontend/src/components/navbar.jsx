import React from 'react';
import {
  ArrowRightFromLine,
  ArrowUpRight,
  BedDouble,
  Bookmark,
  Briefcase,
  CalendarDays,
  HousePlus,
  Search,
  Star,
  UserRound,
  UserRoundPlus,
  Wallet,
} from 'lucide-react';
import navbarLogo from '../assets/img/NavBar logo.svg';
import './navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-top-row">
      <div className="navbar-left">
        <button className="navbar-btn navbar-btn-active">
          <BedDouble size={20} strokeWidth={2.3} />
          <span>Stays</span>
        </button>
        <button className="navbar-btn navbar-btn-ghost">
          <HousePlus size={20} strokeWidth={2.3} />
          <span>List your property</span>
        </button>
      </div>
      <div className="navbar-center">
        <img className="navbar-logo-image" src={navbarLogo} alt="Deluxe Bookings" />
      </div>
      <div className="navbar-actions">
        <div className="navbar-search-wrap">
          <input className="navbar-search" type="text" value="Cape Town" readOnly />
          <button className="navbar-search-btn" aria-label="Search">
            <Search size={20} strokeWidth={2.7} />
          </button>
        </div>
        <button className="navbar-create-btn">
          <span>Create account</span>
          <span className="navbar-create-icon" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </span>
        </button>
      </div>
    </div>

    <div className="navbar-sidepanels">
      <div className="navbar-booking-panel">
        <div className="navbar-panel-row">
          <CalendarDays size={20} strokeWidth={2.3} />
          <span>Mon 14 Dec - Thu 17 Dec</span>
        </div>
        <div className="navbar-panel-row">
          <UserRoundPlus size={20} strokeWidth={2.3} />
          <span>2 adults • 0 children • 1 room</span>
        </div>
      </div>

      <div className="navbar-account-panel">
        <button className="navbar-account-item">
          <UserRound size={20} strokeWidth={2.3} />
          <span>My account</span>
        </button>
        <button className="navbar-account-item">
          <Briefcase size={20} strokeWidth={2.3} />
          <span>Bookings</span>
        </button>
        <button className="navbar-account-item">
          <Wallet size={20} strokeWidth={2.3} />
          <span>Wallet</span>
        </button>
        <button className="navbar-account-item">
          <Star size={20} strokeWidth={2.3} />
          <span>Reviews</span>
        </button>
        <button className="navbar-account-item">
          <Bookmark size={20} strokeWidth={2.3} />
          <span>Saved</span>
        </button>
        <button className="navbar-account-item">
          <ArrowRightFromLine size={20} strokeWidth={2.3} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
