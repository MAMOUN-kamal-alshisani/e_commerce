import { MdEmail } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";

import "./scss/navbar.css";
function NavBar() {
  return (
    <div className="nav_div"  data-testid="navbar_ct">


      <div className="navbar_container" data-testid="mytestid">


        <div className="navbar_icons" data-testid="tagContainer">
          <a href="mailto:mamoun.bursi@yahoo.com" className="icon_tag"> <MdEmail className="icon"/> </a>
          </div>
       
        <div className="navbar_icons" data-testid="tagContainer">
          <a href="www.linkedin.com/in/mamounalshishani-350277210" className="icon_tag"> <FiLinkedin  className="icon"/></a>   
        </div>

      </div>

      <div className="navbar_text">Awesome! Free shipping Deals Only Here!</div>

    </div>
  );
}

export default NavBar;
