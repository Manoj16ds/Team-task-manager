import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-cyan-400 cursor-pointer">
          TeamTask
        </h1>

        <div className="space-x-4">

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
          >
            Get Started
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h2 className="text-6xl font-extrabold leading-tight max-w-4xl">
          Manage Team Projects
          <span className="text-cyan-400"> Efficiently</span>
        </h2>

        <p className="mt-8 text-slate-300 text-xl max-w-2xl">
          A modern collaborative task management platform
          built for teams to organize projects, assign tasks,
          and track progress seamlessly.
        </p>

        <div className="mt-10 flex gap-5">

          <button
            onClick={() => {

            const token = localStorage.getItem("token");

            if(token){
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          }}
            className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition text-lg font-semibold shadow-lg"
          >
            Start Managing
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-xl border border-slate-600 hover:bg-slate-800 transition text-lg"
          >
            View Demo
          </button>

        </div>

      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">

          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Team Collaboration
          </h3>

          <p className="text-slate-300">
            Create projects, add members, and collaborate
            with your team in real-time.
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">

          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Task Tracking
          </h3>

          <p className="text-slate-300">
            Assign tasks, monitor statuses, and manage
            priorities effectively.
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">

          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Analytics Dashboard
          </h3>

          <p className="text-slate-300">
            Visualize progress with dashboard analytics
            and overdue task insights.
          </p>

        </div>

      </section>

    </div>
  );
}

export default App;