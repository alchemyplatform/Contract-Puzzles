const { assert } = require("chai");

describe("Game1", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game1");
    const game = await Game.deploy();
    await game.deployed();

    await game.unlock();
    await game.win();

    assert(await game.isWon(), "You did not win the game");
  });
});
