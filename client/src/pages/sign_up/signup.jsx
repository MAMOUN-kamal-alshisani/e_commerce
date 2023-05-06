import "./scss/signup.css";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignUp() {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);

  const errorEmail = document.querySelector(".emailError_div");
  const errorPassword = document.querySelector(".passowrdError_div");
  const errorUsername = document.querySelector(".usernameError_div");

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errorSpinner, setErrorSpinner] = useState(false);

  const signup = async () => {
    // setIsLoading(true);
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/signup`;

      const user = await axios.post(
        url,
        {
          Username: username,
          Email: email,
          Password: password,
        } /*{withCredentials:true}*/
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          valid: true,
          user: user.data.user,
          token: user.data.token,
        })
      );
       dispatch(
        authActions.setCredentials({
          user: user.data.user,
          token: user.data.token,
        })
      );

     navigate("/");
    } catch (err) {
      setErrorSpinner(true);
      setError(err);
      console.log(err);
    }
  };

//   if (error) {
//     if (error?.response.data.errors[0].msg.includes("password")) {
//       errorEmail.textContent = "";
//       errorUsername.textContent = "";
//       setTimeout(() => {
//         setErrorSpinner(false);
//         errorPassword.textContent = error.response.data.errors[0].msg;
//       }, 3000);
//     } else if (error.response.data.errors[0].msg.includes("email")) {
//       errorPassword.textContent = "";
//       errorUsername.textContent = "";

//       setTimeout(() => {
//         setErrorSpinner(false);
//         errorEmail.textContent = error.response.data.errors[0].msg;
//       }, 3000);
//     } else if (error.response.data.errors[0].msg.includes("username")) {
//       errorPassword.textContent = "";
//       errorEmail.textContent = "";

//       setTimeout(() => {
//         setErrorSpinner(false);
//         errorUsername.textContent = error.response.data.errors[0].msg;
//       }, 2000);
//     }
//   }
  // if (isLoading) {
  //   return <h1>'loading please wait...'</h1>;
  // }
  return (
    <div className="signup">
      <Header />
      <div className="signup_div">
        <div className="form_div">
          <h1 className="form_header">signup</h1>
          <form
            action={`${process.env.REACT_APP_BASE_URL}/signup`}
            method="post"
            onSubmit={(e) => e.preventDefault()}
            className={"sign_form"}
          >
            <div className="form_input_div">
              {/* <label htmlFor="username">username: </label> */}
              <input
                type="text"
                name={"username"}
                value={username}
                className="input_text"
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder={"Enter username"}
              />
            </div>
            <div className="usernameError_div"></div>

            <div className="form_input_div">
              {/* <label htmlFor="email">email: </label> */}
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
              {/* <label htmlFor="password">password: </label> */}
              <input
                type="password"
                name={"password"}
                value={password}
                className="input_text"
                onChange={(e) =>
                  setPassword( e.target.value)
                }
                placeholder={"Enter password"}
              />
            </div>
            <div className="passowrdError_div"></div>

            <div className="form_input_div">
              <button
                type={"submit"}
                onClick={()=>signup()}
                className={"input_submit"}
              >
                <div>
                  submit!
                  {errorSpinner && (
                    <AiOutlineLoading3Quarters className="loading_icon" />
                  )}
                </div>
              </button>
            </div>
          </form>
          {/* /*<HiArrowSmRight className="arrowIcon"/>*/}
          <div className="login_div">
            <p>already have an account?</p>
          </div>
          <span onClick={() => navigate("/signin")} className={"login_tag"}>
            Login Now!
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
