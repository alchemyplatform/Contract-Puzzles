const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game};
  }
  it('should be a winner', async function () {
    const { game} = await loadFixture(deployContractAndSetVariables);

    // creating random wallet that its address matches the condition
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf
    let validAddress = false;
    let wallet;
    let address;
    while (!validAddress) {
      wallet = ethers.Wallet.createRandom()
      address = await wallet.getAddress()
      if(address < threshold) validAddress = true
    }

    // init the wallet with the found address
    wallet = wallet.connect(ethers.provider)
    const signer = ethers.provider.getSigner(0)
    
    // send some ether(needed for gas fees on the upcoming function call)
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther('200')
    })
    await game.connect(wallet).win();

    assert(await game.isWon(), 'You did not win the game');
  });
});
