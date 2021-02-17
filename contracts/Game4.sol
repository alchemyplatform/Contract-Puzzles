//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract Game4 {
  bool public isWon;

  mapping(address => mapping(address => bool)) nested;

  function write(address x) external {
    nested[x][msg.sender] = true;
  }

  function win(address y) external {
    require(nested[msg.sender][y], "Nope. Try again!");

    isWon = true;
  }
}
