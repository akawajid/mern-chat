import { useState } from "react";

export default function Register() {
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted...");
  };

  return (
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
          <button type="submit" className="w-full p-2 text-white my-2 font-bold bg-blue-600">Register</button>
        </form>
      </div>
    </div>
  );
}
