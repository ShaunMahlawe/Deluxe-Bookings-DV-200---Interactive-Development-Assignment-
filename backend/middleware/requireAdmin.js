// SOFT REMOVE: legacy single-purpose middleware kept as a compatibility wrapper.
const { requireAdmin } = require('./authMiddleware');

module.exports = requireAdmin;
