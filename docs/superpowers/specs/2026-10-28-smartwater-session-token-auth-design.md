# SmartWater session-token authentication

## Goal

Replace the frontend-only demo login with server-validated sessions following the Bearer-token pattern in `solincosta/cuartaclase`'s `DestinosView.vue`. A successful login must return a valid token before the frontend navigates to `/smartwater`; suggestion requests must be rejected without a valid token.

## Current behavior

- `smartwater/src/components/LoginForm.vue` checks hard-coded credentials in the browser and navigates to `SmartWater` without contacting the API.
- `APi/main.py` has no authentication. Both suggestion routes are public, and the suggestion list contains names, email addresses, and complaint text.
- The frontend uses Axios through `vue-axios` and stores no session state.

## Backend design

- Add `POST /login`, accepting JSON `username` and `password`. Compare credentials against `SMARTWATER_USERNAME` and `SMARTWATER_PASSWORD`; do not provide committed or built-in credentials.
- Return `access_token`, `token_type: "bearer"`, and `expires_in` on success. Use a signed HS256 JWT with an expiry, signed by `JWT_SECRET_KEY`. Require the username, password, and signing key from the process environment; fail closed if authentication is not configured. Set a bounded token lifetime (60 minutes).
- Add a reusable FastAPI bearer-token dependency that verifies the signature and expiry and returns HTTP 401 with a Bearer challenge for missing, invalid, or expired tokens.
- Require that dependency on `POST /guardarSugerencia` and `GET /obtenerSugerencias`. Leave image/content endpoints public.
- Replace wildcard CORS with configured allowed origins (`SMARTWATER_ALLOWED_ORIGINS`, comma-separated); allow the Authorization header. Permit the local Vue CLI origin for development and configure the deployed frontend origin in production.

## Frontend design

- Change `LoginForm.vue` to post credentials to `https://apismartwater.onrender.com/login`. On success, store `access_token` under the `token` key in `localStorage` (matching the professor's example) and navigate to `/smartwater`. On failed login, show an error and do not navigate. Remove the hard-coded credentials and visible demo credential hint.
- Attach `Authorization: 'Bearer ' + localStorage.getItem('token')` to both suggestion requests: submission in `BuzonQuejas.vue` and retrieval in `MostrarSugerencia.vue`, matching the professor's Axios options pattern.
- If either protected request receives 401, remove the stored token and return to `/`. Keep the existing suggestion form validation and user-facing success/error messages.

## Configuration and dependencies

- Add PyJWT to `APi/requirements.txt`; do not add real credentials or signing keys to source control.
- Configure `SMARTWATER_USERNAME`, `SMARTWATER_PASSWORD`, `JWT_SECRET_KEY`, and `SMARTWATER_ALLOWED_ORIGINS` in the API deployment environment. Generate a strong signing key outside the repository. Local development uses a local-only credential and key in the shell environment.
- Image/content requests continue using the shared API base URL helper; authentication and suggestion requests use the deployed API URL directly as in the example.

## Validation

- Add focused FastAPI tests for successful and failed login, and for suggestion endpoints with missing, invalid, expired, and valid tokens. Use test-only environment values.
- Run the targeted API tests and the frontend lint/build commands from `smartwater/`.
- Verify that the existing public image endpoints still work and that suggestion routes reject requests without a token.

## Security and scope

The API is the authority for token validity; storing a Bearer token in `localStorage` follows the requested example but exposes it to scripts running in the page. A token must never be treated as valid merely because it exists in browser storage. This change protects suggestion read/write routes, not the static public content endpoints or every page route.
