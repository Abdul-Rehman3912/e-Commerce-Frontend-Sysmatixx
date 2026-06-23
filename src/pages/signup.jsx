import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!form.fullName.trim()) return toast.error("Full name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email))
      return toast.error("Invalid email format");
    if (!form.password) return toast.error("Password is required");
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await signup(form);
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-900 text-white p-10">
          <h1 className="text-3xl font-bold mb-4">E-Commerce Web App</h1>
          <p className="text-gray-300 text-center">
            Beveloped by ABDUL REHMAN.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              className="w-full bg-gray-900 text-white py-3 rounded-lg"
              disabled={isSigningUp}
            >
              {isSigningUp ? <>Loading...</> : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-5">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                LogIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}