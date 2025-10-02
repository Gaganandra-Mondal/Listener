import { Link } from "react-router-dom";

const SingerRegister = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-black via-[#0f0f10] to-black flex flex-col justify-center items-center p-4">
      {/* Logo */}
      <Link to="/" className="group flex items-center gap-3 mb-6">
        <span className="text-red-600 text-3xl transition-transform group-hover:-translate-y-1">
          ♫
        </span>
        <span className="text-white font-bold text-2xl tracking-wide group-hover:text-red-400 transition-colors">
          Listener
        </span>
      </Link>

      {/* Card */}
      <form className="w-full max-w-3xl bg-[#18181b]/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 space-y-8">
        {/* Grid fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-300 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
          </div>

          {/* Manager Name */}
          <div className="flex flex-col">
            <label className="text-gray-300 font-medium mb-1">
              Manager Name
            </label>
            <input
              type="text"
              placeholder="Manager name"
              className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
          </div>

          {/* Manager Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 font-medium mb-1">
              Manager Email
            </label>
            <input
              type="email"
              placeholder="Manager email"
              className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
              required
            />
          </div>

          {/* Age & Gender */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex flex-col flex-1">
                <label className="text-gray-300 font-medium mb-1">Age</label>
                <input
                  type="number"
                  placeholder="Age"
                  min="0"
                  className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  required
                />
              </div>

              <div className="flex flex-col flex-1">
                <label
                  htmlFor="gender"
                  className="text-gray-300 font-medium mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold text-lg py-3 rounded-xl shadow-lg hover:from-red-800 hover:to-red-600 hover:shadow-red-800/50 transition-all"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/singerlogin"
            className="text-red-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SingerRegister;
