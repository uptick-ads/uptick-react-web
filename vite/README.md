# Vite example

A React app with a mock order confirmation page that mounts `UptickFlow` from `@uptick-ads/react-web-sdk`.
It renders under `StrictMode`, so the development server also checks that a mount starts only one flow.

- **Place another order** gives the page a new `order_id`, which starts a new flow. Use it to check the single-page-app case.
- **Unmount UptickFlow** removes the component, then mounts it again.
- **Start on click** waits for a **See your rewards** button before rendering `UptickFlow`, and calls `preloadUptick` when it's switched on so the script is already loaded by the click. Each new order waits for the button again. `?start=click` opens the page with it on.
- **Callback events** lists every event the component reports, newest first.

The example installs the package from npm. To run it against an SDK checkout instead, see [Working on the SDK](../README.md#working-on-the-sdk).

## Run against production

```
cp .env.example .env.local   # set VITE_UPTICK_INTEGRATION_ID
npm install
npm run dev
```

Open the URL Vite prints. Query parameters override `.env.local` for one session: `?id=<integration id>&placement=checkout&host=uptick.com`.

## Run against a local API

Start the platform, then set `VITE_UPTICK_HOST=uptick.test` in `.env.local`, or open the page with `?host=uptick.test`.
The component then loads `https://app.uptick.test/i/places/<id>/offers.js`, and the SDK talks to `api.uptick.test`, so your browser must trust the local development certificate.
Use the public id of an integration in your local database.

## Checking reporting

Events store `integration_type` and `integration_version` from the flow, offer and styles requests.
In the browser's network panel, those requests to `api.<host>` carry `integration_type=react_web` and `integration_version=<package version>`.
Integrations on an older web SDK report `web_sdk` instead.
