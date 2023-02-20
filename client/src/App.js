// import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import SignUp from "./pages/sign_up/signup";
import HomePage from "./pages/home/homepg";
import Shop from "./pages/shop/shop";
import SignIn from "./pages/sign_in/signin";
import Cart from "./pages/cart/cart";
import Profile from "./pages/profile/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./store/requireAuth";
import './index.css'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<HomePage />} />

          <Route element={<RequireAuth />}>
            <Route path="/Shop" element={<Shop />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/Cart" element={<Cart />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/Profile" element={<Profile />} />
          </Route>

          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
