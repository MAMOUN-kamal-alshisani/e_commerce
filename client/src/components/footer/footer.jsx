import "./scss/footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
function Footer() {
  return (
    <footer className="footer">
      <section className="footerSn">
        <div className="siteDesc_block">
          E-commerce originated in a standard for the exchange of business
          documents, such as orders or invoices, between suppliers and their
          business customers, TechShop was put on motion under the intent of
          providing customers with best products effeciently.
        </div>
        <div className="footerIcon_block">
          <div className="iconCn_cn">
            <a
              href="https://m.me/mamoun.bursi"
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="links"
            >
              <FaFacebook id="facebook" className="footer_icon " />
            </a>
            <a
              href="  https://www.linkedin.com/in/mamounalshishani-350277210/"
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="links"
            >
              <FaLinkedin id="linkedin" className="footer_icon" />
            </a>
            <a
              href="https://github.com/MAMOUN-kamal-alshisani?tab=repositories"
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="links"
            >
              <FaGithubSquare id="github" className="footer_icon" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone+962786833117"
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="links"
            >
              <FaWhatsappSquare
                id="whatsapp"
                className="footer_icon"
                target={"_blank"}
                rel={"noopener noreferrer"}
              />
            </a>
            <a
              href="mailto:mamoun.bursi@yahoo.com"
              target={"_blank"}
              rel={"noopener noreferrer"}
              className="links"
            >
              <MdOutlineMail id="mail" className="footer_icon" />
            </a>
          </div>
          <div className="siteInfo_block">
            <h1 id="h1-s">TechStore</h1>
            <p id="p-s">Copyright &copy; Mamoun Alshishani</p>
          </div>
        </div>

        <div className="newsLetter_block">
          <h3 id="h3-n">TechStore Newsletters</h3>
          <div className="email_cn">
            <input
              type="text"
              placeholder="Your email address"
              className="email_input"
            />
            <button className="newsletter_btn">Sign-Up</button>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
