import { useContext, useEffect } from "react";
import { UserContext } from "../../components/UserContext";

export default function Logout() {
  const { logoutUser } = useContext(UserContext);

  useEffect(() => {
    logoutUser();
  });
}
