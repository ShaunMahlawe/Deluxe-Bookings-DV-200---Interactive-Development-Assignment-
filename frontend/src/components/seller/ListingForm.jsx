import "../../css/CreateListing.css";

function ListingForm({ formData, onChange, onSubmit, submitLabel }) {
  return (
    <div className="create-listing-page">
      <div className="create-listing-shell">
        <div className="form-card">
          <div className="form-header">
            <h2>Property Details</h2>
            <p className="form-subtitle">Fill in your accommodation information below.</p>
          </div>

          <div className="fields-grid">
            <label className="full-width">
              Property Name
              <input
                type="text"
                name="propertyName"
                value={formData.propertyName || ""}
                onChange={onChange}
              />
            </label>

            <label>
              Location
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={onChange}
              />
            </label>

            <label>
              Price Per Night
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight || ""}
                onChange={onChange}
              />
            </label>

            <label className="full-width">
              Description
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={onChange}
              />
            </label>

            <div className="form-actions">
              <button
                type="button"
                className="publish-button"
                onClick={onSubmit}
              >
                {submitLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingForm;