import { useState } from "react";
import axios from "axios";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ReviewForm() {

  const [formData, setFormData] =
  useState({

    name: "",
    property: "",
    rating: 0,
    comment: ""

  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const submitReview =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5001/api/reviews",
        formData
      );

      toast.success("Review Submitted Successfully!");
      setShowPopup(true);

      setFormData({
        name: "",
        property: "",
        rating: 0,
        comment: ""
      });

    } catch (error) {

      toast.error(
        "Failed to submit review"
      );

    }

  };

  return (

    <div className="review-form-wrapper">
      <ToastContainer />

      <form className="review-form" onSubmit={submitReview}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="property"
          placeholder="Property Name"
          value={formData.property}
          onChange={handleChange}
        />

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >

          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>

        </select>

        <textarea
          rows="5"
          name="comment"
          placeholder="Leave a review"
          value={formData.comment}
          onChange={handleChange}
        />

        <button type="submit">Submit Review</button>

        {showPopup && (
          <div className="success-popup">
            <div className="popup-card">
              <h2>Thank You</h2>
              <p>Your review has been submitted.</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}

      </form>
    </div>

  );

}

export default ReviewForm;
