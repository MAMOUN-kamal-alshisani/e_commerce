import "./scss/shop.css";
import Pagination from "../../components/pagination/pagination";
import {
  useFetchItemsQuery,
  useFetchAllLatestItemsQuery,
} from "../../store/apis/itemApi";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "./parts/shopcard/card";
import Nav from "./parts/nav/nav";

function Shop({ item }) {
  const { data, error, isLoading } = useFetchItemsQuery(item);
  const latestItems = useFetchAllLatestItemsQuery();

  const [activateLink, setActivateLink] = useState(null);
  const [items] = useState(data);
  const [filteredItems, setFilteredItems] = useState(items);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredItems?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setFilteredItems(data);
  }, [data]);

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
  const itemsFilterHandler = (e, index) => {
    e.persist();
    setActivateLink(index);
    const filterID = e.target.id;
    let filteration = "";
    switch (filterID) {
      case "all":
        setFilteredItems(data);
        return;
      case "Electronics":
        filteration = data.filter((item) => item.category === "Electronics");
        setFilteredItems(filteration);
        return;
      case "Accessories":
        filteration = data.filter((item) => item.category === "Accessories");
        setFilteredItems(filteration);
        return;
      case "Latest":
        filteration = latestItems.data;
        setFilteredItems(filteration);
        break;
      default:
        return setFilteredItems(data);
    }
  };
  return (
    <div className="shop">
      <Nav
        setFilteredItems={setFilteredItems}
        items={data}
        setActivateLink={setActivateLink}
      />

      <div className="shopList_Container">
        <div className="card_container">
          <div className="filter_list">
            <div className="filter_product_type filter_cn">
              <button
                id="all"
                className={` ${activateLink === 1 ? "active" : "filter_link"}`}
                onClick={(e) => itemsFilterHandler(e, 1)}
              >
                All Products
              </button>

              <button
                id="Electronics"
                className={`${activateLink === 2 ? "active" : "filter_link"}`}
                onClick={(e) => itemsFilterHandler(e, 2)}
              >
                Electronics
              </button>
              <button
                id="Accessories"
                className={` ${activateLink === 3 ? "active" : "filter_link"}`}
                onClick={(e) => itemsFilterHandler(e, 3)}
              >
                Accessories
              </button>
            </div>

            <div className="filter_btn_container filter_cn">
              <button
                className={` ${activateLink === 4 ? "active" : "filter_link"}`}
                onClick={() => setActivateLink(4)}
              >
                Best seller
              </button>
              <button
                id="Latest"
                className={`${activateLink === 5 ? "active" : "filter_link"}`}
                onClick={(e) => itemsFilterHandler(e, 5)}
              >
                Latest
              </button>
              <button
                onClick={() => setActivateLink(6)}
                className={` ${activateLink === 6 ? "active" : "filter_link"}`}
              >
                Recommended
              </button>
            </div>
          </div>
          <Card currentPosts={currentPosts} />
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
