import "./App.css";
import abi from "./contracts/AuctionStore.json";
import { useState, useEffect } from "react";
import ProductComp from "./Components/ProductComp";
import AuctionWebLogo from "./images/AuctionWebsiteLogowoCircle.png";
import CenterComp from "./Components/CenterComp";
import Footer from "./Components/Footer";
const { ethers } = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x542910558f0B1493DAe39f620541EF0d5b5428A7";
      const contractABI = abi.abi;
      try {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      const { contract } = state;
      if (contract) {
        const result = await contract.listAllProducts();
        setAllProducts(result);
      }
    };
    getAllProducts();
  }, [state]);

  const addProduct = async () => {
    console.log("inseid function 2");
    const { contract } = state;
    if (contract) {
      const result = await contract.createProduct("Wheat", "Grain", 25);
      console.log(result);
    }
  };

  const auctionEnd = async () => {
    const { contract } = state;
    if (contract) {
      const result = await contract.endAuction(1);
      console.log(result);
    }
  };

  const handleClick = () => {
    // Toggle the visibility on click
    setIsVisible(!isVisible);
  };

  return (
    <div className="App">
      <nav class="navbar navbar-expand-xl">
        <div class="container-fluid">
          <a class="logo" href="/">
            <img src={AuctionWebLogo} alt="DER PREMIER AUKTIONATOR" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="nav navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" onClick={handleClick}>
                  See-Products
                </a>
              </li>
              <li
                class="nav-item"
                style={{ display: state.provider ? "none" : "block" }}
              >
                <a class="nav-link">Connect-Wallet</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="center-container">
        <div style={{ display: isVisible ? "none" : "block" }}>
          <CenterComp />
        </div>
        <div style={{ display: !isVisible ? "none" : "block" }}>
          <div className="all-prod">
            {allproducts.map((prod, index) => {
              return (
                <ProductComp
                  key={index}
                  productId={prod.productId}
                  name={prod.name}
                  auctionEndTime={prod.auctionEndTime}
                  description={prod.description}
                  highestBid={prod.highestBid}
                  highestBidder={prod.highestBidder}
                  state={state}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
      {/* <div>
        <button onClick={addProduct}>Interact with Button 2</button>
      </div>
      <div>
        <button onClick={auctionEnd}>endAuction</button>
      </div> */}
    </div>
  );
}

export default App;
