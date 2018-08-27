

pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BundleToken2 is StandardToken {

string public name = "BundleToken2";
string public symbol = "BT2";
uint8 public decimals = 2;
uint public INITIAL_SUPPLY = 1000;


constructor() public {
  totalSupply_ = INITIAL_SUPPLY;
  balances[msg.sender] = INITIAL_SUPPLY;
 balances[0x4A9B9352F94231F3c46ACf196Ac5d57A602Ca310]=INITIAL_SUPPLY;
  balances[0x5612263fB3FA2f957eB99a97d0C67Cdb44d64E37]=INITIAL_SUPPLY;
}

}


