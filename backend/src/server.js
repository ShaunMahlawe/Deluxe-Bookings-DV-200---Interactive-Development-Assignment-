const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();

app.use(cors());

app.use(express.json());

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);

app.listen(process.env.PORT, () => {
  console.log(
    `Server Running On ${process.env.PORT}`
  );
});