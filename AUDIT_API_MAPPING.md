# Audit API Mapping

## Canonical Backend Routes

- `GET /api/health` -> API and DB mode smoke check.
- `POST /api/auth/register` -> public registration.
- `POST /api/auth/login` -> public login.
- `POST /api/auth/logout` -> logout.
- `GET /api/auth/me`, `GET /api/auth/profile` -> protected profile.
- `PUT /api/auth/update`, `DELETE /api/auth/delete` -> protected account changes.
- `GET /api/listings`, `GET /api/listings/:id` -> public listing reads.
- `POST /api/sellers/listings`, `GET /api/sellers/listings`, `GET /api/sellers/listings/:id`, `PUT /api/sellers/listings/:id`, `DELETE /api/sellers/listings/:id` -> protected seller listing CRUD.
- `GET /api/admin/users`, `DELETE /api/admin/users/:id`, `GET /api/admin/listings`, `PATCH /api/admin/listings/:id/approve`, `PATCH /api/admin/listings/:id/unapprove`, `GET /api/admin/bookings` -> protected admin workflows.
- `GET /api/reviews`, `POST /api/reviews` -> reviews.
- `GET /api/catalog`, `GET /api/properties`, `GET /api/things-to-do`, `GET /api/stays` -> public search/catalog data.

## Frontend Clients Checked

- `frontend/src/api/listingApi.js` now matches `/api/listings`.
- `frontend/src/api/sellerApi.js` now matches `/api/sellers/listings`.
- `frontend/src/components/public/authentication.jsx` now uses `/api/auth/*`.
- `frontend/src/pages/public/login.jsx` now uses `/api/auth/*` for its legacy helper functions.
- `frontend/src/pages/buyer/account.jsx` now uses `/api/auth/profile`, `/api/auth/update`, and `/api/auth/delete`.
- `frontend/src/components/public/ReviewForm.jsx` now uses `/api/reviews` via the shared API base.

## Still Flagged

- `frontend/src/pages/buyer/checkout.jsx` posts to `/api/bookings`, but the backend booking controller expects authenticated booking fields (`destination`, `suite`, `checkIn`, `checkOut`, `guests`). The current checkout form collects a different personal-details payload, so this needs a product decision rather than a mechanical endpoint rename.
