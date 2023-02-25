import Header from "../../components/header/header";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import ProfileMd from "./parts/profileModal";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import "./scss/profile.css";
function Profile() {
  const user = useSelector((state) => {
    return state.auth.user;
  });

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const getUserData = async (user) => {
        const getcontact = await axios.get(
          `http://localhost:4000/contacted/${user.id}`
        );

        setUserData(getcontact.data);
      };
      getUserData(user);
    } catch (err) {
      console.log(err);
    }
  }, [setUserData, user]);

  return (
    <div className="profile_all_container">
      <Header />
      {showModal && (
        <ProfileMd
          setUserData={setUserData}
          user={user}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className="profile">
        <div className="profile_div">
          <div className="profile_info_container">
            <div className="profile_data">
              <div className="img_div">
                <img
                  src={userData.photo}
                  alt="userpic"
                  className="profile_img"
                  style={{ height: "200px" }}
                />
                <div className="img_formDiv">
                  <form action="">
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

                <button
                  onClick={() => setShowModal(!showModal)}
                  className="updateProfileBtn"
                >
                  Update Information <GrUpdate />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
