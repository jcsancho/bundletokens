var BundleTokens = artifacts.require("BundleTokens.sol");
var BundleToken1 = artifacts.require("BundleToken1.sol");
var BundleToken2 = artifacts.require("BundleToken2.sol");
var fs = require('fs');
var code1 = fs.readFileSync('token1.js');
var code2 = fs.readFileSync('token2.js');

let token1Address=code1.toString();
let token2Address=code2.toString();


contract('TestBundleTokens', async (accounts) =>{

    it("Check enough balances for admin, owner, and subscriber", async () => {

        let admin = accounts[0];
        let bundleowner = accounts[1];
        let subscriber = accounts[2];
        let contract1=accounts[3];
       // console.log(bundleowner);

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

        assert.equal(admintoken1.toNumber(), 1000, 'Admin has Bundle tokens1');
        assert.equal(ownertoken1.toNumber(), 1000, 'Owner has Bundle tokens1');
        assert.equal(subscribertoken1.toNumber(), 1000, 'Subscriber has Bundle tokens1');

    });


    it("Admin should register a bundle owner", async () => {
        let admin = accounts[0];
        let bundleowner = accounts[1];
        let subscriber = accounts[2];

        let bundletokens = await BundleTokens.deployed();
        await bundletokens.registerOwner(bundleowner);
        let success= await bundletokens.checkOwner.call({from:bundleowner});
        assert.equal(success, true, 'Bundle owner has been registered successfully');

  });


  it('Bundle Owner should create a bundle' , async () => {
        let admin = accounts[0];
        let bundleowner = accounts[1];
        let subscriber = accounts[2];

        let bundletokens = await BundleTokens.deployed();
        let  mintime=0;
        let  bonus=30;
        let  minbalance1=3;
        let  minbalance2=3;
        let token1symbol=token1Address;
        let token2symbol=token2Address;
        //let addr=await bundletokens.checksender.call(1,{from:admin});
      //console.log("sender: ", addr);
        await bundletokens.registerBundle(mintime,bonus,minbalance1,minbalance2,token1Address,token2Address,{from:bundleowner});
        let nbundles=await bundletokens.getBundleCount.call();
        let bundleId=nbundles.toNumber()-1;
        let bonus1=await bundletokens.getBundleBonus.call(bundleId);
        let time1=await bundletokens.getBundleTime.call(bundleId);
        let balance1=await bundletokens.getBundleBalance1.call(bundleId);
        //console.log("bundles:",bundleId,"bonus:",bonus1.toNumber(),"time:",time1.toNumber(),"balance1",balance1.toNumber());
        assert.equal(nbundles.toNumber(), 1, 'Bundle has been created successfully');
    });


    it('Subscriber should register to a bundle ', async () => {
        let admin = accounts[0];
        let bundleowner = accounts[1];
        let subscriber = accounts[2];
        let token1 = await BundleToken1.deployed();
        let token2 = await BundleToken2.deployed();
        let bundletokens = await BundleTokens.deployed();
        let subscribertoken1 = await token1.balanceOf(subscriber);
        let subscribertoken2 = await token2.balanceOf(subscriber);
        let name1 = await token1.name();
        let name2 = await token2.name();
       // console.log("subscriber: ", name1, subscribertoken1.toNumber(), name2, subscribertoken2.toNumber());
        let  name="BT1-BT2";
        let  mintime=0;
        let  bonus=1;
        let  minbalance1=10;
        let  minbalance2=10;
        let  token1symbol=token1Address;
        let  token2symbol=token2Address;
        let nbundles=await bundletokens.getBundleCount.call();
        let bundleId=nbundles.toNumber()-1;
        let b1= await bundletokens.checkBalance(bundleId,{from:subscriber});
       // console.log("bundle Count:", nbundles.toNumber(), "balance:",b1.toNumber());

        await bundletokens.registerSubscriber(bundleId,{from:subscriber});
        let nsubscribers=await bundletokens.getSubscriberCount.call(bundleId);
        //console.log("nsubscriber",nsubscribers.toNumber(),bundleId);
        assert.equal(nsubscribers.toNumber(), 1, 'Subscriber has been registered successfully');
    });



    it('Subscriber should claim a boundle bonus after the required time', async () => {
        let admin = accounts[0];
        let bundleowner = accounts[1];
        let subscriber = accounts[2];
        let contractaddr=accounts[3];

        let bundletokens = await BundleTokens.deployed(contractaddr);
        let token1 = await BundleToken1.deployed();
        let token2 = await BundleToken2.deployed();
        await bundletokens.registerOwner(bundleowner);
        let  name="BT1-BT2";
        let  mintime=0;
        let  bonus=1;
        let  minbalance1=10;
        let  minbalance2=10;
        let nbundles=await bundletokens.getBundleCount.call();
        let bundleId=nbundles.toNumber()-1;
        await bundletokens.registerSubscriber(bundleId,{from:subscriber});
        await bundletokens.subscriberClaim(bundleId,{from:subscriber});
        let success3=await bundletokens.checkSubscriberClaim({from:subscriber});
        assert.equal(success3, true, 'Subscriber has been claimed successfully');
    });


});
