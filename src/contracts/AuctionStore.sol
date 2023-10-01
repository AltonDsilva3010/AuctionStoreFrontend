// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract AuctionStore {
    address public owner;

    struct Product {
        uint256 productId;
        string name;
        string description;
        uint256 auctionEndTime;
        uint256 highestBid;
        address highestBidder;
    }
    
    Product[] public products;

    constructor() payable {
        owner = msg.sender;
    }

    modifier productExists(uint256 productId) {
        require(productId < products.length, "Product does not exist");
        _;
    }

    modifier auctionEnded(uint256 productId) {
        require(block.timestamp >= products[productId].auctionEndTime, "Auction has not ended yet");
        _;
    }

    event NewBid(uint256 indexed productId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed productId, address winner, uint256 amount);
    event ProductStatusChanged(uint256 indexed productId, bool newStatus);

    function createProduct(string memory _name, string memory _description, uint256 _durationMinutes) public {
        Product memory newProduct = Product({
            productId: products.length,
            name: _name,
            description: _description,
            // status: false,  // Set status to flase initially as in not completed
            auctionEndTime: block.timestamp + (_durationMinutes * 1 minutes),
            highestBid: 0,
            highestBidder: address(0)
        });
        products.push(newProduct);
    }


    function placeBid(uint256 productId) public payable productExists(productId) {

        require(block.timestamp < products[productId].auctionEndTime, "Auction has ended");
        require(msg.value > products[productId].highestBid, "Bid must be higher than the current highest bid");

        if (products[productId].highestBidder != address(0)) {
            // Refund the previous highest bidder
            payable(products[productId].highestBidder).transfer(products[productId].highestBid);
        }

        products[productId].highestBidder = msg.sender;
        products[productId].highestBid = msg.value;
        emit NewBid(productId, msg.sender, msg.value);
    }

    function endAuction(uint256 productId) public productExists(productId) auctionEnded(productId) {
        require(products[productId].highestBidder != address(0), "No valid bids");
        payable(owner).transfer(products[productId].highestBid);
        emit AuctionEnded(productId, products[productId].highestBidder, products[productId].highestBid);
    }

    receive() external payable {
        revert("Fallback function is disabled. Use placeBid.");
    }

    function withdraw() public {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");
        payable(owner).transfer(contractBalance);
    }
    
    function getNumberOfProducts() public view returns (uint256) {
        return products.length;
    }

    function listAllProducts() public view returns (Product[] memory) {
        return products;
    }
}
