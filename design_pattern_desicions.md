
Design Patterns
-----------------

We have implemented an emergency stop where only the admin of the web app
is able to halt the functions that can change the state of the contract. 
Also, it can resume the contract functionality whenever the admin calls to a function
to stop the emergency state. This is implemented using function notifiers.

Also we have been implemented  Access Restriction pattern to check that only Admin
should register bundle owners. 

In addition, I have explicitly marked visibility in functions and state variables
to make the visibilith more clear for debugging purposes.

I have locked pragmas to specific compiler version to avoid problems with other compiler versions
that the contract has not been tested yet. 
I have used the pragma solidity 0.4.24.


 


