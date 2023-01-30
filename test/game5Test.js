const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }

  const getEligibleWallet = async () => {
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    let eligibleWallet;
    while(true) {
      let wallet = ethers.Wallet.createRandom();
      if(wallet.address < threshold) {
        eligibleWallet = wallet
        eligibleWallet = wallet.connect(ethers.provider);
        break
      }
    }

    const [owner] = await ethers.getSigners()
    await owner.sendTransaction({to: eligibleWallet.address, value: ethers.utils.parseEther("1")});

    return eligibleWallet;
  };

  it('should be a winner', async function () {
    const wallet = await getEligibleWallet();
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
