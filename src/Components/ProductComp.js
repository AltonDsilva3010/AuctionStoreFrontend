import React, { useEffect, useState } from "react";
import "./ProductComp.css";
import EpochCalc from "./EpochCalc";
import AppleImage from "../images/ApplePNG.png";
import Modal from "./Modal";
const { ethers } = require("ethers");

const ProductComp = ({
  productId,
  name,
  description,
  auctionEndTime,
  highestBid,
  highestBidder,
  state,
}) => {
  const { contract } = state;
  const [bidAmount, setBidAmount] = useState("");
  const [compleStat, setCompleStat] = useState(false);

  const makeBid = async () => {
    console.log("inseid function 2");
    const { contract } = state;
    try {
      if (contract) {
        const result = await contract.placeBid(productId, {
          value: ethers.parseEther(bidAmount),
        });
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EndAuction = async () => {
    const { contract } = state;
    try {
      const result = await contract.endAuction(productId);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCompleStatus = () => {
      const currentTimeEpoch = Math.floor(Date.now() / 1000);
      if (currentTimeEpoch - auctionEndTime.toString() > 0) {
        setCompleStat(true);
      }
    };
    getCompleStatus();
  }, []);

  return (
    <div className="prod-comp">
      <img src={AppleImage} alt="product-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <h4>
        Current Highest Bid:{" "}
        <span style={{ float: "right" }}>
          {highestBid.toString() / 1000000000000000000} ETH
        </span>
      </h4>
      <h4>
        End Time:
        <span style={{ float: "right" }}>
          {EpochCalc(auctionEndTime.toString())}
        </span>
      </h4>
      <h4>
        Highest Bidder:{" "}
        <span style={{ float: "right" }}>
          {"....." + highestBidder.slice(-10)}
        </span>
      </h4>
      {compleStat && (
        <h4>
          Status:<span style={{ float: "right" }}>Completed</span>
        </h4>
      )}

      {!compleStat && (
        <div>
          <input
            type="number"
            placeholder="Enter bid amount (in Ether)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button onClick={makeBid}>Place Bid</button>
        </div>
      )}

      <Modal />
    </div>
  );
};

export default ProductComp;
