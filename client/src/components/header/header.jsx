import "./scss/header.css";
import NavBar from "../navbar/navbar";
import HeaderCards from "../headerCards/headerCards";
import { useNavigate, Link, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
function Header({ type, item }) {
  const navigate = useNavigate();
  const username = useSelector((state) => {
    return state.auth.user;
  });

  const [searchInput, setSearchInput] = useState("");

  const searchHandler = () => {
    navigate("/Shop", {
      state: {
        search: searchInput,
      },
    });
    console.log(navigate);
  };

  const logOutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
  };

  return (
    <div className="header_container">
      <NavBar />
      <header>
        <div className="headerDiv">
          <div className="upper_container">
            <div className="siteName_div">
              <Link to={"/"} className="siteName_Link">
                <p>TechShop</p>
              </Link>
            </div>

            <div className="input_div">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="search"
                  placeholder="search for item"
                  className="header_search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <input
                  type="submit"
                  value={"search"}
                  className="form_submit"
                  onClick={searchHandler}
                />
              </form>
            </div>
            <div className="links_div">
              <nav>
                {!username ? (
                  <Link to={"/signin"} className="Link">
                    Login
                  </Link>
                ) : (
                  <Link className="Link logout" onClick={logOutHandler}>
                    Logout
                  </Link>
                )}

                <Link to={"/signup"} className="Link">
                  Register
                </Link>
              </nav>
            </div>
          </div>

          <div className="buttom_contianer">
            <nav>
              <div className="buttom_tags-1">
                <div className="tags_Div_Nav1">
                  <Link to={"/"} className="Link link-tag">
                    Home
                  </Link>
                  <Link to={"/Shop"} className="Link link-tag">
                    Shop
                  </Link>
                </div>

                <div className="tags_Div_Nav2">
                  <Link to={"/Profile"} className="Link link-icon">
                    <BsFillPersonFill className="bottom_icon " />
                  </Link>

                  <Link to={"/Cart"} className="Link link-icon">
                    <AiOutlineShoppingCart className="bottom_icon" />
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {type == "list" && (
          <div className="backgroundImg_div">
            <img
              src="https://www.ti-insight.com/wp-content/uploads/2017/01/ER2017-iStock-519186052.jpg"
              alt="background"
              className="backgroundImg"
            />

            <div className="backgroundImgText">
              <div className="imgText_div">
                <h1>First Time Here? Don't Worry We Got You Covered! </h1>
                <p>
                  in TechShop we do our best to meet everyOnes expectations,
                  future is in your hands with just a click now!
                </p>
              </div>
            </div>
            {type == "list" && <HeaderCards />}
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
