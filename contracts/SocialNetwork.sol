// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

// Author : Ben BK 
// Version 2.0

contract SocialNetwork {

    struct post {
        uint id;
        address author;
        string post;
        int votes;
    }

    struct response {
        uint id;
        address author;
        string response;
    }

    uint public currentIdPost = 0;
    uint public currentIdResponse = 0;

    mapping(uint => post) public allThePosts;
    mapping(uint => mapping(uint => response)) public allTheResponses;
    mapping(uint => uint) public idResponses;
    mapping(address => mapping(uint => bool)) public haveVoted;
    mapping(address => uint) public timestampLastPost;

    function createPost(string memory _post) external {
        require(timestampLastPost[msg.sender] < block.timestamp - 30, "You need to wait 30 secondes between each posts");
        require(bytes(_post).length != 0, "The post cannot be empty");
        post memory thisPost = post(currentIdPost, msg.sender, _post, 0);
        allThePosts[currentIdPost] = thisPost;
        currentIdPost++;
        timestampLastPost[msg.sender] = block.timestamp;
    }

    function createResponse(uint _postId, string memory _response) external {
        bytes memory getTheContentOfThePost = bytes(allThePosts[_postId].post);
        require(getTheContentOfThePost.length != 0, "You cannot answer a post that doesn't exist");
        require(bytes(_response).length != 0, "You cannot answer with an empty response");
        require(timestampLastPost[msg.sender] < block.timestamp - 30, "You need to wait 30 secondes between each posts");
        response memory thisResponse = response(currentIdResponse, msg.sender, _response);
        allTheResponses[_postId][idResponses[_postId]] = thisResponse;    
        currentIdResponse++;
        idResponses[_postId]++;    
        timestampLastPost[msg.sender] = block.timestamp;
    }

    modifier voteControl(uint _postId, address _voter) {
        require(!haveVoted[_voter][_postId], "You have already voted for this post");
        require(allThePosts[_postId].author != _voter, "You can not vote for your posts");
        bytes memory getTheContentOfThePost = bytes(allThePosts[_postId].post);
        require(getTheContentOfThePost.length != 0, "The post needs to exist");
        _;
    }

    function voteUp(uint _postId) external voteControl(_postId, msg.sender) {
        address _voter = msg.sender;
        allThePosts[_postId].votes++;
        haveVoted[_voter][_postId] = true;
    }

    function voteDown(uint _postId) external voteControl(_postId, msg.sender) {
        address _voter = msg.sender;
        allThePosts[_postId].votes--;
        haveVoted[_voter][_postId] = true;
    }

    function getAllThePosts() external view returns(post[] memory) {
        post[] memory everyPosts = new post[](currentIdPost);
        for(uint i = 0 ; i < currentIdPost ; i++) {
            everyPosts[i] = allThePosts[i];
        }
        return everyPosts;
    }

    function getAllThePostsFromUser(address _user) external view returns(post[] memory) {
        uint size = 0;
        for(uint i = 0 ; i < currentIdPost ; i++) {
            if(allThePosts[i].author == _user) {
                size++;
            }
        }
        post[] memory everyPosts = new post[](size);
        uint j = 0;
        for(uint i = 0 ; i < currentIdPost ; i++) {
            if(allThePosts[i].author == _user) {
                everyPosts[j] = allThePosts[i];
                j++;
            }
        }
        return everyPosts;
    }

    function getResponsesOfAPost(uint _postId) external view returns(response[] memory) {
        uint responsesCountForThisPost;

        for(uint i = 0 ; i < idResponses[_postId] ; i++) {
            if(bytes(allTheResponses[_postId][i].response).length != 0) {
                responsesCountForThisPost++;
            }
        }

        response[] memory everyResponses = new response[](responsesCountForThisPost);

        uint compteur = 0;
        for(uint i = 0 ; i < responsesCountForThisPost ; i++) {
            everyResponses[compteur] = allTheResponses[_postId][i];
            compteur++;
        }   
        return everyResponses;
    }
}