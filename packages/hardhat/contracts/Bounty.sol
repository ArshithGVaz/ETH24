// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Bounty {
    struct BountyInfo {
        address host;
        uint256 totalBounty;
        uint256 deadline;
        uint256 totalVotes;
        mapping(address => uint256) votes; // Voter => vote count
        address[] participants;
    }

    mapping(uint256 => BountyInfo) public bounties;
    uint256 public bountyCounter;
    address public immutable owner;

    event BountyCreated(uint256 bountyId, address indexed host, uint256 amount, uint256 deadline);
    event PictureSubmitted(uint256 bountyId, address indexed participant);
    event Voted(uint256 bountyId, address indexed voter, address indexed participant);
    event BountyClaimed(uint256 bountyId, address indexed winner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function createBounty(uint256 duration) public payable {
        require(msg.value > 0, "Bounty must be greater than zero");
        bountyCounter++;

        BountyInfo storage newBounty = bounties[bountyCounter];
        newBounty.host = msg.sender;
        newBounty.totalBounty = msg.value;
        newBounty.deadline = block.timestamp + duration;

        emit BountyCreated(bountyCounter, msg.sender, msg.value, newBounty.deadline);
    }

    function submitPicture(uint256 bountyId) public {
        require(bounties[bountyId].deadline > block.timestamp, "Bounty has ended");
        bounties[bountyId].participants.push(msg.sender);
        emit PictureSubmitted(bountyId, msg.sender);
    }

    function vote(uint256 bountyId, address participant) public {
        require(bounties[bountyId].deadline > block.timestamp, "Bounty has ended");
        require(bounties[bountyId].votes[msg.sender] == 0, "Already voted");

        bounties[bountyId].votes[msg.sender] = 1; // Mark that this voter has voted
        bounties[bountyId].totalVotes++;
        emit Voted(bountyId, msg.sender, participant);
    }

    function claimBounty(uint256 bountyId) public {
        require(bounties[bountyId].deadline < block.timestamp, "Bounty still active");
        BountyInfo storage bounty = bounties[bountyId];

        uint256 totalReward = (bounty.totalBounty * 85) / 100; // 85% to be distributed
        uint256 totalVotes = bounty.totalVotes;

        for (uint256 i = 0; i < bounty.participants.length; i++) {
            address participant = bounty.participants[i];
            uint256 participantVotes = bounty.votes[participant];
            uint256 reward = (totalReward * participantVotes) / totalVotes;
            if (reward > 0) {
                payable(participant).transfer(reward);
            }
        }

        // Transfer 15% to the application
        payable(owner).transfer(bounty.totalBounty / 100 * 15);
        delete bounties[bountyId]; // Clean up bounty
    }
}
