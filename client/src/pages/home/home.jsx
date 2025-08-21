import "./scss/home.css";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Rating from "../../components/star/rating";
import { TiShoppingCart } from "react-icons/ti";
import { FcLike } from "react-icons/fc";
import { TbZoomIn } from "react-icons/tb";
import { VscLoading } from "react-icons/vsc";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  useFetchLatestItemsQuery,
  useFetchFeaturedItemsQuery,
  useFetchExclusiveItemQuery,
} from "../../store/apis/itemApi";
import { useFetchNewsQuery } from "../../store/apis/newsApi";
import { useAddToCartMutation } from "../../store/apis/cartApi";
import {
  useAddToFavMutation,
  useFetchUserFavProductIdsQuery,
} from "../../store/apis/favApi";
import { useState, useEffect } from "react";
import bestDeals from "../../assets/best_deals.png";
import discount from "../../assets/discount.jpg";
import freeShipping from "../../assets/free_shipping.jpg";
import onTimeDelivery from "../../assets/on_time_delivery.jpg";
import onLineOrder from "../../assets/online_order.jpg";
import returnsAndFunds from "../../assets/returns_and_funds.webp";
import Cookies from "universal-cookie";
function Home() {

  const user = new Cookies().get("user");

  const { data, isSuccess } = useFetchLatestItemsQuery();
  const featuredItems = useFetchFeaturedItemsQuery();
  const ExclusiveItem = useFetchExclusiveItemQuery();
  const newsBlog = useFetchNewsQuery();
  const userLikedProductId = useFetchUserFavProductIdsQuery(user);
  const [addToCart, addToCartResult] = useAddToCartMutation();
  const [addToFav, addtoFavResult] = useAddToFavMutation();

  const [productId, setProductId] = useState("");
  const [loadTargetId, setLoadTargetId] = useState("");
  const [loadlikedId, setLoadlikedId] = useState("");
  const [mdStatusMessage, setMdStatusMessage] = useState("");

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
    const cartAddBtn = document.querySelectorAll(".cart_btn");
    
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
    <>
      <div className="HomePg">
        <div className="product_status_md">
          <strong>{mdStatusMessage}</strong>
        </div>
        <section className="header_img_sn">
          <div className="img_cr">
            <div className="img_text">
              <h1>Your Final Destination For Top Notch Technologies</h1>
              <p>Get Discounts and Save Up To 30% Off </p>
              <Link to={"/Shop"}>
                <button className="img_btn">Shop Now</button>
              </Link>
            </div>
          </div>
        </section>

        <section className="main_offer_sn">
          <div className="offer_card">
            <img src={onLineOrder} alt="Online Order" />
            <h1>Online Order</h1>
          </div>
          <div className="offer_card">
            <img src={discount} alt="discounts" />
            <h1>Get Discounts</h1>
          </div>
          <div className="offer_card">
            <img src={freeShipping} alt="shipping" />
            <h1>Free Shipping</h1>
          </div>
          <div className="offer_card">
            <img src={onTimeDelivery} alt="n Time Delivery" />
            <h1>On Time Delivery</h1>
          </div>
          <div className="offer_card">
            <img src={bestDeals} alt="best deals" />
            <h1>Best Deals</h1>
          </div>
          <div className="offer_card">
            <img src={returnsAndFunds} alt="product return" />
            <h1>Order Cancellation & Return </h1>
          </div>
        </section>

        <section className="featured_products_sn">
          <div className="production_cn">
            <h1 className="product_header">
              Featured <span className="product_header_span">Products</span>
            </h1>
            <Link to={`shop`} className="product_link">
              <button className="product_btn">
                view more <IoIosArrowRoundForward className="arrow_icon" />
              </button>
            </Link>
          </div>

          <div className="cards_cn">
            {featuredItems.isSuccess &&
              featuredItems.data.map((data, i) => {
                return (
                  <div className="featured_product_card" key={data.id}>
                    <div className="img_cn">
                      <img src={data.img[0]} alt={data.id} />
                      <div className="product_shop_add">
                        <Link to={`product/${data?.id}`}>
                          <button className="view_btn">
                            <TbZoomIn className="icon" />
                          </button>
                        </Link>
                        <button
                          className="cart_btn"
                          onClick={() => {
                            addToCart({ user, data });
                            setLoadTargetId(data.id);
                          }}
                        >
                          {addToCartResult.isLoading === true &&
                          loadTargetId === data?.id ? (
                            <VscLoading className="load_icon icon" />
                          ) : (
                            <TiShoppingCart className="icon" />
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

                    <div className="product_info">
                      <h4 className="product_title">{data.title}</h4>

                      <h5 className="product_name">{data.name}</h5>
                      <Rating />
                      <p className="product_price">${data.price}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
        <section className="product_deals_sn">
          <div className="product_deals_text">
            <h1>Super Sales Now!</h1>
            <p>enjoy discounts on Our Products</p>
            <p>Get Up to 50% Off</p>
          </div>
        </section>
        <section className="Latest_products_sn">
          <div className="production_cn">
            <h1 className="product_header">
              Latest <span className="product_header_span">Products</span>
            </h1>
            <Link to={`shop`} className="product_link">
              <button className="product_btn">
                view more <IoIosArrowRoundForward className="arrow_icon" />
              </button>
            </Link>
          </div>

          <div className="cards_cn">
            {isSuccess &&
              data.map((data, i) => {
                return (
                  <div className="latest_product_card" key={data.id}>
                    <div className="img_cn">
                      <img src={data.img[0]} alt={data.id} />
                      <div className="product_shop_add">
                        <Link to={`product/${data?.id}`}>
                          <button className="view_btn">
                            <TbZoomIn className="icon" />
                          </button>
                        </Link>
                        <button
                          className="cart_btn"
                          onClick={() => {
                            addToCart({ user, data });
                            setLoadTargetId(data.id);
                          }}
                        >
                          {addToCartResult.isLoading === true &&
                          loadTargetId === data.id ? (
                            <VscLoading className="load_icon icon" />
                          ) : (
                            <TiShoppingCart className="icon" />
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
                          loadlikedId === data.id ? (
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

                    <div className="product_info">
                      <h4 className="product_title">{data.title}</h4>

                      <h5 className="product_name">{data.name}</h5>
                      <Rating />
                      <p className="product_price">${data.price}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
        <section className="shop_product_deal_sn">
          {ExclusiveItem.isSuccess &&
            ExclusiveItem.data.map((item) => {
              return (
                <div className="shop_product_deals_text" key={item.id}>
                  <div className="deals_first_section">
                    <h1>Exclusively Available on TechStore</h1>
                    <p id="deals_first_para">{item.name}</p>
                    <p id="deals_second_para">{item.desc}</p>
                    <button
                      className="shop_product_btn"
                      onClick={() => addToCart({ user, data: item })}
                    >
                      Buy Now!
                    </button>
                  </div>
                  <div className="deals_second_section">
                    <img
                      src={item.img}
                      alt={item.id}
                      className="deals_background_img"
                    />
                  </div>
                </div>
              );
            })}
        </section>
        <section className="news_sn">
          <h1 className="news_Header">
            Latest
            <span className="header_span"> News</span>
          </h1>
          <div className="blog_cn">
            {newsBlog.isSuccess &&
              newsBlog?.data.map((blog, i) => {
                return (
                  <div className="news_blog" key={blog.id}>
                    <img
                      src={blog?.img}
                      alt={blog?.id}
                      className="news_blog_img"
                    />
                    <h1 className="news_blog_title">{blog?.title}</h1>
                    <p className="news_blog_desc">
                      {blog?.description?.substring(0, 100)}
                    </p>
                    <Link to={"/Blog"}>
                      <button className="news_blog_btn">Read More</button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;
