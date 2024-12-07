// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentStorage {
    struct Content {
        address owner;
        bool isPublic;
        uint256 price; // Price to view private content
    }

    mapping(uint256 => Content) public contents;
    uint256 public contentCount;

    event ContentUploaded(uint256 indexed contentId, address indexed owner, bool isPublic);

    function uploadContent(bool _isPublic, uint256 _price) public {
        contents[contentCount] = Content({
            owner: msg.sender,
            isPublic: _isPublic,
            price: _price
        });

        emit ContentUploaded(contentCount, msg.sender, _isPublic);
        contentCount++;
    }

    function viewContent(uint256 _contentId) public payable returns (bool) {
        Content storage content = contents[_contentId];

        require(content.owner != address(0), "Content not found");

        if (!content.isPublic) {
            require(msg.value >= content.price, "Insufficient payment to view content");
            // Transfer payment to the owner
            payable(content.owner).transfer(msg.value);
        }

        return content.isPublic; // Return whether the content is public or private
    }
}
