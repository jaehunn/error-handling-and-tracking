import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";

import { routes } from "./routes.tsx";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    new Sentry.BrowserTracing({
      /** 로컬 간 통신 추적 */
      tracePropagationTargets: ["localhost"],
    }),
    new Sentry.Replay(),
  ],

  /** 전체 트랜잭션 100% 샘플링 */
  tracesSampleRate: 1.0,

  /** 전체 세션 10% 샘플링 */
  replaysSessionSampleRate: 0.1,

  /** 오류 세션 100% 샘플링 */
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={createBrowserRouter(routes)} />
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
