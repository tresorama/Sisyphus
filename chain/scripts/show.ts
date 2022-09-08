
import { ethers } from "hardhat";
import * as logger from "../utils/logger"
import * as fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Sisyphus__factory, Sisyphus } from "../typechain-types";

async function show() {

  let deployer: SignerWithAddress
  [deployer] = await ethers.getSigners()
  
  const network = await ethers.provider.getNetwork()

  logger.divider()
  logger.out("Deploying to: " + network.name, logger.Level.Info)
  logger.out("With chain id: " + network.chainId, logger.Level.Info)

  let Sis: Sisyphus__factory
  let sis: Sisyphus
  Sis = await ethers.getContractFactory("Sisyphus") as Sisyphus__factory
  sis = await Sis.deploy() as Sisyphus

  await sis.deployed()
  let p = await sis.currentPrice()
  await sis.pushTheBoulder({value: p})

  logger.pad(30, "Deployed to:", sis.address);
}

show().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});