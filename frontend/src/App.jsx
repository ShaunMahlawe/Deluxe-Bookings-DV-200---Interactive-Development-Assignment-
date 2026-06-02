import { useEffect, useState } from "react";
import "./App.css";

import SellerOnboarding from "./pages/sellerOnboarding";
import CreateListing from "./pages/seller/CreateListing";
import EditListing from "./pages/seller/EditListing";
import SellerDashboard from "./pages/seller/SellerDashboard";
import IndividualListing from "./pages/seller/individualListing";

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  const normalizedRoute = route.replace(/\/+$/, "") || "/";

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);

    setRoute(path);
  };

  if (normalizedRoute === "/") {
    return <SellerOnboarding onNavigate={navigate} />;
  }

  if (normalizedRoute === "/seller/onboarding") {
    return <SellerOnboarding onNavigate={navigate} />;
  }

  if (normalizedRoute === "/preview/seller-dashboard") {
    return <SellerDashboard onNavigate={navigate} previewMode />;
  }

  if (normalizedRoute === "/seller/dashboard") {
    return <SellerDashboard onNavigate={navigate} />;
  }

  if (normalizedRoute === "/seller/create-listing") {
    return <CreateListing onNavigate={navigate} />;
  }

  if (normalizedRoute.startsWith("/seller/edit-listing/")) {
    const listingId = normalizedRoute.split("/").filter(Boolean).at(-1);

    return <EditListing listingId={listingId} onNavigate={navigate} />;
  }

  if (normalizedRoute.startsWith("/seller/listing/")) {
    const listingId = normalizedRoute.split("/").filter(Boolean).at(-1);

    return (
      <IndividualListing
        listingId={listingId}
        fetchSellerListing
        onNavigate={navigate}
      />
    );
  }

  if (normalizedRoute.startsWith("/buyer/listing/")) {
    const listingId = normalizedRoute.split("/").filter(Boolean).at(-1);

    return <IndividualListing listingId={listingId} onNavigate={navigate} />;
  }

  return (
    <main className="page-shell">
      <section className="glass-card">
        <p className="card-label">Page not found</p>

        <h1>This route does not exist.</h1>

        <button
          type="button"
          className="button primary"
          onClick={() => navigate("/seller/onboarding")}
        >
          Go to Seller Onboarding
        </button>
      </section>
    </main>
  );
}

export default App;

// if (normalizedRoute === '/seller/onboarding') {
//   return <SellerOnboarding onNavigate={navigate} />
// }

// if (normalizedRoute === '/seller/create-listing' || normalizedRoute === '/create-listing') {
//   return <CreateListing onNavigate={navigate} />
// }

// if (normalizedRoute === '/seller/dashboard' || normalizedRoute === '/seller-dashboard') {
//   return <SellerDashboard onNavigate={navigate} />
// }

// if (normalizedRoute.startsWith('/seller/edit-listing/') || normalizedRoute.startsWith('/edit-listing/')) {
//   const listingId = normalizedRoute.split('/').filter(Boolean).at(-1)
//   return <EditListing listingId={listingId} onNavigate={navigate} />
// }

// if (normalizedRoute.startsWith('/buyer/listing/') || normalizedRoute.startsWith('/listing/')) {
//   const listingId = normalizedRoute.split('/').filter(Boolean).at(-1)
//   return <IndividualListing listingId={listingId} onNavigate={navigate} />
// }

// if (
//   normalizedRoute === '/buyer/listing' ||
//   normalizedRoute === '/buyer/individual-listing' ||
//   normalizedRoute === '/individual-listing' ||
//   normalizedRoute === '/listing'
// ) {
//   return <IndividualListing onNavigate={navigate} />
// }

// if (normalizedRoute === '/dev/seller/listing-card') {
//   return <SellerListingCardPreview onNavigate={navigate} />
// }

// if (normalizedRoute === '/dev/seller/listing-form') {
//   return <SellerListingFormPreview />
// }
