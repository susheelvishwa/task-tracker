import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
      setTask(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const updateStatus = async () => {
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
      status: task.status,
    });
    alert("Status updated!");
    fetchTask();
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;

    await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
    navigate("/");
  };

  if (loading) return <p className="text-xl">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8 flex justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 leading-snug">
          {task.title}
        </h1>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-lg mb-8">
          {task.description}
        </p>

        {/* Info Section */}
        <div className="space-y-4 mb-10">

          <p className="text-lg font-semibold text-gray-700">
            👤 Assigned to:
            <span className="font-normal text-gray-800"> {task.assignee}</span>
          </p>

          <p className="text-lg font-semibold text-gray-700">
            📅 Due Date:
            <span className="font-normal text-gray-800">
              {" "}
              {task.dueDate?.substring(0, 10)}
            </span>
          </p>
        </div>

        {/* Status Section */}
        <div className="mb-12">
          <label className="font-semibold mr-3 text-lg">Status:</label>

          <select
            value={task.status}
            onChange={(e) =>
              setTask({ ...task, status: e.target.value })
            }
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            onClick={updateStatus}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-semibold"
          >
            Update Status
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10 gap-4">

          {/* Edit */}
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition font-semibold text-lg"
          >
            ✏️ Edit Task
          </button>

          {/* Delete */}
          <button
            onClick={deleteTask}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-semibold text-lg"
          >
            🗑 Delete
          </button>

          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition font-semibold text-lg"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
}
