const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { register } = require('../controllers/authController');

// Create a new user
router.post('/register', register);

// SOFT REMOVE: legacy inline registration used the old `password` model field.
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, userRole } = req.body;
//
//         if (!password) {
//             return res.status(400).json({ error: "Password is required" });
//         }
//
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const user = new User({ name, email, password: hashedPassword, userRole });
//         await user.save();
//
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

module.exports = router;
