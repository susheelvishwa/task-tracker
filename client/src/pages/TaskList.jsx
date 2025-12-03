import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasks } from "../redux/taskSlice";


export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p className="text-xl">Loading...</p>;

  let filteredTasks = tasks;

  if (filter === "me") {
    filteredTasks = tasks.filter(
      (t) => t.assignee?.toLowerCase() === user?.email?.toLowerCase()
    );
  }

  if (filter === "done") {
    filteredTasks = tasks.filter((t) => t.status === "done");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          📋 Task Dashboard
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium shadow ${
            filter === "all"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All Tasks
        </button>

        <button
          onClick={() => setFilter("me")}
          className={`px-4 py-2 rounded-lg font-medium shadow ${
            filter === "me"
              ? "bg-blue-700 text-white"
              : "bg-blue-200 hover:bg-blue-300"
          }`}
        >
          Assigned to Me
        </button>

        <button
          onClick={() => setFilter("done")}
          className={`px-4 py-2 rounded-lg font-medium shadow ${
            filter === "done"
              ? "bg-green-700 text-white"
              : "bg-green-200 hover:bg-green-300"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Task Cards */}
      <div className="space-y-6">
        {filteredTasks.length === 0 && (
          <p className="text-gray-600 text-lg text-center">
            No tasks found for this filter.
          </p>
        )}

        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="p-6 border rounded-xl shadow-md bg-white hover:shadow-xl transition flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {task.title}
              </h2>

              <p className="text-gray-600 mt-1">👤 {task.assignee}</p>

              <p className="text-gray-600">
                📅 Due: {task.dueDate?.substring(0, 10)}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-white text-sm shadow ${
                  task.status === "done"
                    ? "bg-green-600 shadow-green-400/40"
                    : task.status === "in-progress"
                    ? "bg-yellow-600 shadow-yellow-400/40"
                    : "bg-gray-700 shadow-gray-400/40"
                }`}
              >
                {task.status.toUpperCase()}
              </span>
            </div>

            <Link
              to={`/task/${task._id}`}
              className="text-blue-600 font-semibold hover:underline text-lg"
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
