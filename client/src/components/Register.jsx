import { useState } from "react";
import axios from "axios";
import url from "../assets/backend.json";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPass, setConPass] = useState("");
  const [err, setErr] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setErr("");
    if (password !== conPass) {
      setErr("Password and confirm password do not match");
      return;
    }
    const registerForm = async () => {
      try {
        const res = await axios.post(`${url.url}/register`, {
          name: username,
          password: password,
        });

        console.log(res);
        if (res.status === 201) {
          navigate("/login");
        }
      } catch (error) {
        setErr(error.response.data);
        console.log(error);
      }
    };
    registerForm();
    setUsername("");
    setPassword("");
    setConPass(""); // Reset confirm password field
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 via-green-400 to-blue-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-6">
        {err && <h1 className="text-red-500 text-center mb-4">{err}</h1>}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
          REGISTER
        </h1>
        <form onSubmit={handleRegister} className="w-full flex flex-col items-center space-y-4 sm:space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-gray-300 focus:border-teal-500 px-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg shadow-md focus:outline-none transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-300 focus:border-teal-500 px-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg shadow-md focus:outline-none transition duration-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={conPass}
            onChange={(e) => setConPass(e.target.value)}
            className="w-full border-2 border-gray-300 focus:border-teal-500 px-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg shadow-md focus:outline-none transition duration-300"
          />
          <button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Register
          </button>
        </form>
        <Link to="/login" className="w-full text-right text-sm text-blue-400 text-decoration-line: underline hover:text-blue-600 transform hover:scale-105 transition duration-300">Exisiting User?</Link>
      </div>
    </div>
  );
}

export default Register;
