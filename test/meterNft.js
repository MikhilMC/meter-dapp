const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MeterNFT.sol", () => {
  let MeterNFT, meterNFT, meterNFTAddress;
  let owner, ownerAddress, account1, account1Address;

  beforeEach(async () => {
    [owner, account1] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    account1Address = await account1.getAddress();
    MeterNFT = await ethers.getContractFactory("MeterNFT");
    meterNFT = await MeterNFT.deploy("MeterNFT", "MNFT");
    await meterNFT.deployed();
    meterNFTAddress = await meterNFT.address;
  });

  describe("Correct setup", () => {
    it("The setup should be correct", async () => {
      expect(await meterNFT.name()).to.equal("MeterNFT");
      expect(await meterNFT.symbol()).to.equal("MNFT");
    });
  });

  describe("Minting", () => {
    beforeEach(async () => {
      await meterNFT.safeMint(account1Address);
    });

    it("Should have the exact owner address", async () => {
      expect(await meterNFT.ownerOf(0)).to.equal(account1Address);
    });

    it("Should reject if we try to mint to zero address", async () => {
      await expect(
        meterNFT.safeMint(ethers.constants.AddressZero)
      ).to.be.revertedWith("ERC721: mint to the zero address");
    });
  });

  describe("Burning", () => {
    beforeEach(async () => {
      await meterNFT.safeMint(account1Address);
    });

    it("Should be able to burn token", async () => {
      await meterNFT.connect(account1).burn(0);

      await expect(meterNFT.ownerOf(0)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });

    it("Should revert if we burn an invalid token", async () => {
      await expect(meterNFT.burn(1)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });

    it("Should revert if try to burn a token by another account which is neither the owner nor the account which is approved", async () => {
      await expect(meterNFT.burn(0)).to.be.revertedWith(
        "ERC721: caller is not token owner or approved"
      );
    });

    it("Should revert if try to burn a token, which is already burned before", async () => {
      await meterNFT.connect(account1).burn(0);

      await expect(meterNFT.connect(account1).burn(0)).to.be.revertedWith(
        "ERC721: invalid token ID"
      );
    });
  });
});
