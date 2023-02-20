import "./scss/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="items_div">
          <div className="firstDiv">
            <h1 className="firstDiv_header">TechShop</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              animi obcaecati nihil incidunt fuga hic itaque velit at
              consequuntur, iste repellat, quaerat possimus, quae id tempora
              expedita molestiae eligendi ipsam.
            </p>
          </div>

          <div className="secondDiv">
            <h1>About us</h1>

            <ul className="footer_list">
              <li className="footer_item">
                <a href="#" className="footer_linktag">Careers</a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_linktag">Our_Store</a>
              </li >
              <li className="footer_item">
                <a href="#" className="footer_linktag">Our_Care</a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_linktag">Terms&Conditions</a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_linktag">PrivacyPolicy</a>
              </li>
            </ul>
          </div>

          <div className="thirdDiv">

            <h1>Contact Us</h1>
            <p>as-sukhnah/az-zarqa-jordan</p>
            <p>Email: mamoun.bursi@yahoo.com</p>
            <p>Phone: 0778713407</p>
            <p></p>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
