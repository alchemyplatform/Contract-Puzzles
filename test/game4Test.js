const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    let wallet = ethers.Wallet.createRandom();
    while(wallet.address.slice(0,4) !== "0x00") {
      wallet = ethers.Wallet.createRandom();
    }

    const signer = ethers.provider.getSigner(0);
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1")
    });

    await game.connect(wallet.connect(ethers.provider)).win();

    assert(await game.isWon(), "You did not win the game");
  });
});
