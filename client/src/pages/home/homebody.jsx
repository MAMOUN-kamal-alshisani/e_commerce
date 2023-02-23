import { Link } from "react-router-dom";

function HomeBody({ cardItem }) {
  return (
    <div className="homepage_container">
      <div className="featured_items">
        <h3>Featured Products</h3>
        <Link to={"/Shop"} className="featured_items_link">
          See More...
        </Link>
      </div>

      <div className="first_card_div">
        <div className="card">
          {cardItem?.map((data) => {
            return (
              <div className="container" key={data.id}>
                <div className="img_cn">
                  <img src={data.img[0]} alt={data.id} className="cardImg" />
                </div>
                <h3 className="card_title">{data.title}</h3>

                <h3 className="card_name">{data.name}</h3>
                <div className="itemDetails">
                  <h4 className="card_h3">${data.price}</h4>
                  <h4 className="card_Stock"> Stock left: {data.stock}</h4>
                </div>
                {/* <h3>{data.stock}</h3> */}
              </div>
            );
          })}
        </div>
      </div>

      <div className="homepage_second_div">
        <div className="second_div_textplace">
          <h1>why choose TechShop?</h1>
          <p>
            we provide with our customers with the best experience, as well as
            having wide range of products and items, we are proud to say that we
            have competing prices and discounts, and we provide customers with
            high level of security when it comes to delivery and information,
          </p>
        </div>

        <div className="second_div_imgplace">
          <img
            src="https://blog.ipleaders.in/wp-content/uploads/2021/07/E-Commerce..jpeg"
            alt="pic"
            className="homepage_section_img"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeBody;
