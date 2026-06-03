const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, userRole } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Generate Salt
        const salt = await bcrypt.genSalt(10);

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const user = new User({ name, email, password: hashedPassword, userRole });
        await user.save();
        
        // Send back success
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;