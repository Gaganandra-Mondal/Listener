import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import SingerProfile from "./SingerProfile";
import UserProfile from "./UserProfile";

const Profile = () => {
  let theme = useOutletContext();
  let [profile, setProfile] = useState("");
  useEffect(() => {
    let useType = localStorage.getItem("u_type");
    setProfile(useType);
  }, []);
  async function logoutHandler() {
    let sure = window.confirm("Are you sure?");
    if (sure) {
      try {
        let response = await fetch("http://localhost:3333/logout", {
          method: "GET",
          credentials: "include",
        });
        let data = await response.json();
        if (!response.ok) {
          alert(data.message);
        } else {
          localStorage.removeItem("u_type");
          alert(data.message);
          window.location.href = "/";
        }
      } catch (err) {
        console.log(err.message);
        alert(err.message);
      }
    }
  }
  return (
    <main
      className={` h-screen overflow-y-auto flex-1 bg-${theme.background} text-${theme.text} border border-white/5 rounded-xl shadow-md p-4 md:p-6 overflow-y-auto min-h-[500px]`}
    >
      <h2
        className={
          "text-red-600 text-5xl font-semibold  flex items-center gap-2 mb-4 pr-8"
        }
      >
        Profile
        <span
          className={
            "mt-4 flex-1 h-px bg-gradient-to-r from-red-600 to-transparent item-center"
          }
        />
      </h2>
      <div>
        {profile === "singer" && <SingerProfile />}
        {profile === "user" && <UserProfile />}
      </div>
      <button
        className="mt-2 bg-red-500 p-2 rounded-lg"
        onClick={logoutHandler}
      >
        LogOut
      </button>
    </main>
  );
};

export default Profile;
