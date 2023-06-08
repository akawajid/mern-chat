import axios from "axios";
import { useContext, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserContext } from "../components/UserContext";

export default function Login() {
  const [userData, setUserData] = useState({});
  const { userProfile, setUserProfile } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", userData);
      const { _id, username } = response.data;

      setUserProfile({
        _id,
        username,
      });
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex flex-col min-h-screen justify-center items-center bg-slate-300">
        <div className="w-1/4">
          <form onSubmit={handleSubmit} method="post">
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 bg-white border-2 my-1 outline-none"
            />
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 bg-white border-2 my-1 outline-none"
            />
            <button
              type="submit"
              className="w-full p-2 text-white my-2 font-bold bg-blue-600"
            >
              Login
            </button>
          </form>

          <p className="my-2">
            Dont have account?{" "}
            <a href="/register">
              <b>Register Here</b>
            </a>{" "}
          </p>
        </div>
      </div>
    </HelmetProvider>
  );
}
