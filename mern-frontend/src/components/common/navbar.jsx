import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Logo from "../../assets/images/Logo.png"
import BedIcon from "../../assets/icons/bedIcon.png"
import StoreIcon from "../../assets/icons/storeIcon.png"
import Searchbutton from '../../assets/images/searchButtonIcon.png'
import Followbutton from '../../assets/images/follow arrow.png'
import Usericon from '../../assets/icons/userIcon.png'
import Hearticon from '../../assets/icons/heartIcon.png'
import LogOuticon from '../../assets/icons/logOutIcon.png'
import luggageicon from '../../assets/icons/luggageIcon.png'
import UserStaricon from '../../assets/icons/userStaricon.png'
import Walleticon from '../../assets/icons/walletIcon.png'

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
        <Link to="/product" className="pagelinks"><img src={BedIcon} alt="Bed Icon" className='iconStyling'/>Stays</Link>
        <Link to="/seller" className="pagelinks"><img src={StoreIcon} alt="Store Icon" className='iconStyling'/>List your property</Link>
        <Link to="/"><img src={Logo} alt="Deluxe Bookings logo" className='logoStyling'/></Link>
        
        <div className="searchBox col-3">
          <input type="text" placeholder="Search.." className="searchBar"></input>
          <img src={Searchbutton} alt="plus icon" className='searchButton'/>
        </div>
        
        {/* Conditional rendering */}
        {!isLoggedIn ? (
          // Shows if user isn't logged in
          <Link to="/login" className='primaryButton inter-regular buttontext col-4'>
            Create account <img src={Followbutton} alt="arrow icon" className='searchButton'/>
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
                    <img src={Usericon} alt="User Icon" className='dropdownIcons'/>Account
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <img src={luggageicon} alt="User Icon" className='dropdownIcons'/>Bookings
                  </Link> 
              </Dropdown.Item>
              
              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <img src={Walleticon} alt="User Icon" className='dropdownIcons'/>Wallet
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <img src={UserStaricon} alt="User Icon" className='dropdownIcons'/>Reviews
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item> 
                  <Link to="/account" className="dropdownlinks">
                    <img src={Hearticon} alt="User Icon" className='dropdownIcons'/>Saved
                  </Link> 
              </Dropdown.Item>

              <Dropdown.Item onClick={handleSignOut}> 
                  <span className="dropdownlinks" style={{ cursor: 'pointer' }}>
                    <img src={LogOuticon} alt="User Icon" className='dropdownIcons'/>Sign out
                  </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </nav>
  )
}

export default NavBar;
