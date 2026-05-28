import React, { useState } from 'react';
import {
  ArrowRightFromLine,
  ArrowUpRight,
  BedDouble,
  Bookmark,
  Briefcase,
  CalendarDays,
  HousePlus,
  MapPin,
  Minus,
  Plus,
  Search,
  Star,
  UserRound,
  UserRoundPlus,
  Wallet,
  RotateCw,
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import appLogo from '../assets/img/logo.svg';
import './navbar.css';

const formatDateLabel = (value) => {
  if (!value) {
    return 'Select date';
  }

  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
};

const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameOrAfter = (date, comparedDate) => normalizeDate(date).getTime() >= normalizeDate(comparedDate).getTime();

const isSameOrBefore = (date, comparedDate) => normalizeDate(date).getTime() <= normalizeDate(comparedDate).getTime();

const fallbackDestinationSuggestions = [
  { name: 'Cape Town', region: 'Western Cape, South Africa' },
  { name: 'Stellenbosch', region: 'Winelands, South Africa' },
  { name: 'Johannesburg', region: 'Gauteng, South Africa' },
  { name: 'Durban', region: 'KwaZulu-Natal, South Africa' },
  { name: 'Garden Route', region: 'South Africa' },
  { name: 'Kruger National Park', region: 'Mpumalanga, South Africa' },
];

const Navbar = ({
  destinationSuggestions,
  onSearchSubmit,
  canRefreshLiveData = false,
  onRefreshLiveData,
  refreshingLiveData = false,
}) => {
  const suggestions = destinationSuggestions?.length ? destinationSuggestions : fallbackDestinationSuggestions;
  const today = new Date();
  const minSelectableDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [searchValue, setSearchValue] = useState('Cape Town');
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [activeNavService, setActiveNavService] = useState('stays');
  const [checkInDate, setCheckInDate] = useState(new Date('2026-12-14T00:00:00'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2026-12-17T00:00:00'));
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [activeDateField, setActiveDateField] = useState('checkIn');
  const [calendarMonth, setCalendarMonth] = useState(new Date('2026-12-01T00:00:00'));
  const [hoveredDate, setHoveredDate] = useState(null);

  const openBookingPanel = () => {
    setShowBookingPanel(true);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    openBookingPanel();
    setShowDestinationSuggestions(true);
  };

  const handleDestinationSelect = (destination) => {
    setSearchValue(destination.name);
    setShowBookingPanel(true);
    setShowDestinationSuggestions(false);
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    openBookingPanel();
    setShowGuestPicker(false);
    setShowDatePicker((current) => !current);
    setActiveDateField('checkIn');
  };

  const toggleGuestPicker = () => {
    openBookingPanel();
    setShowDatePicker(false);
    setShowGuestPicker((current) => !current);
  };

  const toggleAccountPanel = () => {
    setShowAccountPanel((current) => !current);
  };

  const handleServiceButtonClick = (service) => {
    setActiveNavService(service);

    if (service === 'stays' && window.location.pathname !== '/stays') {
      window.location.assign('/stays');
      return;
    }

    if (service === 'listProperty' && window.location.pathname !== '/api-guide') {
      window.location.assign('/api-guide');
    }
  };

  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) {
      return;
    }

    const normalizedDate = normalizeDate(selectedDate);

    if (activeDateField === 'checkIn') {
      setCheckInDate(normalizedDate);
      setHoveredDate(null);

      if (checkOutDate && normalizedDate > checkOutDate) {
        setCheckOutDate(normalizedDate);
      }

      setActiveDateField('checkOut');
      return;
    }

    setCheckOutDate(normalizedDate);
    setHoveredDate(null);
    setShowDatePicker(false);
  };

  const handleClearDate = () => {
    if (activeDateField === 'checkIn') {
      setCheckInDate(null);
      return;
    }

    setCheckOutDate(null);
  };

  const handleSetToday = () => {
    const today = new Date();
    const normalizedToday = normalizeDate(today);

    if (activeDateField === 'checkIn') {
      setCheckInDate(normalizedToday);
      setHoveredDate(null);

      if (!checkOutDate || normalizedToday > checkOutDate) {
        setCheckOutDate(normalizedToday);
      }

      setActiveDateField('checkOut');
    } else {
      setCheckOutDate(normalizedToday);
      setHoveredDate(null);

      if (checkInDate && normalizedToday < checkInDate) {
        setCheckInDate(normalizedToday);
      }

      setShowDatePicker(false);
    }

    setCalendarMonth(normalizedToday);
  };

  const openDatePickerFor = (field) => {
    openBookingPanel();
    setShowDatePicker(true);
    setActiveDateField(field);
    const preferredMonth = field === 'checkOut' && checkOutDate ? checkOutDate : checkInDate || minSelectableDate;
    setCalendarMonth(preferredMonth < minSelectableDate ? minSelectableDate : preferredMonth);
  };

  const handleCheckInQuickSelect = () => {
    openDatePickerFor('checkIn');
  };

  const handleCheckOutQuickSelect = () => {
    openDatePickerFor('checkOut');
  };

  const handleDayMouseEnter = (date) => {
    if (activeDateField !== 'checkOut' || !checkInDate) {
      return;
    }

    if (isSameOrBefore(date, checkInDate)) {
      setHoveredDate(null);
      return;
    }

    setHoveredDate(normalizeDate(date));
  };

  const handleDayMouseLeave = () => {
    setHoveredDate(null);
  };

  const rangeEndDate = activeDateField === 'checkOut' && hoveredDate && checkInDate && isSameOrAfter(hoveredDate, checkInDate)
    ? hoveredDate
    : checkOutDate;

  const calendarRange = checkInDate && rangeEndDate && isSameOrAfter(rangeEndDate, checkInDate)
    ? {
        from: checkInDate,
        to: rangeEndDate,
      }
    : null;

  const handleSearchSubmit = () => {
    onSearchSubmit?.({
      destination: searchValue.trim(),
      checkInDate: checkInDate ? normalizeDate(checkInDate).toISOString().slice(0, 10) : null,
      checkOutDate: checkOutDate ? normalizeDate(checkOutDate).toISOString().slice(0, 10) : null,
      guestCounts: {
        adults: guestCounts.adults,
        children: guestCounts.children,
        rooms: guestCounts.rooms,
      },
    });

    const isSearchComplete = searchValue.trim() && checkInDate && checkOutDate;

    if (isSearchComplete) {
      setShowBookingPanel(false);
      setShowDestinationSuggestions(false);
      setShowDatePicker(false);
      return;
    }

    openBookingPanel();
    setShowDestinationSuggestions(false);
    setShowGuestPicker(false);
    setShowDatePicker(true);
    setActiveDateField('checkIn');
  };

  const updateGuestCount = (field, delta) => {
    setGuestCounts((current) => {
      const minimums = {
        adults: 1,
        children: 0,
        rooms: 1,
      };

      const nextValue = Math.max(minimums[field], current[field] + delta);
      return {
        ...current,
        [field]: nextValue,
      };
    });
  };

  const guestSummary = `${guestCounts.adults} adult${guestCounts.adults === 1 ? '' : 's'} • ${guestCounts.children} children • ${guestCounts.rooms} room${guestCounts.rooms === 1 ? '' : 's'}`;

  const destinationQuery = searchValue.trim().toLowerCase();
  const matchingDestinations = suggestions.filter((destination) =>
    destination.name.toLowerCase().includes(destinationQuery) ||
    destination.region.toLowerCase().includes(destinationQuery),
  );
  const showDestinationDropdown = showBookingPanel && showDestinationSuggestions && matchingDestinations.length > 0;

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
    <div className="navbar-top-row">
      <div className="navbar-left">
        <button
          type="button"
          className={`navbar-btn ${activeNavService === 'stays' ? 'navbar-btn-active' : 'navbar-btn-ghost'}`}
          aria-pressed={activeNavService === 'stays'}
          onClick={() => handleServiceButtonClick('stays')}
        >
          <BedDouble size={20} strokeWidth={2.3} />
          <span>Stays</span>
        </button>
        <button
          type="button"
          className={`navbar-btn ${activeNavService === 'listProperty' ? 'navbar-btn-active' : 'navbar-btn-ghost'}`}
          aria-pressed={activeNavService === 'listProperty'}
          onClick={() => handleServiceButtonClick('listProperty')}
        >
          <HousePlus size={20} strokeWidth={2.3} />
          <span>List your property</span>
        </button>
      </div>
      <div className="navbar-center">
        <button type="button" className="navbar-logo-button" onClick={handleLogoClick} aria-label="Go to top">
          <img className="navbar-logo-image" src={appLogo} alt="Deluxe Bookings" />
        </button>
      </div>
      <div className="navbar-actions">
        <div
          className="navbar-search-shell"
          onMouseEnter={openBookingPanel}
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
              onClick={handleSearchSubmit}
            >
              <Search size={20} strokeWidth={2.7} />
            </button>
          </div>

          {showDestinationDropdown ? (
            <div className="navbar-search-suggestions" role="listbox" aria-label="Suggested destinations">
              {matchingDestinations.map((destination) => (
                <button
                  key={destination.name}
                  type="button"
                  className="navbar-search-suggestion"
                  onClick={() => handleDestinationSelect(destination)}
                >
                  <span className="navbar-search-suggestion-icon" aria-hidden="true">
                    <MapPin size={16} strokeWidth={2.4} />
                  </span>
                  <span className="navbar-search-suggestion-copy">
                    <span className="navbar-search-suggestion-title">{destination.name}</span>
                    <span className="navbar-search-suggestion-region">{destination.region}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}

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
                    <button
                      type="button"
                      className={`navbar-date-trigger ${activeDateField === 'checkIn' ? 'navbar-date-trigger-active' : ''}`}
                      onClick={handleCheckInQuickSelect}
                    >
                      <span>{formatDateLabel(checkInDate)}</span>
                      <span className="navbar-date-input-icon" aria-hidden="true">
                        <CalendarDays size={20} strokeWidth={2.3} />
                      </span>
                    </button>
                  </label>
                  <label className="navbar-date-field">
                    <span>Check-out</span>
                    <button
                      type="button"
                      className={`navbar-date-trigger ${activeDateField === 'checkOut' ? 'navbar-date-trigger-active' : ''}`}
                      onClick={handleCheckOutQuickSelect}
                    >
                      <span>{formatDateLabel(checkOutDate)}</span>
                      <span className="navbar-date-input-icon" aria-hidden="true">
                        <CalendarDays size={20} strokeWidth={2.3} />
                      </span>
                    </button>
                  </label>

                  <div className="navbar-calendar-popover">
                    <DayPicker
                      mode="single"
                      selected={undefined}
                      onSelect={handleDateSelect}
                      month={calendarMonth}
                      onMonthChange={setCalendarMonth}
                      disabled={activeDateField === 'checkOut' && checkInDate ? [{ before: checkInDate }] : [{ before: minSelectableDate }]}
                      fromDate={minSelectableDate}
                      modifiers={{
                        booking_range: calendarRange || undefined,
                        booking_range_start: checkInDate || undefined,
                        booking_range_end: rangeEndDate || undefined,
                        booking_check_in: checkInDate || undefined,
                        booking_check_out: checkOutDate || undefined,
                      }}
                      modifiersClassNames={{
                        booking_range: 'navbar-day-picker-range',
                        booking_range_start: 'navbar-day-picker-range-start',
                        booking_range_end: 'navbar-day-picker-range-end',
                        booking_check_in: 'navbar-day-picker-check-in',
                        booking_check_out: 'navbar-day-picker-check-out',
                      }}
                      onDayMouseEnter={handleDayMouseEnter}
                      onDayMouseLeave={handleDayMouseLeave}
                      className="navbar-day-picker"
                      weekStartsOn={1}
                    />

                    <div className="navbar-calendar-actions">
                      <button type="button" className="navbar-calendar-action" onClick={handleClearDate}>
                        Clear
                      </button>
                      <button type="button" className="navbar-calendar-action" onClick={handleSetToday}>
                        Today
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                className="navbar-panel-row navbar-panel-row-button"
                onClick={toggleGuestPicker}
                aria-expanded={showGuestPicker}
                aria-controls="booking-guest-picker"
              >
                <UserRoundPlus size={20} strokeWidth={2.3} />
                <span>{guestSummary}</span>
              </button>

              {showGuestPicker ? (
                <div id="booking-guest-picker" className="navbar-guest-picker-dropdown">
                  <div className="navbar-guest-control">
                    <div className="navbar-guest-labels">
                      <span className="navbar-guest-title">Adults</span>
                      <span className="navbar-guest-subtitle">Ages 13 or above</span>
                    </div>
                    <div className="navbar-guest-stepper">
                      <button
                        type="button"
                        className="navbar-guest-step-btn"
                        onClick={() => updateGuestCount('adults', -1)}
                        disabled={guestCounts.adults <= 1}
                        aria-label="Decrease adults"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                      <span className="navbar-guest-count">{guestCounts.adults}</span>
                      <button
                        type="button"
                        className="navbar-guest-step-btn"
                        onClick={() => updateGuestCount('adults', 1)}
                        aria-label="Increase adults"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="navbar-guest-control">
                    <div className="navbar-guest-labels">
                      <span className="navbar-guest-title">Children</span>
                      <span className="navbar-guest-subtitle">Ages 0 to 12</span>
                    </div>
                    <div className="navbar-guest-stepper">
                      <button
                        type="button"
                        className="navbar-guest-step-btn"
                        onClick={() => updateGuestCount('children', -1)}
                        disabled={guestCounts.children <= 0}
                        aria-label="Decrease children"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                      <span className="navbar-guest-count">{guestCounts.children}</span>
                      <button
                        type="button"
                        className="navbar-guest-step-btn"
                        onClick={() => updateGuestCount('children', 1)}
                        aria-label="Increase children"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="navbar-guest-control">
                    <div className="navbar-guest-labels">
                      <span className="navbar-guest-title">Rooms</span>
                      <span className="navbar-guest-subtitle">At least 1 room</span>
                    </div>
                    <div className="navbar-guest-stepper">
                      <button
                        type="button"
                        className="navbar-guest-step-btn"
                        onClick={() => updateGuestCount('rooms', -1)}
                        disabled={guestCounts.rooms <= 1}
                        aria-label="Decrease rooms"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                      <span className="navbar-guest-count">{guestCounts.rooms}</span>
                      <button
                        type="button"
                        className="navbar-guest-step-btn"
                        onClick={() => updateGuestCount('rooms', 1)}
                        aria-label="Increase rooms"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="navbar-create-shell">
          <button
            type="button"
            className="navbar-create-btn"
            onClick={toggleAccountPanel}
            aria-expanded={showAccountPanel}
            aria-controls="account-panel-dropdown"
          >
            <span>Create account</span>
            <span className="navbar-create-icon" aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </span>
          </button>

          {showAccountPanel ? (
            <div id="account-panel-dropdown" className="navbar-account-panel navbar-account-panel-dropdown">
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
              {canRefreshLiveData ? (
                <button
                  type="button"
                  className="navbar-account-item navbar-account-item-refresh"
                  onClick={() => onRefreshLiveData?.()}
                  disabled={refreshingLiveData}
                >
                  <RotateCw size={20} strokeWidth={2.3} />
                  <span>{refreshingLiveData ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              ) : null}
              <button className="navbar-account-item">
                <ArrowRightFromLine size={20} strokeWidth={2.3} />
                <span>Sign out</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>

    <div className="navbar-sidepanels navbar-sidepanels-placeholder" aria-hidden="true" />
  </nav>
  );
};

export default Navbar;
