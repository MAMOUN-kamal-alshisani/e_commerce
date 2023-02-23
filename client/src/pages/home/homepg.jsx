import "./scss/home.css";
import Header from "../../components/header/header";
import { useFetchItemsQuery } from "../../store/apis/itemApi";
import { useState, useEffect } from "react";
import HomeBody from "./homebody";
import Skeleton from "@mui/material/Skeleton";

function HomePage({ item }) {
  const { data, error, isLoading } = useFetchItemsQuery(item);
  const [cardItem, setCardItem] = useState([]);

  useEffect(() => {
    setCardItem(data?.slice(0, 4));
  }, [data]);

  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
        <Skeleton variant="text" sx={{ fontSize: "4rem" }} animation="wave" />
      </>
    );
  } else if (error) {
    content = alert("error fetching data... ");
  } else if (data) {
    content = (
      <div className="Home_Div">
        <div>
          <Header type="list" />
        </div>
        <HomeBody cardItem={cardItem} />
      </div>
    );
  }
  return (
    <div className="Home_Div">
      {/* <div>
        <Header type="list" />
      </div> */}

      <div>{content}</div>
    </div>
  );
}

export default HomePage;

// generate random data index
// let index = [];
// console.log(data);

// useEffect(() => {
// if (data) {
//   if (cardItem.length < 3) {
//     for (let i = 0; i < 3; i++) {
//       let random = Math.floor(Math.random() * data?.length);
//       if (!index.includes(random) && index.length <= 3) {
//         index.push(random);
//       }
//     }

//     index.map((item) => setCardItem((prev) => [...prev, data[item]]));
//   }
//   }
//   return () => {};
// });
