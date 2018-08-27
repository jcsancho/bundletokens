
Avoiding Security attacks
--------------------------

 
1.   All the calls to external contracts have been marked accordinly in the contract with
   "untrusted external call" comment.

2. Using always msg.sender instead of tx.origin

3. Using fixed lenght arrays to avoid the case of falling the contract because of lack of gas.

4. Checking arrays indexes for too small or too large that exceeds the array size. 


  
