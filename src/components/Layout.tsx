import { Outlet, useLoaderData } from "react-router-dom";

const Layout = () => {
  const loaderData = useLoaderData();

  console.log({ loaderData });

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
