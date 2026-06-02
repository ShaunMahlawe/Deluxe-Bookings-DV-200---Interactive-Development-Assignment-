require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const app = require('./app')
const { connectDatabase, stopDatabase } = require('./config/db')

const bcrypt = require("bcrypt");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const bookingRoutes = require('./routes/bookings');
app.use("/api", bookingRoutes);

app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);


app.get("/", (req, res) => {
    res.send("API is running");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
startServer()

async function shutdown(signal) {
  try {
    await stopDatabase()
  } finally {
    process.exit(0)
  }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
