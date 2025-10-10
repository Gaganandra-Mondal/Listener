import { useEffect, useState } from "react";

const UserProfile = () => {
  let [userData, setUserData] = useState({
    name: "Listener",
    email: "listener@gmail.com",
  });
  useEffect(() => {
    async function fecthUserProfile() {
      try {
        let response = await fetch("http://localhost:3333/userProfile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          let data = await response.json();
          // userProfile object will be set, data.message = {},(userProfile object)
          setUserData(data.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    let useType = localStorage.getItem("u_type");
    if (useType && useType === "user") {
      fecthUserProfile();
    }
  }, []);
  return (
    <div>
      <div>
        Name: {userData.name} <br />
        Email: {userData.email}
      </div>
    </div>
  );
};

export default UserProfile;
