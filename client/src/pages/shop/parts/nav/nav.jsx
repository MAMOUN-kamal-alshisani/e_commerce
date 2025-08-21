import "./scss/nav.css";
import { IoMenuOutline } from "react-icons/io5";
import { FcCollapse } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import { IoIosPricetags } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { TbHexagonLetterA } from "react-icons/tb";
import { TbHexagonLetterE } from "react-icons/tb";

import {
  useFetchElectronicItemsQuery,
  useFetchAccessorieItemsQuery,
  useFetchItemsByPriceQuery,
  useFetchSearchedItemsQuery,
} from "../../../../store/apis/itemApi";
import { useState, useEffect } from "react";
export default function Nav({ setFilteredItems, items, setActivateLink }) {
  const [electronicsList, setElectronicsList] = useState([]);
  const [accessoriesList, setAccessoriesList] = useState([]);
  const [showElectroList, setShowElectroList] = useState(false);
  const [showAccessoList, setShowAccessoList] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [minPriceRange, setMinPriceRange] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState(0);
  const [currentPriceRange, setCurrentPriceRange] = useState(0);
  const [searchInput, setSearchInput] = useState();

  const electricsCategory = useFetchElectronicItemsQuery();
  const accessoriesCategory = useFetchAccessorieItemsQuery();
  const ItemsByPrice = useFetchItemsByPriceQuery();
  const SearchedItem = useFetchSearchedItemsQuery(searchInput);
  useEffect(() => {
    /// fetch api data and take min&max price for range type input ///
    const numArr = [];
    ItemsByPrice.isSuccess &&
      ItemsByPrice?.data?.map((item) => numArr.push(Number(Math.round(item))));
    setMinPriceRange(Math.min(...numArr));
    setMaxPriceRange(Math.max(...numArr));
  }, [ItemsByPrice.isSuccess, ItemsByPrice.data]);

  useEffect(() => {
    /// list items that are in electrics category
    if (electricsCategory.isSuccess) {
      setElectronicsList([
        ...new Set(
          electricsCategory?.data?.map((item) => {
            return item.title;
          })
        ),
      ]);
    }
    /// list items that are in accessory category
    if (accessoriesCategory.isSuccess) {
      setAccessoriesList([
        ...new Set(
          accessoriesCategory?.data?.map((item) => {
            return item.title;
          })
        ),
      ]);
    }
  }, [electricsCategory, accessoriesCategory]);

  useEffect(() => {
    /// hide price&search inputs if sidebar is not shown
    if (toggleSideBar) {
      setShowPriceRange(false);
      setShowSearchInput(false);
    }
  }, [toggleSideBar, setToggleSideBar]);

  const filterByListHandler = (e) => {
    const filteredItem = items.filter(
      (item) => item.title === e.target.innerHTML
    );
    setFilteredItems(filteredItem);
    setActivateLink(null);
  };
  const handlePriceRange = (e) => {
    const priceLbl = document.querySelector(".price_lbl");
    priceLbl.innerHTML = `$0 - $${e.target.value}`;
    setCurrentPriceRange(e.target.value);
  };
  const filterPriceHandler = () => {
    const filterItemByPrice = items.filter((item) => {
      return Number(item.price) <= currentPriceRange;
    });
    setFilteredItems(filterItemByPrice);
  };

  const handleSearchedItem = () => {
    setFilteredItems(SearchedItem?.data);
  };
  return (
    <nav className={`navbar ${toggleSideBar && "mini_navbar"}`}>
      <div className="header_logo_menu">
        <h3
          onClick={() =>
            toggleSideBar === true ? setToggleSideBar(!toggleSideBar) : "none"
          }
        >
          T<span>echStore</span>
        </h3>

        <button
          className="sideBar_btn"
          onClick={() => setToggleSideBar(!toggleSideBar)}
        >
          <IoMenuOutline className="logo_menu_icon" />
        </button>
      </div>

      <div className="menu_product_icons">
        <button
          className="price_range_btn"
          onClick={() => {
            toggleSideBar === true
              ? setToggleSideBar(false)
              : setShowPriceRange(!showPriceRange);
          }}
        >
          <IoIosPricetags className="menu_list_icon" />
        </button>

        <button
          className="search_btn"
          onClick={() => {
            toggleSideBar === true
              ? setToggleSideBar(false)
              : setShowSearchInput(!showSearchInput);
          }}
        >
          <IoIosSearch className="menu_list_icon" />
        </button>
      </div>

      <div className="menu_product_items">
        {showPriceRange && (
          <div className="price_range_cn">
            <div className="price_lbl_cn">
              <p className="lbl-p">price</p>
              <label className="price_lbl">$0 - ${minPriceRange}</label>
            </div>

            <div className="price_input_cn">
              <input
                name="price_range"
                id="price_input"
                type="range"
                step={1}
                max={maxPriceRange || 10}
                min={minPriceRange || 0}
                onChange={(e) => handlePriceRange(e)}
              />
              <input
                type="submit"
                id="range_sb"
                className="input_submit"
                value="Go"
                onClick={filterPriceHandler}
              />
            </div>
          </div>
        )}

        {showSearchInput && (
          <div className="search_input_cn">
            <input
              type={"search"}
              id="search_input"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <input
              type={"submit"}
              id="search_sb"
              className="input_submit"
              value={"Search"}
              onClick={() => handleSearchedItem()}
            />
          </div>
        )}
      </div>

      <div className="menu_list">
        <h2 className="category_header">
          <BiCategory
            className="category_header_icon"
            onClick={() => setShowCategory(!showCategory)}
          />
          <span>Categories</span>
        </h2>
        <div
          className={`category_menu_cn ${
            showCategory && "show_category_menu_cn"
          }`}
        >
          <ul className="products_cn main-ul">
            <li
              className="main-li"
              onClick={() =>
                toggleSideBar === true
                  ? setToggleSideBar(false)
                  : setShowElectroList(!showElectroList)
              }
            >
              <TbHexagonLetterE className="category_icon" />
              <span className="category-option">
                Electornics{" "}
                {showElectroList == false ? (
                  <FcCollapse className="option_icon" />
                ) : (
                  <FcCollapse className="option_icon fliped_icon" />
                )}
              </span>{" "}
            </li>
            <ul
              className={`products_list ${
                toggleSideBar === true
                  ? "nest_li"
                  : showElectroList && "nest_li"
              }`}
            >
              {electricsCategory.isSuccess == true ? (
                electronicsList.map((item, i) => {
                  return (
                    <li
                      onClick={(e) => {
                        filterByListHandler(e);
                      }}
                      key={i}
                    >
                      {item}
                    </li>
                  );
                })
              ) : (
                <>
                  <li>pc</li>
                  <li>labtop</li>
                  <li>camera</li>
                  <li>phone</li>
                  <li>tv</li>
                </>
              )}
            </ul>
          </ul>
          <ul className="accessories_cn main-ul">
            <li
              className="main-li"
              onClick={() =>
                toggleSideBar === true
                  ? setToggleSideBar(false)
                  : setShowAccessoList(!showAccessoList)
              }
            >
              <TbHexagonLetterA className="category_icon" />
              <span className="category-option">
                Accessories{" "}
                {showAccessoList == false ? (
                  <FcCollapse className="option_icon" />
                ) : (
                  <FcCollapse className="option_icon fliped_icon" />
                )}
              </span>{" "}
            </li>
            <ul
              className={`accessories_list ${
                toggleSideBar === true
                  ? "nest_li"
                  : showAccessoList && "nest_li"
              }`}
            >
              {accessoriesCategory.isSuccess == true ? (
                accessoriesList?.map((item, i) => {
                  return (
                    <li
                      key={i}
                      onClick={(e) => {
                        filterByListHandler(e);
                      }}
                    >
                      {item}
                    </li>
                  );
                })
              ) : (
                <>
                  <li>mouse</li>
                  <li>keyboard</li>
                  <li>headphone</li>
                  <li>phone</li>
                  <li>tv</li>
                </>
              )}
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
}
