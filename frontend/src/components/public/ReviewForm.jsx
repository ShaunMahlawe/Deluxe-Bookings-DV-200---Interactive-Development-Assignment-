import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../api/config";

import { FaStar } from "react-icons/fa";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";



function ReviewForm() {
  const [hover, setHover] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      property: "",
      rating: 0,
      comment: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const submitReview =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          `${API_BASE_URL}/reviews`,
          formData
        );

        toast.success(
          "Review Submitted Successfully!"
        );

        setFormData({
          name: "",
          property: "",
          rating: 0,
          comment: "",
        });
      } catch (error) {
        console.error("Review submission failed:", error);
        toast.error(
          "Failed To Submit Review"
        );
      }
    };

  return (
    <>
      <ToastContainer />

      <form
        className="review-form"
        onSubmit={submitReview}
      >
        <h2>
          Share Your Experience
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="property"
          placeholder="Property Name"
          value={formData.property}
          onChange={handleChange}
          required
        />

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <button
                type="button"
                key={star}
                className="star-btn"
                onClick={() =>
                  setFormData({
                    ...formData,
                    rating: star,
                  })
                }
                onMouseEnter={() =>
                  setHover(star)
                }
                onMouseLeave={() =>
                  setHover(null)
                }
              >
                <FaStar
                  className={
                    star <=
                    (hover ||
                      formData.rating)
                      ? "active-star"
                      : "inactive-star"
                  }
                />
              </button>
            )
          )}
        </div>

        <p className="rating-text">
          {formData.rating === 0 &&
            "Select Rating"}

          {formData.rating === 1 &&
            "Poor"}

          {formData.rating === 2 &&
            "Fair"}

          {formData.rating === 3 &&
            "Good"}

          {formData.rating === 4 &&
            "Excellent"}

          {formData.rating === 5 &&
            "Outstanding"}
        </p>

        <textarea
          rows="5"
          name="comment"
          placeholder="Tell us about your stay..."
          value={formData.comment}
          onChange={handleChange}
          required
        />

        <button
          className="submit-btn"
          type="submit"
        >
          Submit Review
        </button>
      </form>
    </>
  );
}

export default ReviewForm;
