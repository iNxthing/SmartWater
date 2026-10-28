# Implementation plan: SmartWater session-token authentication

## 1. Add FastAPI token authentication

- Add PyJWT and implement configuration for credentials, JWT signing key, token lifetime, and allowed CORS origins.
- Add `POST /login`, signed HS256 token creation, and a reusable Bearer-token validation dependency.
- Require the dependency on suggestion read and write endpoints; leave public image/content endpoints unchanged.
- Add focused API tests for successful/failed login and protected routes with missing, malformed, expired, and valid tokens.

## 2. Connect the Vue login and suggestion flows

- Replace the browser-only credential comparison in `LoginForm.vue` with a direct Axios request to the deployed `/login` URL; save the returned token and route to `/smartwater` only after successful authentication.
- Remove the visible demo credentials and any client-side credential constants.
- Send the stored token as `Authorization: 'Bearer ' + localStorage.getItem('token')` in both suggestion requests, matching the teacher's Axios pattern.
- On HTTP 401 from either protected request, remove the token and return the user to `/`.

## 3. Validate and document runtime configuration

- Run the focused API tests, frontend lint, and frontend production build.
- Verify public image endpoints remain available and suggestion endpoints reject unauthenticated requests.
- Report the environment variables and CORS origin that must be set on the deployed API; do not add real credentials or signing keys to the repository.
