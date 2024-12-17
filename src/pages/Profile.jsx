import React, { useEffect, useState } from "react";
import ViewBooks from "../components/ViewBooks";
import { updateUserAPI } from "../services/allapi";
import SERVER_URL from "../services/serverUrl";
import Purchasedbook from "../components/Purchasedbook";

const Profile = () => {
  const [userDetails, setUserdetails] = useState({
    username: "",
    email: "",
    password: "",
    userimg: "",
  });
  console.log(userDetails);
  const [sessionimage, setsessionimage] = useState("");
  const [newuploadimg, setnewuploadimg] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);
  useEffect(() => {
    if (
      userDetails.userimg.type == "image/png" ||
      userDetails.userimg.type == "image/jpg" ||
      userDetails.userimg.type == "image/jpeg"
    ) {
      // Valid image
      setImageFileStatus(true);
      setnewuploadimg(URL.createObjectURL(userDetails.userimg));
    } else {
      // Invalid image
      setImageFileStatus(false);
      setnewuploadimg("");
      setUserdetails({ ...userDetails, userimg: "" });
    }
  }, [userDetails.userimg]);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);

      setUserdetails({
        ...userDetails,
        username: user.username,
        email: user.email,
        password: user.password,
      });
      setsessionimage(user.userimg);
      console.log("image", typeof user.userimg);
      console.log("image", sessionimage);
    }
  }, []);

  // useEffect(() => {
  //   if (userDetails.userimg && (userDetails.userimg.type === "image/png" || userDetails.userimg.type === "image/jpg" || userDetails.userimg.type === "image/jpeg")) {
  //     // Valid image
  //     setImageFileStatus(true);
  //     setnewuploadimg(URL.createObjectURL(userDetails.userimg));
  //   } else {
  //     // Invalid image
  //     setImageFileStatus(false);
  //     setnewuploadimg("");
  //     setUserdetails((prev) => ({ ...prev, userimg: "" }));
  //   }
  // }, [userDetails.userimg]);

  const handleupdateprofile = async () => {
    const { username, email, password, userimg } = userDetails;
    console.log(userDetails);
    console.log("oldimage",sessionimage);
    console.log("newimage",newuploadimg);

    if (email && password) {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      newuploadimg? reqBody.append("userimg", userimg) : reqBody.append("userimg",sessionimage);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        console.log("newimage",newuploadimg);
        console.log("header",reqHeader);

        // api call
        try {
          const result = await updateUserAPI(reqBody, reqHeader);
          if (result.status == 200) {
            alert("Profile updated successfully");
            console.log(result);
            sessionStorage.setItem("user", JSON.stringify(result.data));
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      } 
    }else {
      alert("fill the  required fields");
    }
  };



  return (
    <div className="min-h-screen flex bg-teal-100 text-gray-800 flex-wrap">
      {/* Left Section: Profile Details */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white shadow-lg flex-wrap " >
        <div className=" rounded-lg " style={{height:"400px"}}>
         <label >
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                setUserdetails({ ...userDetails, userimg: e.target.files[0] })
              }
            />
            <img
           style={{height:"400px"}}   
            src={
                newuploadimg
                  ? newuploadimg
                  : `${SERVER_URL}/uploads/${sessionimage}`
              }
              alt="User Profile"
              className=" img-fluid rounded"

            />
         </label>
        </div>
        <h3 className="text-2xl font-semibold mt-4 text-teal-700">
          {userDetails.username}
        </h3>

        {/* Editable Profile Details */}
        <div className="w-full mt-6">
          <div className="mb-2 w-full">
            <input
              type="text"
              value={userDetails.username}
              onChange={(e) =>
                setUserdetails({ ...userDetails, username: e.target.value })
              }
              placeholder="Username"
              className="form-control"
            />
          </div>
          <div className="mb-2 w-full">
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserdetails({ ...userDetails, email: e.target.value })
              }
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="mb-2 w-full">
            <input
              type="text"
              value={userDetails.password}
              onChange={(e) =>
                setUserdetails({ ...userDetails, password: e.target.value })
              }
              placeholder="password"
              className="form-control"
            />
          </div>
          <div className="d-grid w-full">
            <button className="btn btn-warning" onClick={handleupdateprofile}>
              Update User
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: ViewBooks */}
      <div className="w-1/2 p-2 bg-teal-50 shadow-lg ">
<div >
          <ViewBooks />
  
</div>  
{/* Purchased Books Section */}
        <div className="mt-3 w-full h-2/5">
                  <Purchasedbook></Purchasedbook>
        </div>
      </div>
    </div>
  );
};

export default Profile;
