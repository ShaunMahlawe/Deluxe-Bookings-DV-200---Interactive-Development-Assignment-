// const express = require('express');
// const router = express.Router();

// //for checkout page
// router.post('/bookings', async (req, res) => {
//     try {
//         // personal details from form
//         const { firstName, lastName, email, phone, addons } = req.body;

//         if (!firstName || !lastName || !email || !phone) {
//             return res.status(400).json({ error: "Missing required personal details." });
//         }

//         console.log("New Booking Received:", {
//             customer: `${firstName} ${lastName}`,
//             email,
//             phone,
//             addons
//         });


//         return res.status(201).json({ 
//             success: true, 
//             message: "Details saved successfully! Proceeding to payment step." 
//         });

//     } catch (error) {
//         console.error("Booking Error:", error);
//         return res.status(500).json({ error: "Internal server error while saving booking." });
//     }
// });

// module.exports = router;