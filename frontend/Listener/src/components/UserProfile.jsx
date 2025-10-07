import { useState } from "react";

const UserProfile = () => {
  let [userData, setUserData] = useState({
    name: "Listener",
    email: "listener@gmail.com",
  });
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
