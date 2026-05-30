const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware that extracts and validates the token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Access Denied: No Token Provided");
    }

    const token = authHeader.split(" ")[1];
    try {
        // Decodes the payload we signed during user login
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Contains req.user.id and req.user.userRole
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
};

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, userRole } = req.body;

        // 1. Generate Salt & Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Save the user with the HASHED password
        const user = new User({
            name,
            email,
            password: hashedPassword,
            userRole
        });
        
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// User login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Wrong password");

        // Generates the JWT token
        const token = jwt.sign(
            { id: user._id, userRole: user.userRole }, 
            process.env.JWT_SECRET, //sens to env file for safekeeping
            { expiresIn: "3d" } // The token expires in 3 days
        );

        // Sends the token and user data back to the frontend
        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userRole: user.userRole
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /auth/profile
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).send("User not found");
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// updates the user's profile
router.put("/update", verifyToken, async (req, res) => {
    try {
        const { name, email, userRole } = req.body;

        // Find user document, apply updates, and return the revised variant
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, userRole },
            { new: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).send("User not found");

        res.status(200).json({
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                userRole: updatedUser.userRole
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//deletes your account
router.delete("/delete", verifyToken, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) return res.status(404).send("User not found");
        
        res.status(200).send("Account deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;