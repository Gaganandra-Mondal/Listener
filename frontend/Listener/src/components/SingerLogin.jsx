import { Link } from "react-router-dom";
const SingerLogin = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black">
      <div className="flex items-center gap-4 m-4 text-white font-bold text-lg md:text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
        <span className="text-red-600 sm:text-lg md:text-3xl">♫</span>
        <span className=" md:text-3xl sm:inline sm:text-lg"><Link to="/">Listener</Link></span>
      </div>
      <form className="flex flex-col justify-center items-center p-8 gap-6 bg-[#18181b] rounded-xl shadow-2xl">
        <div className="flex flex-col gap-2 w-72">
          <label className="text-gray-200 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-72">
          <label className="text-gray-200 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-72 mt-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-2 rounded-lg shadow-lg hover:from-red-800 hover:to-red-600 transition"
        >
          Login
        </button>
        <p className="text-white">
          Don't have account?
          <Link to="/singerregister" className="text-red-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SingerLogin;
