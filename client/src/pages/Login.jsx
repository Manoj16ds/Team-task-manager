import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch(error){

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-10 rounded-2xl w-full max-w-md shadow-2xl border border-slate-700"
      >

        <h2 className="text-4xl font-bold mb-8 text-cyan-400 text-center">
          Welcome Back
        </h2>

        <p className="text-slate-400 text-center mb-8">
          Login to manage your projects and tasks
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-5 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition p-4 rounded-xl font-semibold text-lg shadow-lg"
        >
          Login
        </button>

        <p className="text-center text-slate-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;