# Copilot instructions

## Build, run, and checks

The frontend is a Vue CLI app in `smartwater/`:

```sh
cd smartwater
npm install
npm run serve
npm run build
npm run lint
```

Lint one frontend file with `npm run lint -- src/components/MenuIoT.vue` (replace the path as needed). There is no configured frontend test script or test suite, so there is currently no single-test command.

The API is a FastAPI app in `APi/`:

```sh
cd APi
python -m pip install -r requirements-dev.txt
uvicorn main:app --reload
```

Set `SMARTWATER_USERNAME`, `SMARTWATER_PASSWORD`, and `JWT_SECRET_KEY` in the environment before starting the API. `SMARTWATER_ALLOWED_ORIGINS` is a comma-separated origin allowlist; it defaults to the local Vue CLI origin. Run API tests with `python -m pytest`; run one test with `python -m pytest tests/test_auth.py::test_login_rejects_invalid_credentials`.

To point the frontend at a local API, set `VUE_APP_API_URL=http://localhost:8000` in the ignored `smartwater/.env.local` file before running the Vue CLI. The default API origin is the deployed Render service.

## Architecture

- `smartwater/src/main.js` creates the Vue app, installs Vue Router, Axios via `vue-axios`, and PrimeVue with the Aura theme. It globally registers the page components and shared UI components.
- `smartwater/src/router/index.js` maps `/` to the login page, `/smartwater` to the main SmartWater page, and `/about` to the about view. `App.vue` renders the active route.
- `SmartWater.vue` composes the main experience from section components such as the slider, IoT feature cards, gallery, suggestion form, and suggestion list.
- The frontend fetches image/content lists and submits or retrieves suggestions from the FastAPI service in `APi/main.py`. Image/content routes are public; suggestion read/write routes require a JWT Bearer token. API list responses use a `respuesta` field; keep paths, payload fields, and response shapes consistent across both sides.
- The API currently serves static content lists and stores submitted suggestions in a process-local Python list; that data is not durable across restarts.

## Codebase conventions

- Vue components are single-file `.vue` components and predominantly use the Options API (`data`, `methods`, and lifecycle hooks such as `created`).
- Shared components are registered globally in `smartwater/src/main.js`; check there before adding local imports for a component used in the main page.
- Component-specific styles generally use `<style scoped>`; app-wide base styles live in `smartwater/src/App.vue`.
- The interface and much of the API's user-facing content are in Spanish. Preserve the existing labels and API field names when changing related behavior.
- API request components access Axios as `this.axios`, provided by the `vue-axios` plugin installed in `main.js`. Image/content requests use the shared base URL from `smartwater/src/api.js`; login and protected suggestion requests use the deployed API URL directly to match the Bearer-header pattern used in the course example.
- The login stores `access_token` under the `token` key in `localStorage`; protected suggestion requests send it in the `Authorization` header. The API validates the JWT signature and expiry and is authoritative—browser storage alone does not validate a session.
