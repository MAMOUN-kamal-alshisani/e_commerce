import "./scss/shop.css";
import Header from "../../components/header/header";
import Pagination from "../../components/pagination/pagination";
import { useFetchItemsQuery } from "../../store/apis/itemApi";
import { useState, useEffect } from "react";
import { cartActions } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import ShopCard from "./parts/shopcard/shopcard";

function Shop({ item }) {
  const { data, error, isLoading } = useFetchItemsQuery(item);
  // const location = useLocation();
  const dispatch = useDispatch();

  const [items] = useState(data);
  const [filteredItems, setfilteredItems] = useState([]);

  const allCategories = ["All", ...new Set(data?.map((item) => item.title))];

  useEffect(() => {
    setfilteredItems(items);
  }, [items]);

  // useEffect(() => {

  //   // if (items?.length <= 0) {
  //   //   return setItems(data);
  //   // }
  //   if (location?.state?.search == "" || null) {
  //     const filtered = items?.filter(
  //       (item) => item.title == location.state.search
  //     );
  //     setItems(filtered);
  //   }
  // }, [items, data]);

  const searchedItems = (category) => {
    // filteredItems(data);
    if (category === "All") {
      setfilteredItems(data);
      return;
    }

    const filtered = data?.filter((item) => item.title === category);
    setfilteredItems(filtered);
    return;
  };

  //// pagination code!!
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredItems?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToCart = (cart) => {
    dispatch(cartActions.addToCart(cart));
  };


  if (error) {
    return "error fetching data";
  }
  if (isLoading) {
    return (
      <>
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
      </>
    );
  }

  // if (location.state.search !== "" && null) {
  //       const filtered = data?.filter(
  //         (item) => item.title == location.state.search
  //       );
  //       setfilteredItems(filtered);
  // }
  return (
    <div className="shop">
      <Header />

      <div className="inputItem_div">
        {allCategories?.map((category, i) => (
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
          <ShopCard currentPosts={currentPosts} addToCart={addToCart} />
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredItems?.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Shop;
