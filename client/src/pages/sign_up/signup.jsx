import "./scss/signup.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
function SignUp() {
  const errorEmail = document.querySelector(".emailError_div");
  const errorPassword = document.querySelector(".passowrdError_div");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [LoadSpinner, setLoadSpinner] = useState(false);

  const signUpHandler = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/signup`;

      const user = await axios.post(
        url,
        {
          Username: username,
          Email: email,
          Password: password,
        }
      );
    
      setLoadSpinner(true)
      setTimeout(()=>{
         setLoadSpinner(false)
      navigate("/signin");
      },4000)
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  useEffect(() => {
    const signUpBtn = document.querySelector(".input_submit");
    if (password !== "" && ConfirmPassword !== "") {
      if (password !== ConfirmPassword) {
        signUpBtn.disabled = true;
        errorPassword.textContent = "Entered Passwords don't match";
        setTimeout(() => {
          errorPassword.textContent = "";
          signUpBtn.disabled = false;
        }, 6000);
      }
    }
  }, [
    setPassword,
    setConfirmPassword,
    password,
    ConfirmPassword,
    errorPassword,
  ]);


  useEffect(() => {

    if (error !== null) {
      return (errorEmail.textContent = error?.response?.data?.msg);
    }
    setTimeout(() => {
      if(errorEmail.textContent !== null){
        return (errorEmail.textContent = "");
      }
    }, 4000);
  }, [error, setError,errorEmail]);


  const handleShowHidePassWord = (e)=>{
  let input = e.target.parentElement;
  if(input?.previousSibling.getAttribute('type') === 'password'){
    input?.previousSibling.setAttribute('type','text')
  }
  else{
    input?.previousSibling.setAttribute('type','password')
  }

  }
  return (
    <div className="signup">
      <div className="section_container">
        <section className="signup_cn">
          <div className="home_name_div">
            <h3>
              T<span>echStore</span>
            </h3>
            <h3>
              <Link to={"/"}>
                <FaHome />
              </Link>
            </h3>
          </div>
          <div className="form_div">
            <h1 className="form_header">Sign Up</h1>

            <form onSubmit={(e) => e.preventDefault()} className={"sign_form"}>
              <div className="form_input_div">
                <input
                  type="text"
                  name={"username"}
                  value={username}
                  className="input_text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={"Enter username"}
                />
              </div>
              <div className="usernameError_div"></div>
              <div className="form_input_div">
                <input
                  type="email"
                  name={"email"}
                  value={email}
                  className="input_text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Enter email"}
                />
              </div>
              <div className="emailError_div"></div>
              <div className="form_input_div pass-input">
                <input
                  type="password"
                  name={"password"}
                  value={password}
                  className="input_text"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Enter password"}
                />
                  <BsEyeFill className="un-showPass" onClick={(e)=>handleShowHidePassWord(e)}/>
              </div>
              <div className="form_input_div pass-input">
                <input
                  type="password"
                  name={"password"}
                  value={ConfirmPassword}
                  className="input_text"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={"Confirm password"}
                />
                <BsEyeFill className="un-showPass" onClick={(e)=>handleShowHidePassWord(e)}/>
              </div>
              <div className="passowrdError_div"></div>

              <div className="form_input_div">
                <button
                  onClick={signUpHandler}
                  className={"input_submit"}
                >
                  {" "}
                  <span className="btn_txt_cn">
                    Sign-Up{" "}
                    {LoadSpinner && (
                      <AiOutlineLoading3Quarters className="loading_icon" />
                     )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="alternative_choice_cn">
          <div className="log_in_out_div">
            <h1>Welcome To SignUp</h1>
            <p>Already Have an Account?</p>
            <span onClick={() => navigate("/signin")} className={"signup_tag"}>
              sign-In Now!
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignUp;
