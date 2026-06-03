import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";

import MyListingSection from "../../components/seller/MyListingSection";

import "../../css/seller/SellerDashboard.css";
import "../../css/seller/MyListingSection.css";
import "../../css/seller/SellerListingCard.css";

import { getMySellerListings } from "../../api/sellerApi";
import { clearListingDraft, getListingDraft } from "../../utils/listingStorage";

const demoListings = [
  {
    _id: "demo-1",

    propertyName: "Clifton Ocean Residence",

    propertyType: "Villa",

    location: "Clifton, Cape Town, South Africa",

    city: "Cape Town",

    province: "Western Cape",

    country: "South Africa",

    description:
      "A polished coastal villa with layered living spaces, sea-facing bedrooms, and a private entertainment deck.",

    bedrooms: 4,

    bathrooms: 3,

    guestCapacity: 8,

    pricePerNight: 8500,

    status: "submitted_for_review",

    facilities: ["Pool", "Sea view", "WiFi", "Parking"],

    images: [],
  },

  {
    _id: "demo-2",

    propertyName: "Franschhoek Garden Suite",

    propertyType: "Guesthouse",

    location: "Franschhoek, Western Cape, South Africa",

    city: "Franschhoek",

    province: "Western Cape",

    country: "South Africa",

    description:
      "A calm vineyard-side suite designed for weekend stays, close to restaurants, galleries, and wine farms.",

    bedrooms: 2,

    bathrooms: 2,

    guestCapacity: 4,

    pricePerNight: 4200,

    status: "approved_unpublished",

    facilities: ["Breakfast", "Garden", "WiFi"],

    images: [],
  },

  {
    _id: "demo-3",

    propertyName: "Camps Bay Beach Apartment",

    propertyType: "Apartment",

    location: "Camps Bay, Cape Town, South Africa",

    city: "Cape Town",

    province: "Western Cape",

    country: "South Africa",

    description:
      "A compact luxury apartment near the beach with bright interiors, city access, and a balcony view.",

    bedrooms: 1,

    bathrooms: 1,

    guestCapacity: 2,

    pricePerNight: 2800,

    status: "published",

    facilities: ["WiFi", "Kitchen", "Parking"],

    images: [],
  },
];

function SellerDashboard({ onNavigate, previewMode = false }) {
  const [listings, setListings] = useState(previewMode ? demoListings : []);

  const [selectedListing, setSelectedListing] = useState(null);

  const [draft, setDraft] = useState(() => getListingDraft());

  const [loading, setLoading] = useState(!previewMode);

  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (previewMode) {
      return;
    }

    const fetchListings = async () => {
      const token = localStorage.getItem("deluxe_token");

      setLoading(true);

      setLoadError("");

      if (!token) {
        setListings([]);

        setLoadError("You need to be logged in to view your seller listings.");

        setLoading(false);

        return;
      }

      try {
        const data = await getMySellerListings(token);

        setListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching seller listings:", error);

        setLoadError("Could not load your seller listings.");

        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [previewMode]);

  const handleStatusChange = async (listingId, currentStatus) => {
    if (previewMode) {
      setListings((prev) =>
        prev.map((listing) => {
          if (listing._id !== listingId) return listing;

          if (currentStatus === "published") {
            return { ...listing, status: "unpublished" };
          }

          if (currentStatus === "approved_unpublished") {
            return { ...listing, status: "published" };
          }

          if (currentStatus === "unpublished") {
            return { ...listing, status: "submitted_for_review" };
          }

          if (currentStatus === "submitted_for_review") {
            return { ...listing, status: "unpublished" };
          }

          return listing;
        }),
      );

      return;
    }

    console.log("Status change will connect to backend later:", {
      listingId,

      currentStatus,
    });
  };

  const handleCancelDraft = () => {
    clearListingDraft();
    setDraft(null);
  };

  return (
    <main className="seller-dashboard-page">
      {/* <Container fluid="lg" className="py-4 py-lg-5"> */}
        <Row className="seller-header align-items-end g-3 mb-3 py-3 py-lg-4 px-5">
          <Col lg={8}>
            <p className="seller-kicker">Host workspace</p>
            <h1 className="seller-dashboard-title">
              <span>My</span>{" "}
              <em>Listings</em>
            </h1>

            <div className="seller-dashboard-meta">
              <span>
                Welcombe Back, User! You are currently managing {listings.length} luxury properties.
              </span>
            </div>
          </Col>
        </Row>

        {/* {previewMode && (
          <Alert variant="info" className="seller-alert">
            Preview mode: this dashboard is using demo listing data.
          </Alert>
        )} */}

        {draft && (
          <Alert variant="info" className="seller-alert">
            <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
              <div>
                <strong>You have an incomplete listing draft.</strong>

                <div>
                  Continue where you left off or start a new listing when ready.
                </div>
              </div>

              <div className="seller-alert-actions">
                <Button
                  type="button"
                  variant="outline-dark"
                  className="seller-secondary-action"
                  onClick={handleCancelDraft}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  className="seller-primary-action"
                  onClick={() => onNavigate("/seller/create-listing")}
                >
                  Continue Draft
                </Button>
              </div>
            </div>
          </Alert>
        )}

        {loadError && (
          <Alert variant="warning" className="seller-alert">
            {loadError}
          </Alert>
        )}

        {loading ? (
          <div className="seller-loading">
            <Spinner animation="border" role="status" />

            <span>Loading seller listings...</span>
          </div>
        ) : listings.length > 0 ? (
          <MyListingSection
            listings={listings}
            selectedListing={selectedListing}
            onSelectListing={setSelectedListing}
            onCloseListing={() => setSelectedListing(null)}
            onEdit={(id) => onNavigate(`/seller/edit-listing/${id}`)}
            onStatusChange={handleStatusChange}
            onCreate={() => onNavigate("/seller/create-listing")}
            onViewListingPage={(id) => onNavigate(`/seller/listing/${id}`)}
          />
        ) : (
          <div className="seller-empty-state">
            <h2>No listings yet</h2>

            <p>
              Create your first property listing. Submitted listings will be
              sent for review before they can appear publicly.
            </p>

            <Button
              className="seller-primary-action"
              onClick={() => onNavigate("/seller/create-listing")}
            >
              Create Listing
            </Button>
          </div>
        )}
      {/* </Container> */}
    </main>
  );
}

export default SellerDashboard;
