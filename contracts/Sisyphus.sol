// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Sisyphus is Ownable, ReentrancyGuard{

    // GAME PARAMETERS 
    address public currentWinner;
    uint256 public timerDuration = 10; // 24 hours, 3600 s/hr 
    // uint256 public timerDuration = 24*3600; // 24 hours, 3600 s/hr 
    uint256 public lastPush = 0; // Parameter for recording timestamp of each boulder push
    uint256 public expirationTime = 0; // Parameter for setting the new expiration time
    uint256 public startingPrice = 0.005 ether; // start the price at 0.005 ether each round
    uint256 public currentPrice = startingPrice;
    address[] currentParticipants; // list of current participants

    // ECONOMIC PARAMETERS 
    uint256 public percentRateIncrease = 100; // 1% increase for each successive push
    uint256 public percentToBoulder = 3000; // 30% of push value goes to the Boulder (prize pool)
    uint256 public percentToPushers = 6900; // 69% of push value goes to previous pushers 
    uint256 public percentToReserve = 100; // 1% of push value goes to platform profit
    uint256 percentBasis = 10000; 
    uint256 public boulder = 0; // Value of the boulder
    uint256 public reserve = 0; 
    
    
    mapping(address => uint256) public pendingWithdrawals;

    constructor() {
        expirationTime = block.timestamp + timerDuration;
    }

    function pushTheBoulder() external payable nonReentrant {
        require(msg.value == currentPrice,
            "Must push boulder with exactly push price"
        );

        // Logic is slightly different for fist push since there's no one to pay yield to 
        if(boulder == 0){
            currentWinner = msg.sender;
        }
        // Handle nominal case where we have a yield to pay out to each previous pusher 
        else {
            address previousWinner = currentWinner;
            currentWinner = msg.sender;

            // Record previous owner into participant list
            currentParticipants.push(previousWinner);
            
            // Determine how many participants there are
            uint256 len = currentParticipants.length;
            
            // Determine what the cut per participant should be
            uint256 cut = _getCutPer(msg.value);

            // Add the value of the cut to each particpant's withdraw balance
            for(uint i=0; i<len; i++) {
                address participant = currentParticipants[i];
                pendingWithdrawals[participant] += cut;
            }
        }

        // Increment boulder value and take some for the reserves 
        boulder += _getBoulderAdd(msg.value);  
        reserve += _getReserveTake(msg.value);

        // Set up parameters for next push
        currentPrice = _getNewPrice();
        lastPush = block.timestamp; 
        expirationTime = lastPush + timerDuration;
        
    }

    // To ensure that the game is fair and doesn't charge insane gas to any participant, the platform will reset the game after each expiration
    function resetTheBoulder() external onlyOwner {
        require(block.timestamp > expirationTime, "Timer has not expired"); // Ensures game validity; no rug pulls here, sir 
        pendingWithdrawals[currentWinner] += boulder;
        boulder = 0;
        delete currentParticipants;
        currentWinner = msg.sender;
    }
    
    // Allows any previous user to withdraw their accrued balance from the platform
    function withdrawDeposit() external nonReentrant {
        uint256 withdrawal = pendingWithdrawals[msg.sender];
        require(withdrawal > 0, "Nothing to withdraw");
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(withdrawal);
    }

    // Allows the platform to withdraw accrued revenue (mostly to pay for gas resetting the game)
    function ownerWithdraw(uint256 amount) external payable onlyOwner {
        require(amount <= reserve, "Withdrawal amount must be less than reserves available");
            payable(msg.sender).transfer(amount);
            reserve -= amount;
    }

    function _getBoulderAdd(uint256 value) internal view returns (uint256) {
        return (value *  percentToBoulder) / percentBasis; 
    }

    function _getCutPer(uint256 value) internal view returns (uint256) {
        uint256 len = currentParticipants.length;
        return (value *  percentToPushers) / (percentBasis * len);
    }

    function _getReserveTake(uint256 value) internal view returns (uint256) {
        return (value * percentToReserve) / percentBasis; 
    }

    function _getNewPrice() internal view returns (uint256) {
        return (currentPrice * percentRateIncrease) / percentBasis;
    }
}