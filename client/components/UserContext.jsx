import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios.get("/profile").then((response) => {
      const { _id, username } = response.data;
      setUserProfile({
        _id,
        username,
      });
    });
  }, []);

  const logoutUser = () => {
    axios.get("/logout").then(() => {
      setUserProfile({});
      window.location.href = '/';
    });
  }

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
