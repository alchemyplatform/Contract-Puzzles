const { assert } = require("chai");

describe("Game4", function() {
    it("should be a winner", async function() {
        const Game = await ethers.getContractFactory("Game4");
        const game = await Game.deploy();
        await game.deployed();

        // nested mappings are rough :}
        const signer1 = ethers.provider.getSigner(0);
        const address1 = await signer1.getAddress();

        const signer2 = ethers.provider.getSigner(1);
        const address2 = await signer2.getAddress();

        await game.connect(signer1).write(address2);
        await game.connect(signer2).win(address1);

        // leave this assertion as-is
        assert(await game.isWon(), "You did not win the game");
    });
});