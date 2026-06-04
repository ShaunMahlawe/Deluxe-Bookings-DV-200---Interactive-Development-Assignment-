const express = require("express");
const router = express.Router();
const { Review } = require("../models");

router.post("/", async (req, res) => {

  try {

    const review =
      new Review(req.body);

    await review.save();

    res.status(201).json({
      success: true,
      message:
        "Review saved successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const reviews =
      await Review.find()
      .sort({
        createdAt: -1
      });

    res.json(reviews);

    // SOFT REMOVE: frontend-only review fetching belonged in React, not this
    // Express route.
    // const response = await axios.get("http://localhost:5001/api/reviews");
    // setReviews(response.data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;
