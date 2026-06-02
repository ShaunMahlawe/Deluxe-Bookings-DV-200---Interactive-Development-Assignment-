import verifyToken from '../middleware/verifyToken';
import bookingController from '../controllers/bookingController'

const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const bookingController = require('../controllers/bookingController');

/* Restricts access to Sellers ('S') and Admins ('A'). */
const requireSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  if (req.user.userRole === 'S' || req.user.userRole === 'A') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied. Seller or Admin privileges required.' });
};

/* Restricts access strictly to Admins ('A').*/
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  if (req.user.userRole === 'A') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
};

/* The protected endpoints */

// Anyone can see and can view booking listings
router.get('/listings', bookingController.getAllListings);
router.get('/listings/:id', bookingController.getSingleListing);

// Seller dashboard routes, buyers can't access
router.get(
  '/seller/dashboard',
  verifyToken,                
  requireSeller,            
  bookingController.getSellerDashboard
);

router.patch(
  '/seller/bookings/:id/status',
  verifyToken,                
  requireSeller,              
  bookingController.updateBookingStatus
);

// Admin dashboard
router.get(
  '/admin/dashboard',
  verifyToken,                 
  requireAdmin,              
  bookingController.getAdminDashboard
);

router.delete(
  '/admin/users/:id',
  verifyToken,               
  requireAdmin,            
  bookingController.deleteUserAccount
);

module.exports = router;