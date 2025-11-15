import { Link } from "react-router-dom";
import { FaHeadphones, FaMicrophone } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const Auth = () => {
  let { background, text, hoverText } = useOutletContext();
  return (
    <main
      className={`flex-1 bg-${background} flex gap-20 justify-center items-center text-red-600 text-2xl rounded-xl shadow-md p-4 md:p-6 overflow-y-auto min-h-[500px]`}
    >
      {/* User Login */}
      <Link
        to="/userlogin"
        className="flex flex-col justify-center items-center gap-2 hover:text-red-400 transition-colors"
      >
        <FaHeadphones className="text-4xl" />
        <h2 className="text-center">User</h2>
      </Link>

      {/* Singer Login */}
      {/* <Link
        to="/singerlogin"
        className="flex flex-col justify-center items-center gap-2 hover:text-red-400 transition-colors"
      >
        <FaMicrophone className="text-4xl" />
        <h2 className="text-center">Singer</h2>
      </Link> */}
    </main>
  );
};

export default Auth;
