import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../redux/taskSlice";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !assignee.trim() || !dueDate) {
      alert("All fields are required!");
      return;
    }

    await dispatch(
      addTask({
        title,
        description,
        assignee,
        dueDate,
        status: "todo",
      })
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          ➕ Add New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              placeholder="Enter task description"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block mb-1 font-semibold">Assignee</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="">Select assignee...</option>
              {users.map((user) => (
                <option key={user._id} value={user.email}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-1 font-semibold">Due Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
            >
              ← Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
