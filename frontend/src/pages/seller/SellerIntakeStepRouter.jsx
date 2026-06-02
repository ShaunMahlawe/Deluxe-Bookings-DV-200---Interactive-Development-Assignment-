// ======================================================================================
// STEP 1: IMPORT PAGES AND COMPONENTS
// ======================================================================================

import { useEffect, useState } from "react";
import Listings from "../buyer/Listings";
import CreateListing from "./CreateListing";

// ======================================================================================
// STEP 2: CREATE THE APP COMPONENT
// ======================================================================================

function IntakeSteps() {

// ======================================================================================
// STEP 3: CREATE ROUTE STATE
// ======================================================================================  
  const [route, setRoute] = useState(window.location.pathname);

// ======================================================================================
// STEP 4: LISTEN FOR BROWSER NAVIGATION CHANGES
// ======================================================================================    
  
useEffect(() => {

    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);

  }, []);

// ======================================================================================
// STEP 5: CREATE NAVIGATION FUNCTION
// ======================================================================================    

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  //Instead of refreshing the page, React changes the browser URL manually. 
  // This creates SPA behaviour (Single Page Application).

  //EXAMPLE:
  //   navigate("/create-listing")
  //   changes URL to: http://localhost:3000/create-listing
  //   setRoute(path) updates React state to match new URL

// ======================================================================================
// STEP 6: CONDITIONAL PAGE RENDERING
// ====================================================================================== 

  return route === "/create-listing" ? (
    <CreateListing onNavigate={navigate} />
  ) : (
    <Listings onNavigate={navigate} />
  );
}

// ======================================================================================
// STEP 7: EXPORT THE COMPONENT
// ======================================================================================    

export default IntakeSteps;
