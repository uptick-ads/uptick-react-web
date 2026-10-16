import { useCallback, useState } from "react";
import { Browser } from "@capacitor/browser";
import { UptickFlow, version } from "@uptick-ads/react-web-sdk";

// Values come from .env.local at build time; query parameters (?id=&placement=&host=) also work when running `npm run dev` in a desktop browser.
const query = new URLSearchParams(window.location.search);
const config = {
  integrationId: query.get("id") || import.meta.env.VITE_UPTICK_INTEGRATION_ID,
  placement: query.get("placement") || import.meta.env.VITE_UPTICK_PLACEMENT || "order_confirmation",
  host: query.get("host") || import.meta.env.VITE_UPTICK_HOST || "uptick.com",
};

const ITEMS = [
  { name: "Trail running shoes", price: 129.0 },
  { name: "Merino socks (3 pack)", price: 24.5 },
  { name: "Insulated bottle", price: 34.99 },
  { name: "Packable rain jacket", price: 89.0 },
];

let orderSeq = 1000;

function newOrder() {
  orderSeq += 1;
  const item = ITEMS[orderSeq % ITEMS.length];
  const shipping = 7.99;
  return {
    id: String(orderSeq),
    item,
    shipping,
    total: (item.price + shipping).toFixed(2),
  };
}

export default function App() {
  const [order, setOrder] = useState(newOrder);
  const [mounted, setMounted] = useState(true);
  const [events, setEvents] = useState([]);

  const log = useCallback((event, data) => {
    setEvents((list) => [{ at: new Date().toLocaleTimeString(), event, data }, ...list].slice(0, 40));
  }, []);

  if (!config.integrationId) {
    return (
      <main className="page">
        <h1>Set an integration id</h1>
        <p>
          Copy <code>.env.example</code> to <code>.env.local</code> and set <code>VITE_UPTICK_INTEGRATION_ID</code>, or open this page with{" "}
          <code>?id=&lt;integration id&gt;</code>.
        </p>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="header">
        <span className="brand">Example Outfitters</span>
        <span className="meta">
          @uptick-ads/react-web-sdk {version} · {config.placement} · {config.host}
        </span>
      </header>

      <section className="card">
        <p className="eyebrow">Order #{order.id}</p>
        <h1>Thanks, Reggie. Your order is confirmed.</h1>
        <dl className="summary">
          <dt>{order.item.name}</dt>
          <dd>${order.item.price.toFixed(2)}</dd>
          <dt>Shipping</dt>
          <dd>${order.shipping.toFixed(2)}</dd>
          <dt className="total">Total</dt>
          <dd className="total">${order.total}</dd>
        </dl>
      </section>

      {mounted && (
        <UptickFlow
          integrationId={config.integrationId}
          placement={config.placement}
          host={config.host}
          order_id={order.id}
          first_name="Reggie"
          total_price={order.total}
          shipping_price={order.shipping.toFixed(2)}
          currency="USD"
          country_code="US"
          callback={log}
          // Accepted offers open in an in-app browser (SFSafariViewController on iOS, Custom Tabs on Android) instead of window.open, and the flow moves on to the next offer.
          openUrl={(url) => Browser.open({ url })}
        />
      )}

      <div className="actions">
        <button onClick={() => setOrder(newOrder())}>Place another order</button>
        <button className="secondary" onClick={() => setMounted((value) => !value)}>
          {mounted ? "Unmount UptickFlow" : "Mount UptickFlow"}
        </button>
      </div>

      <section className="events">
        <h2>Callback events</h2>
        {events.length === 0 ? (
          <p className="muted">None yet.</p>
        ) : (
          <ol>
            {events.map((entry, index) => (
              <li key={events.length - index}>
                <span className="muted">{entry.at}</span> <strong>{entry.event}</strong> <code>{JSON.stringify(entry.data)}</code>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
