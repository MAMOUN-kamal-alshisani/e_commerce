import "./scss/signin.css";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { authActions } from "../../store/slices/authSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
// const [isLoading,setIsLoading] = useState(false)
// const [error,setError] = useState(null)
const [errorSpinner,setErrorSpinner] = useState(false)

  const dispatch = useDispatch();

// const errorEmail = document.querySelector('.emailError_div')
// const errorPassword= document.querySelector('.passowrdError_div')


  const signin = async () => {
    // setIsLoading(true)
   
    try {
      // setIsLoading(false)
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
      
      localStorage.setItem('user',JSON.stringify({
        valid:true,
        user:user.data.user,
        token:user.data.token
      }))
      navigate("/");
      
    } catch (err) {
    setErrorSpinner(true)
//       setError(err)
      // setIsLoading(false)
      console.log(err);
      
    }
   
    
  };

// if(error){

//   if(error.response.data.includes('password')){
//     setTimeout(()=>{
//       setErrorSpinner(false)
//       errorPassword.textContent =error.response.data
//     },3000)

//   }

//   else if(error.response.data.includes('email')){
//     setTimeout(()=>{
//       setErrorSpinner(false)
//       errorEmail.textContent =error.response.data
//     },3000)
    
//   }
    
// }

  // if(isLoading){

  //   return <h1>'loading please wait...'</h1> 
  // } 
  return (
    <div className="signup">
      <Header />
    
      <div className="signin_div">
        <div className="form_div">
          <h1 className="form_header">signIn</h1>
          <form onSubmit={(e) => e.preventDefault()} className={"sign_form"}>
           
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
                // type={"submit"}
                onClick={signin}
                className={"input_submit"}
              > <div>submit! {errorSpinner && <AiOutlineLoading3Quarters className="loading_icon" />}</div></button>
           

            </div>
          </form>
          {/* <HiArrowSmRight className="arrowIcon"/> */}
          <div className="login_div">
            <p>Dont have an account?</p>
          </div>
          <span onClick={() => navigate("/signup")} className={"login_tag"}>
            signUp Now!
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
