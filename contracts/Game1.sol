//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;
import "hardhat/console.sol";

contract Game1 {
  bool public isWon;
  bool public unlocked;

  function unlock() external {
    unlocked = true;
  }

  function win() external {
    require(unlocked, "Nope. Try again!");

    isWon = true;
  }
}
