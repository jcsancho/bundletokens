pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BundleTokens {

address token1addr;
address token2addr;

uint storedData;
uint bonus;
uint bundleCount;

// test
uint  test1;
uint userId;
address test2;

// Number of bundles
uint countBundles;

// Number of bundle owners
uint countOwners;

// Number of subscribers
uint countSubscribers;

//webapp administrator
address private admin;

// Bundle state
enum bundleState {Active, Close, MissingFunds}

// BundleOwnerState
enum ownerState {Registered, Unregistered}

// BundleSubscribersState
enum subscriberState {Registered, Unregistered,Claimed, Paid}

// Subcribers only can subscribe to one bundle at a time 
struct Subscribers {
    uint balance1;
    uint balance2;
    uint time;
    uint bundleId;
    uint bonus1;
    uint bonus2;
    subscriberState state;
    address owner;
}

struct Owners {
    uint bundleId;
    ownerState state;
    address owner;
}

// bundle
struct Bundle {
        uint time;
        uint bonus;
        uint balance1;
        uint balance2;
        address token1;
        address token2;
        uint count;
        address owner;
}

// bundles
mapping (uint => Bundle) bundles;

// bundle owners
mapping  (uint => Owners) owners;

// bundle subscribers
mapping  (uint => Subscribers) subscribers;

constructor() public {
       countOwners=0;
       countSubscribers=0;
       countBundles=0; 
       admin=msg.sender;
       storedData=0;
       bonus=0;
}

// Modifiers
modifier verifyAdmin () { require (msg.sender == admin); _;}

function setStorage(uint x)
    public
{
    storedData = x;
}

function getStorage()
    public
    view
    returns (uint)
{
    return storedData;
}

function getUser()
    public
    view
    returns(uint user)
{
    return userId;
}

// Check User
function checkUser(uint x)
    public
    returns (uint) // 0: admin, 1:owner 2:subscriber
{
  userId=x;
  if (msg.sender == admin){
     userId=0;
  }else{
            if (checkOwner()){
                userId=1;
            }else{
                userId=2;
            }
  }
  return userId;
}


// Verify Admin
function checkAdmin()
    external 
    view
    returns (bool success)
{
  if (msg.sender == admin){
    return true;
  }else{
    return false;  
  }
}

// Register a bundler owner
function registerOwner(address _owner) 
    public
    verifyAdmin()
{
  owners[countOwners].state=ownerState.Registered;
  owners[countOwners].owner=_owner;
  countOwners=countOwners+1;
}


// Verify Owner

function checkOwner()
    view
    public
    returns (bool success)
{
  success=false;
  for (uint i = 0; i < countOwners; i++) {
        if (owners[i].owner==msg.sender){
           if (owners[i].state == ownerState.Registered ){
                success=true;
           }
        }
  }
  return success;
}

// check sender bundle
function checksender()
    view
    public
    returns (address)
{
    return(msg.sender);
}

// check storage
function writestorage(address _symbol)
    public
{
    test2=_symbol;
}

// check storage
function checkstorage()
    view
    public
    returns (uint b)
{
    StandardToken token2 = StandardToken(test2);
    b=token2.balanceOf(msg.sender);
    return(b);
}


// Register bundle
function registerBundle(uint _mintime, uint _bonus, uint _balance1, uint _balance2, address _token1, address _token2)
    public
{
    bundles[bundleCount].time=_mintime;
    bundles[bundleCount].bonus=_bonus;
    bundles[bundleCount].balance1=_balance1;
    bundles[bundleCount].balance2=_balance2;
    bundles[bundleCount].token1=_token1;
    bundles[bundleCount].token2=_token2;
    bundles[bundleCount].count=0;
    bundles[bundleCount].owner=msg.sender;
    bundleCount=bundleCount+1;
}

function getBundleBonus(uint _bundleId)
    view
    public
    returns (uint b)
{
    b=bundles[_bundleId].bonus;
    return b;
}

function getBundleTime(uint _bundleId)
    view
    public
    returns (uint b)
{
    b=bundles[_bundleId].time;
    return b;
}

function getBundleBalance1(uint _bundleId)
    view
    public
    returns (uint b)
{
    b=bundles[_bundleId].balance1;
    return b;
}

function getBundleBalance2(uint _bundleId)
    view
    public
    returns (uint b)
{
    b=bundles[_bundleId].balance2;
    return b;
}

// check bundle owner
function checkBundleOwner(uint _bundleId)
    view
    public
    returns (address b)
{
    b=bundles[_bundleId].owner;
    return(b);
}


// Get number of bundles
  function getBundleCount()
    public
    view
    returns(uint)
{
    return(bundleCount);
}

// check balance of tokens
function checkBalance(uint _bundleid)
    public
    view
    returns(uint balance1)
{
    StandardToken token1 = StandardToken(bundles[_bundleid].token1);
    balance1=token1.balanceOf(msg.sender);
    return (balance1);
}


// register subscriber to bundle
function registerSubscriber(uint _bundleid)
    public
{
    StandardToken token1 = StandardToken(bundles[_bundleid].token1);
    StandardToken token2 = StandardToken(bundles[_bundleid].token2);
    uint balance1=token1.balanceOf(msg.sender);
    uint balance2=token2.balanceOf(msg.sender);

   if (balance1>=bundles[_bundleid].balance1)
     {
     if (balance2>=bundles[_bundleid].balance2){
        subscribers[countSubscribers].balance1= balance1;
        subscribers[countSubscribers].balance2= balance2;
        subscribers[countSubscribers].bundleId= _bundleid;
        subscribers[countSubscribers].time= now;
        subscribers[countSubscribers].bonus1= 0;
        subscribers[countSubscribers].bonus2= 0;
        subscribers[countSubscribers].state= subscriberState.Registered;
        subscribers[countSubscribers].owner= msg.sender;
        countSubscribers++;
        bundles[_bundleid].count++;

     }
     }
}


// Get number of subscribers
function getSubscriberCount(uint _bundleId)
    public
    view
    returns(uint)
{
    return(bundles[_bundleId].count);
}


// Unregister Subscriber to bundle
function unregisterSubscriber(uint _bundleId)
    public
{
    for (uint i = 0; i < countSubscribers; i++) {
        if (subscribers[i].owner==msg.sender){
            if (subscribers[i].bundleId==_bundleId){
                bundles[_bundleId].count--;
                subscribers[i].state=subscriberState.Unregistered;
            }
        }
    }
}

// Get time from fist subscribed
  function getSubscriberTime()
    public
    view
    returns(uint diff)
{
    diff=0;
    for (uint i = 0; i < countSubscribers; i++) {
            if (subscribers[i].owner==msg.sender){
                diff = (now - subscribers[i].time); // seconds https://www.unixtimestamp.com/index.php
            }
    }
    return(diff);
}

// Subscriber Bundle Claim
function subscriberClaim(uint _bundleId)
    external
    //verifySubscriber (msg.sender,_bundleId)
{
    StandardToken token1 = StandardToken(bundles[_bundleId].token1);
    StandardToken token2 = StandardToken(bundles[_bundleId].token2);
    uint balance1=token1.balanceOf(msg.sender);
    uint balance2=token2.balanceOf(msg.sender);

    for (uint i = 0; i < countSubscribers; i++) {
                if (subscribers[i].owner==msg.sender){
                    uint diff = (now - subscribers[i].time) ; // time in seconds
                    if (diff >= bundles[_bundleId].time){
                        if (balance1>=bundles[_bundleId].balance1)
                        {
                            if (balance2>=bundles[_bundleId].balance2){
                                subscribers[i].state=subscriberState.Claimed;
                                subscribers[i].bonus1=bundles[_bundleId].bonus;
                                subscribers[i].bonus2=bundles[_bundleId].bonus;
                            }
                        }
                    }
                }
    }
}

// Verify Subscriber Claim
function checkSubscriberClaim()
    external
    view
    returns (bool success)
{
 for (uint i = 0; i < countSubscribers; i++) {
    if (subscribers[i].owner==msg.sender){
        if (subscribers[i].state == subscriberState.Claimed ){
            return true;
        }else{
            return false;
        }
    }
 }
}

}

