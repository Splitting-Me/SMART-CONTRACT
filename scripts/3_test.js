// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");
const utils = ethers.utils;
require("dotenv").config();

// comandline: npx hardhat test scripts/3_test.js --network sepolia

const CampaignPoolSwapFilePath = "./deployment/CampaignPoolSwap.json";
const FactoryPoolFilePath = "./deployment/FactoryPool.json";
const USDTFilePath = "./deployment/USDT.json";

const CampaignPoolSwapData = fs.readFileSync(CampaignPoolSwapFilePath);
const CampaignPoolSwapJSON = JSON.parse(CampaignPoolSwapData);
const CampaignPoolSwapAddress = CampaignPoolSwapJSON.address;

const FactoryPoolData = fs.readFileSync(FactoryPoolFilePath);
const FactoryPoolJSON = JSON.parse(FactoryPoolData);
const FactoryPoolAddress = FactoryPoolJSON.address;

const USDTData = fs.readFileSync(USDTFilePath);
const USDTJSON = JSON.parse(USDTData);
const USDTAddress = USDTJSON.address;

const token1Address = "0xC6Eb37550fCe54A9744B7F154D2cBCc18C0C319E";
const addressPool = "0xAb68b6c4144C9082c347E0377D88588dbC40a8B6";
// Define variables for contract instances and owner
let campaignPoolSwap;
let factoryPool;
let usdt;
let token;
let owner;

describe("Splitting Me", function () {
  beforeEach(async function () {
    const CampaignPoolSwap = await ethers.getContractFactory(
      "CampaignPoolSwap"
    );
    campaignPoolSwap = await CampaignPoolSwap.attach(CampaignPoolSwapAddress);

    const FactoryPool = await ethers.getContractFactory("FactoryPool");
    factoryPool = await FactoryPool.attach(FactoryPoolAddress);

    const USDT = await ethers.getContractFactory("USDT");
    usdt = await USDT.attach(USDTAddress);

    const Token = await ethers.getContractFactory("Token");
    token = await Token.attach(token1Address);

    [owner] = await ethers.getSigners();
    console.log("owner: ", owner.address);
    console.log("CampaignPoolSwap Contract address:", campaignPoolSwap.address);
    console.log("FactoryPool Contract address:", factoryPool.address);
    console.log("USDT Contract address:", usdt.address);
    console.log("Token Contract address:", token.address);
  });

  describe("Factory swap", function () {
    // it("Should create new CampaignPoolSwap contract", async function () {
    //   const result = await factoryPool.createNewCampaign(
    //     usdt.address,
    //     token1Address,
    //     3000,
    //     20000
    //   );
    //   console.log("result: ", result);
    // });
    // it("Should add addPoolToken ", async function () {
    //   // connect contract
    //   const CampaignPoolSwap1 = await ethers.getContractFactory(
    //     "CampaignPoolSwap"
    //   );
    //   let campaignPoolSwap1 = await CampaignPoolSwap1.attach(addressPool);
    //   console.log("campaignPoolSwap1: ", campaignPoolSwap1.address);
    //   // approve token
    //   const approve = await token.approve(
    //     campaignPoolSwap1.address,
    //     ethers.utils.parseEther("1000000")
    //   );
    //   const result = await campaignPoolSwap1.addPoolToken(
    //     token1Address,
    //     ethers.utils.parseEther("1000000")
    //   );
    //   console.log("result: ", result.hash);
    // });
    // it("Should add fram pool", async function () {
    //   // connect contract
    //   const CampaignPoolSwap1 = await ethers.getContractFactory(
    //     "CampaignPoolSwap"
    //   );
    //   let campaignPoolSwap1 = await CampaignPoolSwap1.attach(addressPool);
    //   // approve usdt
    //   const approve = await usdt.approve(
    //     campaignPoolSwap1.address,
    //     ethers.utils.parseEther("1000000")
    //   );
    //   console.log("approve: ", approve.hash);
    //   // delay 15s
    //   await new Promise((r) => setTimeout(r, 15000));
    //   // add fram pool
    //   const result = await campaignPoolSwap1.FramPool(
    //     usdt.address,
    //     ethers.utils.parseEther("1000000")
    //   );
    //   console.log("result: ", result.hash);
    // });
    // it("Shold swap usdt to token", async function () {
    //   // connect contract
    //   const CampaignPoolSwap1 = await ethers.getContractFactory(
    //     "CampaignPoolSwap"
    //   );
    //   let campaignPoolSwap1 = await CampaignPoolSwap1.attach(addressPool);
    //   // approve usdt
    //   const approve = await usdt.approve(
    //     campaignPoolSwap1.address,
    //     ethers.utils.parseEther("1000")
    //   );
    //   console.log("approve: ", approve.hash);
    //   // delay 15s
    //   await new Promise((r) => setTimeout(r, 15000));
    //   // swap usdt to token
    //   const result = await campaignPoolSwap1.swap(
    //     usdt.address,
    //     token1Address,
    //     ethers.utils.parseEther("1000")
    //   );
    //   console.log("result: ", result.hash);
    // });
    it("Shold swap token to usdt", async function () {
      // connect contract
      const CampaignPoolSwap1 = await ethers.getContractFactory(
        "CampaignPoolSwap"
      );
      let campaignPoolSwap1 = await CampaignPoolSwap1.attach(addressPool);
      console.log("campaignPoolSwap1: ", campaignPoolSwap1.address);
      // approve token
      const approve = await token.approve(
        campaignPoolSwap1.address,
        ethers.utils.parseEther("10")
      );
      console.log("approve: ", approve.hash);
      // delay 15s
      await new Promise((r) => setTimeout(r, 15000));
      // swap token to usdt
      const result = await campaignPoolSwap1.swap(
        token1Address,
        usdt.address,
        ethers.utils.parseEther("10")
      );
      console.log("result: ", result.hash);
    });
    // it("should withdraw token", async function () {
    //   // connect contract
    //   const CampaignPoolSwap1 = await ethers.getContractFactory(
    //     "CampaignPoolSwap"
    //   );
    //   let campaignPoolSwap1 = await CampaignPoolSwap1.attach(addressPool);
    //   console.log("campaignPoolSwap1: ", campaignPoolSwap1.address);
    //   // withdraw token
    //   const result = await campaignPoolSwap1.withdrawPool();
    //   console.log("result: ", result.hash);
    // });
  });
});