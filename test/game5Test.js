const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const provider = ethers.provider;
    const privateKey =
      "2b06d60a9966dd409b6dac1d94887ad4de72c8a8e28b8e8c0033c2eefabcfd4d"; // will produce address 0x0000e0f1Fe76b8F37F71f80b8a2c301Fe6feB3E5
    const customWallet = new ethers.Wallet(privateKey, provider);

    // Fund the custom wallet (Hardhat default accounts can send it ETH)
    const [owner] = await ethers.getSigners();
    await owner.sendTransaction({
      to: customWallet.address,
      value: ethers.utils.parseEther("1.0"), // Send some ETH for gas fees
    });

    // Call `win()` from the custom wallet
    const gameWithCustomWallet = game.connect(customWallet);
    await gameWithCustomWallet.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
