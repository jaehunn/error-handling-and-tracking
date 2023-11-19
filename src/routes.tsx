import { RouteObject } from "react-router-dom";

import { AboutPage } from "./pages";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import loader from "./utils/loader";

export const routes: RouteObject[] = [
  {
    path: "/",
    loader,
    errorElement: <ErrorBoundary />,
    element: <Layout />,
    children: [
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
];

/**
 * / 진입
 *  1. loader
 *  2. Layout
 *
 * /about 진입
 *  1. loader
 *  2. Layout
 *  3. Layout
 */
