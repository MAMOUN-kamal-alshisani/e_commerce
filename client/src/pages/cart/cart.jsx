import "./scss/cart.css";
import { useEffect, useState } from "react";
import {
  useFetchCartQuery,
  useFetchCartCountQuery,
  useRemoveFromCartMutation,
  useDecreaseUserCartMutation,
  useIncreaseUserCartMutation,
} from "../../store/apis/cartApi";
import { IoBagRemoveOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import Cookies from "universal-cookie";
function Cart() {
  const user = new Cookies().get("user");
  const [removeItem] = useRemoveFromCartMutation();
  const [decreaseOneCartItem] = useDecreaseUserCartMutation();
  const [increaseOneCartItem] = useIncreaseUserCartMutation();
  const { data, isLoading } = useFetchCartQuery(user);
  const cartQuantity = useFetchCartCountQuery(user);

  const [totalCartPrice, setTotalCartPrice] = useState([0]);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingCountry, setShippingCountry] = useState("");

  useEffect(() => {
    switch (shippingCountry) {
      case "Jordan":
        return setShippingCost(0);
      case "UnitedStates":
        return setShippingCost(100);
      case "Japan":
        return setShippingCost(40);
      case "Dubai":
        return setShippingCost(70);
      default:
        return setShippingCost(0);
    }
  }, [shippingCountry]);

  useEffect(() => {
    setTotalCartPrice([]);
    data?.map((item) => {
      return setTotalCartPrice((prev) => [
        ...prev,
        eval(Number(item?.item?.price) + "*" + item?.quantity),
      ]);
    });
  }, [data, decreaseOneCartItem, increaseOneCartItem]);
  return (
    <div className="cart" data-testid="main_container">
      <div className="cart_cn">
        <section className="cart_items_section">
          <table>
            <thead>
              <tr className="label_header_cn">
                <th>Product</th>
                <th>Quantity</th>
                <th>price</th>
                <th>Total</th>
                <th>remove</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr className="cards_row" key={item.item.id + index}>
                    <td className="item_card">
                      <div className="card_list">
                        <div className="cardImg_cn">
                          <img src={item.item?.img[0]} alt="pic" />
                        </div>

                        <div className="cart_item_info_cn">
                          <h4 className="cart_name">{item?.item?.name}</h4>
                        </div>
                      </div>
                    </td>

                    <td className="item_quantity_cn">
                      <button
                        onClick={() =>
                          decreaseOneCartItem({ user, item: item?.item })
                        }
                        className="item_btn symbol-btn"
                      >
                        -
                      </button>
                      <button className="item_btn quantity-btn">
                        {item?.quantity}
                      </button>
                      <button
                        onClick={() =>
                          increaseOneCartItem({ user, item: item?.item })
                        }
                        className="item_btn symbol-btn"
                        data-testid="counter"
                      >
                        +
                      </button>
                    </td>

                    <td className="item_price_cn">
                      ${Math.round(Number(item?.item?.price))}
                    </td>

                    <td className="item_total_cn">
                      <p>
                        $
                        {Math.round(
                          eval(Number(item?.item?.price) + "*" + item?.quantity)
                        )}
                      </p>
                    </td>

                    <td className="item_remove_cn">
                      <button
                        onClick={() => removeItem({ user, item: item?.item })}
                        className="remove_item_btn"
                      >
                        <IoBagRemoveOutline />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="cart_form_section">
          <div className="summary_div">
            <h1>Order Summary</h1>
          </div>

          <div className="ship_details_pt1">
            <span className="details_label">Items Quantity </span>
            <span>{cartQuantity?.data?.count}</span>
          </div>

          <div className="ship_details_pt2">
            <div className="ship_input">
              <label htmlFor="shipping">Shipping</label>
              <select
                name="shipping"
                id="shipping_select"
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                <option value="Jordan">Jordan</option>
                <option value="UnitedStates">United States</option>
                <option value="Japan"> Japan</option>
                <option value="Dubai"> Dubai</option>
              </select>
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
            <span className="details_label">Items Cost</span>
            <span>${Math.round(eval(totalCartPrice.join("+"))) || "$0"}</span>
          </div>
          <div className="ship_details_pt4">
            <span className="details_label">shipping</span>
            <span>${shippingCost}</span>
          </div>
          <div className="ship_details_pt5">
            <span className="details_label">Total</span>
            <span>
              ${Math.round(eval(totalCartPrice.join("+") + "+" + shippingCost))}
            </span>
          </div>
          <div className="checkout_div">
            <button className="checkout_btn">
              CheckOut {isLoading && <CgSpinner className="CgSpinner" />}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cart;
