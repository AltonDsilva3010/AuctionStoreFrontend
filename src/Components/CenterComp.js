import React from "react";
import "./CenterComp.css";
import LogoImg from "../images/AuctionWebsiteLogowiCircle.png";

const CenterComp = () => {
  return (
    <div className="cent-cont">
      <div className="image-cont">
        <img src={LogoImg} alt="Logo Image" />
      </div>
      <div className="text-cont">
        <h2>
          Steps:
          <br /> 1. In your Browser Wallet Extension select the Sepolia Test
          Network and Connect to your wallets.
          <br /> 2. If you don’t have enough funds in your wallet then go to the
          Sepolia faucet and get some :)
          <br /> 3. Try Adding a Product.
          <br /> 4. Try Bidding on a Product.
          <br /> 5. Try Ending the auction on a Product.
        </h2>
      </div>
    </div>
  );
};

export default CenterComp;
