const hre = require("hardhat");

async function main() {
  console.log("Deploying Greeter contract...");
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello Meter blockchain");
  await greeter.deployed();
  const greeterAddress = await greeter.address;
  console.log(`Greeter contract deployed at ${greeterAddress}`);

  console.log("Deploying MTRG Test token contract...");
  const MTRG = await hre.ethers.getContractFactory("MTRG");
  const mtrg = await MTRG.deploy();
  await mtrg.deployed();
  const mtrgAddress = await mtrg.address;
  console.log(`Greeter contract deployed at ${mtrgAddress}`);

  console.log("Deploying Volt Test token contract...");
  const Volt = await hre.ethers.getContractFactory("Volt");
  const volt = await Volt.deploy();
  await volt.deployed();
  const voltAddress = await volt.address;
  console.log(`Greeter contract deployed at ${voltAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
