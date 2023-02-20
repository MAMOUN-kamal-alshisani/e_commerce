import "./scss/home.css";
import Header from "../../components/header/header";
import { useFetchItemsQuery } from "../../store/apis/itemApi";
import { useState, useEffect } from "react";
// import Carousel from "../../components/carousel/carousel";
// import { useNavigate, Link } from "react-router-dom";
// import Skeleton from "../../components/loading_skele/Skeleton";
import HomeBody from "./homebody";
function HomePage({ item }) {
  const { data, error, isLoading } = useFetchItemsQuery(item);
  const [cardItem, setCardItem] = useState([]);
  let index = [];
  // console.log(data);
 
  useEffect(() => {
    if (data) {
      if (cardItem.length < 3) {
        for (let i = 0; i < 3; i++) {
          let random = Math.floor(Math.random() * data?.length);
          if (!index.includes(random) && index.length <= 3) {
            index.push(random);
          }
        }
  
        index.map((item) => setCardItem((prev) => [...prev, data[item]]));
      }
    }
    return () => {};
  });
  let content;
  if (isLoading) {
    content = "loading please wait...";
    // <Skeleton times={6} className="h-10 w-full" />
  } else if (error) {
    content = alert("error fetching data... ");
  } else if (data) {
    content = <HomeBody cardItem={cardItem} />;
  }
  return (
    <div className="Home_Div">
      <div>
        <Header type="list" />
      </div>

      <div>{content}</div>
    </div>
  );
}

export default HomePage;
