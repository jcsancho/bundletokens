# bundletokens

Description
-----------
It is an DApp that allows you to get bonuses for holding several ERC20 tokens
together for a certain amount of time, we call this a bundle.
There is a central page where you can see a list of bundles that shows the requirements
to get the tokens. In order to get bonuses, basically, you need to hold for a minimum time
two or more some specific tokens. Bonuses are paid by one of the tokens required to
bundle. You can see also the minimum time required on each bundle and which tokens
you need to hold.
The central page is managed by administrators showing them admin only functions, such
as managing bundle owners. An admin adds an address to the list of approved bundle
owners, so if the owner of that address logs into the app, they have access to the bundle
own functions. Bundle owners creates bundles. Bundle owners can manage their
bundles. People can visit bundles and claim their bonuses. In order to successfully claim
the bonus you need to register first your ETH address for the bundle that you are
interested. Only one bonus is allowed per each bundle and ETH address.

Considerations
-------------
All data in the blockchain is public. 


User stories
-----------
An administrator opens the web app. The web app reads the address and identifies that the user is an admin, showing them admin only functions, such as register a bundle owner. An admin adds an address to the list of approved bundle owners, so if the owner of that address logs into the app, they have access to the bundle owner functions. 

An approved bundle owner logs into the app. The web app recognizes their address and identifies them as a bundle owner. They are shown the bundle owner functions. They can create a new bundle that will be displayed on the list of bundles. A new bundle is created by specifying the tokens to bundle and the minimum time required.

Subscribers looking for getting bonuses logs into the web app. The web app does not recognize their address so they are shown the generic bundle application. From the main page they can browse all bundles that have been created in the web app. Clicking on a bundle will take them to a bundle page. The bundle page shows the tokens required to hold and the minimum time required. They can register their ETH for the bundle, the web app will check that they hold the correct tokens and register the starting time start that they have been subscribed to the bundle. People that have already registered their ETH address into the bundle they can claim the bonus in the bundle page.


User Interface Functionality
-----------------------------
The user interface is able to recognize your current account by signing out a transaction on Metamask. 
All the transactions are signed using Metamask.
It shows also how the contract state is update when the admin is registering a bundle owner and 
also it is shown when a bundle owner creates a bundle.
The contract state is reflected accordingly when another person (subscriber) is accesing the web app
to see the list of created bundles. It will shown the previously created bundle.  


Use of a Library
----------------

The smart contract uses a Library called StandardTokens from openzeppelin-solidity.
It is used to declare ERC20 tokens used in our project. 
Because the project runs locally using Ganache, we have to used a standar library to create ERC20 tokens.
We have created two different ERC20 tokens using the library.
These two tokens are used in our project to show how to create and subscribe to a bundle. 
The balanceOf function from the library is used to check the balances of each of these tokens for a 
specific ETH address.  


Setup
-----
Runs on develepment mode locally on your computer with Ganache and Metamask.
Once Ganache is running you need to 
edit the  contracts/BundleToken1.sol and contracts/BundleToken1.sol to setup the balances for the ERC20 Token1 and Token2 
for at least one address (subscribers).

 Change network settings in truffle.js:
         Module.exports ={
                 networks:{
                   development:{
                        host:'127.0.0.1',
                        port: 8545,
                        network_id: '*'
                    }
               }
           }

Run
----
ganache-cli
truffle compile
truffle migrate
truffle test
npm run start



Tests
------
There are written 5 tests on javascript:
1. Check if there are enough balances for the app to run. This is needed in order to subscribe to a bundle
because it will be needed to show that you have enough balances for the token2 in the bundle.  

2. Administrator is registering a bundle owner using its ETH address. It will update the contract state and read it afterwards.

3. A bundle owner registered before can create a bundle. It will update the contract state and read it afterwards. 

4. Subscriber should register to a bundle. It will check that a person with enough balances of token1 and token2 can be registered to the bundle. It will check that it has balances higher or equal than the minimum balances required speficied in the bundle.

5. Subscriber is claming a reward after the minimum time is achieved. It will check that the subscriber has enough tokens token1 and token2 
   to claim the bonus and the minimum time since the first time that it was subscribed is achieved. 







