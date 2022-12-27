const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const signer3 = ethers.provider.getSigner(2);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer1.getAddress();

    return { game, signer1, signer2, signer3 };
  }

  it('should be a winner', async function () {
    const { game, signer1, signer2, signer3 } = await loadFixture(deployContractAndSetVariables);

    await game.connect(signer3).buy({ value: ethers.utils.parseEther('0.5') });
    await game.connect(signer1).buy({ value: ethers.utils.parseEther('1') });
    await game.connect(signer2).buy({ value: ethers.utils.parseEther('1.5') });

    const address1 = await signer1.getAddress()
    const address2 = await signer2.getAddress()
    const address3 = await signer3.getAddress()
    await game.win(address1, address2, address3);

    assert(await game.isWon(), 'You did not win the game');
  });
});
