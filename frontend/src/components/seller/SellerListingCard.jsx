function ListingCard({ listing, onEdit, onDelete }) {
  const displayLocation =
    listing.location ||
    [listing.city, listing.province, listing.country]
      .filter(Boolean)
      .join(", ");

  return (
    <div className="listing-card">
      {/* Image Section */}
      <div className="card-image-container">
        {listing.image && (
          <img
            src={listing.image}
            alt={listing.title || listing.propertyName}
            className="card-image"
          />
        )}
        <button className="wishlist-btn">♡</button>
        {listing.badge && <div className="card-badge">{listing.badge}</div>}
      </div>

      {/* Content Section */}
      <div className="card-content">
        {/* Status & Booking Tags */}
        <div className="card-tags">
          {listing.status && (
            <span className="status-badge">{listing.status}</span>
          )}
          {listing.dealType && (
            <span className="deal-badge">{listing.dealType}</span>
          )}
        </div>

        {/* Title */}
        <h2 className="card-title">{listing.title || listing.propertyName}</h2>

        {/* Location */}
        <div className="card-location">
          <span className="location-icon"></span>
          <div>
            <p className="location-name">{displayLocation}</p>
            <p className="location-distance">{listing.distanceFromCentre}</p>
          </div>
        </div>

        {/* Description */}
        <p className="card-description">{listing.description}</p>

        {/* Property Type */}
        <h4 className="property-type">{listing.propertyType}</h4>

        {/* Property Details */}
        <div className="property-details">
          {listing.beachDistance && (
            <div className="detail-item">
              <span className="detail-icon">🏖️</span>
              <span>{listing.beachDistance}</span>
            </div>
          )}
          {listing.bedrooms && (
            <div className="detail-item">
              <span className="detail-icon">🛏️</span>
              <span>{listing.bedrooms} bedrooms</span>
            </div>
          )}
          {listing.bathrooms && (
            <div className="detail-item">
              <span className="detail-icon">🚿</span>
              <span>{listing.bathrooms} bathroom</span>
            </div>
          )}
          {listing.beds && (
            <div className="detail-item">
              <span className="detail-icon">🛌</span>
              <span>{listing.beds}</span>
            </div>
          )}
          {listing.kitchen && (
            <div className="detail-item">
              <span className="detail-icon">🍳</span>
              <span>1 kitchen</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Ratings & Pricing */}
      <div className="card-sidebar">
        {/* Ratings */}
        <div className="ratings-section">
          <div className="stars">★★★★★</div>
          <p className="rating-label">Value for money {listing.valueScore}</p>
          <strong className="rating-text">{listing.ratingText}</strong>
          <p className="review-count">• {listing.reviewCount} reviews</p>
        </div>

        {/* Duration */}
        {listing.nights && <p className="duration">{listing.nights} nights</p>}

        {/* Pricing */}
        <div className="pricing-section">
          {listing.oldPrice && (
            <p className="old-price">ZAR {listing.oldPrice}</p>
          )}
          <h2 className="current-price">ZAR {listing.pricePerNight}</h2>
          {listing.taxesAndCharges && (
            <p className="taxes">
              +ZAR {listing.taxesAndCharges} taxes and charges
            </p>
          )}
        </div>

        {/* Cancellation Button */}
        {listing.cancellation && (
          <button className="cancellation-btn">✓ {listing.cancellation}</button>
        )}
        <button type="button" onClick={onEdit}> Edit </button>
        <button type="button" onClick={onDelete}> Delete </button>
      </div>
    </div>
  );
}

export default ListingCard;
