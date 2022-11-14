const hre = require("hardhat");

async function main() {
  console.log("Deploying Meter NFT contract...");
  const MeterNFT = await hre.ethers.getContractFactory("MeterNFT");
  const meterNFT = await MeterNFT.deploy("Meter NFT", "MTR_NFT");
  await meterNFT.deployed();
  const meterNFTAddress = await meterNFT.address;
  console.log(`Meter NFT contract deployed at ${meterNFTAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
