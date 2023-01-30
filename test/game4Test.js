const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game, owner, otherAccount };
  }
  it('should be a winner', async function () {
    const { game, owner, otherAccount } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(otherAccount).write(owner.getAddress())

    await game.win(otherAccount.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
