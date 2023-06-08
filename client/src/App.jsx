import axios from "axios";
import { useContext, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserContext } from "../components/UserContext";
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  const { userProfile } = useContext(UserContext);

  return (
    <HelmetProvider>
      <Helmet>
        <title>MERN Chat App</title>
      </Helmet>
      <Routes />
    </HelmetProvider>
  );
}

export default App;
