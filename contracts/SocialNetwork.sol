// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract SocialNetwork {

    struct post {
        address author;
        string post;
        int votes;
    }

    uint public currentId;

    mapping(uint => post) allThePosts;
    mapping(address => mapping(uint => bool)) haveVoted;
    mapping(address => uint) timestampLastPost;

    function createPost(string memory _post) external {
        require(timestampLastPost[msg.sender] < block.timestamp - 30, "You need to wait 30 secondes between each posts");
        post memory thisPost = post(msg.sender, _post, 0);
        allThePosts[currentId] = thisPost;
        currentId++;
        timestampLastPost[msg.sender] = block.timestamp;
    }

    function voteUp(uint _postId) external {
        address _voter = msg.sender;
        require(!haveVoted[_voter][_postId], "You have already voted for this post");
        require(allThePosts[_postId].author != _voter, "You can not vote for your posts");
        allThePosts[_postId].votes++;
        haveVoted[_voter][_postId] = true;
    }

    function voteDown(uint _postId) external {
        address _voter = msg.sender;
        require(!haveVoted[_voter][_postId], "You have already voted for this post");
        require(allThePosts[_postId].author != _voter, "You can not vote for your posts");
        allThePosts[_postId].votes--;
        haveVoted[_voter][_postId] = true;
    }

    function getAllThePosts() external view returns(post[] memory) {
        post[] memory everyPosts = new post[](currentId);
        for(uint i = 0 ; i < currentId ; i++) {
            everyPosts[i] = allThePosts[i];
        }
        return everyPosts;
    }

    function getAllThePostsFromUser(address _user) external view returns(post[] memory) {
        uint size = 0;
        for(uint i = 0 ; i < currentId ; i++) {
            if(allThePosts[i].author == _user) {
                size++;
            }
        }
        post[] memory everyPosts = new post[](size);
        uint j = 0;
        for(uint i = 0 ; i < currentId ; i++) {
            if(allThePosts[i].author == _user) {
                everyPosts[j] = allThePosts[i];
                j++;
            }
        }
        return everyPosts;
    }
}