import axios from "axios";
import { useEffect } from "react";

const fetchMe = () => {
  return axios.get("/me");
};

const App = () => {
  useEffect(() => {
    fetchMe();
  }, []);

  return <div>App</div>;
};

export default App;
