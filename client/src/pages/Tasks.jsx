import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");

  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(res.data);

    } catch(error){

      console.log(error);
    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  // CREATE TASK
  const createTask = async (e) => {

    e.preventDefault();

    try {

      const projectsRes = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const firstProject = projectsRes.data[0];

      if(!firstProject){

        alert("Create a project first");

        return;
      }

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          dueDate,
          priority,
          assignedTo: firstProject.admin,
          project: firstProject._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");

      fetchTasks();

    } catch(error){

      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (taskId, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch(error){

      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch(error){

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        Task Management
      </h1>

      {/* CREATE TASK FORM */}
      <form
        onSubmit={createTask}
        className="bg-slate-800 p-8 rounded-3xl mb-10 max-w-3xl shadow-xl"
      >

        <h2 className="text-3xl font-bold mb-6">
          Create New Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-slate-700 outline-none"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-slate-700 outline-none"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-slate-700 outline-none"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-slate-700 outline-none"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-xl font-semibold"
        >
          Create Task
        </button>

      </form>

      {/* TASKS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-slate-800 p-6 rounded-3xl shadow-xl hover:scale-105 transition"
          >

            {/* TOP */}
            <div className="flex items-center justify-between mb-4">

              <h2 className="text-2xl font-bold text-cyan-400">
                {task.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
                }`}
              >
                {task.priority}
              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-slate-300 mb-5">
              {task.description}
            </p>

            {/* STATUS + DATE */}
            <div className="space-y-4 text-sm text-slate-400">

              {/* STATUS */}
              <div>

                <p className="mb-2">
                  Status:
                </p>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                  className="bg-slate-700 p-2 rounded-lg text-white"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>

              </div>

              {/* DUE DATE */}
              <p>
                Due:
                <span className="ml-2 text-white">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </p>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteTask(task._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white font-semibold"
              >
                Delete Task
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Tasks;