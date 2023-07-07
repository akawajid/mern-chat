import axios from "axios";
import { useContext, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserContext } from "../components/UserContext";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";
import Chat from "./pages/Chat";
import Logout from "./pages/Logout";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  const { userProfile } = useContext(UserContext);

  return (
    <HelmetProvider>
      <Helmet>
        <title>MERN Chat App</title>
      </Helmet>
      <Routes>
        {userProfile?.username ? (
          <Route path="/" element={<Chat />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
