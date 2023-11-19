import { RouteObject } from "react-router-dom";
import { SentryErrorBoundary } from "~/lib/sentry";

import { AboutPage } from "./pages";
import Layout from "~/components/Layout";
import loader from "~/utils/loader";

export const routes: RouteObject[] = [
  {
    path: "/",
    loader,
    errorElement: <SentryErrorBoundary />,
    element: <Layout />,
    children: [
      {
        path: "about",
        element: <AboutPage />,
      },
      // {
      //   path: "*",
      //   element: <Navigate replace to="/about" />,
      // },
    ],
  },
];
