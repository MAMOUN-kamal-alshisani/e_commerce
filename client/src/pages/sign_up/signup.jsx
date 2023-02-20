import "./scss/signup.css";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {authActions} from '../../store/slices/authSlice'
function SignUp() {
  const dispatch = useDispatch()

// const auth = useSelector((state,action)=>{

//   console.log(state.auth);
// })
  const errorEmail = document.querySelector('.emailError_div')
  const errorPassword= document.querySelector('.passowrdError_div')
  const errorUsername= document.querySelector('.usernameError_div')

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
//     errorPassword.innerHTML = ""
// errorEmail.innerHTML = ""
// errorUsername.innerHTML =""
    const url = "http://localhost:4000/signup";
try{
  const user = await axios.post(url, {
    Username: username,
    Email: email,
    Password: password,
  },/*{withCredentials:true}*/);
  // state.user =user.data.user, state.token = user.data.token
  localStorage.setItem('user',JSON.stringify({
    valid:true,
    user:user.data.user,
    token:user.data.token
  }))
  dispatch(authActions.setCredentials({user:user.data.user,token:user.data.token}))
  navigate('/')

  // const User = Cookies.set("user", user.data.user);
  // console.log(User);

  // return User;
}catch(err){
  if(err?.response?.data?.errors[0].msg?.includes('password') /*|| err.response.data.includes('password')*/){
    errorPassword.textContent =err.response.data.errors[0].msg /*|| err.response.data*/
  }
   
  else if(err.response.data.errors[0].msg.includes('email') /* || err.response.data.includes('email')*/){
    errorEmail.textContent =err.response.data.errors[0].msg /*|| err.response.data*/

  }
  else if(err.response.data.errors[0].msg.includes('username') /*|| err.response.data.includes('username')*/){
    errorUsername.textContent =err.response.data.errors[0].msg /*|| err.response.data*/
  }
  else{
    console.log(err);
  }
  // console.log(err.response.data.errors[0].msg);
}

    // console.log(User);
  };


  return (
    <div className="signup">
      <Header />
      <div className="signup_div">
        <div className="form_div">
          <h1 className="form_header">signup</h1>
          <form
            action="http://localhost:4000/signup"
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
                  setUsername((state) => (state = e.target.value))
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
                onChange={(e) => setEmail((state) => (state = e.target.value))}
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
                  setPassword((state) => (state = e.target.value))
                }
                placeholder={"Enter password"}
              />
            </div>
   <div className="passowrdError_div"></div>

            <div className="form_input_div">
              <input type={"submit"} onClick={signup} className={'input_submit'}/>
            </div>
          </form>
          {/* /*<HiArrowSmRight className="arrowIcon"/>*/ }
        <div className="login_div">
          <p>already have an account?</p>
        </div>
        <a  onClick={()=>navigate("/signin")} className={'login_tag'}>Login Now!</a>

        </div>


      </div>
    </div>
  );
}

export default SignUp;




 