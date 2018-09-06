pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BundleToken2 is StandardToken{

string public constant name = "BundleToken2";
string public constant symbol = "BT2";
uint8 public constant decimals = 0;



uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

constructor() public {
  totalSupply_ = INITIAL_SUPPLY;
  balances[msg.sender] = INITIAL_SUPPLY;
  balances[0x171900af4429428934408771ec02c9f86020afe0]=INITIAL_SUPPLY;
  balances[0x4d6163e55c8da9a99a2198c4d30d2756be65a885]=INITIAL_SUPPLY;
  emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);
}


function getName()
   pure
   public
   returns (string)
{
           return symbol;
}



}


