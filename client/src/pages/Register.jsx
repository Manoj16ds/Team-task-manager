import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/login");

    } catch(error){

      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">

      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-10 rounded-2xl w-full max-w-md shadow-2xl border border-slate-700"
      >

        <h2 className="text-4xl font-bold mb-8 text-cyan-400 text-center">
          Create Account
        </h2>

        <p className="text-slate-400 text-center mb-8">
          Start managing your team projects today
        </p>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-4 mb-5 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </button>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </form>

    </div>
  );
}

export default Register;