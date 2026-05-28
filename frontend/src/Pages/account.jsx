import React from 'react';

function Account() {
  // For error prevention
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    // Only runs if the item exists
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Error parsing user data from local storage", err);
    user = null; // Fallback safely if anything goes sideways
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // If the user is missing
  if (!user) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>You are not logged in</h3>
        <p>Please sign in to view your account details.</p>
        <button onClick={() => window.location.href = "/login"}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Account Details</h1>
      <hr />
      
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Username:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email || "No email stored"}</p>
        <p>
          <strong>Account Type:</strong> {user.userRole === "S" ? "Seller" : "Customer"}
        </p>
      </div>

      <button 
        onClick={handleLogout}> Log out</button>
    </div>
  );
}

export default Account;