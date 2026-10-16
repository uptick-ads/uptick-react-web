# Uptick React Web Demo

Example apps for the **Uptick React Web SDK** (`@uptick-ads/react-web-sdk`). Each one shows a mock order confirmation page with `UptickFlow` mounted under the order summary.
Use them to see the integration working end to end, to try an integration and placement against a test environment, and as a reference when adding the component to your own app.

| App | What it shows |
| --- | --- |
| [`vite`](vite) | A React single-page app in the browser. **Place another order** starts a new flow for a new `order_id`, and **Unmount UptickFlow** removes the component and mounts it again |
| [`capacitor`](capacitor) | The same page in a Capacitor app for iOS and Android. Accepted offers open in an in-app browser through `openUrl` |

```jsx
import { UptickFlow } from "@uptick-ads/react-web-sdk";

<UptickFlow
  integrationId="YOUR-INTEGRATION-ID"
  placement="order_confirmation"
  order_id={order.id}
  first_name={customer.firstName}
  total_price={order.total}
  callback={(event, data) => console.log(event, data)}
/>
```

## Requirements

- Node 22 ([mise](https://mise.jdx.dev) picks it up from `mise.toml`)
- The SDK checked out next to this repository as `../react-web-sdk`. Until the package's first npm release, both apps install it from there (`file:../../react-web-sdk`), so changes to the SDK's `src/` show up on reload

```
git clone https://github.com/uptick-ads/react-web-sdk.git
git clone https://github.com/uptick-ads/uptick-react-web.git
```

Then follow each app's README.

## Choosing an integration

Each app reads the integration's public id, the placement and the Uptick domain from `.env.local` (copy `.env.example`):

| Variable | Value |
| --- | --- |
| `VITE_UPTICK_INTEGRATION_ID` | The integration's public id, from the dashboard's Integrations page |
| `VITE_UPTICK_PLACEMENT` | `checkout`, `order_confirmation` or `order_status`. It must be a placement the integration has; anything else returns `422 Integration placement not found` |
| `VITE_UPTICK_HOST` | `uptick.com`, or `uptick.test` for a local Uptick platform |

Whether the flow renders inline or as a popup comes from the placement's template on the Uptick side, not from the app.

## License

See `LICENSE`.
