import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await dispatch(registerUser({ name, email, password }));
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Register</h1>

        <form onSubmit={handleRegister} className="space-y-6">

          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg">
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>

    </div>
  );
}
