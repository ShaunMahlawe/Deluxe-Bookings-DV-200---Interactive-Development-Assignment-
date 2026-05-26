import React, { useEffect, useRef, useState } from 'react';
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

const formatDateLabel = (value) => {
  if (!value) {
    return 'Select date';
  }

  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
};

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('Cape Town');
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState('2026-12-14');
  const [checkOutDate, setCheckOutDate] = useState('2026-12-17');
  const closeTimeoutRef = useRef(null);

  const openBookingPanel = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowBookingPanel(true);
  };

  const closeBookingPanelWithDelay = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setShowBookingPanel(false);
      setShowDatePicker(false);
    }, 140);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    openBookingPanel();
  };

  const toggleDatePicker = () => {
    openBookingPanel();
    setShowDatePicker((current) => !current);
  };

  const handleCheckInChange = (event) => {
    const nextCheckIn = event.target.value;
    setCheckInDate(nextCheckIn);

    if (checkOutDate && nextCheckIn > checkOutDate) {
      setCheckOutDate(nextCheckIn);
    }
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );

  return (
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
        <div
          className="navbar-search-shell"
          onMouseEnter={openBookingPanel}
          onMouseLeave={closeBookingPanelWithDelay}
        >
          <div className="navbar-search-wrap">
            <input
              className="navbar-search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={openBookingPanel}
              placeholder="Search destination"
            />
            <button
              className="navbar-search-btn"
              aria-label="Search"
              aria-expanded={showBookingPanel}
              aria-controls="booking-panel-dropdown"
              onFocus={openBookingPanel}
              onClick={openBookingPanel}
            >
              <Search size={20} strokeWidth={2.7} />
            </button>
          </div>

          {showBookingPanel ? (
            <div id="booking-panel-dropdown" className="navbar-booking-panel navbar-booking-panel-dropdown">
              <button
                type="button"
                className="navbar-panel-row navbar-panel-row-button"
                onClick={toggleDatePicker}
                aria-expanded={showDatePicker}
                aria-controls="booking-date-picker"
              >
                <CalendarDays size={20} strokeWidth={2.3} />
                <span>{formatDateLabel(checkInDate)} - {formatDateLabel(checkOutDate)}</span>
              </button>

              {showDatePicker ? (
                <div id="booking-date-picker" className="navbar-date-picker-dropdown">
                  <label className="navbar-date-field">
                    <span>Check-in</span>
                    <span className="navbar-date-input-wrap">
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={handleCheckInChange}
                      />
                      <span className="navbar-date-input-icon" aria-hidden="true">
                        <CalendarDays size={20} strokeWidth={2.3} />
                      </span>
                    </span>
                  </label>
                  <label className="navbar-date-field">
                    <span>Check-out</span>
                    <span className="navbar-date-input-wrap">
                      <input
                        type="date"
                        value={checkOutDate}
                        min={checkInDate}
                        onChange={handleCheckOutChange}
                      />
                      <span className="navbar-date-input-icon" aria-hidden="true">
                        <CalendarDays size={20} strokeWidth={2.3} />
                      </span>
                    </span>
                  </label>
                </div>
              ) : null}

              <div className="navbar-panel-row">
                <UserRoundPlus size={20} strokeWidth={2.3} />
                <span>2 adults • 0 children • 1 room</span>
              </div>
            </div>
          ) : null}
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
};

export default Navbar;
