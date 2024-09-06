import { useState } from "react";
import axios from "axios";
import url from "../assets/backend.json";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");
    const loginForm = async () => {
      try {
        const res = await axios.post(`${url.url}/login`, {
          name: username,
          password: password,
        });

        console.log(res);
        if (res.status === 201) {
          setUsername("");
          setPassword("");
          localStorage.setItem("token", res.data.token);
          navigate(`/${username}/home`);
        }
      } catch (error) {
        console.log(error);
        setErr(error.response.data);
      }
    };
    loginForm();
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-6">
        {err && <h1 className="font-bold text-red-500 text-center mb-4">{err}</h1>}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
          LOGIN
        </h1>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center space-y-4 sm:space-y-6"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-gray-300 focus:border-pink-500 px-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg shadow-md focus:outline-none transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-300 focus:border-pink-500 px-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg shadow-md focus:outline-none transition duration-300"
          />
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Login
          </button>
        </form>
        <Link to="/register" className="w-full text-right text-sm text-blue-400 text-decoration-line: underline hover:text-blue-600 transform hover:scale-105 transition duration-300">New User?</Link>
      </div>
    </div>
  );
}

export default Login;
