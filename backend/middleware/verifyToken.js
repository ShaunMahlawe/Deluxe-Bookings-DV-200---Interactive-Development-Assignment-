// SOFT REMOVE: legacy middleware kept as a compatibility wrapper while routes
// standardize on protect from authMiddleware.
const { protect } = require('./authMiddleware');

module.exports = protect;
