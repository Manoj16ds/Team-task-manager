import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setData(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchDashboard();

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  if (!data) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-900 text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-6 flex flex-col justify-between shadow-2xl">

        <div>

          <h1
            onClick={() => navigate("/")}
            className="text-4xl font-extrabold text-cyan-400 mb-12 cursor-pointer"
          >
            TeamTask
          </h1>

          <ul className="space-y-6">

            <li
              onClick={() => navigate("/dashboard")}
              className="text-lg bg-slate-700 px-4 py-3 rounded-xl hover:bg-cyan-500 transition cursor-pointer font-semibold"
            >
              Dashboard
            </li>

            <li
              onClick={() => navigate("/projects")}
              className="text-lg px-4 py-3 rounded-xl hover:bg-slate-700 transition cursor-pointer"
            >
              Projects
            </li>

            <li
              onClick={() => navigate("/tasks")}
              className="text-lg px-4 py-3 rounded-xl hover:bg-slate-700 transition cursor-pointer"
            >
              Tasks
            </li>

          </ul>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition p-4 rounded-xl font-semibold text-lg shadow-lg"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-extrabold text-cyan-400">
              Dashboard Analytics
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Monitor projects, tasks, and productivity insights.
            </p>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {/* Total Tasks */}
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl hover:scale-105 transition">

            <h2 className="text-2xl font-semibold mb-4">
              Total Tasks
            </h2>

            <p className="text-6xl font-extrabold text-cyan-400">
              {data.totalTasks}
            </p>

          </div>

          {/* To Do */}
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl hover:scale-105 transition">

            <h2 className="text-2xl font-semibold mb-4">
              To Do
            </h2>

            <p className="text-6xl font-extrabold text-yellow-400">
              {data.tasksByStatus.todo}
            </p>

          </div>

          {/* Completed */}
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl hover:scale-105 transition">

            <h2 className="text-2xl font-semibold mb-4">
              Completed
            </h2>

            <p className="text-6xl font-extrabold text-green-400">
              {data.tasksByStatus.done}
            </p>

          </div>

          {/* Overdue */}
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl hover:scale-105 transition">

            <h2 className="text-2xl font-semibold mb-4">
              Overdue
            </h2>

            <p className="text-6xl font-extrabold text-red-400">
              {data.overdueTasks}
            </p>

          </div>

        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

          {/* Productivity */}
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Productivity Overview
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between text-lg">
                <span>Total Completed</span>

                <span className="font-bold text-green-400">
                  {data.tasksByStatus.done}
                </span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Pending Tasks</span>

                <span className="font-bold text-yellow-400">
                  {data.tasksByStatus.todo}
                </span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Overdue Tasks</span>

                <span className="font-bold text-red-400">
                  {data.overdueTasks}
                </span>
              </div>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-5">

              <button
                onClick={() => navigate("/projects")}
                className="bg-cyan-500 hover:bg-cyan-600 transition p-4 rounded-xl text-lg font-semibold"
              >
                Manage Projects
              </button>

              <button
                onClick={() => navigate("/tasks")}
                className="bg-slate-700 hover:bg-slate-600 transition p-4 rounded-xl text-lg"
              >
                Manage Tasks
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;