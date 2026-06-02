require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const bcrypt = require("bcrypt");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const bookingRoutes = require('./routes/bookings');
app.use("/api", bookingRoutes);

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