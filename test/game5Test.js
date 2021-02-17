const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const account1 = ethers.provider.getSigner(0);
    const account2 = ethers.provider.getSigner(1);

    await game.write(await account2.getAddress());
    await game.connect(account2).win(await account1.getAddress());

    assert(await game.isWon(), "You did not win the game");
  });
});
