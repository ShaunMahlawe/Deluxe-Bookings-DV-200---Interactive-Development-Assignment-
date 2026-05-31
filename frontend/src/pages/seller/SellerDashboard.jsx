import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { deleteMySellerListing, getMySellerListings } from "../../api/sellerApi";
import SellerListingCard from "../../components/seller/SellerListingCard";
import {
  deleteLocalSellerListing,
  getLocalSellerListings,
} from "../../utils/listingStorage";
import "../../css/SellerDashboard.css";
import "../../css/SellerListingCard.css";

const demoListings = [
  {
    _id: "demo-1",
    propertyName: "Clifton Ocean Residence",
    propertyType: "Villa",
    city: "Cape Town",
    province: "Western Cape",
    country: "South Africa",
    description: "A polished coastal villa with layered living spaces, sea-facing bedrooms, and a private entertainment deck.",
    bedrooms: 4,
    bathrooms: 3,
    guestCapacity: 8,
    pricePerNight: 8500,
    status: "Draft preview",
    images: [],
  },
  {
    _id: "demo-2",
    propertyName: "Franschhoek Garden Suite",
    propertyType: "Guesthouse",
    city: "Franschhoek",
    province: "Western Cape",
    country: "South Africa",
    description: "A calm vineyard-side suite designed for weekend stays, close to restaurants, galleries, and wine farms.",
    bedrooms: 2,
    bathrooms: 2,
    guestCapacity: 4,
    pricePerNight: 4200,
    status: "Draft preview",
    images: [],
  },
];

function SellerDashboard({ onNavigate }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const fetchListings = () => {
    setLoading(true);
    setLoadError("");
    const localListings = getLocalSellerListings();

    const token = localStorage.getItem("deluxe_token");

    if (!token) {
      setListings(localListings.length > 0 ? localListings : demoListings);
      setLoading(false);
      return;
    }

    getMySellerListings(token)
      .then((data) => setListings([...localListings, ...(Array.isArray(data) ? data : [])]))
      .catch((error) => {
        console.log("Error fetching seller listings:", error);
        setLoadError("Backend is not available yet, so showing locally saved listings.");
        setListings(localListings.length > 0 ? localListings : demoListings);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("deluxe_token");
    const localListings = getLocalSellerListings();

    if (!token) {
      setListings(localListings.length > 0 ? localListings : demoListings);
      setLoading(false);
      return () => {
        isMounted = false;
      };
    }

    getMySellerListings(token)
      .then((data) => {
        if (isMounted) {
          setListings([...localListings, ...(Array.isArray(data) ? data : [])]);
        }
      })
      .catch((error) => {
        console.log("Error fetching seller listings:", error);
        if (isMounted) {
          setLoadError("Backend is not available yet, so showing locally saved listings.");
          setListings(localListings.length > 0 ? localListings : demoListings);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = (listingId) => {
    if (listingId.startsWith("local-")) {
      deleteLocalSellerListing(listingId);
      fetchListings();
      return;
    }

    if (listingId.startsWith("demo-")) {
      setListings((current) => current.filter((listing) => listing._id !== listingId));
      return;
    }

    const token = localStorage.getItem("deluxe_token");

    if (!token) {
      setLoadError("Sign in to delete live seller listings.");
      return;
    }

    deleteMySellerListing(listingId, token)
      .then(() => fetchListings())
      .catch((error) => console.log("Error deleting listing:", error));
  };

  return (
    <main className="seller-dashboard-page">
      <Container fluid="lg" className="py-4 py-lg-5">
        <Row className="align-items-end g-3 mb-4">
          <Col lg={8}>
            <p className="seller-kicker">Host workspace</p>
            <h1 className="seller-dashboard-title">Seller Dashboard</h1>
            <div className="seller-dashboard-meta">
              <Badge bg="light" text="dark">{listings.length} listings</Badge>
              <span>Manage property drafts, pricing, and availability.</span>
            </div>
          </Col>
          <Col lg={4} className="text-lg-end">
            <Button
              className="seller-primary-action"
              type="button"
              onClick={() => onNavigate("/seller/create-listing")}
            >
              Create Listing
            </Button>
          </Col>
        </Row>

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
        ) : (
          <Row className="g-4">
            {listings.map((listing) => (
              <Col xs={12} xl={6} key={listing._id}>
                <SellerListingCard
                  listing={listing}
                  onEdit={() => onNavigate(`/seller/edit-listing/${listing._id}`)}
                  onDelete={() => handleDelete(listing._id)}
                />
              </Col>
            ))}

            {listings.length === 0 && (
              <Col xs={12}>
                <div className="seller-empty-state">
                  <h2>No listings yet</h2>
                  <p>Create your first property listing to start building the seller experience.</p>
                  <Button className="seller-primary-action" onClick={() => onNavigate("/seller/create-listing")}>
                    Create Listing
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </main>
  );
}

export default SellerDashboard;
