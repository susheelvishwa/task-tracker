import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [taskRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/auth/users`),
        ]);
        setTask(taskRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, task);
    navigate(`/task/${id}`);
  };

  if (loading) return <p className="text-xl">Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 to-blue-100 flex justify-center items-start">

      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          ✏️ Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Assignee</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              value={task.assignee}
              onChange={(e) =>
                setTask({ ...task, assignee: e.target.value })
              }
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
            <label className="block mb-2 font-semibold text-gray-700">Due Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={task.dueDate?.substring(0, 10)}
              onChange={(e) =>
                setTask({ ...task, dueDate: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-10 gap-4">
            <button
              type="button"
              onClick={() => navigate(`/task/${id}`)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition text-lg font-semibold"
            >
              ← Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition text-lg font-semibold shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
