var BundleTokens = artifacts.require("BundleTokens.sol");
var BundleToken1 = artifacts.require("BundleToken1.sol");
var BundleToken2 = artifacts.require("BundleToken2.sol");
var fs = require('fs');
var code1 = fs.readFileSync('token1.js');
var code2 = fs.readFileSync('token2.js');

let token1Address=code1.toString();
let token2Address=code2.toString();


contract('TestBundleTokens', async (accounts) =>{

    it("Testing", async () => {

        let admin = accounts[0];
        let bundleowner = accounts[1];
        let subscriber = accounts[2];

        let token1 = await BundleToken1.deployed();
        let token2 = await BundleToken2.deployed();
        let bundletokens = await BundleTokens.deployed();

        let ownertoken1 = await token1.balanceOf(bundleowner);
        let ownertoken2 = await token2.balanceOf(bundleowner);
        let subscribertoken1 = await token1.balanceOf(subscriber);
        let subscribertoken2 = await token2.balanceOf(subscriber);
        let admintoken1 = await token1.balanceOf(admin,{from:admin});
        let admintoken2 = await token2.balanceOf(admin,{from:admin});
        let name1 = await token1.name();
        let name2 = await token2.name();
        console.log("admin: ", name1, admintoken1.toNumber(), name2, admintoken2.toNumber());
        console.log("owner: ", name1, ownertoken1.toNumber(), name2, ownertoken2.toNumber());
        console.log("subscriber: ", name1, subscribertoken1.toNumber(), name2, subscribertoken2.toNumber());

        let  mintime=0;
        let  bonus=30;
        let  minbalance1=3;
        let  minbalance2=3;
        await bundletokens.registerBundle(mintime,bonus,minbalance1,minbalance2,token1Address,token2Address,{from:bundleowner});
        let nbundles=await bundletokens.getBundleCount.call();
        let bundleId=nbundles.toNumber()-1;
        let bonus1=await bundletokens.getBundleBonus.call(bundleId);

        console.log("bundles:",bundleId,"bonus:",bonus1.toNumber());

        await token1.approve(bundletokens.address,10,{from:admin});

        await bundletokens.setAddr(token1.address,{from:admin});

        console.log("contract1 address ", token1.address);
        console.log("contract2 address ", token2.address);

        await bundletokens.depositToken(2,{from:admin});

        ownertoken1 = await token1.balanceOf(bundleowner);
        ownertoken2 = await token2.balanceOf(bundleowner);
        subscribertoken1 = await token1.balanceOf(subscriber);
        subscribertoken2 = await token2.balanceOf(subscriber);
        admintoken1 = await token1.balanceOf(admin,{from:admin});
        admintoken2 = await token2.balanceOf(admin,{from:admin});
        let contracttokenbalance1 = await token1.balanceOf(bundletokens.address,{from:admin});
        let contracttokenbalance2 = await token2.balanceOf(bundletokens.address,{from:admin});
        name1 = await token1.name();
        name2 = await token2.name();
        console.log("admin: ", name1, admintoken1.toNumber(), name2, admintoken2.toNumber());
        console.log("owner: ", name1, ownertoken1.toNumber(), name2, ownertoken2.toNumber());
        console.log("subscriber: ", name1, subscribertoken1.toNumber(), name2, subscribertoken2.toNumber());
        console.log("contract: ", name1, contracttokenbalance1.toNumber(), name2, contracttokenbalance2.toNumber());

    });

});
