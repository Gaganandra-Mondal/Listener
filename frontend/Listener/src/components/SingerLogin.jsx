import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const SingerLogin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(data) {
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3333/singerLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const resData = await response.json();

      if (!response.ok) {
        alert(resData.message || "Login failed");
      } else {
        localStorage.setItem("u_type", "singer");
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
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black">
      <div className="flex items-center gap-4 m-4 text-white font-bold text-lg md:text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
        <span className="text-red-600 sm:text-lg md:text-3xl">♫</span>
        <span className=" md:text-3xl sm:inline sm:text-lg">
          <Link to="/">Listener</Link>
        </span>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center items-center p-8 gap-6 bg-[#18181b] rounded-xl shadow-2xl"
      >
        <div className="flex flex-col gap-2 w-72">
          <label className="text-gray-200 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            required
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
        </div>

        <div className="flex flex-col gap-2 w-72 relative">
          <label htmlFor="password" className="text-gray-300 font-medium mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            {...register("password")}
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11.5 text-gray-400 hover:text-gray-200 text-sm"
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-72 mt-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-2 rounded-lg shadow-lg hover:from-red-800 hover:to-red-600 transition"
        >
          Login
        </button>
        <p className="text-white">
          Don't have account?{" "}
          <Link to="/singerregister" className="text-red-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SingerLogin;
