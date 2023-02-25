import { useState } from "react";
import axios from "axios";
import "./scss/profileMd.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImSpinner } from "react-icons/im";

function ProfileMd({ setUserData, user, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    fullName: "",
    city: "",
    birthDate: "",
    phone: "",
    address: "",
  });

  const submitForm = async (e) => {
    try {
      setIsLoading(true);
      const getcontact = await axios.get(
        `http://localhost:4000/contacted/${user.id}`
      );
      ///// if user info doesnt exist then create one
      if (!getcontact?.data) {
        await axios.post(`http://localhost:4000/contact/${user.id}`, {
          fullName: formInput.fullName,
          city: formInput.city,
          birthDate: formInput.birthDate,
          phone: formInput.phone,
          address: formInput.address,
        });
        setIsLoading(false);
        //// if user info already exists then update
      } else {
        await axios.put(`http://localhost:4000/contact/${user.id}`, {
          fullName: formInput.fullName,
          city: formInput.city,
          birthDate: formInput.birthDate,
          phone: formInput.phone,
          address: formInput.address,
        });
        setIsLoading(false);
      }
      /// if user info exists then take the data
      if (getcontact) {
        setUserData(getcontact.data);
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="form_container">
      <form onSubmit={(e) => e.preventDefault()} className="profile_form">
        {/* <h3>Edit Personal Information </h3> */}
        <div className="close_div">
          <button onClick={() => setShowModal(!true)} className="close_btn">
            <AiOutlineCloseCircle />
          </button>
        </div>

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

        <button onClick={submitForm} className="form_btn">
          Save! {isLoading && <ImSpinner className="loadSpinner" />}
        </button>
      </form>
    </div>
  );
}

export default ProfileMd;
