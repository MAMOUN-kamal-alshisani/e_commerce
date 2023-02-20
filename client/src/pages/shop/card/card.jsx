import "./scss/card.css";
import { useDispatch, useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
function Card({ currentPosts, addToCart }) {
  // console.log(currentPosts);

  //   const cart = useSelector((state)=>{

  //     // console.log(state.cart.cartData);
  // console.log(state.cart.cartData);
  //     return state.cart.cartData
  //   })

  return (
    <div className="card">
      {currentPosts?.map((data) => {
        return (
          <div className="container" key={data.id}>
            <div className="img_cn">
              <img src={data.img[0]} alt={data.title} className={"cardImg"} />
            </div>
            <h3 className="card_title">{data.title}</h3>

            <h3 className="card_name">{data.name}</h3>
            <p>{data.desc}</p>
            <div className="itemDetails">
              <h4 className="card_h3">${data.price}</h4>
              <h4 className="card_Stock"> Stock left: {data.stock} </h4>
            </div>
            {/* <h3>{data.stock}</h3> */}

            <div className="add_btn_div">
              <button onClick={() => addToCart(data)} className="add_btn">
                <TiShoppingCart />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
