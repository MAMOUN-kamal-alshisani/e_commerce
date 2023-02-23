import "./scss/card.css";
// import { useDispatch, useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import Rating from "../../../../components/star/rating";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ShopCard({ currentPosts, addToCart }) {
  const [isLoading, setIsLoading] = useState(false);

  const addItem = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      addToCart(data);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="card">
      {currentPosts?.map((data) => {
        return (
          <div className="container" key={data.id}>
            <div className="img_cn">
              <img src={data.img[0]} alt={data.title} className={"cardImg"} />
            </div>
            <div className="card_title_div">
              <h3 className="card_title">{data.title}</h3>
            </div>
            <div className="card_name_div">
              <h3 className="card_name">{data.name}</h3>
            </div>

            <div className="itemDetails">
              <h4 className="card_h3">${data.price}</h4>
              <h4 className="card_Stock"> Stock left: {data.stock} </h4>
            </div>
            <div className="rating_star_div">
              <Rating />
            </div>
            <div className="add_btn_div">
              <button onClick={() => addItem(data)} className="add_btn">
                Add To Cart
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="loading_icon" />
                ) : (
                  <TiShoppingCart />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShopCard;
