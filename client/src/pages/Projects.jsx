import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProjects(res.data);

    } catch(error){

      console.log(error);
    }
  };

  useEffect(() => {

    fetchProjects();

  }, []);

  const createProject = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/projects",
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setName("");
      setDescription("");

      fetchProjects();

    } catch(error){

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">
        Projects
      </h1>

      {/* Create Project Form */}
      <form
        onSubmit={createProject}
        className="bg-slate-800 p-6 rounded-2xl mb-10 max-w-2xl"
      >

        <h2 className="text-2xl font-semibold mb-5">
          Create New Project
        </h2>

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-slate-700 outline-none"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl bg-slate-700 outline-none"
        />

        <button
          className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl font-semibold"
        >
          Create Project
        </button>

      </form>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold text-cyan-400 mb-3">
              {project.name}
            </h2>

            <p className="text-slate-300 mb-4">
              {project.description}
            </p>

            <div className="text-sm text-slate-400">
              Members: {project.members.length}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Projects;