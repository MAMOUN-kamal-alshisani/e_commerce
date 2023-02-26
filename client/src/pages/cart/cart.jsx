/*eslint-disable no-eval */
import "./scss/cart.css";
import Header from "../../components/header/header";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slices/cartSlice";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import { CgSpinner } from "react-icons/cg";

function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage?.getItem("cart"));

  const cart = useSelector((state) => {
    return state?.cart;
  });
  // console.log(cart);
  const handleMinusQuantity = (item) => {
    dispatch(cartActions.decreaseQuantity(item));
  };
  const handleBlusQuantity = (item) => {
    dispatch(cartActions.addToCart(item));
  };
  const handleRemoveItem = (item) => {
    dispatch(cartActions.removeFromCart(item));
  };
  const checkoutHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      return setShowModal(!showModal);
    }, 3000);
  };
  useEffect(() => {
    dispatch(cartActions.getTotals());
  }, [cart, dispatch]);

  return (
    <>
      <Header />

      <div className="cart" data-testid="main_container">
        <div className="cart_cr">
          <div className="cart_item_pt1">
            <h1>Shopping Cart</h1>
            <h1>{cartItems?.length} Items </h1>
          </div>

          <div className="cart_list">
            <div className="cart_item_pt2">
              <h3>Product Details</h3>

              <div className="product_details_div" data-testid="listItemContainer">
                {/* <h2>Product Details</h2> */}
                {cartItems?.map((item, index) => {
                  return (
                    <div className="item_card" key={index}>
                      <div className="card_list">
                        <div className="cardImg_div">
                          <img
                            src={item?.img[0]}
                            alt="pic"
                            style={{ width: "150px", height: "120px" }}
                          />
                        </div>

                        <div className="cart_item_info_div">
                          <h4 className="cart_name">{item?.name}</h4>
                          <h5 className="cart_title">{item?.title}</h5>

                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="remove_item_btn"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cart_item_pt3">
              <h3>Quantity</h3>
              
              <div className="product_details_div">
                {cartItems?.map((item, index) => {
                  return (
                    <div className="item_second_div" key={index}>
                      <button
                        onClick={() => handleMinusQuantity(item)}
                        className="item_btn symbol-btn"
                      >
                        -
                      </button>
                      <button className="item_btn quantity-btn">
                        {item.itemQuantity}
                      </button>
                      <button
                        onClick={() => handleBlusQuantity(item)}
                        className="item_btn symbol-btn"
                        data-testid ="counter"
                      >
                        +
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cart_item_pt4">
              <h3>price</h3>
              <div className="product_details_div">
                {cartItems?.map((item, index) => {
                  return (
                    <div className="item_third_div" key={index}>
                      <p>${Math.ceil(Math.abs(item?.price))} </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="cart_item_pt5">
              <h3>Total</h3>
              <div className="product_details_div">
                {cartItems?.map((item, index) => {
                  return (
                    <div className="item_forth_div" key={index}>
                      <p>
                        {/* { allTotalsPrice.push(Math.ceil(eval(item.price + "*" + item.itemQuantity)))} */}
                        ${Math.ceil(eval(item.price + "*" + item.itemQuantity))}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="cart_form_section">
          <div className="summary_div">
            <h1>Order Summary</h1>
          </div>

          <div className="ship_details_pt1">
            <h3>Items {cartItems?.length}</h3>
            <h3>${cart.cartTotal}</h3>
          </div>

          <div className="ship_details_pt2">
            <div className="ship_input">
              <label htmlFor="Shipping">Shipping</label>
              <input
                type="text"
                name="Shipping"
                placeholder="starting Delivery at $5.00"
              />
            </div>
            <div className="ship_input">
              <label htmlFor="Shipping">PROMO CODE</label>
              <input
                type="text"
                name="Shipping"
                placeholder="ENTER PROMO CODE"
              />
              <button className="promo_btn" disabled>
                APPLY
              </button>
            </div>
          </div>
          <div className="ship_details_pt3">
            <span>Total Cost</span>
            <span>${cart.cartTotal}</span>
          </div>
          <div className="checkout_div">
            <button className="checkout_btn" onClick={checkoutHandler}>
              CheckOut {isLoading && <CgSpinner className="CgSpinner"/>}
            </button>

            <Modal onShow={showModal} onClose={() => setShowModal(false)}>
              <div className="checkout_data_container">
                <p>cart items have successfully been placed on order list!</p>

                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.l5Qqm9adevg4VKQ1SERzNgHaDA&pid=Api&P=0"
                  alt="checkout"
                  className="cart_checkout_img"
                />
                <div className="checkout_data">
                  <div className="itemHeader">ordered Cart Items:</div>
                  <ol>
                    {cart?.cartData?.map((item, index) => {
                      return (
                        <li className="checkout_list_items" key={item.id}>
                          <div className="item_div">
                            <span>{item?.name}</span>
                            <span>price: ${item?.price}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  <div className="checkout_total_div">
                    <h5>Total of ( ${cart.cartTotal} )</h5>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
