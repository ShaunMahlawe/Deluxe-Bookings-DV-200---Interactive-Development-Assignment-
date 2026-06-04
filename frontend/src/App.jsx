import './App.css';
import './joe.css'
import LogIn from "./pages/public/login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/public/home";
import Account from "./pages/buyer/account";
import StaysPage from "./pages/public/StaysPage";
import ApiGuidePage from "./pages/public/ApiGuidePage";
import SearchResultsApp from "./SearchResultsApp";
import SellerOnboarding from "./pages/seller/sellerOnboarding";
import NavBar from './components/public/navbar';
import Checkout from './pages/buyer/checkout';
import SellerDashboard from './pages/seller/SellerDashboard';
import CreateListing from './pages/seller/CreateListing';
import AdminDashboard from './pages/admin/adminDashboard';
import ProtectedRoute from './pages/admin/AdminRoute';

function SellerOnboardingRoute() {
  const navigate = useNavigate();
  return <SellerOnboarding onNavigate={navigate} />;
}

function SellerDashboardRoute() {
  const navigate = useNavigate();
  return <SellerDashboard onNavigate={navigate} />;
}

function CreateListingRoute() {
  const navigate = useNavigate();
  return <CreateListing onNavigate={navigate} />;
}

function App() {
  
  return (
    <BrowserRouter>
      {/* SOFT REMOVE: font imports belong in index.css, not inside App markup. */}
      {/* <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');
      </style> */}
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<StaysPage />} />
        <Route path="/stays" element={<StaysPage />} />
        <Route path="/api-guide" element={<ApiGuidePage />} />
        <Route path="/search-results" element={<SearchResultsApp />} />
        <Route path="/restored-search-results" element={<SearchResultsApp />} />
        <Route path="/seller" element={<SellerOnboardingRoute />} />
        <Route path="/seller/onboarding" element={<SellerOnboardingRoute />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/seller/create-listing"
          element={
            <ProtectedRoute allowedRoles={['S', 'A']}>
              <CreateListingRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={['S', 'A']}>
              <SellerDashboardRoute />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/sellerLoggedIn" 
          element={
            <ProtectedRoute allowedRoles={['S', 'A']}>
              <SellerDashboardRoute />
            </ProtectedRoute>
          } 
        />

      <Route 
        path="/adminDashboard" 
        element={
          <ProtectedRoute allowedRoles={['A']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
            </Routes>

    </BrowserRouter>
  );
}
    

export default App;
