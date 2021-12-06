// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

 
contract RandomNumberConsumer is VRFConsumerBase {
    
    bytes32 internal keyHash;
    uint256 internal fee;
    address public owner=0xDDE6543628a7B6aa43aa8AF2d4280CAc8A7b29B3;
    uint256 public randomResult;

    modifier onlyOwner{
        require(
            msg.sender==owner,"ADMIN_ONLY"
        );
        _;
    }
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     
     */
     event DiceLanded(bytes32 indexed requestId, uint256 indexed result,address indexed usersAddress);
    constructor() 
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
    {
        keyHash = 	0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK
    }
    
    /** 
     * Requests randomness 
     */

     receive() external payable {
    }
    function getRandomNumber(uint256 usersPick) public payable returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        address usersAddress=msg.sender;
        uint userValue=msg.value;
        bytes32 _requestId =requestRandomness(keyHash, fee,usersAddress,userValue,usersPick);
        return _requestId;
    }
    function claimBalance(uint withdrawAmount) external payable onlyOwner{
        payable(msg.sender).transfer(withdrawAmount);
    }
    function changeOwner(address adres) external payable onlyOwner{
        owner=adres;
    }
    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness,address usersAddress,uint userValue,uint256 usersPick) internal override {
    uint256 d20Value = randomness % 37;
    randomResult=d20Value;
    if(d20Value==usersPick){
    address payable wallet = payable(usersAddress);
    wallet.transfer(userValue*36);
    }
    emit DiceLanded(requestId, d20Value,usersAddress);
    }

    
}
