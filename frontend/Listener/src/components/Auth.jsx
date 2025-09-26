import { Link } from "react-router-dom";
import { FaHeadphones, FaMicrophone } from "react-icons/fa";

const Auth = () => {
  return (
    <main className="flex-1 bg-[#ffffff] flex gap-20 justify-center items-center border text-red-600 text-2xl border-white/5 rounded-xl shadow-md p-4 md:p-6 overflow-y-auto min-h-[500px]">
      {/* User Login */}
      <Link
        to="/userlogin"
        className="flex flex-col justify-center items-center gap-2 hover:text-red-400 transition-colors"
      >
        <FaHeadphones className="text-4xl" />
        <h2 className="text-center">User</h2>
      </Link>

      {/* Singer Login */}
      <Link
        to="/singerlogin"
        className="flex flex-col justify-center items-center gap-2 hover:text-red-400 transition-colors"
      >
        <FaMicrophone className="text-4xl" />
        <h2 className="text-center">Singer</h2>
      </Link>
    </main>
  );
};

export default Auth;
