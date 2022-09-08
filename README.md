# Sisyphus 

The game is simple: push the boulder by paying more than the previous person. When you push the boulder the game timer resets. Each previous pusher gets a share equivalent to 1/(n-1)th of the push value. If the timer expires (24hr default) while you are holding the boulder, you win the prize pool. 

The operator of the contract can change the game parameters but they won't take effect until after an ongoing game expires. A small platform rake is included but can be turned off by the operator. 

Any user can call `resetTheBoulder` if it's a valid time to do so. 

A player can return to the game to claim winnings on a per-game basis by calling `claimWinningsByGame`. 

## Setup 

Run the following: 
- yarn install 
- npx hardhat deploy --network "network of your choice" (you may need to add support for your network to the hardhat config)
