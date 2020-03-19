pragma solidity ^0.4.25;

import "./Storage.sol";
import "./EmployeeContract.sol";

contract Companycontract{
    address owner;
    address storageContract;
    
    constructor() public{
        owner = msg.sender;
    }
    
    /**
     * Events
     * */
     event ContractAdded(address empAddress , address empContract);
     event ContractDeleted(address empContract);
     event EtherTransfered(address transfered);
    
    
    /**
     * Modifiers
     * */
     modifier onlyOwner(){
         require(msg.sender ==  owner, "Only owner can do it");
         _;
     }
    
    /**
     * Write methods
     **/
     function addcontract(address empAddress, address empContract, bool payAcess)public returns(bool){
         require(storageContract.call(bytes4(keccak256("addEmployeeContract(address,address,bool)")), empAddress, empContract, payAcess), "Error occur during adding employee cotract");
         emit ContractAdded(empAddress, empContract);
         return true;
     }
     
     function updateStorage(address storeAdd) public onlyOwner returns(bool){
         storageContract = storeAdd;
         return true;
     }
     
     function addLicense(int referenceNum, string license)public returns(bool){
         require(storageContract.call(bytes4(keccak256("LicenseAdd(uint,string)")), referenceNum, license), "Error occur during adding licensee in Company Contract");
         return true;
     }
     
     
     /**
      *Read methods
      **/
     function sendEtherToContract() public payable{
    }
    
    function getContractEther() public view returns(uint){
        return address(this).balance;
    }
    
    function getEmployeesList()public view returns(address[]){
        Storage store = Storage(storageContract);
        return store.getEmpAddressAll();
    }
    
    function getEmployeeContract(address empAddress)public view returns(address){
        Storage store = Storage(storageContract);
        return store.getEmpContract(empAddress);
    }
     
     function getCompanyName()public view returns(string){
         Storage store = Storage(storageContract);
        return store.CompanyName();
     }
     
     function getLicense(uint ref)public view returns(string){
         Storage store = Storage(storageContract);
        return store.LicenseNumber(ref);
     }
     
     function getOwner()public view returns(address){
         return owner;
     }
     
     /**
      * Contract deletion
      * */
     
     function deleteContractEmp(address empAddress, address empContract, bytes32 secret)public returns(bool){
         require(storageContract.call(bytes4(keccak256("deleteContractEmp(address,address,bytes32)")), empAddress, empContract, secret), "Error occur during deleting the contract");
         emit ContractDeleted(empContract);
         return true;
     }
     
     function deleteContractComp(address empAddress, address empContract, bytes32 secret)public returns(bool){
         require(storageContract.call(bytes4(keccak256("deleteContractComp(address,address,bytes32)")), empAddress, empContract, secret), "Error occur during deleting the contract");
         emit ContractDeleted(empContract);
         return true;
     }
     
     
     /**
      * Ether transfer methods
      * */
     function autoPay(address empAddress)public returns(bool){
         Storage storageCon = Storage(storageContract); 
         require(storageCon.getPayAcess(empAddress) , "Employee with this address have no access for auto pay");
         address empContract = storageCon.getEmpContract(empAddress);
         if(empContract != address(0)){
             uint payAmount =  EmployeeContract(empContract).getPay();
             require(storageCon.getLastPayTime(empAddress) + 30 days <= now, "Time does not match the condition");
             storageCon.updatePayTime(empAddress);
             address(empAddress).transfer(payAmount * 1000000000000000000);
             emit EtherTransfered(empAddress);
             return true;
         }
         return false;
    }
    
    //Used to transfer ether to only one specific address
    function payByCompany(address empAddress) public onlyOwner returns(bool){
         Storage storageCon = Storage(storageContract); 
         address empContract = storageCon.getEmpContract(empAddress);
         if(empContract != address(0)){
             uint payAmount =  EmployeeContract(empContract).getPay();
             require(storageCon.getLastPayTime(empAddress)  + 30 days <= now);
             storageCon.updatePayTime(empAddress);
             address(empAddress).transfer(payAmount);
             emit EtherTransfered(empAddress);
             return true;
         }
         return false;
    }
    
    //Used to transfer ether to array of specified address
    function payByCompany(address[] empAddresss)public onlyOwner returns(bool){
        for(uint i=0; i <= empAddresss.length; i++){
            address empAddress = empAddresss[i];
             Storage storageCon = Storage(storageContract); 
             address empContract = storageCon.getEmpContract(empAddress);
             if(empContract != address(0)){
                 uint payAmount =  EmployeeContract(empContract).getPay();
                 require(storageCon.getLastPayTime(empAddress)  + 30 days <= now);
                 storageCon.updatePayTime(empAddress);
                 if(address(this).balance >= payAmount ){
                     address(empAddress).transfer(payAmount);
                 }else{
                     break;
                 }
             }
        }
        return true;
    }
    
}