import { useState, useEffect } from "react";

const SingerProfile = () => {
  let [singerData, setSingerData] = useState({
    name: "Singer",
    email: "singer@gmail.com",
  });
  useEffect(() => {
    async function fecthSingerProfile() {
      try {
        let response = await fetch("http://localhost:3333/singerProfile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          let data = await response.json();
          // userProfile object will be set, data.message = {},(userProfile object)
          setSingerData(data.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    let useType = localStorage.getItem("u_type");
    // if userType is not undefined and userType is singer
    if (useType && useType === "singer") {
      fecthSingerProfile();
    }
  }, []);
  return (
    <div>
      <div>
        Name: {singerData.name} <br />
        Email: {singerData.email}
      </div>
    </div>
  );
};

export default SingerProfile;
