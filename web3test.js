const Web3 = require('web3')
const rpcURL = 'HTTP://127.0.0.1:7545' // Your RPC URL goes here
const web3 = new Web3(rpcURL);
const address = '0x8d0b9A0c746E78CB3d73D0c5DB8464Eb35BA6A49' // Your account address goes here

console.log(web3.eth)
const proxy = new web3.eth.Contract(
	[
    {
      "constant": false,
      "inputs": [
        {
          "name": "empAddress",
          "type": "address"
        },
        {
          "name": "empContract",
          "type": "address"
        },
        {
          "name": "payAcess",
          "type": "bool"
        }
      ],
      "name": "addcontract",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "referenceNum",
          "type": "int256"
        },
        {
          "name": "license",
          "type": "string"
        }
      ],
      "name": "addLicense",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "empAddress",
          "type": "address"
        }
      ],
      "name": "autoPay",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "empAddress",
          "type": "address"
        },
        {
          "name": "empContract",
          "type": "address"
        },
        {
          "name": "secret",
          "type": "bytes32"
        }
      ],
      "name": "deleteContractComp",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "empAddress",
          "type": "address"
        },
        {
          "name": "empContract",
          "type": "address"
        },
        {
          "name": "secret",
          "type": "bytes32"
        }
      ],
      "name": "deleteContractEmp",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "empAddresss",
          "type": "address[]"
        }
      ],
      "name": "payByCompany",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "empAddress",
          "type": "address"
        }
      ],
      "name": "payByCompany",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "sendEtherToContract",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "empAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "empContract",
          "type": "address"
        }
      ],
      "name": "ContractAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "empContract",
          "type": "address"
        }
      ],
      "name": "ContractDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "transfered",
          "type": "address"
        }
      ],
      "name": "EtherTransfered",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCompanyName",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getContractEther",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "empAddress",
          "type": "address"
        }
      ],
      "name": "getEmployeeContract",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "ref",
          "type": "uint256"
        }
      ],
      "name": "getLicense",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],'0xbbde2394cdf721da19e465202a065ad4364e3451',{
    from: '0x8d0b9A0c746E78CB3d73D0c5DB8464Eb35BA6A49', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});


proxy.methods.addcontract(0xAEb27BFf07886182ceb26F91Ba455F7F4146A8b0, 0x0d7a8b8c0d0a0c838719cbae1dc035a95f3dddad,true).send({
  gas: 300000,
  from: address,
}, (err, result) => {
  // Result is the transaction address of that function
  console.log(err)
  console.log(result)
})