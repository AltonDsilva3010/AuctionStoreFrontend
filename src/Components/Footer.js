import React from "react";
import "./Footer.css";
import LogoImg from "../images/AuctionWebsiteLogowiCircle.png";

const Footer = () => {
  return (
    <div className="footer-cont">
      <div className="image-cont-footer">
        <img src={LogoImg} alt="Logo Image" />
      </div>
      <div className="designed-by">
        <h3>Demo website designed by Alton Dsilva</h3>
      </div>
      <div className="insta-link">
        <h3>
          Follow us on <a>Insta</a>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
