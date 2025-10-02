import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserLogin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(data) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3333/userLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(resData.message || "Login failed");
      } else {
        localStorage.setItem("u_type", "user");
        alert(resData.message || "Login successful");
        reset();
        setTimeout(() => navigate("/"), 300);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gradient-to-b from-black via-[#0f0f10] to-black p-4">
      {/* Logo */}
      <Link to="/" className="group flex items-center gap-3 mb-6">
        <span className="text-red-600 text-3xl transition-transform group-hover:-translate-y-1">
          ♫
        </span>
        <span className="text-white font-bold text-2xl tracking-wide group-hover:text-red-400 transition-colors">
          Listener
        </span>
      </Link>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-[#18181b]/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          User Login
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-300 font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-gray-300 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />
          {/* Toggle Visibility */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-200 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg py-3 rounded-xl shadow-lg transition-all hover:from-red-800 hover:to-red-600 hover:shadow-red-800/50 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/userregister"
            className="text-red-400 hover:text-red-300 hover:underline transition-colors"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
