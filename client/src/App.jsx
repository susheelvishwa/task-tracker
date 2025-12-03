import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";

import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="p-0">

      {/* Show Navbar only when user is logged in */}
      {user && <Navbar />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={user ? <TaskList /> : <Navigate to="/login" />}
        />

        <Route
          path="/add"
          element={user ? <AddTask /> : <Navigate to="/login" />}
        />

        <Route
          path="/task/:id"
          element={user ? <TaskDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/edit/:id"
          element={user ? <EditTask /> : <Navigate to="/login" />}
        />

      </Routes>
    </div>
  );
}
