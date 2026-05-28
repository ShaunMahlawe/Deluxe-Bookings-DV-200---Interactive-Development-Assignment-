import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Logo from "../Assets/images/Logo.png"
import BedIcon from "../Assets/icons/bedIcon.png"
import StoreIcon from "../Assets/icons/storeIcon.png"
import Searchbutton from '../Assets/images/searchButtonIcon.png'
import Followbutton from '../Assets/images/follow arrow.png'
import Usericon from '../Assets/icons/userIcon.png'
import Hearticon from '../Assets/icons/heartIcon.png'
import LogOuticon from '../Assets/icons/logOutIcon.png'
import luggageicon from '../Assets/icons/luggageIcon.png'
import UserStaricon from '../Assets/icons/userStaricon.png'
import Walleticon from '../Assets/icons/walletIcon.png'

import Dropdown from 'react-bootstrap/Dropdown';

function NavBar() {
  // Checks if the user is logged in by looking for the token
  const isLoggedIn = !!localStorage.getItem("token");

  // logs out the user
  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
  <nav>
        <Link to="/product" className="pagelinks"><img src={BedIcon} alt="Bed Icon" className='iconStyling'/>Stays</Link>
        <Link to="/seller" className="pagelinks"><img src={StoreIcon} alt="Store Icon" className='iconStyling'/>List your property</Link>
        <Link to="/"><img src={Logo} alt="Deluxe Bookings logo" className='logoStyling'/></Link>
        <container className="searchBox">
        <input type="text" placeholder="Search.." className="searchBar"></input><img src={Searchbutton} alt="plus icon" className='searchButton'/>
        </container>
        
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