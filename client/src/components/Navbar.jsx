import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">

      {/* Left Side - App Logo */}
      <h1
        className="text-2xl font-extrabold text-blue-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Task Tracker
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Add Task */}
        {user && (
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm"
          >
            + Add Task
          </button>
        )}

        {/* User Name */}
        {user && (
          <span className="font-semibold text-gray-700">
            👤 {user.name}
          </span>
        )}

        {/* Logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow text-sm"
          >
            Logout
          </button>
        )}
      </div>

    </nav>
  );
}
