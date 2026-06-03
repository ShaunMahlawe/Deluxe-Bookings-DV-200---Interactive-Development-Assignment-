import './App.css';
import './joe.css'
import LogIn from "./pages/public/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/public/home";
import Account from "./pages/buyer/account";
import Product from "./pages/buyer/product";
import Seller from "./pages/seller/seller";
import NavBar from './components/common/navbar';
import Checkout from './pages/buyer/checkout';
import SellerLoggedIn from './pages/seller/sellerLoggedIn';
import AdminDashboard from './pages/admin/adminDashboard';
import ProtectedRoute from './pages/admin/AdminRoute';

function App() {
  
  return (
    <BrowserRouter>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap');
</style>
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route 
          path="/sellerLoggedIn" 
          element={
            <ProtectedRoute allowedRoles={['S', 'A']}>
              <SellerLoggedIn />
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
