pragma solidity ^0.5.0;

contract SocialNetwork {
    // State variable
    string public name;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    uint256 public postCount = 0;

    mapping(uint256 => Post) public posts;

    constructor() public {
        name = "Dapp University Social Network";
    }

    function createPost(string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
    }
}
