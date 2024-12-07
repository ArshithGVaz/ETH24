// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentStorage {
    struct Content {
        address owner;
        uint256 price;
        string title;
        string description;
        string group;
    }

    mapping(uint256 => Content) public contents;
    uint256 public contentCount;

    event ContentUploaded(uint256 indexed contentId, address indexed owner, uint256 price, string title, string description, string group);
    event ContentBought(uint256 indexed contentId, address indexed buyer);

    function uploadContent(uint256 _price, string memory _title, string memory _description, string memory _group) public {
        contents[contentCount] = Content({
            owner: msg.sender,
            price: _price,
            title: _title,
            description: _description,
            group: _group
        });

        emit ContentUploaded(contentCount, msg.sender, _price, _title, _description, _group);
        contentCount++;
    }

    function buyContent(uint256 _contentId) public payable {
        Content storage content = contents[_contentId];

        require(content.owner != address(0), "Content not found");
        require(msg.value >= content.price, "Insufficient payment to view content");

        payable(content.owner).transfer(msg.value);

        emit ContentBought(_contentId, msg.sender);
    }
}
