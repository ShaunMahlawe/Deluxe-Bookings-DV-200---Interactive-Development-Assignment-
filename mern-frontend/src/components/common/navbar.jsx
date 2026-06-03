import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  Heart,
  LogOut,
  Search,
  Store,
  User,
  UserRoundCheck,
  Wallet,
} from "lucide-react";

import Logo from "../../assets/images/Logo.png"

import Dropdown from 'react-bootstrap/Dropdown';

function NavBar() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
  setIsLoggedIn(!!localStorage.getItem("token"));

  const checkToken = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  window.addEventListener("storage", checkToken);
  
  return () => {
    window.removeEventListener("storage", checkToken);
  };
}, []);

  // logs out the user
  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false); // 4. Update state so it changes instantly before redirect
    window.location.href = "/login";
  };

  return (
    <nav>
        <Link to="/product" className="pagelinks"><BedDouble className='iconStyling' aria-hidden="true" />Stays</Link>
        <Link to="/seller" className="pagelinks"><Store className='iconStyling' aria-hidden="true" />List your property</Link>
        <Link to="/"><img src={Logo} alt="Deluxe Bookings logo" className='logoStyling'/></Link>
        
        <div className="searchBox col-3">
          <input type="text" placeholder="Search.." className="searchBar"></input>
          <Search className='searchButton' aria-hidden="true" />
        </div>
        
        {/* Conditional rendering */}
        {!isLoggedIn ? (
          // Shows if user isn't logged in
          <Link to="/login" className='primaryButton inter-regular buttontext col-4'>
            Create account <ArrowUpRight className='searchButton' aria-hidden="true" />
          </Link>
        ) : (
          // Shows if user is logged in
          <Dropdown className="d-flex flex-row-reverse dropdown">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdowntext"> 
              Your account
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <User className='dropdownIcons' aria-hidden="true" />Account
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <BriefcaseBusiness className='dropdownIcons' aria-hidden="true" />Bookings
                  </Link> 
              </Dropdown.Item>
              
              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <Wallet className='dropdownIcons' aria-hidden="true" />Wallet
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <UserRoundCheck className='dropdownIcons' aria-hidden="true" />Reviews
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <Heart className='dropdownIcons' aria-hidden="true" />Saved
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item onClick={handleSignOut}> 
                  <span className="dropdownlinks" style={{ cursor: 'pointer' }}>
                    <LogOut className='dropdownIcons' aria-hidden="true" />Sign out
                  </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </nav>
  )
}

export default NavBar;
