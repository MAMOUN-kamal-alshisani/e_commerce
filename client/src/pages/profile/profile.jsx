import Header from "../../components/header/header";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CgSoftwareUpload } from "react-icons/cg";

import { GrUpdate } from "react-icons/gr";

// import { useState, useEffect } from "react";
import axios from "axios";
import "./scss/profile.css";
import Modal from "./profileModal";
function Profile() {
  const user = useSelector((state) => {
    return state.auth.user;
  });

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const getUserData = async () => {
        const getcontact = await axios.get(
          `http://localhost:4000/contacted/${user.id}`
        );

        console.log(getcontact);
        setUserData(getcontact.data);
      };
      getUserData();
    } catch (err) {
      console.log(err);
    }
  }, [setUserData]);

  return (
    <div className="profile_all_container">
      <Header />
      {showModal && <Modal setUserData={setUserData} user={user}  showModal={showModal}
setShowModal={setShowModal}/>}
      <div className="profile">
        <div className="profile_div">
          <div className="profile_info_container">
            <div className="profile_data">
              <div className="img_div">
                <img
                  src={userData.photo}
                  alt="picture"
                  className="profile_img"
                  style={{ width: "200px", height: "200px" }}
                />
                <div className="img_formDiv">
                  <form action="">
                    {/* <label htmlFor="img">Choose img</label> */}

                    <label htmlFor="imageUpload" className="inputLabel">
                      <CgSoftwareUpload />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      className="imgInput"
                    />
                  </form>
                </div>

                <div className="data_div">
                  <span>
                    <b>Username:</b>
                  </span>
                  <span>{user.username}</span>
                </div>

                <div className="data_div">
                  <span>
                    <b>FullName:</b>
                  </span>
                  <span>{userData.fullName}</span>
                </div>
              </div>

              <div className="info_div">
             
                {/* <h3>Profile Information </h3> */}

                <div className="data_div">
                  <span>
                    <b>Email:</b>
                  </span>
                  <span>{user.email}</span>
                </div>

                <div className="data_div">
                  <span>
                    <b>City:</b>
                  </span>
                  <span>{userData.city}</span>
                </div>

                <div className="data_div">
                  <span>
                    <b>Address:</b>
                  </span>
                  <span>{userData.address}</span>
                </div>

                <div className="data_div">
                  <span>
                    <b>Phone:</b>
                  </span>
                  <span>{userData.phone}</span>
                </div>

                <div className="data_div">
                  <span>
                    <b>Date: </b>
                  </span>
                  <span>{userData?.birthDate?.slice(0, 11)}</span>
                </div>

                <button onClick={()=> setShowModal(!showModal)} className="updateProfileBtn">Update Information <GrUpdate /></button>
              </div>
            </div>
           
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Profile;

{
  /* <form onSubmit={(e) => e.preventDefault()} className="profile_form">
            <h3>Edit Personal Information </h3>

            <div className="profile_form_input_div">
              <label htmlFor="fullName">FullName:</label>
              <input
                type="text"
                name="fullName"
                value={formInput.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="profile_form_input_div">
              <label htmlFor="city">city:</label>
              <input
                type="text"
                name="city"
                value={formInput.city}
                onChange={handleChange}
              />
            </div>

            <div className="profile_form_input_div">
              <label htmlFor="birthDate">birth-date:</label>
              <input
                type="date"
                name="birthDate"
                value={formInput.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="profile_form_input_div">
              <label htmlFor="phone">phone</label>
              <input
                type="text"
                name="phone"
                value={formInput.phone}
                onChange={handleChange}
              />
            </div>

            <div className="profile_form_input_div">
              <label htmlFor="address">address:</label>
              <input
                type="text"
                name="address"
                value={formInput.address}
                onChange={handleChange}
              />
            </div>

            <button onClick={submitForm} className="form_btn">Save!</button>

          </form> */
}
