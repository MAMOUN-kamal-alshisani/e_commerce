import "./scss/signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import Cookies from "universal-cookie";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [errorSpinner, setErrorSpinner] = useState(false);
  const dispatch = useDispatch();
  const errorEmail = document.querySelector(".emailError_div");
  const errorPassword = document.querySelector(".passowrdError_div");
  const cookies = new Cookies();
  const signInHandler = async () => {

    try {
      const url = `${process.env.REACT_APP_BASE_URL}/signin`;
      const user = await axios.post(url, {
        Email: email,
        Password: password,
      });

      dispatch(
        authActions.setCredentials({
          user: user.data.user,
          token: user.data.token,
        })
      );
      cookies.set(
        "user",
        {
          valid: true,
          user: user.data.user,
          token: user.data.token,
        },
        { maxAge: 10000 }
      );
      navigate("/");
    } catch (err) {
      setErrorSpinner(true);
      setError(err);
      console.log(err);
    }
  };

  if (error) {
    if (error.response.data.includes("password")) {
      setTimeout(() => {
        setErrorSpinner(false);
        errorPassword.textContent = error.response.data;
      }, 3000);
    } else if (error.response.data.includes("email")) {
      setTimeout(() => {
        setErrorSpinner(false);
        errorEmail.textContent = error.response.data;
      }, 3000);
    }
  }


  return (
    <div className="signin">
      <div className="section_container">
        <section className="signin_cn">
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
            <h1 className="form_header">Sign In</h1>
            <form onSubmit={(e) => e.preventDefault()} className={"sign_form"}>
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
              <div className="form_input_div">
                <input
                  type="password"
                  name={"password"}
                  value={password}
                  className="input_text"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Enter password"}
                />
              </div>

              <div className="passowrdError_div"></div>

              <div className="form_input_div">
                <button onClick={signInHandler} className={"input_submit"}>
                  {" "}
                  <span className="btn_txt_cn">
                    Login!{" "}
                    {errorSpinner && (
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
            <h1>Welcome To Login</h1>
            <p>Dont have an account?</p>
            <span onClick={() => navigate("/signup")} className={"login_tag"}>
              signUp Now!
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignIn;
