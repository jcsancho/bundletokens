
pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BundleToken1 is StandardToken{

string public constant name = "BundleToken1";
string public constant symbol = "BT1";
uint8 public constant decimals = 0;



uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** uint256(decimals));

constructor() public {
  totalSupply_ = INITIAL_SUPPLY;
  balances[msg.sender] = INITIAL_SUPPLY;
  balances[0x617da8f6cb818cf6127198c281fca49e939a3936]=INITIAL_SUPPLY;
  balances[0x5d50985631b3a2be51d99208dc18617fc4fc218b]=INITIAL_SUPPLY;
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


