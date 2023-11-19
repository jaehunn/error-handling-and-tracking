import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { sentryCreateBrowserRouter, sentryInit } from "./lib/sentry";

import { routes } from "./routes.tsx";

sentryInit();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={sentryCreateBrowserRouter(routes)} />
  );
});

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("~/server/browser.ts");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}
