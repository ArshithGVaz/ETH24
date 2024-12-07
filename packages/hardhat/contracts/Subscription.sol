// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Subscription {
    struct SubscriptionInfo {
        bool isActive;
        uint256 subscriptionFee;
    }

    mapping(address => SubscriptionInfo) public subscriptions;
    address public immutable owner;

    event Subscribed(address indexed user, address indexed traveler, uint256 fee);
    event Unsubscribed(address indexed user, address indexed traveler);

    constructor() {
        owner = msg.sender;
    }

    function subscribe(address traveler, uint256 fee) public payable {
        require(msg.value == fee, "Incorrect fee sent");
        require(!subscriptions[traveler].isActive, "Already subscribed");

        subscriptions[traveler] = SubscriptionInfo(true, fee);
        emit Subscribed(msg.sender, traveler, fee);
    }

    function unsubscribe(address traveler) public {
        require(subscriptions[traveler].isActive, "Not subscribed");

        subscriptions[traveler].isActive = false;
        emit Unsubscribed(msg.sender, traveler);
    }

    function getSubscriptionStatus(address traveler) public view returns (bool) {
        return subscriptions[traveler].isActive;
    }
}
