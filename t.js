var Web3 = require("web3");
const rpcURL = 'HTTP://127.0.0.1:7545' // Your RPC URL goes here
const web3 = new Web3(rpcURL);


web3.eth.personal.getAccounts().then(console.log)
console.log(web3.eth.accounts.create());