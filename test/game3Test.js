const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const signer3 = ethers.provider.getSigner(2);

    const addr1 = await signer1.getAddress();
    const addr2 = await signer2.getAddress();
    const addr3 = await signer3.getAddress();

    await game.connect(signer3).buy({ value: "1" });
    await game.connect(signer2).buy({ value: "3" });
    await game.connect(signer1).buy({ value: "2" });

    await game.win(addr1, addr2, addr3);

    assert(await game.isWon(), "You did not win the game");
  });
});
