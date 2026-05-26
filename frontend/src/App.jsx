import { useEffect, useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const initialAuth = {
  name: '',
  email: '',
  password: '',
  signatureWord: '',
}

const initialBooking = {
  destination: 'Cape Town',
  suite: 'Ocean Suite',
  checkIn: '',
  checkOut: '',
  guests: 2,
  specialRequest: '',
}

function App() {
  const [mode, setMode] = useState('login')
  const [authForm, setAuthForm] = useState(initialAuth)
  const [bookingForm, setBookingForm] = useState(initialBooking)
  const [token, setToken] = useState(() => localStorage.getItem('deluxe_token'))
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      return
    }

    const loadDashboard = async () => {
      try {
        const [profileResponse, bookingsResponse] = await Promise.all([
          fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const profileData = await profileResponse.json()
        const bookingsData = await bookingsResponse.json()

        if (!profileResponse.ok) {
          throw new Error(profileData.message || 'Session expired.')
        }

        if (!bookingsResponse.ok) {
          throw new Error(bookingsData.message || 'Could not load bookings.')
        }

        setUser(profileData.user)
        setBookings(bookingsData.bookings)
      } catch (error) {
        localStorage.removeItem('deluxe_token')
        setUser(null)
        setBookings([])
        setToken(null)
        setNotice(error.message)
      }
    }

    loadDashboard()
  }, [token])

  const handleAuthChange = (event) => {
    const { name, value } = event.target
    setAuthForm((current) => ({ ...current, [name]: value }))
  }

  const handleBookingChange = (event) => {
    const { name, value } = event.target
    setBookingForm((current) => ({
      ...current,
      [name]: name === 'guests' ? Number(value) : value,
    }))
  }

  const submitAuth = async (event) => {
    event.preventDefault()
    setLoading(true)
    setNotice('')

    try {
      const endpoint = mode === 'register' ? 'register' : 'login'
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed.')
      }

      localStorage.setItem('deluxe_token', data.token)
      setToken(data.token)
      setUser(data.user)
      setAuthForm(initialAuth)
      setNotice(
        mode === 'register'
          ? 'Account created. Your Signature Stay Word is now required at login.'
          : 'Signed in successfully.',
      )
    } catch (error) {
      setNotice(error.message)
    } finally {
      setLoading(false)
    }
  }

  const submitBooking = async (event) => {
    event.preventDefault()

    if (!token) {
      setNotice('Sign in first before creating a booking.')
      return
    }

    setLoading(true)
    setNotice('')

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingForm),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Booking request failed.')
      }

      setBookings((current) => [data.booking, ...current])
      setBookingForm(initialBooking)
      setNotice('Reservation created successfully.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('deluxe_token')
    setToken(null)
    setUser(null)
    setBookings([])
    setNotice('Signed out.')
  }

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Deluxe Bookings</span>
          <h1>Reserve standout stays with layered identity checks.</h1>
          <p>
            A DV200 full-stack prototype built with React, Express, MongoDB, JWT,
            and a hotel-themed second factor called the Signature Stay Word.
          </p>
          <div className="hero-actions">
            <a href="#auth-card" className="button primary">
              Open guest access
            </a>
            <a href="#booking-card" className="button secondary">
              Preview reservation flow
            </a>
          </div>
          <dl className="stats-grid">
            <div>
              <dt>Frontend</dt>
              <dd>React + Vite</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>Express API</dd>
            </div>
            <div>
              <dt>Auth</dt>
              <dd>JWT + Signature Word</dd>
            </div>
          </dl>
        </div>

        <div className="hero-card">
          <p className="card-label">Guest Intelligence</p>
          <h2>{user ? `Welcome back, ${user.name}` : 'Suite access in three signals'}</h2>
          <ul className="signal-list">
            <li>Email identifies the guest profile.</li>
            <li>Password confirms the primary credential.</li>
            <li>Signature Stay Word adds a branded second factor.</li>
          </ul>
          <div className="demo-pill">
            Demo fallback account: demo@deluxebookings.com / Password123! / Aurora
          </div>
        </div>
      </section>

      <section className="workspace-grid">
        <article className="glass-card" id="auth-card">
          <div className="card-header">
            <div>
              <p className="card-label">Authentication</p>
              <h2>{mode === 'register' ? 'Create account' : 'Guest login'}</h2>
            </div>
            <button
              type="button"
              className="mode-toggle"
              onClick={() => setMode((current) => (current === 'login' ? 'register' : 'login'))}
            >
              Switch to {mode === 'login' ? 'register' : 'login'}
            </button>
          </div>

          <form className="stacked-form" onSubmit={submitAuth}>
            {mode === 'register' ? (
              <label>
                <span>Name</span>
                <input
                  name="name"
                  value={authForm.name}
                  onChange={handleAuthChange}
                  placeholder="Guest name"
                  required
                />
              </label>
            ) : null}

            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthChange}
                placeholder="name@example.com"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
                placeholder="••••••••"
                required
              />
            </label>

            <label>
              <span>Signature Stay Word</span>
              <input
                name="signatureWord"
                value={authForm.signatureWord}
                onChange={handleAuthChange}
                placeholder="Aurora"
                required
              />
            </label>

            <button type="submit" className="button primary full" disabled={loading}>
              {loading ? 'Processing...' : mode === 'register' ? 'Create guest profile' : 'Enter dashboard'}
            </button>
          </form>

          {notice ? <p className="notice-banner">{notice}</p> : null}

          <div className="auth-footer">
            <p>
              {user
                ? `Signed in as ${user.email}`
                : 'Register with a themed second factor or use the seeded demo account.'}
            </p>
            {user ? (
              <button type="button" className="button secondary" onClick={handleLogout}>
                Sign out
              </button>
            ) : null}
          </div>
        </article>

        <article className="glass-card" id="booking-card">
          <div className="card-header">
            <div>
              <p className="card-label">Reservation Composer</p>
              <h2>Build a suite booking</h2>
            </div>
            <span className="status-chip">{user ? 'Authenticated' : 'Guest preview mode'}</span>
          </div>

          <form className="stacked-form" onSubmit={submitBooking}>
            <label>
              <span>Destination</span>
              <input
                name="destination"
                value={bookingForm.destination}
                onChange={handleBookingChange}
                placeholder="Cape Town"
                required
              />
            </label>

            <label>
              <span>Suite type</span>
              <input
                name="suite"
                value={bookingForm.suite}
                onChange={handleBookingChange}
                placeholder="Ocean Suite"
                required
              />
            </label>

            <div className="split-fields">
              <label>
                <span>Check-in</span>
                <input
                  type="date"
                  name="checkIn"
                  value={bookingForm.checkIn}
                  onChange={handleBookingChange}
                  required
                />
              </label>
              <label>
                <span>Check-out</span>
                <input
                  type="date"
                  name="checkOut"
                  value={bookingForm.checkOut}
                  onChange={handleBookingChange}
                  required
                />
              </label>
            </div>

            <label>
              <span>Guests</span>
              <input
                type="number"
                min="1"
                max="8"
                name="guests"
                value={bookingForm.guests}
                onChange={handleBookingChange}
                required
              />
            </label>

            <label>
              <span>Special request</span>
              <textarea
                name="specialRequest"
                value={bookingForm.specialRequest}
                onChange={handleBookingChange}
                placeholder="Window seating, floral welcome, airport transfer..."
                rows="4"
              />
            </label>

            <button type="submit" className="button primary full" disabled={loading || !token}>
              {token ? 'Confirm reservation' : 'Sign in to reserve'}
            </button>
          </form>
        </article>
      </section>

      <section className="workspace-grid lower-grid">
        <article className="glass-card activity-card">
          <div className="card-header">
            <div>
              <p className="card-label">Recent activity</p>
              <h2>Bookings feed</h2>
            </div>
            <span className="status-chip">{bookings.length} total</span>
          </div>

          <div className="booking-list">
            {bookings.length ? (
              bookings.map((booking) => (
                <article className="booking-item" key={booking.id || booking._id}>
                  <div>
                    <p className="booking-destination">{booking.destination}</p>
                    <p className="booking-meta">
                      {booking.suite} • {booking.guests} guests • {booking.status}
                    </p>
                  </div>
                  <div>
                    <p className="booking-dates">
                      {booking.checkIn} to {booking.checkOut}
                    </p>
                    <p className="booking-request">{booking.specialRequest || 'No special request'}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="empty-state">
                No reservations loaded yet. Sign in with the demo account or register a guest to create one.
              </p>
            )}
          </div>
        </article>

        <article className="glass-card notes-card">
          <p className="card-label">Technical summary</p>
          <h2>Assignment-ready structure</h2>
          <ul className="signal-list compact">
            <li>MongoDB Atlas-ready backend with a local demo fallback.</li>
            <li>JWT authentication middleware protecting reservation routes.</li>
            <li>Root README covering setup, mockups, and repository expectations.</li>
            <li>Responsive UI designed for both desktop and mobile review.</li>
          </ul>
        </article>
      </section>
    </div>
  )
}

export default App
