
# Note that you need to hardcode the balances first in BundleToken1 and BundleToken2 contracts for bundle owner and subscriber

rm build/contracts/*
truffle compile
truffle migrate > contracts.txt
token1=`cat contracts.txt | grep BundleToken1: | awk '{print $2}'`
token2=`cat contracts.txt | grep BundleToken2: | awk '{print $2}'`
rm contracts.txt 

echo $token1 > token1.js 
echo $token2 > token2.js 

echo "-------------------------------------------------------"
echo "Note that your need to set up balance in BundleToken1 BundleToken2 for the new addresses !"
echo "Bundle1 contract: "$token1 
echo "Bundle2 contract: "$token2 
echo "-------------------------------------------------------"

npm run start

