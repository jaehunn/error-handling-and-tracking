import { LoaderFunctionArgs } from "react-router-dom";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log({
    request,
    params,
  });

  return "";
};

export default loader;
