# Dead Code Audit

Soft-flagged files only. Nothing here has been hard-deleted.

- `frontend/src/pages/home.jsx`: duplicate home page that imports old capitalized `../Components/*` paths. The active app route uses `frontend/src/pages/public/home.jsx`.
- `backend/routes/auth.js`: fully commented legacy auth route file using old `../models/User` naming.
- `backend/routes/bookings.js`: fully commented legacy booking route file.
- `backend/middleware/verifyToken.js`: kept as a compatibility wrapper around `protect`; new routes should import from `authMiddleware.js`.
- `backend/middleware/requireAdmin.js`: kept as a compatibility wrapper around `authMiddleware.js`.
- `backend/routes/userRoutes.js`: legacy standalone register route remains mounted at `/api/users/register`; canonical auth registration is `/api/auth/register`.
