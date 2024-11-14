import "./scss/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  useFetchProfileDataQuery,
  useUpdateProfileDataMutation,
} from "../../store/apis/profileApi";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ImSpinner8 } from "react-icons/im";
import Cookies from "universal-cookie";
function Profile() {
  const [uploadFile, setUploadFile] = useState("");
  const user = new Cookies().get("user");
  const [updateProfile, result] = useUpdateProfileDataMutation();
  const [loadSpinner, setLoadSpinner] = useState(false);
  const { data, isSuccess, refetch } = useFetchProfileDataQuery(user);
  const [profileInput, setProfileInput] = useState({
    Fname: "",
    Lname: "",
    Phone: "",
    BirthDate: "",
    Email: "",
    Country: "",
    Address: "",
    Gender: "",
  });

  useEffect(() => {
    setProfileInput({
      Fname: data?.Fname,
      Lname: data?.Lname,
      Phone: data?.Phone,
      BirthDate: data?.BirthDate,
      Country: data?.Country,
      Email: data?.Email,
      Address: data?.Address,
      Gender: data?.Gender,
    });
  }, [data, isSuccess]);


  const fileUploadHandler = async () => {
    try{
      const formData = new FormData();
      formData.append("file", uploadFile);
      const url = `${process.env.REACT_APP_BASE_URL}/api/upload`;
      const req = await axios.post(url, formData);
  
      return req.data;
    }catch(err){
      console.error(err)
    }
 
  };
  const changeUserPictureHandler = async () => {
    try {
    const profilePicBtn = document.querySelector(".ud_profile_pic_btn");

      const imgUrl = await fileUploadHandler();
      const url = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/contact/${user?.user?.id}`,
        {
          Photo: imgUrl?.downloadURL,
        }
      );

      setLoadSpinner(true);
      profilePicBtn.disable = true;
      setTimeout(() => {
        setUploadFile("");
        setLoadSpinner(false);
        profilePicBtn.disable = false;
        refetch();
      }, 3000);
      return url.data;
    } catch (err) {
      console.error(err);
      
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfileInput((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="ProfilePg">
        <section className="profile_pic_section">
          <div className="profile_pic_cn">
            <div className="profile_pic_div">
              <img
                src={data?.Photo}
                alt={user?.user?.id}
                className="profile_pic"
              />
              <div className="img_upload_div">
                <label htmlFor="file" className="img_change_lbl">
                  <CameraAltIcon className="cmr_icon" />
                  change picture
                </label>
                <input
                  type={"file"}
                  id="file"
                  name="file"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <p id="user_dt_p1" className="user_dt">
              {user?.user?.username}
            </p>
            <p id="user_dt_p2" className="user_dt">
              {user?.user?.email}
            </p>
            <p id="user_dt_p3" className="user_dt">
              {" "}
              {uploadFile?.name}
            </p>
          </div>
          <button
            className="ud_profile_pic_btn"
            onClick={() => changeUserPictureHandler()}
          >
            update picture {loadSpinner && <ImSpinner8 className="icon" />}
          </button>
        </section>
        <section className="profile_details_section">
          <div className="profile_details_cn">
            <h2>Profile Settings</h2>
            <div className="profile_name_input_cn">
              <div className="input_cn input_ct">
                <label htmlFor="Fname">First Name</label>
                <input
                  type={"text"}
                  name="Fname"
                  id="Fname"
                  onChange={(e) => handleInputChange(e)}
                  defaultValue={profileInput?.Fname}
                />
              </div>
              <div className="input_cn input_ct">
                <label htmlFor="Lname">Last Name</label>
                <input
                  type={"text"}
                  name="Lname"
                  id="Lname"
                  onChange={(e) => handleInputChange(e)}
                  defaultValue={profileInput.Lname}
                />
              </div>
            </div>
            <div className="input_ct">
              <label htmlFor="BirthDate">BirthDate</label>
              <input
                type={"date"}
                name="BirthDate"
                id="birthDate"
                onChange={(e) => handleInputChange(e)}
                defaultValue={profileInput?.BirthDate?.slice(
                  0,
                  profileInput?.BirthDate.indexOf("T")
                )}
              />
            </div>
            <div className="input_ct">
              <label htmlFor="Phone">Phone</label>
              <input
                type={"number"}
                name="Phone"
                id="Phone"
                onChange={(e) => handleInputChange(e)}
                defaultValue={profileInput.Phone}
              />
            </div>
            <div className="input_ct">
              <label htmlFor="Email">Email</label>
              <input
                type={"email"}
                name="Email"
                id="Email"
                onChange={(e) => handleInputChange(e)}
                defaultValue={profileInput.Email}
              />
            </div>
            <div className="input_ct">
              <label htmlFor="Gender">Gender</label>
              <select
                name="Gender"
                id="Gender"
                onChange={(e) => handleInputChange(e)}
                defaultValue={profileInput.Gender}
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div className="input_ct">
              <label htmlFor="Country">Country</label>
              <input
                type={"text"}
                name="Country"
                id="Country"
                onChange={(e) => handleInputChange(e)}
                defaultValue={profileInput.Country}
              />
            </div>
            <div className="input_ct">
              <label htmlFor="Address">Address</label>
              <input
                type={"text"}
                name="Address"
                id="Address"
                onChange={(e) => handleInputChange(e)}
                defaultValue={profileInput.Address}
              />
            </div>

            <button
              className="ud_btn"
              onClick={() => updateProfile({ user, data: profileInput })}
            >
              {result.isLoading ? (
                <ImSpinner8 className="details_change_icon" />
              ) : (
                "Update My Profile"
              )}
            </button>
          </div>
        </section>

        <section className="display_adds_section">
          <div className="add_display_cn">
            <h4>display ads</h4>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
