const HowAreWe = artifacts.require("../contracts/HowAreWe");
const PausableToken = artifacts.require("../contracts/PausableToken");

const utils = require('./helpers/Utils');

const BN = require('bignumber.js');

contract('HowAreWe', function(accounts) {

    it("Verifies that I can deploy the HowAreWe project", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4]];
        let disbursements = [10000, 25000, 30000, 25000, 10000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);
        
        let contractAdmin0 = await registry.admins(0);
        let contractAdmin1 = await registry.admins(1);
        let contractAdmin2 = await registry.admins(2);        
        
        assert(contractAdmin0 == admins[0]);
        assert(contractAdmin1 == admins[1]);
        assert(contractAdmin2 == admins[2]);
        
        let token = await registry.token();
        let tokenContract = await PausableToken.at(token);
        
        let tokenBalance0 = await tokenContract.balanceOf(contributors[0]);
        let tokenBalance1 = await tokenContract.balanceOf(contributors[1]);
        let tokenBalance2 = await tokenContract.balanceOf(contributors[2]);
        let tokenBalance3 = await tokenContract.balanceOf(contributors[3]);
        let tokenBalance4 = await tokenContract.balanceOf(contributors[4]);


        assert(parseInt(tokenBalance0, 10) == 10000);
        assert(parseInt(tokenBalance1, 10) == 25000);
        assert(parseInt(tokenBalance2, 10) == 30000);
        assert(parseInt(tokenBalance3, 10) == 25000);
        assert(parseInt(tokenBalance4, 10) == 10000);
        
        let uri = await registry.tokenURI(0);
        assert(uri == "QMblahblahblah");

    });
    it("Verifies that I can deploy the HowAreWe project with 25 people", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], 
                            accounts[1], 
                            accounts[2], 
                            accounts[3], 
                            accounts[4],
                            accounts[5], 
                            accounts[6], 
                            accounts[7], 
                            accounts[8], 
                            accounts[9],
                            accounts[0], 
                            accounts[1], 
                            accounts[2], 
                            accounts[3],
                            accounts[4], 
                            accounts[5], 
                            accounts[6], 
                            accounts[7], 
                            accounts[8],
                            accounts[9], 
                            accounts[0], 
                            accounts[1], 
                            accounts[2],
                            accounts[3], 
                            accounts[4]];
        let disbursements = [4000, 
                            4000,
                            4000, 
                            4000, 
                            4000,
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000, 
                            4000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);
    
        let contractAdmin0 = await registry.admins(0);
        let contractAdmin1 = await registry.admins(1);
        let contractAdmin2 = await registry.admins(2);        
    
        assert(contractAdmin0 == admins[0]);
        assert(contractAdmin1 == admins[1]);
        assert(contractAdmin2 == admins[2]);
    
        let token = await registry.token();
        let tokenContract = await PausableToken.at(token);
    
        let tokenBalance0 = await tokenContract.balanceOf(contributors[0]);
        let tokenBalance1 = await tokenContract.balanceOf(contributors[1]);
        let tokenBalance2 = await tokenContract.balanceOf(contributors[2]);
        let tokenBalance3 = await tokenContract.balanceOf(contributors[3]);
        let tokenBalance4 = await tokenContract.balanceOf(contributors[4]);
        let tokenBalance5 = await tokenContract.balanceOf(contributors[5]);
        let tokenBalance6 = await tokenContract.balanceOf(contributors[6]);
        let tokenBalance7 = await tokenContract.balanceOf(contributors[7]);
        let tokenBalance8 = await tokenContract.balanceOf(contributors[8]);
        let tokenBalance9 = await tokenContract.balanceOf(contributors[9]);
    
    
        assert(parseInt(tokenBalance0, 10) == 12000);
        assert(parseInt(tokenBalance1, 10) == 12000);
        assert(parseInt(tokenBalance2, 10) == 12000);
        assert(parseInt(tokenBalance3, 10) == 12000);
        assert(parseInt(tokenBalance4, 10) == 12000);
        assert(parseInt(tokenBalance5, 10) == 8000);
        assert(parseInt(tokenBalance6, 10) == 8000);
        assert(parseInt(tokenBalance7, 10) == 8000);
        assert(parseInt(tokenBalance8, 10) == 8000);
        assert(parseInt(tokenBalance9, 10) == 8000);
    
    });
    
    
    it("Verifies that I can't deploy the HowAreWe project with 0 admins", async () => {
        let admins = [];
        let contributors = [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4]];
        let disbursements = [20000, 20000, 20000, 20000, 20000];
        let videoHash = "QMblahblahblah";
        try {
            let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    });
    
    it("Verifies that I can't deploy the HowAreWe project with 0 contributors", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [];
        let disbursements = [20000, 20000, 20000, 20000, 20000];
        let videoHash = "QMblahblahblah";
        try {
            let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    });
    
    it("Verifies that I can't deploy the HowAreWe project with an incorrect number of disbursements", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4]];
        let disbursements = [20000, 20000, 20000, 20000, 20000, 20000];
        let videoHash = "QMblahblahblah";
        try {
            let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    });
    
    it("Verifies that I can pause the tokens as an admin", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [5000, 5000, 5000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        let daiToken = await PausableToken.new("FakeDAI", "DAI", accounts[0], 1000000);
        let laiToken = await PausableToken.new("FakeDAI", "LAI", accounts[0], 1000000);
        let kaiToken = await PausableToken.new("FakeDAI", "KAI", accounts[0], 1000000);
        let maiToken = await PausableToken.new("FakeDAI", "MAI", accounts[0], 1000000);
    
        await registry.pauseTokens(1, [daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[1]});
    
        let paused = await howToken.paused();
        assert(paused == true);
        try {
            await howToken.transfer(accounts[2], 100);
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    
    });
    
    it("Verifies that I can't pause the tokens as a non-admin", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [5000, 5000, 5000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        let daiToken = await PausableToken.new("FakeDAI", "DAI", accounts[0], 1000000);
        let laiToken = await PausableToken.new("FakeDAI", "LAI", accounts[0], 1000000);
        let kaiToken = await PausableToken.new("FakeDAI", "KAI", accounts[0], 1000000);
        let maiToken = await PausableToken.new("FakeDAI", "MAI", accounts[0], 1000000);
    

        try {
            await registry.pauseTokens(1, [daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[4]});
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    
    });
    
    it("Verifies that I can pause the tokens as an admin with correct balances stored", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [5000, 5000, 5000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        let daiToken = await PausableToken.new("FakeDAI", "DAI", accounts[0], 1000000);
        let laiToken = await PausableToken.new("FakeDAI", "LAI", accounts[0], 1000000);
        let kaiToken = await PausableToken.new("FakeDAI", "KAI", accounts[0], 1000000);
        let maiToken = await PausableToken.new("FakeDAI", "MAI", accounts[0], 1000000);
    
        await daiToken.transfer(registry.address, 123);
        await laiToken.transfer(registry.address, 456);
        await kaiToken.transfer(registry.address, 789);
        await maiToken.transfer(registry.address, 1011);
        
        let actualDaiBalance = await daiToken.balanceOf(registry.address);
        assert(parseInt(actualDaiBalance, 10) == 123);
        await registry.pauseTokens(1, [daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[1]});
    
        let savedBalanceDai = await registry.getSavedBalance(0, daiToken.address);
        let savedBalanceLai = await registry.getSavedBalance(0, laiToken.address);
        let savedBalanceKai = await registry.getSavedBalance(0, kaiToken.address);
        let savedBalanceMai = await registry.getSavedBalance(0, maiToken.address);
        
        assert(parseInt(savedBalanceDai, 10) == 123);
        assert(parseInt(savedBalanceLai, 10) == 456);
        assert(parseInt(savedBalanceKai, 10) == 789);
        assert(parseInt(savedBalanceMai, 10) == 1011);
    });
    
    it("Verifies that I can pause the tokens and pay out the correct balances to token holders", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [60000, 30000, 10000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        let daiToken = await PausableToken.new("FakeDAI", "DAI", accounts[5], 1000000);
        let laiToken = await PausableToken.new("FakeDAI", "LAI", accounts[5], 1000000);
        let kaiToken = await PausableToken.new("FakeDAI", "KAI", accounts[5], 1000000);
        let maiToken = await PausableToken.new("FakeDAI", "MAI", accounts[5], 1000000);
    
        await daiToken.transfer(registry.address, 10, {from: accounts[5]});
        await laiToken.transfer(registry.address, 100, {from: accounts[5]});
        await kaiToken.transfer(registry.address, 1000, {from: accounts[5]});
        await maiToken.transfer(registry.address, 10000, {from: accounts[5]});
        
        await registry.pauseTokens(1, [daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[1]});
        
        await registry.payoutTokens(1, [accounts[0], accounts[1], accounts[2]], [daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[1]});
        
        let daiLeftover = await daiToken.balanceOf(registry.address);
        let laiLeftover = await laiToken.balanceOf(registry.address);
        let kaiLeftover = await kaiToken.balanceOf(registry.address);
        let maiLeftover = await maiToken.balanceOf(registry.address);
        
        assert(parseInt(daiLeftover, 10) == 0);
        assert(parseInt(laiLeftover, 10) == 0);
        assert(parseInt(kaiLeftover, 10) == 0);
        assert(parseInt(maiLeftover, 10) == 0);
        
        let daiBalance0 = await daiToken.balanceOf(accounts[0]);
        let daiBalance1 = await daiToken.balanceOf(accounts[1]);
        let daiBalance2 = await daiToken.balanceOf(accounts[2]);
        
        let laiBalance0 = await laiToken.balanceOf(accounts[0]);
        let laiBalance1 = await laiToken.balanceOf(accounts[1]);
        let laiBalance2 = await laiToken.balanceOf(accounts[2]);
        
        let kaiBalance0 = await kaiToken.balanceOf(accounts[0]);
        let kaiBalance1 = await kaiToken.balanceOf(accounts[1]);
        let kaiBalance2 = await kaiToken.balanceOf(accounts[2]);
        
        let maiBalance0 = await maiToken.balanceOf(accounts[0]);
        let maiBalance1 = await maiToken.balanceOf(accounts[1]);
        let maiBalance2 = await maiToken.balanceOf(accounts[2]);
        
        assert(parseInt(daiBalance0, 10) == 6, 'actual balance:'+ daiBalance0);
        assert(parseInt(daiBalance1, 10) == 3);
        assert(parseInt(daiBalance2, 10) == 1);
        
        assert(parseInt(laiBalance0, 10) == 60);
        assert(parseInt(laiBalance1, 10) == 30);
        assert(parseInt(laiBalance2, 10) == 10);
        
        assert(parseInt(kaiBalance0, 10) == 600);
        assert(parseInt(kaiBalance1, 10) == 300);
        assert(parseInt(kaiBalance2, 10) == 100);
        
        assert(parseInt(maiBalance0, 10) == 6000);
        assert(parseInt(maiBalance1, 10) == 3000);
        assert(parseInt(maiBalance2, 10) == 1000);
        
        await registry.resumeTokens(1, {from: accounts[1]});
        
        let tokensPaused = await howToken.paused();
        assert(!tokensPaused);
        howToken.transfer(accounts[5], 100, {from: accounts[2]});
    });
    
    it("Verifies that I can transfer the HOWNFT to a new owner", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [5000, 5000, 5000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        
        let owner = await registry.ownerOf(0);

        assert(owner == registry.address, 'actual owner: '+owner);
        await registry.transferVideoNFT(1, accounts[5], {from: accounts[1]});
        
        owner = await registry.ownerOf(0);

        assert(owner == accounts[5]);
    });
    
    it("Verifies that I can't transfer the HOWNFT to a new owner if it's already been transferred", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [5000, 5000, 5000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        
        let owner = await registry.ownerOf(0);

        assert(owner == registry.address);
        await registry.transferVideoNFT(1, accounts[5], {from: accounts[1]});
        
        owner = await registry.ownerOf(0);

        assert(owner == accounts[5]);
        
        try {
            await registry.transferVideoNFT(1, accounts[5], {from: accounts[1]});
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    });
    
    it("Verifies that I can't transfer the HOWNFT to a new owner as a non-admin", async () => {
        let admins = [accounts[0], accounts[1], accounts[2]];
        let contributors = [accounts[0], accounts[1], accounts[2]];
        let disbursements = [5000, 5000, 5000];
        let videoHash = "QMblahblahblah";
        let registry = await HowAreWe.new(admins, contributors, disbursements, videoHash);             
        let token = await registry.token();
        let howToken = await PausableToken.at(token);
        
        let owner = await registry.ownerOf(0);

        assert(owner == registry.address);
        
        try {
            await registry.transferVideoNFT(1, accounts[5], {from: accounts[3]});
        } catch (error){
            return utils.ensureException(error);
        }
        assert(false, "Should have thrown an error");
    });
    
  // 
  // 
  // 
  // 
  // 
  // 
  // 
  // it("[ETH] Verifies that the StandardBounties registry works", async () => {
  // 
  //   let registry = await StandardBounties.new();
  // 
  // });
  // 
  // it("[ETH] Verifies that I can issue a bounty paying in ETH without locking up funds", async () => {
  // 
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   let total = await registry.numBounties();
  // 
  //   assert(parseInt(total, 10) == 1, parseInt(total, 10));
  // 
  // });
  // 
  // it("[ETH] Verifies that I can issue a bounty paying in ETH while locking up funds", async () => {
  // 
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 1, {value: 1, from: accounts[0]});
  // 
  //   let total = await registry.numBounties();
  // 
  //   assert(parseInt(total, 10) == 1, parseInt(total, 10));
  // 
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 1);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't issue a bounty contributing more than the deposit amount", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   try {
  //     await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 1, {value: 10});
  // 
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't issue a bounty contributing less than the deposit amount", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   try {
  //     await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 1});
  // 
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can contribute to a bounty in ETH", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 1, {value: 1});
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 2);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't contribute to a bounty which is out of bounds", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   try {
  //     await registry.contribute(accounts[0], 1, 1, {value: 1});
  // 
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't contribute to a bounty and send less than the deposit amount", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   try {
  //     await registry.contribute(accounts[0], 0, 10, {value: 1});
  // 
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that contributing emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1}).then((status) => {
  //     assert.strictEqual('ContributionAdded', status.logs[0].event, 'did not emit the ContributionAdded event');
  //   });
  // 
  // });
  // 
  // it("[ETH] Verifies that I can refund a contribution in ETH", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 1);
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  // 
  //   await registry.refundContribution(accounts[0], 0,0);
  // 
  //   bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 0);
  // });
  // 
  // it("[ETH] Verifies that I can't refund a contribution to a bounty which is out of bounds", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   try {
  //     await registry.refundContribution(accounts[0], 1, 0);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't refund a contribution which is out of bounds", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  // 
  //   try {
  //     await registry.refundContribution(accounts[0], 0, 1);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't refund a contribution which isn't mine", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {from: accounts[0], value: 1});
  //   await registry.contribute(accounts[1], 0, 1, {from: accounts[1], value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   try {
  //     await registry.refundContribution(accounts[1], 0,0, {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't refund a contribution which has already been refunded", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   await registry.refundContribution(accounts[0], 0, 0);
  // 
  //   try {
  //     await registry.refundContribution(accounts[0], 0, 0);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't refund a contribution before the deadline has elapsed", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  // 
  //   try {
  //     await registry.refundContribution(accounts[0], 0, 0);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that refunding a contribution emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 1);
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   await registry.refundContribution(accounts[0], 0, 0).then((status) => {
  //     assert.strictEqual('ContributionRefunded', status.logs[0].event, 'did not emit the ContributionRefunded event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can refund all of my contributions", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   await registry.refundMyContributions(accounts[0], 0, [0, 1, 2]);
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 0);
  // });
  // 
  // it("[ETH] Verifies that I can't refund contributions if one of them isn't mine", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[1], 0, 1, {value: 1, from: accounts[1]});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   try {
  //     await registry.refundMyContributions(accounts[0], 0, [0, 1, 2]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can refund a set of contributions as an issuer", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   await registry.refundContributions(accounts[0], 0, 0, [0, 1, 2]);
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 0);
  // });
  // 
  // it("[ETH] Verifies that I can't refund contributions if I'm not an issuer", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[2]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.refundContributions(accounts[0], 0, 0, [0, 1, 2]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't refund contributions for an invalid bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.refundContributions(accounts[0], 1, 0, [0, 1, 2]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't refund contributions with an out of bounds contribution ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.refundContributions(accounts[0], 0, 0, [0, 1, 4]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't refund contributions when one of them has been refunded already", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   await registry.refundContribution(accounts[0], 0, 0);
  // 
  //   try {
  //     await registry.refundContributions(accounts[0], 0, 0, [0, 1, 2]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that refunding several contributions emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   await registry.refundContributions(accounts[0], 0, 0, [0, 1, 2]).then((status) => {
  //     assert.strictEqual('ContributionsRefunded', status.logs[0].event, 'did not emit the ContributionsRefunded event');
  //   });
  // 
  // });
  // 
  // 
  // it("[ETH] Verifies that I can drain my bounty", async () => {
  //   let registry = await StandardBounties.new();
  //   await registry.issueBounty(accounts[0], [accounts[3]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 1);
  // 
  //   await registry.drainBounty(accounts[3], 0, 0, [1], {from: accounts[3]});
  // 
  //   let newBounty = await registry.bounties(0);
  // 
  //   assert(parseInt(newBounty.balance, 10) == 0);
  // });
  // 
  // it("[ETH] Verifies that I can drain a bounty as a 2nd issuer", async () => {
  //   let registry = await StandardBounties.new();
  //   await registry.issueBounty(accounts[0], [accounts[3], accounts[1]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   let bounty = await registry.bounties(0);
  // 
  //   assert(parseInt(bounty.balance, 10) == 1);
  // 
  //   await registry.drainBounty(accounts[1], 0, 1, [1], {from: accounts[1]});
  // 
  //   let newBounty = await registry.bounties(0);
  // 
  //   assert(parseInt(newBounty.balance, 10) == 0);
  // });
  // 
  // it("[ETH] Verifies that I can't drain someone else's bounty", async () => {
  //   let registry = await StandardBounties.new();
  //   await registry.issueBounty(accounts[0], [accounts[3]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.drainBounty(accounts[1], 0, 0, [1], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't drain a bounty without passing in an array of correct length", async () => {
  //   let registry = await StandardBounties.new();
  //   await registry.issueBounty(accounts[0], [accounts[3]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.drainBounty(accounts[3], 0, 0, [1, 1], {from: accounts[3]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't drain a bounty of more funds than its balance", async () => {
  //   let registry = await StandardBounties.new();
  //   await registry.issueBounty(accounts[0], [accounts[3]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.drainBounty(accounts[3], 0, 0, [2], {from: accounts[3]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that draining a bounty emits an event", async () => {
  //   let registry = await StandardBounties.new();
  //   await registry.issueBounty(accounts[0], [accounts[3]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   await registry.drainBounty(accounts[3], 0, 0, [1], {from: accounts[3]}).then((status) => {
  //     assert.strictEqual('BountyDrained', status.logs[0].event, 'did not emit the BountyDrained event');
  //   });
  // 
  // });
  // 
  // it("[ETH] Verifies that I can perform an action for a bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.performAction(accounts[0], 0, "actionData");
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't perform an action for an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   try {
  //     await registry.performAction(accounts[0], 1, "actionData");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that performing an action emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.performAction(accounts[0], 0, "actionData").then((status) => {
  //     assert.strictEqual('ActionPerformed', status.logs[0].event, 'did not emit the ActionPerformed event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can fulfill a bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   let bounty = await registry.getBounty(0);
  //   assert(bounty.fulfillments.length == 1);
  //   assert(bounty.fulfillments[0].fulfillers[0] == accounts[1]);
  //   assert(bounty.fulfillments[0].fulfillers[1] == accounts[2]);
  //   assert(bounty.fulfillments[0].submitter == accounts[0]);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't fulfill an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   try {
  //     await registry.fulfillBounty(accounts[0], 1, [accounts[1], accounts[2]], "data");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't fulfill a bounty after the deadline has elapsed", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 1, "0x0000000000000000000000000000000000000000", 0, 1, {value: 1});
  // 
  //   try {
  //     await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't fulfill a bounty with 0 fulfillers", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   try {
  //     await registry.fulfillBounty(accounts[0], 0, [], "data");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that fulfilling a bounty emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data").then((status) => {
  //     assert.strictEqual('BountyFulfilled', status.logs[0].event, 'did not emit the BountyFulfilled event');
  //   });
  // 
  // });
  // 
  // it("[ETH] Verifies that I can update a fulfillment", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   await registry.updateFulfillment(accounts[0], 0, 0, [accounts[3], accounts[4]], "data2");
  // 
  //   let bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.fulfillments.length == 1);
  //   assert(bounty.fulfillments[0].fulfillers[0] == accounts[3]);
  //   assert(bounty.fulfillments[0].fulfillers[1] == accounts[4]);
  //   assert(bounty.fulfillments[0].submitter == accounts[0]);
  // 
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't update a fulfillment for an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.updateFulfillment(accounts[0], 1, 0, [accounts[3], accounts[4]], "data2");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't update an out of bounds fulfillment", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.updateFulfillment(accounts[0], 0, 1, [accounts[3], accounts[4]], "data2");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't update a fulfillment which was submitted by someone else", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.updateFulfillment(accounts[0], 0, 0, [accounts[3], accounts[4]], "data2", {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that updating a fulfillment emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   await registry.updateFulfillment(accounts[0], 0, 0, [accounts[3], accounts[4]], "data2").then((status) => {
  //     assert.strictEqual('FulfillmentUpdated', status.logs[0].event, 'did not emit the FulfillmentUpdated event');
  //   });
  // 
  // });
  // 
  // it("[ETH] Verifies that I can accept a fulfillment as an issuer", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[5], accounts[6]], "data");
  // 
  //   var balanceBefore = await web3.eth.getBalance(accounts[5]);
  //   var balanceBefore2 = await web3.eth.getBalance(accounts[6]);
  // 
  //   await registry.acceptFulfillment(accounts[0], 0, 0, 0,[5,5])
  // 
  //   var balanceAfter = await web3.eth.getBalance(accounts[5]);
  //   var balanceAfter2 = await web3.eth.getBalance(accounts[6]);
  // 
  //   assert((parseInt(balanceBefore, 10) + 5) == parseInt(balanceAfter, 10), ("before: " + balanceBefore + " after: " + balanceAfter));
  //   assert((parseInt(balanceBefore2, 10) + 5) == parseInt(balanceAfter2, 10), ("before2: " + balanceBefore2 + " after2: " + balanceAfter2));
  // 
  // });
  // 
  // it("[ETH] Verifies that I can accept a fulfillment paying different amounts to different fulfillers", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   var balanceBefore = await web3.eth.getBalance(accounts[5]);
  //   var balanceBefore2 = await web3.eth.getBalance(accounts[6]);
  // 
  //   await registry.acceptFulfillment(accounts[0], 0, 0, 0,[2,8]);
  // 
  //   var balanceAfter = await web3.eth.getBalance(accounts[5]);
  //   var balanceAfter2 = await web3.eth.getBalance(accounts[6]);
  // 
  //   assert((parseInt(balanceBefore, 10) + 2) == parseInt(balanceAfter, 10), ("before: " + balanceBefore + " after: " + balanceAfter));
  //   assert((parseInt(balanceBefore2, 10) + 8) == parseInt(balanceAfter2, 10), ("before: " + balanceBefore2 + " after: " + balanceAfter2));
  // });
  // 
  // it("[ETH] Verifies that I can accept a fulfillment as an approver", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[5], accounts[6]], "data");
  // 
  //   var balanceBefore = await web3.eth.getBalance(accounts[5]);
  //   var balanceBefore2 = await web3.eth.getBalance(accounts[6]);
  // 
  //   await registry.acceptFulfillment(accounts[1], 0, 0, 1,[5,5], {from: accounts[1]})
  // 
  //   var balanceAfter = await web3.eth.getBalance(accounts[5]);
  //   var balanceAfter2 = await web3.eth.getBalance(accounts[6]);
  // 
  //   assert((parseInt(balanceBefore, 10) + 5) == parseInt(balanceAfter, 10));
  //   assert((parseInt(balanceBefore2, 10) + 5) == parseInt(balanceAfter2, 10));
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't accept a fulfillment on an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.acceptFulfillment(accounts[0], 1,0,0,[2,8], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't accept a fulfillment which is out of bounds", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.acceptFulfillment(accounts[1], 0,1,0,[2,8], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't accept a fulfillment if I'm not an approver", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.acceptFulfillment(accounts[3], 0,0,0,[2,8], {from: accounts[3]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't accept a fulfillment by passing in the wrong number of token amounts corresponding to the number of fulfillers", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.acceptFulfillment(accounts[0], 0,0,0,[2], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't accept a fulfillment paying out more than the balance of my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   try {
  //     await registry.acceptFulfillment(accounts[1], 0,0,0,[2,18], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that accepting a fulfillment emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   await registry.acceptFulfillment(accounts[1], 0,0,0,[2,8], {from: accounts[1]}).then((status) => {
  //     assert.strictEqual('FulfillmentAccepted', status.logs[0].event, 'did not emit the FulfillmentAccepted event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can fulfill and accept a bounty simultaneously", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   var balanceBefore = await web3.eth.getBalance(accounts[1]);
  //   var balanceBefore2 = await web3.eth.getBalance(accounts[2]);
  // 
  //   await registry.fulfillAndAccept(accounts[0], 0, [accounts[1], accounts[2]], "data", 0, [2, 8]);
  // 
  //   var balanceAfter = await web3.eth.getBalance(accounts[1]);
  //   var balanceAfter2 = await web3.eth.getBalance(accounts[2]);
  // 
  //   assert(parseInt(balanceBefore, 10) == (parseInt(balanceAfter, 10) + 2));
  //   assert(parseInt(balanceBefore2, 10) == (parseInt(balanceAfter2, 10) + 8));
  // 
  // });
  // 
  // it("[ETH] Verifies that I can change all of a bounty's info", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.changeBounty(accounts[0], 0, 0, [accounts[5]], [accounts[6], accounts[7]], "data2", 2528821200);
  // 
  //   var bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.issuers[0] === accounts[5]);
  //   assert(bounty.approvers[0] === accounts[6]);
  //   assert(bounty.approvers[1] === accounts[7]);
  //   assert(bounty.deadline == 2528821200);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't change an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   try {
  //     await registry.changeBounty(accounts[0], 1, 0, [accounts[5]], [accounts[6], accounts[7]], "data2", 2528821200);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't change a bounty if I'm not an issuer'", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   try {
  //     await registry.changeBounty(accounts[1], 0, 0, [accounts[5]], [accounts[6], accounts[7]], "data2", 2528821200, {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can change the issuer of my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.changeIssuer(accounts[0], 0, 0, 0, accounts[1]);
  // 
  //   var bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.issuers[0] === accounts[1]);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't change the issuer of an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeIssuer(accounts[0], 1, 0, 0, accounts[1]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't change the issuer of a bounty if I didn't issue it", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeIssuer(accounts[1], 0, 0, 0, accounts[1], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't the issuer with an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeIssuer(accounts[0], 0, 1, 0, accounts[1], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't the issuer changing an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeIssuer(accounts[0], 0, 0, 1, accounts[1], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that changing a bounty's issuer emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.changeIssuer(accounts[0], 0, 0, 0, accounts[1]).then((status) => {
  //     assert.strictEqual('BountyIssuersUpdated', status.logs[0].event, 'did not emit the BountyIssuersUpdated event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can change the approver of my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.changeApprover(accounts[0], 0, 0, 0, accounts[5]);
  // 
  //   var bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.approvers[0] === accounts[5]);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't change the approver of an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeApprover(accounts[0], 1, 0, 0, accounts[5]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't change the approver of a bounty if I didn't issue it", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeApprover(accounts[1], 0, 0, 0, accounts[5], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't the issuer with an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeApprover(accounts[0], 0, 1, 0, accounts[5], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't the issuer changing an out of bounds approver ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeApprover(accounts[0], 0, 0, 2, accounts[5], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that changing a bounty's approver emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.changeApprover(accounts[0], 0, 0, 0, accounts[5]).then((status) => {
  //     assert.strictEqual('BountyApproversUpdated', status.logs[0].event, 'did not emit the BountyApproversUpdated event');
  //   });
  // });
  // 
  // 
  // it("[ETH] Verifies that I can change the data of my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.changeData(accounts[0], 0, 0, "data2").then((status) => {
  //     assert.strictEqual('data2',  status.logs[0].args[2]);
  //   });
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't change the data of an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeData(accounts[0], 1, 0, "data2");
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't change the data of a bounty if I didn't issue it", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeData(accounts[1], 0, 0, "data2", {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't change the data with an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeData(accounts[0], 0, 1, "data2", {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that changing a bounty's data emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.changeData(accounts[0], 0, 0, "data2").then((status) => {
  //     assert.strictEqual('BountyDataChanged', status.logs[0].event, 'did not emit the BountyDataChanged event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can change the deadline of my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, 2628821098);
  // 
  //   var bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.deadline == 2628821098);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't change the deadline of an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeDeadline(accounts[0], 1, 0, 2628821098);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't change the deadline of a bounty if I didn't issue it", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeDeadline(accounts[1], 0, 0, 2628821098, {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't change the deadline with an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.changeDeadline(accounts[0], 0, 1, 2628821098, {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that changing a bounty's deadline emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, 2628821098).then((status) => {
  //     assert.strictEqual('BountyDeadlineChanged', status.logs[0].event, 'did not emit the BountyDeadlineChanged event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can add issuers to my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.addIssuers(accounts[0], 0, 0, [accounts[5], accounts[6]]);
  // 
  //   var bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.issuers[1] == accounts[5]);
  //   assert(bounty.issuers[2] == accounts[6]);
  // 
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't add issuers to an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.addIssuers(accounts[0], 1, 0, [accounts[5], accounts[6]]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't add issuers to a bounty if I didn't issue it", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.addIssuers(accounts[1], 0, 0, [accounts[5], accounts[6]], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't add issuers with an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.addIssuers(accounts[0], 0, 1, [accounts[5], accounts[6]], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that adding issuers to a bounty emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.addIssuers(accounts[0], 0, 0, [accounts[5], accounts[6]]).then((status) => {
  //     assert.strictEqual('BountyIssuersUpdated', status.logs[0].event, 'did not emit the BountyIssuersUpdated event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can add approvers to my bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  // 
  //   await registry.addApprovers(accounts[0], 0, 0, [accounts[5], accounts[6]]);
  // 
  //   var bounty = await registry.getBounty(0);
  // 
  //   assert(bounty.approvers[2] == accounts[5]);
  //   assert(bounty.approvers[3] == accounts[6]);
  // 
  // });
  // 
  // it("[ETH] Verifies that I can't add approvers to an out of bounds bounty", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.addApprovers(accounts[0], 1, 0, [accounts[5], accounts[6]]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't add approvers to a bounty if I didn't issue it", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.addApprovers(accounts[1], 0, 0, [accounts[5], accounts[6]], {from: accounts[1]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that I can't add approvers with an out of bounds issuer ID", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   try {
  //     await registry.addApprovers(accounts[0], 0, 1, [accounts[5], accounts[6]], {from: accounts[0]});
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // 
  // it("[ETH] Verifies that adding approvers to a bounty emits an event", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueAndContribute(accounts[0], [accounts[0]], [accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0, 10, {value: 10});
  // 
  //   await registry.addApprovers(accounts[0], 0, 0, [accounts[5], accounts[6]]).then((status) => {
  //     assert.strictEqual('BountyApproversUpdated', status.logs[0].event, 'did not emit the BountyApproversUpdated event');
  //   });
  // });
  // 
  // it("[ETH] Verifies that I can't accept a fulfillment, and still try to refund everyone's contributions", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   await registry.acceptFulfillment(accounts[0], 0, 0, 0, [1,1]);
  // 
  //   try {
  //     await registry.refundContributions(accounts[0], 0, 0, [0, 1, 2]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  //   assert(false, "Should have thrown an error");
  // });
  // it("[ETH] Verifies that I can accept a fulfillment, and still try to refund some contributions", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  // 
  //   await registry.fulfillBounty(accounts[0], 0, [accounts[1], accounts[2]], "data");
  // 
  //   await registry.acceptFulfillment(accounts[0], 0, 0, 0,[1,1]);
  // 
  //   await registry.refundContributions(accounts[0], 0, 0, [0, 1, 2]);
  // });
  // 
  // it("[ETH] Verifies that I can refund a contribution, and still drain the remaining funds", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   await registry.refundContribution(accounts[0], 0,0);
  // 
  //   await registry.drainBounty(accounts[0], 0, 0, [4]);
  // });
  // 
  // it("[ETH] Verifies that I can't refund a contribution, and still drain all of the funds", async () => {
  //   let registry = await StandardBounties.new();
  // 
  //   await registry.issueBounty(accounts[0], [accounts[0]], [accounts[0], accounts[1], accounts[2]], "data", 2528821098, "0x0000000000000000000000000000000000000000", 0);
  // 
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  //   await registry.contribute(accounts[0], 0, 1, {value: 1});
  // 
  //   var block = await web3.eth.getBlock('latest');
  // 
  //   await registry.changeDeadline(accounts[0], 0, 0, parseInt(block.timestamp, 10) - 10);
  // 
  //   await registry.refundContribution(accounts[0], 0,0);
  // 
  //   try {
  //     await registry.drainBounty(accounts[0], 0, 0, [5]);
  //   } catch (error){
  //     return utils.ensureException(error);
  //   }
  // });
});
