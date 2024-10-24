import "./scss/header.css";
import NavBar from "../navbar/navbar";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { useFetchCartCountQuery } from "../../store/apis/cartApi";
import { useFetchFavCountQuery } from "../../store/apis/favApi";
import Cookies from "universal-cookie";
function Header({ showMd, setShowMd }) {
  const cookie = new Cookies() 
  const user = cookie.get('user')
  const { data, isError } = useFetchCartCountQuery(user);
  const userFavoriteItemsCount = useFetchFavCountQuery(user);
  const logOutHandler = () => {
  cookie.remove('user')
    window.location.reload(true);
  };

  return (
    <div className="header_cn">
      <NavBar />
      <header>
        <div className="header_links_cn">
          <nav className="siteName_nav">
            <Link to={"/"} className="Link siteName_Link">
              <p>TechStore</p>
            </Link>
          </nav>

          <nav className="main_nav">
            <Link to={"/"} className="Link link-tag">
              Home
            </Link>
            <Link to={"/Shop"} className="Link link-tag">
              Shop
            </Link>
            <Link to={"/Blog"} className="Link link-tag">
              Blog
            </Link>
          </nav>

          <div className="page_nav_div">
            <nav className="tags_nav2">
              {!user ? (
                <Link to={"/Signin"} className="Link">
                  Login
                </Link>
              ) : (
                <Link className="Link logout" onClick={logOutHandler}>
                  Logout
                </Link>
              )}{" "}
              /{" "}
              <Link to={"/Signup"} className="Link">
                Register
              </Link>
            </nav>

            <nav className="tags_nav3">
              <Link to={"/Profile"} className="Link link-icon">
                <BsFillPersonFill className="personal_items_icon" />
              </Link>

              <Link to={"/Cart"} className="Link link-icon">
                <AiOutlineShoppingCart className="personal_items_icon" />
                <sup className="count_icon">
                  {!isError && data?.count ? data.count : "0"}
                </sup>
              </Link>
              <button
                onClick={() => setShowMd(!showMd)}
                className="fav_btn link-icon"
              >
                <FcLike className="personal_items_icon" />
                <sup className="count_icon">
                  {!userFavoriteItemsCount.isError &&
                  userFavoriteItemsCount?.data?.count
                    ? userFavoriteItemsCount.data.count
                    : "0"}
                </sup>
              </button>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
