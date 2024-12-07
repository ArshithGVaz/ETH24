// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract BountyContract {
    address payable public platformAddress;
    uint256 public platformShare;

    struct Entry {
        uint256 id;
        address owner;
        string title;
        string description;
        uint256 votes;
        mapping(address => bool) hasVoterVoted;
    }
    uint256 public entryCounter;

    struct Bounty {
        address host;
        string name;
        string requirements;
        uint256 amount;
        uint256 deadline;
        address[] participants;
        uint256 totalVotes;
        mapping(address => Entry[]) participantToContent;
    }
    uint256 public bountyCounter;

    mapping(uint256 => Bounty) public bounties;

    event BountyCreated(uint256 bountyId, address indexed host, string name, string requirements, uint256 amount, uint256 deadline);

    constructor(address _platformAddress, uint256 _platformShare) {
        require(_platformAddress != address(0), "Platform address cannot be zero");
        platformAddress = payable(_platformAddress);
        require(_platformShare <= 30, "Platform share cannot be more than 30");
        platformShare = _platformShare;
    }

    function createBounty(string memory _name, string memory _requirements, uint256 _duration) public payable {
        require(msg.value > 0, "Bounty must be greater than zero");

        bountyCounter++;
        Bounty storage newBounty = bounties[bountyCounter];
        newBounty.host = msg.sender;
        newBounty.name = _name;
        newBounty.requirements = _requirements;
        newBounty.amount = msg.value;
        newBounty.deadline = block.timestamp + _duration;

        payable(address(this)).transfer(msg.value);

        emit BountyCreated(bountyCounter, msg.sender, _name, _requirements, msg.value, bounties[bountyCounter].deadline);
    }

    event EntrySubmitted(uint256 bountyId, uint256 entryId, address indexed participant, string title, string description);

    function addEntry(uint256 bountyId, string memory _title, string memory _description) public {
        require(bounties[bountyId].deadline > block.timestamp, "Bounty has ended");

        bounties[bountyId].participants.push(msg.sender);

        entryCounter++;
        Entry storage entry = bounties[bountyId].participantToContent[msg.sender].push();
        entry.id = entryCounter;
        entry.owner = msg.sender;
        entry.title = _title;
        entry.description = _description;
        entry.votes = 0;

        emit EntrySubmitted(bountyId, entryCounter, msg.sender, _title, _description);
    }

    event Voted(uint256 bountyId, address indexed voter, uint256 entryId, address indexed participant, string title, string description);
    function vote(uint256 bountyId, address _participant, uint256 _entryId) public {
        require(bounties[bountyId].deadline > block.timestamp, "Bounty has ended");
        Entry[] storage entries = bounties[bountyId].participantToContent[_participant];
        uint256 entryIndex = 0;
        for (uint256 i = 0; i < entries.length; i++) {
            if (entries[i].id == _entryId) {
                entryIndex = i; 
            }
        }

        require(!entries[entryIndex].hasVoterVoted[msg.sender], "Already voted");
        entries[entryIndex].votes++;
        entries[entryIndex].hasVoterVoted[msg.sender] = true;

        bounties[bountyId].totalVotes++;

        emit Voted(bountyId, msg.sender, _entryId, _participant, entries[entryIndex].title, entries[entryIndex].description);
    }

    event BountyClaimed(uint256 bountyId, address indexed claimer, uint256 amount);
    function claimBounty(uint256 bountyId) public {
        require(bounties[bountyId].deadline < block.timestamp, "Bounty still active");

        Entry[] storage entries = bounties[bountyId].participantToContent[msg.sender];
        uint256 participantVotes = 0;
        for (uint256 i = 0; i < entries.length; i++) {
            participantVotes += entries[i].votes;
        }

        uint256 totalVotes = bounties[bountyId].totalVotes;
        require(totalVotes > 0, "No votes in bounty");

        uint256 amount = bounties[bountyId].amount * (100 - platformShare) / 100;
        uint256 participantShare = participantVotes * amount / totalVotes;
        payable(msg.sender).transfer(participantShare);

        emit BountyClaimed(bountyId, msg.sender, participantShare);
    }

    function platformClaim(uint256 bountyId) public {
        require(msg.sender == platformAddress, "Only withdrawable by the platform");

        uint256 platformShareAmount = bounties[bountyId].amount * platformShare / 100;
        payable(platformAddress).transfer(platformShareAmount);

        emit BountyClaimed(bountyId, msg.sender, platformShareAmount);
    }
}
