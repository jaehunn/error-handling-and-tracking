import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import {
  useRouteError,
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

export const sentryInit = () => {
  Sentry.init({
    dsn: "https://540d5ba7804d360eeba6091d5ae50bbc@o4506252773425152.ingest.sentry.io/4506252774735872",

    /** @see https://docs.sentry.io/platforms/javascript/guides/react/features/react-router/ */
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],

    /** 전체 트랜잭션 100% 샘플링 */
    tracesSampleRate: 1.0,

    /** 로컬 간 통신 추적 */
    tracePropagationTargets: ["localhost"],

    /** 전체 세션 10% 샘플링 */
    replaysSessionSampleRate: 0.1,

    /** 오류 세션 100% 샘플링 */
    replaysOnErrorSampleRate: 1.0,
  });
};

/** @see https://docs.sentry.io/platforms/javascript/guides/react/features/react-router/ */
export const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

/** @see https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/ */
export const SentryErrorBoundary = (props: Sentry.ErrorBoundaryProps) => {
  const error = useRouteError();

  console.log({ error });

  return (
    <Sentry.ErrorBoundary
      fallback={<div>에러가 발생했습니다.</div>}
      showDialog
      {...props}
    />
  );
};
