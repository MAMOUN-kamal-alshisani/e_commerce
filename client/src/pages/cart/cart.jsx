import "./scss/cart.css";
import Header from "../../components/header/header";
// import {useFetchCartQuery} from '../../store/apis/cartApi'
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slices/cartSlice";
import { useEffect, useState } from "react";
function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);

  // const [itemTotal,setItemTotal] = useState([])
  // const allTotalsPrice= []
  console.log(totalPrice);
  // console.log(allTotalsPrice);
  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage?.getItem("cart"));

  const cart = useSelector((state) => {
    return state.cart;
  });
  console.log(cart);
  const handleMinusQuantity = (item) => {
    dispatch(cartActions.decreaseQuantity(item));
  };
  const handleBlusQuantity = (item) => {
    dispatch(cartActions.addToCart(item));
  };
  const handleRemoveItem = (item) => {
    dispatch(cartActions.removeFromCart(item));
  };

  useEffect(() => {
    dispatch(cartActions.getTotals());
  }, [cart, dispatch]);

  return (
    <>
      <Header />

      <div className="cart">
        <div className="cart_cr">
          <div className="cart_item_pt1">
            <h1>Shopping Cart</h1>
            <h1>{cartItems.length} Items </h1>
          </div>

          <div className="cart_list">
            <div className="cart_item_pt2">
              <h3>Product Details</h3>

              <div className="product_details_div">
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

                          <button onClick={() => handleRemoveItem(item)} className="remove_item_btn">
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
                    <div className="item_second_div">
                      <button
                        onClick={() => handleMinusQuantity(item)}
                        className="item_btn symbol-btn"
                      >
                        -
                      </button>
                      <button className="item_btn quantity-btn">{item.itemQuantity}</button>
                      <button
                        onClick={() => handleBlusQuantity(item)}
                        className="item_btn symbol-btn"
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
                    <div className="item_third_div">
                      <p>{Math.ceil(eval(item.price))} </p>
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
                    <div className="item_forth_div">
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
            <h3>Items {cartItems.length}</h3>
            <h3>${cart.cartTotal}</h3>
          </div>

          <div className="ship_details_pt2">
<div className="ship_input">
<label htmlFor="Shipping">Shipping</label>
<input type="text" name="Shipping" placeholder="starting Delivery at $5.00"/>
</div>
<div className="ship_input">
<label htmlFor="Shipping">PROMO CODE</label>
<input type="text" name="Shipping" placeholder="ENTER PROMO CODE"/>
<button className="promo_btn" disabled>APPLY</button>
</div>

          </div>


          <div className="ship_details_pt3">
            <span>Total Cost</span>
            <span>${cart.cartTotal}</span>
          </div>

          <div className="checkout_div">
            <button className="checkout_btn">CheckOut</button>
          </div>
        </div>

        {/* <div className="cart_ft_section">
          <div className="cart_details_cr">

            <div className="cart_header_pt1">
              <h1>Shopping Cart</h1>
              <h1>Cart Items: {cartItems.length}</h1>
            </div>

            <div className="cart_cardheader_pt2">
              
            <h2 id="product_details_header">Product Details</h2>
              <h2>Quantity</h2>
              <h2>price</h2>
              <h2>Total</h2>

            </div>
            <div className="cart_card_pt3">

            {cartItems?.map((item, index) => {
              return (
                <div className="item_card" key={index}>

                  <div className="card_list">

                    <div className="cardImg_div">
                    <img
                      src={item?.img[0]}
                      alt="pic"
                      style={{ width: "150px" }}
                    />
                    </div>
                  

                    <div className="cart_item_info_div">
                    <h3 className="cart_name">{item?.name}</h3>
                      <h4 className="cart_title">{item?.title}</h4>
                   
                      <button onClick={()=>handleRemoveItem(item)}>remove</button>
                    </div>

                  </div>

                  <div className="item_second_div">
                    <button onClick={() => handleMinusQuantity(item)} className="item_btn">-</button>
                    <button className="item_btn">{item.itemQuantity}</button>
                    <button onClick={() => handleBlusQuantity(item)} className="item_btn">+</button>
                  </div>

                  <div className="item_third_div">
                
                    <p>{Math.ceil(eval(item.price))} </p>
                  </div>

                  <div className="item_forth_div">
                    <p>
                      {Math.ceil(eval(item.price + "*" + item.itemQuantity))}{" "}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="cart">
        <div className="cart_section">
          <div className="cart_header">
            <h1>Shopping Cart</h1>
            <h1>Cart Items: {cartItems.length}</h1>
          </div>
          <div className="cart_container">
            <div className="details_header_div">
              <h2>Product Details</h2>
              <h2>Quantity</h2>
              <h2>price</h2>
              <h2>Total</h2>
            </div>

            {cartItems?.map((item, index) => {
              return (
                <div className="item_card" key={index}>
                  <div className="card_list">
                    <img
                      src={item?.img[0]}
                      alt="pic"
                      style={{ width: "150px" }}
                    />

                    <div className="cart_item_info_div">
                      <h2 className="cart_title">{item?.title}</h2>
                      <h4 className="cart_name">{item?.name}</h4>
                    </div>

                  </div>

                  <div className="item_second_div">
                    <button onClick={() => handleMinusQuantity(item)} className="item_btn">-</button>
                    <button className="item_btn">{item.itemQuantity}</button>
                    <button onClick={() => handleBlusQuantity(item)} className="item_btn">+</button>
                  </div>

                  <div className="item_third_div">
                
                    <p>{Math.ceil(item.price)} </p>
                  </div>

                  <div className="item_forth_div">
                    <p>
                      {Math.ceil(eval(item.price + "*" + item.itemQuantity))}{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Cart;
