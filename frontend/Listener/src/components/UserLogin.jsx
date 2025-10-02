import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const UserLogin = () => {
  const { register, handleSubmit } = useForm();
  async function submitHandler(data) {
    // console.log(data);
    try {
      let response = await fetch("http://localhost:3333/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let resData = await response.json();
        alert(resData.message);
      } else {
        let resData = await response.json();
        alert(resData.message);
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  }
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

        <div className="flex flex-col gap-2 w-72">
          <label className="text-gray-200 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            required
            className="bg-[#23232a] text-gray-100 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
        </div>

        <button
          type="submit"
          className="w-72 mt-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold py-2 rounded-lg shadow-lg hover:from-red-800 hover:to-red-600 transition"
        >
          Login
        </button>
        <h2 className="text-white">
          Don't have Account?{" "}
          <Link to="/userregister" className="text-red-500">
            Register
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default UserLogin;
