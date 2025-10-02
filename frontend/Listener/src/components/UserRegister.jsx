import { Link } from "react-router-dom";

const UserRegister = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black">
      {/* Logo */}
      <Link to="/">
        <div
          className={`flex items-center gap-4 m-4 text-white font-bold text-lg md:text-xl cursor-pointer transition-transform duration-300 hover:-translate-y-0.5`}
        >
          <span className="text-red-600 sm:text-lg md:text-3xl">♫</span>
          <span className=" md:text-3xl sm:inline sm:text-lg">Listener</span>
        </div>
      </Link>
      <form className="flex flex-col justify-center items-center p-8 gap-6 bg-[#18181b] rounded-xl shadow-2xl">
        <div className="flex flex-col gap-2 w-72">
          <label className="text-gray-200 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
        </div>
        <div className="flex flex-col gap-</div>2 w-72">
          <label className="text-gray-200 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
        </div>
        <div className="flex flex-col gap-2 w-72">
          <label className="text-gray-200 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
        </div>
        <div className="flex flex-row items-center gap-4 w-full">
          {/* Age */}
          <label className="text-gray-200 font-semibold">Age</label>
          <input
            type="number"
            placeholder="Age"
            min="0"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition w-24"
          />

          {/* Gender */}
          <label htmlFor="gender" className="text-gray-200 font-semibold">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition w-28"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-72 mt-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-2 rounded-lg shadow-lg hover:from-red-800 hover:to-red-600 transition"
        >
          Register
        </button>
        <h2 className="text-white">
          Already have an Account?{" "}
          <Link to="/userlogin" className="text-red-400">
            Login
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default UserRegister;
