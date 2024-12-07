// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TravelerContent {
    address public immutable owner;
    uint256 public constant INITIAL_APP_SHARE = 35; // 35%
    uint256 public constant INITIAL_CREATOR_SHARE = 65; // 65%

    struct Creator {
        uint256 totalEarnings;
        uint256 contentCount;
        uint256 sharePercentage; // Starts at 65
    }

    mapping(address => Creator) public creators;

    event ContentPosted(address indexed creator, string contentURI, uint256 price);
    event EarningsWithdrawn(address indexed creator, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function postContent(string memory contentURI, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        
        creators[msg.sender].contentCount += 1;
        emit ContentPosted(msg.sender, contentURI, price);
    }

    function buyContent(address creator) public payable {
        Creator storage c = creators[creator];
        require(msg.value > 0, "Must pay to access content");

        uint256 appShare = (msg.value * INITIAL_APP_SHARE) / 100;
        uint256 creatorShare = msg.value - appShare;

        c.totalEarnings += creatorShare;
        
        // Adjust creator's share based on content count
        if (c.contentCount > 5) {
            c.sharePercentage = 85; // Max share for creator
        } else {
            c.sharePercentage = INITIAL_CREATOR_SHARE + (c.contentCount * 5); // Incremental increase
        }

        // Transfer app share to owner
        payable(owner).transfer(appShare);
    }

    function withdrawEarnings() public {
        uint256 amount = creators[msg.sender].totalEarnings;
        require(amount > 0, "No earnings to withdraw");
        creators[msg.sender].totalEarnings = 0;

        payable(msg.sender).transfer(amount);
        emit EarningsWithdrawn(msg.sender, amount);
    }
}
