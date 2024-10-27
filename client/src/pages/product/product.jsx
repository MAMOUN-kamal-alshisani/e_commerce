import { useLocation } from "react-router-dom";
import { useFetchItemByIdQuery } from "../../store/apis/itemApi";
import { ImCancelCircle } from "react-icons/im";
import { useAddQuantityToCartMutation } from "../../store/apis/cartApi";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import "./scss/product.css";
import { useEffect, useState } from "react";
import Rating from "../../components/star/rating";
import "react-photo-view/dist/react-photo-view.css";
import Cookies from "universal-cookie";
function Product() {
  const Location = useLocation();
  const ProductId = Location.pathname.split("/")[2];
  const { data, isSuccess } = useFetchItemByIdQuery(ProductId);
  const [dataSpecialGrading, setDataSpecialGrading] = useState("");
  const [addToCart, addToCartResult] = useAddQuantityToCartMutation();
  const [stock, SetStock] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productAddStatus, setProductAddStatus] = useState("");
  const [imgMd, setImgMd] = useState("");
  const [showMd, setShowMd] = useState(false);
  const user = new Cookies().get("user");
  const handleImgMd = (e) => {
    setShowMd(true);
    setImgMd(e.target.src);
  };

  const handleRightArrowImgChange = (e) => {
    let index = 0;
    if (data?.img.includes(imgMd)) {
      index = data?.img.indexOf(imgMd) + 1;
    }
    setImgMd(data?.img[index]);
    if (index > data?.img.length) {
      setImgMd(data?.img[0]);
    }
  };
  const handleLeftArrowImgChange = (e) => {
    let index = 0;
    if (data?.img.includes(imgMd)) {
      index = data?.img.indexOf(imgMd) - 1;
    }
    setImgMd(data?.img[index]);
    if (index < 0) {
      setImgMd(data?.img[data?.img.length - 1]);
    }
  };
  useEffect(() => {
    //// set product grade
    if (data?.exclusive) {
      setDataSpecialGrading("Exclusive");
    } else if (data?.featured) {
      setDataSpecialGrading("Featured");
    } else {
      setDataSpecialGrading("Latest");
    }
    //// set if product is in stock or not

    if (data?.stock > 0) {
      SetStock("in stock");
    } else {
      SetStock("out of stock");
    }
  }, [data]);

  useEffect(() => {
    const regex = /[A-Z]/gim;
    if (quantity.toString().match(regex)) {
      setQuantity(0);
    }

    if (quantity < 0) {
      setQuantity(0);
    }
  }, [quantity, setQuantity]);

  useEffect(() => {
    const product_status_paragraph = document.querySelector(".product_status");
    const addBtn = document.querySelector(".addToCart_btn");

    if (addToCartResult.isSuccess) {
      product_status_paragraph.style.color = "green";
      addBtn.disabled = true;
      setProductAddStatus("product added");
      setTimeout(() => {
        setProductAddStatus("");
        addBtn.disabled = false;
      }, 3000);
    } else if (addToCartResult.isError) {
      product_status_paragraph.style.color = "red";
      addBtn.disabled = true;
      setProductAddStatus("failed to add");
      setTimeout(() => {
        setProductAddStatus("");
        addBtn.disabled = false;
      }, 3000);
    }
  }, [addToCartResult.isError, addToCartResult.isSuccess]);
  return (
    <>
      <div className="productPg">
        {showMd && (
          <div className="img_model">
            <ImCancelCircle
              className="md_icon"
              onClick={() => setShowMd(false)}
            />
            <div className={`img_md_cn`}>
              <button
                className="md_btn"
                onClick={() => handleLeftArrowImgChange()}
              >
                <FaRegArrowAltCircleLeft />
              </button>
              <img src={imgMd} alt="" className="img_md" />
              <button
                className="md_btn"
                onClick={() => handleRightArrowImgChange()}
              >
                <FaRegArrowAltCircleRight />
              </button>
            </div>
          </div>
        )}
        <div className="product">
          <div className="img_cn">
            <section className="main_img_section">
              {isSuccess && (
                <img
                  src={data?.img[0]}
                  alt=""
                  className="main_img"
                  onClick={(e) => handleImgMd(e)}
                />
              )}
            </section>
            <section className="secondary_imgs_section">
              {isSuccess &&
                data.img.slice(1).map((src, i) => {
                  return (
                    <img
                      src={src}
                      alt={i}
                      className="secondary_img"
                      onClick={(e) => handleImgMd(e)}
                    />
                  );
                })}
            </section>
          </div>

          <div className="product_details">
            <div className="product_grading_cn">
              <span>{dataSpecialGrading}</span>
              <span>{stock}</span>
            </div>
            <div className="product_title_cn">
              <h1>{data?.name}</h1>
            </div>
            <div className="product_price_cn">
              <p>
                <sup>$</sup>
                {data?.price}
              </p>
            </div>
            <Rating />
            <div className="product_description_cn">
              <h3>Product Details</h3>
              <p>{data?.desc}</p>
            </div>

            <div className="addToCart_cn">
              <div className="product_quantity_cn">
                <button
                  onClick={() => setQuantity((prev) => --prev)}
                  className="item_btn symbol_btn"
                >
                  -
                </button>
                <input
                  className="item_btn quantity_input"
                  type="text"
                  size={1}
                  name="quantity"
                  maxlength="4"
                  pattern={"[0-9]+"}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={"0"}
                />
                <button
                  onClick={() => setQuantity((prev) => ++prev)}
                  className="item_btn symbol_btn"
                  data-testid="counter"
                >
                  +
                </button>
              </div>
              <div className="product_addToCart_cn">
                <button
                  className="addToCart_btn"
                  onClick={() => {
                    addToCart({ user, data, quantity: quantity });
                  }}
                >
                  add to cart
                </button>
              </div>
              <p className="product_status">{productAddStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
