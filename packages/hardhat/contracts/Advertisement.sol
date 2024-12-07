// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Advertising {
    struct Ad {
        address advertiser;
        string adContent;
        uint256 cost;
        bool isActive;
    }

    mapping(uint256 => Ad) public ads;
    uint256 public adCounter;
    address public immutable owner;

    event AdCreated(uint256 adId, address indexed advertiser, uint256 cost);
    event AdRemoved(uint256 adId);

    constructor() {
        owner = msg.sender;
    }

    function createAd(string memory adContent, uint256 cost) public payable {
        require(msg.value == cost, "Incorrect amount sent");

        adCounter++;
        ads[adCounter] = Ad(msg.sender, adContent, cost, true);
        emit AdCreated(adCounter, msg.sender, cost);
    }

    function removeAd(uint256 adId) public {
        require(ads[adId].advertiser == msg.sender, "Not the advertiser");
        require(ads[adId].isActive, "Ad already removed");

        ads[adId].isActive = false;
        emit AdRemoved(adId);
    }
}
