import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useState } from "react";
import Favs from "../../pages/favs/favs";
import { useEffect } from "react";
function Layout() {
  const [showMd, setShowMd] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");

    if (showMd === true) {
      body.style.position = "fixed";
    } else {
      body.style.position = "unset";
    }
  }, [showMd, setShowMd]);
  return (
    <>
      <Header showMd={showMd} setShowMd={setShowMd} />
      {showMd && <Favs showMd={showMd} setShowMd={setShowMd} />}
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
