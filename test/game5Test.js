const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
