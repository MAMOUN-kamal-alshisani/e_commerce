import HeaderCards from "./headerCards/headerCards";
import "../scss/header.css";

function HeaderImg({ type }) {
  return (
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
            in TechShop we do our best to meet everyOnes expectations, future is
            in your hands with just a click now!
          </p>
        </div>
      </div>
      <HeaderCards />
    </div>
  );
}

export default HeaderImg;
