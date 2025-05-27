// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 votes;
    }

    Candidate[] public candidates;

    // Constructor to initialize candidates (hardcoded here)
    constructor() {
        candidates.push(Candidate("Alice", 0));
        candidates.push(Candidate("Bob", 0));
        candidates.push(Candidate("Charlie", 0));
    }

    // Returns total number of candidates
    function totalCandidates() public view returns (uint256) {
        return candidates.length;
    }

    // Returns candidate name and votes by index
    function getCandidate(uint256 index) public view returns (uint256) {
        require(index < candidates.length, "Candidate index out of bounds");
        return candidates[index].votes;
    }


    // Vote for a candidate by index
    function vote(uint256 index) public {
        require(index < candidates.length, "Candidate index out of bounds");
        candidates[index].votes += 1;
    }
}
