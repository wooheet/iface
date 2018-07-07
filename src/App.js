import React, { Component } from 'react';
import './App.css';
import ethTx from "ethereumjs-tx"
import { toBuffer } from "ethereumjs-util"
import { fromPrivateKey } from "ethereumjs-wallet"
import HDWalletProvider from "truffle-hdwallet-provider"
import Web3 from "web3"  
import sha256 from "sha256"  
import ksHelper from './keystoreHelper';

const bip39 = require("bip39");

const key = "twelve smooth dove arrest divert melt dog emotion very room nasty behind";
const apiServer = "https://ropsten.infura.io/"
const provider = new HDWalletProvider(key, apiServer);
const web3 = new Web3(provider);
const abiArray = require('./abi/test-abi.json');
var myAddress = "0xA4FEfbBA313eA3E3c8EC6fDd02F039EE6A0Be94E";
var contractAddress = "0x223a27704713Ebf5eB515681d97e0495fD5ac7D4";
var contract = new web3.eth.Contract(abiArray, contractAddress, {
        from: myAddress
});


class App extends Component {
  state ={
    address:"",
    balance:"0",
    privateKey:"",
    facehash:"",
    mnemonic:"",
    facebalance:"0",
    fingerhash:"",
    myhashid:""
  }

  getBalance = address => {
      web3.eth.getBalance(address, "latest", (err, getVal) => {
        if (!!getVal) {
          this.setState({
            balance: Number(web3.utils.fromWei(getVal, "ether"))
          });
        }
      });
  };  

  faceHash = () => {
    let facehash = sha256('face');
    let fingerhash = sha256('finger');
    this.setState({
      facehash : facehash,
      fingerhash:fingerhash
    })
    
  }

  getid = privateKey =>{
    // if(privateKey){
    //   const data = contract.methods.disableTokenTransfer().encodeABI();
    //   const ethAccount = fromPrivateKey(toBuffer(`0x${privateKey}`));
    //   const fromAddress = ethAccount.getAddressString();
    //   const fromPrivateKeyBuffer = ethAccount.getPrivateKey();

    //   web3.eth.getTransactionCount(fromAddress, (err, networkNonce) => {
    //       const txData = {
    //           chainId: 0x03,
    //           gasPrice: web3.utils.toHex(42000000000),
    //           gasLimit: web3.utils.toHex(40000),
    //           to: contractAddress,
    //           from: fromAddress,
    //           value: 0x0,
    //           nonce: web3.utils.toHex(networkNonce),
    //           data: data
    //       };
    //       const tx = new ethTx(txData);
    //       tx.sign(fromPrivateKeyBuffer);
    //       const serializedTx = tx.serialize().toString('hex');
    //       if (!serializedTx) {
    //           console.log("Tx serialize fail.")
    //       } else {
    //           web3.eth.sendSignedTransaction(`0x${serializedTx}`, (err, TxHash) => {
    //               if (!err) {
    //                   console.log("TxHash", TxHash);
    //               }
    //           })
    //           .on('confirmation', confirmation => {
    //               // console.log('confirmation', confirmation);
    //           })
    //           .then(receipt => {
    //               console.log('receipt', receipt);
    //           })
    //           .catch(error => {
    //               console.log('error', error);
    //           });
    //       }
    //   });
    // }
  }  

  operation = privateKey =>{
    // if(privateKey){
    //   const data = contract.methods.disableTokenTransfer().encodeABI();
    //   const ethAccount = fromPrivateKey(toBuffer(`0x${privateKey}`));
    //   const fromAddress = ethAccount.getAddressString();
    //   const fromPrivateKeyBuffer = ethAccount.getPrivateKey();

    //   web3.eth.getTransactionCount(fromAddress, (err, networkNonce) => {
    //       const txData = {
    //           chainId: 0x03,
    //           gasPrice: web3.utils.toHex(42000000000),
    //           gasLimit: web3.utils.toHex(40000),
    //           to: contractAddress,
    //           from: fromAddress,
    //           value: 0x0,
    //           nonce: web3.utils.toHex(networkNonce),
    //           data: data
    //       };
    //       const tx = new ethTx(txData);
    //       tx.sign(fromPrivateKeyBuffer);
    //       const serializedTx = tx.serialize().toString('hex');
    //       if (!serializedTx) {
    //           console.log("Tx serialize fail.")
    //       } else {
    //           web3.eth.sendSignedTransaction(`0x${serializedTx}`, (err, TxHash) => {
    //               if (!err) {
    //                   console.log("TxHash", TxHash);
    //               }
    //           })
    //           .on('confirmation', confirmation => {
    //               // console.log('confirmation', confirmation);
    //           })
    //           .then(receipt => {
    //               console.log('receipt', receipt);
    //           })
    //           .catch(error => {
    //               console.log('error', error);
    //           });
    //       }
    //   });
    // }
  }  

  account = () => {
    console.log("asdfsadf")
    let etherAccount = {};
    const { address, keystoreData } = ksHelper.create(this.state.facehash);
    const pk = ksHelper.getPrivateKey(keystoreData, this.state.facehash);
    const privateKey = pk.toString('hex');
    etherAccount = {
      address,
      privateKey
    };
    console.log("etherAccount",etherAccount)

    let mnemonic = bip39.generateMnemonic();
    console.log("mnemonic",mnemonic)
    let mnemonichash = sha256(mnemonic);
    console.log("mnemonichash",mnemonichash)
    this.setState({
      address :address,
      privateKey: privateKey,
      mnemonic: mnemonic,
      mnemonichash: mnemonichash
    });
    if(address){
      this.getBalance(address)
    }

    /*  */


    if(privateKey){
      const data = contract.methods.insertID(this.state.facehash,this.state.fingerhash).encodeABI();
      const ethAccount = fromPrivateKey(toBuffer(`0xa8bb1b5cdb68f2a3965ab0dd23e895a72ab639acc74d1cb8da69ca466843c23f`));
      const fromAddress = ethAccount.getAddressString();
      const fromPrivateKeyBuffer = ethAccount.getPrivateKey();
      console.log("")

      web3.eth.getTransactionCount(fromAddress, (err, networkNonce) => {
          const txData = {
              chainId: 0x03,
              gasPrice: web3.utils.toHex(42000000000),
              gasLimit: web3.utils.toHex(40000),
              to: contractAddress,
              from: fromAddress,
              value: 0x0,
              nonce: web3.utils.toHex(networkNonce),
              data: data
          };
          const tx = new ethTx(txData);
          tx.sign(fromPrivateKeyBuffer);
          const serializedTx = tx.serialize().toString('hex');
          if (!serializedTx) {
              console.log("Tx serialize fail.")
          } else {
              web3.eth.sendSignedTransaction(`0x${serializedTx}`, (err, TxHash) => {
                  if (!err) {
                      console.log("TxHash", TxHash);
                  }
              })
              .on('confirmation', confirmation => {
                  // console.log('confirmation', confirmation);
              })
              .then(receipt => {
                  console.log('receipt', receipt);
              })
              .catch(error => {
                  console.log('error', error);
              });
          }
      });
    }


  }


  // componentDidMount() {
  //   this.getBalance();
  //   this.interval = setInterval(() => {
  //     this.getBalance();
  //   }, 15000);
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">i Face</h1>
        </header>
        <body>
          <div>
          Create ID : 
          <button className="App-button" 
            onClick={this.faceHash}
          > create</button>
          </div>
          
          <div className="App-faceid">
            Face-ID :  {this.state.facehash}
          </div>
          <div className="App-faceid">
            Fnger-ID :  {this.state.fingerhash}
          </div>
          <div/>
          <div>
            Create Account
            <button className="App-button" 
            onClick={this.account}
          > create</button>
          </div>
          <div>
            Address : {this.state.address}
          </div>

          <div>
            Mnemonic : {this.state.mnemonic}
          </div>
          <div>
            Mnemonic Hash : {this.state.mnemonichash}
          </div>
          <div>
            ETH Balance : {this.state.balance}
          </div>
          <div className="App-faceid">
            Get My ID :  {this.state.myhashid}
            <button className="App-button" 
            onClick={this.getid(this.state.privateKey)}
          > GET</button>
          </div>
          <div>
            FACE Balance : {this.state.facebalance}
          </div>
          <div>
              Country Operation
                <button className="App-button" 
                onClick={this.operation(this.state.privateKey)}
              > tx push</button>
          </div>
        </body>
      </div>
    );
  }
}

export default App;