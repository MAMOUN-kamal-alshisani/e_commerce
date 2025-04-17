import "./scss/favs.css";
import {
  useFetchUserFavItemQuery,
  useDeleteFavoriteProductsMutation,
} from "../../store/apis/favApi";
import { useAddToCartMutation } from "../../store/apis/cartApi";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { TbZoomIn } from "react-icons/tb";
import { IoBagRemoveOutline } from "react-icons/io5";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function Favs({ showMd, setShowMd }) {
  const user = new Cookies().get("user");
  const { data } = useFetchUserFavItemQuery(user);
  const [addToCart, addToCartResult] = useAddToCartMutation();
  const [deleteFavProduct] = useDeleteFavoriteProductsMutation();
  const [mdStatusMessage, setMdStatusMessage] = useState("");

  const handleModel = () => {
    setTimeout(() => {
      setShowMd(false);
    }, 1000);
  };
  useEffect(() => {
    const mdElement = document.querySelector(".product_status_md");
    const cartAddBtn = document.querySelectorAll(".fav_btn");
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
    <div className="fav_cn">
      <div className="product_status_md">
        <strong>{mdStatusMessage}</strong>
      </div>
      <div className={`${showMd === false && "favs_not_show"} favs`}>
        <div className="favs_header_cn">
          <h3 id="favs_list_header">WishList</h3>
          <button onClick={() => handleModel()} className="exit_md_btn">
            <ClearOutlinedIcon />
          </button>
        </div>

        <div className="items_card_list">
          {data === undefined || data === null || data.length <= 0 ? (
            <h2>your wishlist is empty</h2>
          ) : (
            data?.map((item) => {
              return (
                <div className="item_card">
                  <div className="card_list_cn">
                    <div className="item_img">
                      <img src={item?.item?.img[0]} alt={item?.item?.id} />
                    </div>
                    <div className="item_details">
                      <p>{item?.item?.name}</p>
                      <p>${item?.item?.price}</p>
                    </div>
                  </div>
                  <div className="Item_fav_btn_cn">
                    <button
                      className="cart_btn fav_btn"
                      onClick={() => addToCart({ user, data: item })}
                    >
                      <TiShoppingCart className="fav_icon" />
                    </button>

                    <Link to={`product/${item?.item?.id}`}>
                      <button className="view_btn fav_btn">
                        <TbZoomIn className="icon" />
                      </button>
                    </Link>

                    <button
                      className="remove_btn fav_btn"
                      onClick={() => deleteFavProduct({ user, item })}
                    >
                      <IoBagRemoveOutline className="fav_icon" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Favs;
