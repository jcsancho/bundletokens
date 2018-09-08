import React, { Component } from 'react'
import BundleTokensContract from '../build/contracts/BundleTokens.json'
import BundleToken1Contract from '../build/contracts/BundleToken1.json'
import BundleToken2Contract from '../build/contracts/BundleToken2.json'

import getWeb3 from './utils/getWeb3'
//import BundleToken1Contract from './bundletoken1.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        userId: -1,
        contract:null,
        contracttoken1:null,
        contracttoken2:null,
        account:null,
        owner:"",
        name:null,
        name1:null,
        name2:null,
        escrow1:0,
        escrow2:0,
        bonus:0,
        time:0,
        balance1:0,
        balance2:0,
        token1:0,
        token2:0,
        token1addr:null,
        bundleId:null,
        bundleCount:0,
        bundleView:1,
        clientbalance1:0,
        clientbalance2:0,
        singed:null,
        deposit1:0,
        deposit2:0,
        contracttoken1balance:0,
        contracttoken2balance:0,
        web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })


        // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

      const contract = require('truffle-contract')
        const bundleTokens = contract(BundleTokensContract)
        bundleTokens.setProvider(this.state.web3.currentProvider)

        var bundleTokensInstance

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {

            bundleTokens.deployed().then((instance) => {
                bundleTokensInstance = instance
                return bundleTokensInstance.getBundleCount.call({from: accounts[0]})
            }).then((result) => {
                return this.setState({bundleCount:result.c[0],contract: bundleTokensInstance,account: accounts[0],userId:-1})
            })

        })

      const bundleToken1 = contract(BundleToken1Contract)
      bundleToken1.setProvider(this.state.web3.currentProvider)
      var bundleToken1Instance
      this.state.web3.eth.getAccounts((error, accounts) => {
          bundleToken1.deployed().then((instance) => {
              bundleToken1Instance = instance
              return this.setState({contracttoken1: bundleToken1Instance})
          })
      })

      const bundleToken2 = contract(BundleToken2Contract)
      bundleToken2.setProvider(this.state.web3.currentProvider)
      var bundleToken2Instance
      this.state.web3.eth.getAccounts((error, accounts) => {
          bundleToken2.deployed().then((instance) => {
              bundleToken2Instance = instance
              return this.setState({contracttoken2: bundleToken2Instance})
          })
      })
    }

    handleClickLogin(event){
        const contract=this.state.contract;
        const account=this.state.account;
        this.setState({userId:-1});
        contract.checkUser(11,{from:account})
            .then((result) => {
                this.setState({userId:-1});
                return contract.getUser.call()
            }).then((result) => {
            return this.setState({userId:result.c[0]})
        })
    }

    handleClickGetBundle(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const bundleId=0;
        contract.getBundleCount.call({from:account})
            .then((result) => {
                this.setState({bundleCount:result.c[0]});
                return contract.getBundleBonus.call(bundleId,{from:account})
            }).then((result) => {
                this.setState({bonus:result.c[0],bundleView:2})
                return contract.getBundleTime.call(bundleId,{from:account})
            }).then((result) => {
                this.setState({time:result.c[0],bundleView:2})
                return contract.getBundleBalance1.call(bundleId,{from:account})
            }).then((result) => {
                this.setState({balance1:result.c[0],bundleView:2})
                return contract.getBundleBalance2.call(bundleId,{from:account})
            }).then((result) => {
                this.setState({balance2:result.c[0],bundleView:2})
                return contract.getName1.call(bundleId,{from:account})
            }).then((result) => {
                return this.setState({name1: result.c[0], bundleView: 2})
        })
    }

    handleClickRegisterOwner(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const owner=this.state.owner;
        contract.registerOwner(owner,{from:account})
            .then((result) => {
                return alert('Registered Owner Succesfully !');
        })
    }

    handleClickDeposit(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const time=this.state.time;
        const balance1=this.state.balance1;
        const balance2=this.state.balance2;
        const token1=this.state.token1;
        const token2=this.state.token2;
        const bonus=this.state.bonus;
        const deposit1=this.state.deposit1;
        const deposit2=this.state.deposit2;
        const contract1=this.state.contracttoken1;
        //contracttoken1.transfer(contract1,1,{from:account})
         contract.depositToken(token1,2,{from:account})
            .then((result) => {
            return alert('Deposit Succesfully !');
        })
    }

    handleClickRegisterBundle(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const time=this.state.time;
        const balance1=this.state.balance1;
        const balance2=this.state.balance2;
        const bonus=this.state.bonus;
        const contracttoken1=this.state.contracttoken1;
        const contracttoken2=this.state.contracttoken2;
        const addr=this.state.web3.toChecksumAddress(contract.address);
        const addr1=this.state.web3.toChecksumAddress(contracttoken1.address);
        const addr2=this.state.web3.toChecksumAddress(contracttoken2.address);
        const escrow1=this.state.escrow1;
        const escrow2=this.state.escrow2;
      //  console.log("address1:",contract.address);
      //  console.log("address2:",addr);
      //  console.log("address3: ", contracttoken1.address);

        contract.getBundleCount.call({from:account})
        .then((result) => {
            this.setState({bundleCount: result.c[0]})
            return contract.registerBundle(time,bonus,balance1,balance2,addr1,addr2,{from:account})
        }).then((result) => {
            return contracttoken1.approve(contract.address,escrow1,{from:account})
        }).then((result) => {
            return contracttoken2.approve(contract.address,escrow2,{from:account})
        }).then((result) => {
            return contract.depositToken1(escrow1,this.state.bundleCount,{from: account})
        }).then((result) => {
            return contract.depositToken2(escrow2,this.state.bundleCount,{from: account})
        }).then((result) => {
            return alert('Bundle Launched Succesfully !');
        })
    }

    handleClickGetBalances(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const time=this.state.time;
        const balance1=this.state.balance1;
        const balance2=this.state.balance2;
        const token1=this.state.token1;
        const token2=this.state.token2;
        const bonus=this.state.bonus;
        const contracttoken1=this.state.contracttoken1;
        const contracttoken2=this.state.contracttoken2;
        contract.getBalance.call(contracttoken1.address,{from:account})
            .then((result) => {
                this.setState({clientbalance1:result.c[0]})
                return contract.getBalance.call(contracttoken2.address,{from:account})
            }).then((result) => {
                this.setState({clientbalance2:result.c[0]})
                return contract.getBalanceContract.call(contracttoken1.address,{from:account})
            }).then((result) => {
                this.setState({contracttoken1balance:result.c[0]})
                return contract.getBalanceContract.call(contracttoken2.address,{from:account})
            }).then((result) => {
                return this.setState({contracttoken2balance:result.c[0]})
        })
    }


    handleClickSubscribeBundle(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const bundleId=this.state.bundleId;
        contract.registerSubscriber(bundleId,{from:account})
            .then((result) => {
                return alert('Registered to Bundle Succesfully !');
            })
    }

    handleClickClaimBundle(event){
        const contract=this.state.contract;
        const account=this.state.account;
        const bundleId=this.state.bundleId;
        contract.subscriberClaim(0,{from:account})
            .then((result) => {
                return alert('Claimed Succesfully !');
            })
    }

    handleChangeBonus(event) {
        this.setState({bonus:event.target.value});
       // alert("Change Bonus: ", event.target.value);
    }
    handleChangeOwner(event) {
        this.setState({owner:event.target.value});
    }
    handleChangeTime(event) {
        this.setState({time:event.target.value});
    }
    handleChangeBalance1(event) {
        this.setState({balance1:event.target.value});
       // alert("Change Balance1: ", event.target.value);
    }
    handleChangeBalance2(event) {
        this.setState({balance2:event.target.value});
    }
    handleChangeEscrow1(event) {
        this.setState({escrow1:event.target.value});
    }
    handleChangeEscrow2(event) {
        this.setState({escrow2:event.target.value});
    }
    handleChangeToken1(event) {
        this.setState({token1:event.target.value});
    }
    handleChangeToken2(event) {
        this.setState({token2:event.target.value});
    }
    handleChangeBundleId(event) {
        this.setState({bundleId:event.target.value});
    }
    handleChangeDeposit1(event) {
        this.setState({deposit1:event.target.value});
    }
    handleChangeDeposit2(event) {
        this.setState({deposit2:event.target.value});
    }

    render() {

      var dashboard;
      const userId=this.state.userId;
      const bundleCount=this.state.bundleCount;
      const bundleView=this.state.bundleView;

      const WelcomeView=(
         <div>
             <p>Please, Login in to your account using your ETH address </p>
             <button onClick={this.handleClickLogin.bind(this)}>Login</button>
         </div>
          );

      const AdminView=(

          <div>
              <h2>DApp Administrator Dashboard </h2>
              <p>Register a Bundle Owner</p>
              <div>
                    ETH Address:  <input type="text" value={this.state.owner} size="50" onChange={this.handleChangeOwner.bind(this)}/>
              </div>
              <button onClick={this.handleClickRegisterOwner.bind(this)}>Register</button>

          </div>
      );

      const BundleOwnerView=(
          <div>
              <div><h2>Bundle Owner Dashboard</h2></div>

              <div>
                  <p>Launch a Bundle of two Tokens (token1) and (token2)</p>
                  <p>Set up the minimum time to hold, bonus, and minimum balance to hold required for each token</p>
                  <p>Also set up the amount of token1 and token2 that will be hold on to pay bonuses </p>
                  <div>Bonus:  <input type="number" value={this.state.bonus} size="10" onChange={this.handleChangeBonus.bind(this)}/></div>
                  <div>Time:  <input type="number" value={this.state.time} size="10" onChange={this.handleChangeTime.bind(this)}/></div>
                  <div>Minimum Balance Token1:  <input type="number" value={this.state.balance1} size="10" onChange={this.handleChangeBalance1.bind(this)}/></div>
                  <div>Minimum Balance Token2:  <input type="number" value={this.state.balance2} size="10" onChange={this.handleChangeBalance2.bind(this)}/></div>
                  <div>ERC20 Token1 address:  <input  value={this.state.token1}  onChange={this.handleChangeToken1.bind(this)}/></div>
                  <div>ERC20 Token2 address:  <input  value={this.state.token2}  onChange={this.handleChangeToken2.bind(this)}/></div>
                  <div>Escrow balance Token1:  <input type="number" value={this.state.escrow1} size="10" onChange={this.handleChangeEscrow1.bind(this)}/></div>
                  <div>Escrow balance Token2:  <input type="number" value={this.state.escrow2} size="10" onChange={this.handleChangeEscrow2.bind(this)}/></div>
                  <button onClick={this.handleClickRegisterBundle.bind(this)}>Launch</button>
              </div>

              <div>
              <p>Check balances (token1) and (token2) </p>
              <div>ERC20 Token1 address:  <input  value={this.state.token1}  onChange={this.handleChangeToken1.bind(this)}/></div>
              <div>ERC20 Token2 address:  <input  value={this.state.token2}  onChange={this.handleChangeToken2.bind(this)}/></div>
              <div>Balance Token1: {this.state.clientbalance1}</div>
              <div>Balance Token2: {this.state.clientbalance2}</div>
                  <div>Escrow Balance  Token1: {this.state.contracttoken1balance}</div>
                  <div>Escrow Balance  Token2: {this.state.contracttoken2balance}</div>
                  <button onClick={this.handleClickGetBalances.bind(this)}>Get balances</button>
              </div>

          </div>
      );

      const SubscriberView3=(

          <div>
              <div><h2>Sorry, there are no active Bundles currently </h2></div>

              <div>
                  <p>Check balances (token1) and (token2)</p>
                  <div>ERC20 Token1 address:  <input  value={this.state.token1}  onChange={this.handleChangeToken1.bind(this)}/></div>
                  <div>ERC20 Token2 address:  <input  value={this.state.token2}  onChange={this.handleChangeToken2.bind(this)}/></div>
                  <div>Balance Token1: {this.state.clientbalance1}</div>
                  <div>Balance Token2: {this.state.clientbalance2}</div>
                  <button onClick={this.handleClickGetBalances.bind(this)}>Get balances</button>
              </div>

          </div>
      );

      // <button onClick={this.handleClickGetBundle.bind(this)}>Load</button>
      const SubscriberView1=(
          <div>
              <h2>Load Active Bundles </h2>
              <button onClick={this.handleClickGetBundle.bind(this)}>Load</button>

          </div>
      );

      const SubscriberView2=(
            <div>
                <h2>Active Bundle </h2>
                <ol>
                    <li>
                        <div>Bonus: {this.state.bonus}</div>
                        <div>Minimum Time: {this.state.time}</div>
                        <div>Minimum Balance Token1: {this.state.balance1}</div>
                        <div>Minimum Balance Token2: {this.state.balance2}</div>
                    </li>
                </ol>

                <button onClick={this.handleClickSubscribeBundle.bind(this)}>Subscribe</button>

                <p> Claim a bonus from the Bundle if you have already subscribed before</p>

                <button onClick={this.handleClickClaimBundle.bind(this)}>Claim</button>

                <div>
                    <p>Check balances (token1) and (token2)</p>
                    <div>ERC20 Token1 address:  <input  value={this.state.token1}  onChange={this.handleChangeToken1.bind(this)}/></div>
                    <div>ERC20 Token2 address:  <input  value={this.state.token2}  onChange={this.handleChangeToken2.bind(this)}/></div>
                    <div>Balance Token1: {this.state.clientbalance1}</div>
                    <div>Balance Token2: {this.state.clientbalance2}</div>
                    <button onClick={this.handleClickGetBalances.bind(this)}>Get balances</button>
                </div>

            </div>
      );

      if (userId===-1){
          dashboard=WelcomeView;
      }

      if (userId===0) {
          dashboard=AdminView;
         // dashboard=BundleOwnerView;
      }

      if (userId===1){
          dashboard=BundleOwnerView;
      }

      if (userId===2) {
          if (bundleCount > 0) {
            if (bundleView === 1) {
                dashboard = SubscriberView1;
             } else {
                dashboard = SubscriberView2;
            }
          }else{
              dashboard = SubscriberView3;
          }
      }

      return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
                <h1>Bundle Tokens DApp</h1>

                {dashboard}

            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
