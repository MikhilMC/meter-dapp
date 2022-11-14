const hre = require("hardhat");

async function main() {
  const mtrgAddress = "0x534d776074a64ea21b2ce71a46d378b8ab2352f8";
  const voltAddress = "0x979d5319ea7a69658075cc8afab8a994af78d024";
  console.log("Deploying Payable contract...");
  const Payable = await hre.ethers.getContractFactory("Payable");
  const payable = await Payable.deploy(mtrgAddress, voltAddress);
  await payable.deployed();
  const payableAddress = await payable.address;
  console.log(`Payable contract deployed at ${payableAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
