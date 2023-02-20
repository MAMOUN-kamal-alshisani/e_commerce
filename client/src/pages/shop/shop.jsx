import "./scss/shop.css";
import Card from "./card/card";
import Header from "../../components/header/header";
import Pagination from "../../components/pagination/pagination";
import { useFetchItemsQuery } from "../../store/apis/itemApi";
import { useState, useEffect } from "react";
import { cartActions } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
function Shop({ item }) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchItemsQuery(item);
  const [items, setItems] = useState(data);
  const allCategories = ["all", ...new Set(data?.map((item) => item.title))];

  useEffect(() => {
    console.log('sdsd');

    return()=> setItems(data)
  }, []);

  const searchedItems = (category) => {
   
    if (category === "all") {
      setItems(data);
      return;
    }
    if(!items){
      console.log('update');
      setItems(data);
    }
  
    const filtered = items?.filter((item) => item.title == category);
    setItems(filtered);
  };

 

  //// pagination code!!
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const cart = useSelector((state)=>{
  //   console.log(state.cart.cartData);
  // })

  const addToCart = (cart) => {
    dispatch(cartActions.addToCart(cart));
    console.log("item added");
  };
if(error){

  return 'error fetching data'
}
if(isLoading){

  return 'loading please wait'
}
  return (
    <div className="shop">
      <Header />

      <div className="inputItem_div">
        {allCategories?.map((category,i) => (
          <div className="filter_btn_div" key={i}>
            <button
              onClick={() => searchedItems(category)}
              className="filter_btn"
            >
              {category}
            </button>
          </div>
        ))}
      </div>
      <br />
      <br />

      <div className="shopList_Container">
        <div className="card_container">
          <Card currentPosts={currentPosts} addToCart={addToCart} />
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={items?.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Shop;
