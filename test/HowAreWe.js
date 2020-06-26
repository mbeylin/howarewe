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
        await registry.send(10, {from: accounts[5]});
        
        await registry.pauseTokens(1, ['0x0000000000000000000000000000000000000000', daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[1]});
        
        await registry.payoutTokens(1, [accounts[0], accounts[1], accounts[2]], ['0x0000000000000000000000000000000000000000', daiToken.address, laiToken.address, kaiToken.address, maiToken.address], {from: accounts[1]});
        
        let daiLeftover = await daiToken.balanceOf(registry.address);
        let laiLeftover = await laiToken.balanceOf(registry.address);
        let kaiLeftover = await kaiToken.balanceOf(registry.address);
        let maiLeftover = await maiToken.balanceOf(registry.address);
        let ethLeftover = await web3.eth.getBalance(registry.address);
        
        assert(parseInt(daiLeftover, 10) == 0);
        assert(parseInt(laiLeftover, 10) == 0);
        assert(parseInt(kaiLeftover, 10) == 0);
        assert(parseInt(maiLeftover, 10) == 0);
        assert(parseInt(ethLeftover, 10) == 0);

        
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
});
