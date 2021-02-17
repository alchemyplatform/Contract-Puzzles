const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    // nested mappings are rough :}

    await game.win();

    assert(await game.isWon(), "You did not win the game");
  });
});
