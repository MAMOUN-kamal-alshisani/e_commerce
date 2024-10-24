import "./scss/card.css";
import { VscLoading } from "react-icons/vsc";
import Rating from "../../../../components/star/rating";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useAddToCartMutation } from "../../../../store/apis/cartApi";
import {
  useAddToFavMutation,
  useFetchUserFavProductIdsQuery,
} from "../../../../store/apis/favApi";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
function ShopCard({ currentPosts}) {
  const user = new Cookies().get('user')
  const navigate = useNavigate();

  const [addToCart, addToCartResult] = useAddToCartMutation();
  const [addToFav, addtoFavResult] = useAddToFavMutation();
  const userLikedProductId = useFetchUserFavProductIdsQuery(user);
  
  const [productId, setProductId] = useState("");
  const [cartProductId, setCartProductId] = useState("");
  const [mdStatusMessage, setMdStatusMessage] = useState("");
  const [loadlikedId, setLoadlikedId] = useState("");

  useEffect(() => {
    setProductId(userLikedProductId.data);
  }, [
    userLikedProductId.data,
    addToFav,
    addtoFavResult.isSuccess,
    addtoFavResult.isLoading,
    addtoFavResult.error,
  ]);
  useEffect(() => {
    const mdElement = document.querySelector(".product_status_md");
    const cartAddBtn = document.querySelectorAll(".add_btn");
    if (addToCartResult.isSuccess) {
      cartAddBtn.forEach((btn) => (btn.disabled = true));
      setTimeout(() => {
        cartAddBtn.forEach((btn) => (btn.disabled = false));
      }, 2000);
    }
    if (addToCartResult.isSuccess) {
      setMdStatusMessage("item added");
      mdElement.style.visibility = "visible";
      setTimeout(() => {
        mdElement.style.visibility = "collapse";
      }, 3000);
    } else if (addToCartResult.isError) {
      mdElement.style.visibility = "visible";
      setMdStatusMessage("failed to add item");
      setTimeout(() => {
        mdElement.style.visibility = "collapse";
      }, 3000);
    }
  }, [
    addToCartResult.isSuccess,
    addToCartResult.isError,
    addToCartResult.isLoading,
  ]);
  return (
    <div className="card">
         <div className="product_status_md">
          <strong>{mdStatusMessage}</strong>
        </div>
      {currentPosts?.map((data) => {
        return (
          <div className="container" key={data.id}>
            <div className="img_cn">
              <img
                src={
                  data.img[0] ||
                  "https://www.freeiconspng.com/uploads/no-image-icon-10.png"
                }
                alt={data.title}
                className={"cardImg"}
              />
            </div>

            <div className="card_text_cn">
              <div className="card_desc_div">
                <h5
                  className="card_description"
                  onClick={() => navigate(`../product/${data?.id}`)}
                >
                  {data.desc.substring(0, 100)}...
                </h5>
              </div>

              <div className="rating_star_div">
                <Rating />
              </div>
              <div className="itemDetails">
                <h4 className="card_price">
                  <sup>$</sup>
                  {data.price}
                </h4>
              </div>
              <div className="product_btn_cv">
                <button
                  onClick={() => {
                    setCartProductId(data.id)
                    addToCart({ user, data })}}
                  className="add_btn"
                >
                  {addToCartResult.isLoading && cartProductId === data.id ? (
                    <AiOutlineLoading3Quarters className="loading_icon" />
                  ) : (
                    "Add to cart"
                  )}
                </button>
                <button
                  className="like_btn"
                  onClick={() => {
                    addToFav({ user, data });
                    setLoadlikedId(data.id);
                  }}
                >
                  {addtoFavResult.isLoading === true &&
                  loadlikedId === data?.id ? (
                    <VscLoading className="load_icon icon" />
                  ) : (
                    <FcLike
                      className={`${
                        productId?.includes(data?.id) && "like_marked"
                      } icon like_icon`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShopCard;
