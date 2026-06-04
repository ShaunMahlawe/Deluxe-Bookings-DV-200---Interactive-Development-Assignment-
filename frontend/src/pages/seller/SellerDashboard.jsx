import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";

import MyListingSection from "../../components/seller/MyListingSection";
import EditListing from "./EditListing";

import "../../css/seller/SellerDashboard.css";
import "../../css/seller/MyListingSection.css";
import "../../css/seller/SellerListingCard.css";

import { getMySellerListings, updateMySellerListing } from "../../api/sellerApi";
import { clearListingDraft, getListingDraft } from "../../utils/listingStorage";

const demoListings = [];

const getImageSource = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.preview || image.url || "";
};

const getNextStatus = (currentStatus) => {
  if (currentStatus === "published") return "approved_unpublished";
  if (currentStatus === "approved_unpublished") return "published";
  if (currentStatus === "removed_from_public") return "submitted_for_review";
  if (currentStatus === "unpublished") return "submitted_for_review";
  if (currentStatus === "submitted_for_review" || currentStatus === "in_review") {
    return "draft";
  }

  return currentStatus;
};

const buildListingUpdatePayload = (listing, nextStatus) => {
  const images = Array.isArray(listing.images)
    ? listing.images.map(getImageSource).filter(Boolean)
    : [];
  const fallbackImage = getImageSource(listing.image);
  const normalizedImages = images.length ? images : [fallbackImage].filter(Boolean);

  return {
    ...listing,
    status: nextStatus,
    images: normalizedImages,
    image: normalizedImages[0] || "",
  };
};

function SellerDashboard({ onNavigate, previewMode = false }) {
  const [listings, setListings] = useState(previewMode ? demoListings : []);

  const [selectedListing, setSelectedListing] = useState(null);
  const [editingListingId, setEditingListingId] = useState(null);

  const [draft, setDraft] = useState(() => getListingDraft());

  const [loading, setLoading] = useState(!previewMode);

  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (previewMode) {
      return;
    }

    const fetchListings = async () => {
      const token = localStorage.getItem("token");

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
    const nextStatus = getNextStatus(currentStatus);

    if (nextStatus === currentStatus) {
      return;
    }

    if (previewMode) {
      setListings((prev) =>
        prev.map((listing) => {
          if (listing._id !== listingId) return listing;

          return { ...listing, status: nextStatus };
        }),
      );

      return;
    }

    const listing = listings.find((item) => item._id === listingId);
    const token = localStorage.getItem("token");

    if (!listing || !token) {
      setLoadError("Could not update this listing status.");
      return;
    }

    try {
      const updatedListing = await updateMySellerListing(
        listingId,
        buildListingUpdatePayload(listing, nextStatus),
        token,
      );

      setListings((prev) =>
        prev.map((item) => (item._id === listingId ? updatedListing : item)),
      );

      setSelectedListing((current) =>
        current?._id === listingId ? updatedListing : current,
      );
      setLoadError("");
    } catch (error) {
      console.log("Error updating listing status:", error);
      setLoadError("Could not update this listing status.");
    }
  };

  const handleCancelDraft = () => {
    clearListingDraft();
    setDraft(null);
  };

  const handleEditNavigate = (path) => {
    if (path === "/seller/dashboard") {
      setEditingListingId(null);
      return;
    }

    onNavigate(path);
  };

  if (editingListingId) {
    return (
      <EditListing
        listingId={editingListingId}
        onNavigate={handleEditNavigate}
      />
    );
  }

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
            onEdit={setEditingListingId}
            onStatusChange={handleStatusChange}
            onCreate={() => onNavigate("/seller/create-listing")}
            onViewListingPage={(id) =>
              setSelectedListing(listings.find((listing) => listing._id === id))
            }
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
