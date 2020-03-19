pragma solidity ^0.4.25;

import "./EmployeeContract.sol";

contract Storage{
    string companyName;
    
    mapping(uint=>string)licensesRecord;
    
    address[] employeesAddress;
    mapping(address=>address)employeeContracts;
    
    struct PayRecord{
        bool hasPayAcess;
        uint lastPayTime;
        uint contractEndTime;
    }
    
    mapping(address=>PayRecord)payRecords;
    
    address owner;
    address controlAuthority;
    
    constructor(string compName, string licenseNumber, uint refNumber, address contAuthority)public{
        owner = msg.sender;
        companyName = compName;
        licensesRecord[refNumber]= licenseNumber;
        controlAuthority = contAuthority;
    }
    
    /**
     *Modifier
     **/
     modifier onlyControlAuthority(){
         require(tx.origin == controlAuthority, "Only control authority can delete contract");
         _;
     }
     
     modifier onlyOwner(){
         require(tx.origin == owner, "Only owner of storage can do this");
         _;
     }
    
    /**
     * Write Methods
     **/
    
     function addEmployeeContract(address empAddress,address empContract,bool payAcess)public onlyOwner returns(bool){
         employeesAddress.push(empAddress);
         
         employeeContracts[empAddress] = empContract;
         
         PayRecord memory pyRecord = PayRecord(
             pyRecord.hasPayAcess = payAcess,
             pyRecord.lastPayTime = now,
             pyRecord.contractEndTime = EmployeeContract(empContract).getContractEndtime());
         payRecords[empAddress] = pyRecord;
         return true;
     }
     
     function updatePayTime(address empAddress)public onlyOwner{
         payRecords[empAddress].lastPayTime = now;
     }
     
     function LicenseAdd(uint ref, string license)public onlyOwner{
         licensesRecord[ref] = license;
     }
     
     //delete contract with the help of the employee secret
     function deleteContractEmp(address empAddress, address empContract, bytes32 secret)public onlyControlAuthority{
         require(remove(empAddress),"Removing Employee Address from array failed");
         require(empContract.call(bytes4(keccak256("destructContractEmp(bytes32)")), secret), "Destruction failed during calling \"destruct\" method in Employee Contract");
         delete employeeContracts[empAddress];
         delete payRecords[empAddress];
     }
     
     //delete contract with the help of the company secret
     function deleteContractComp(address empAddress, address empContract, bytes32 secret)public onlyControlAuthority{
         require(remove(empAddress),"Removing Employee Address from array failed");
         require(empContract.call(bytes4(keccak256("destructContractComp(bytes32)")), secret), "Destruction failed during calling \"destruct\" method in Employee Contract");
         delete employeeContracts[empAddress];
         delete payRecords[empAddress];
     }
     
     //find index of empAddress from array of employeesAddress and remove it from array 
     function remove(address empAddress)internal  returns(bool) {
        for (uint i = 0; i<=employeesAddress.length-1; i++){
            if(employeesAddress[i] == empAddress){
                if(i==employeesAddress.length-1){
                    delete employeesAddress[employeesAddress.length-1];
                    employeesAddress.length = employeesAddress.length-1;
                }else{
                    employeesAddress[i] = employeesAddress[employeesAddress.length-1];
                    delete employeesAddress[employeesAddress.length-1];
                    employeesAddress.length = employeesAddress.length-1;
                }
                return true;
                break;
            }
        }
        return false;
    }
     
     function addLicense(uint refNumber, string licenseNumber) public onlyOwner{
         licensesRecord[refNumber] = licenseNumber;
     }
     
     function changeOwner(address newOwner) public onlyOwner{
         owner = newOwner;
     }
     
     /**
      * Read methods
      **/
      function getEmpAddressAll()public view returns(address[]){
         return employeesAddress;
     }
     
     function getTotalEmployees()public view returns(uint){
         return employeesAddress.length;
     }
     function getEmpContract(address empAddress)public view returns(address){
         return employeeContracts[empAddress];
     } 
     
     function CompanyName() public view returns(string){
         return companyName;
     }
     

     function getLicense(uint refNumber)public view returns(string){
         return licensesRecord[refNumber];
     }
     
     function getPayStatus(address empAddress)public view returns(bool, uint){
         return (getPayAcess(empAddress), getLastPayTime(empAddress));
     }
     
     function getPayAcess(address empAddress)public view returns(bool){
         return payRecords[empAddress].hasPayAcess;
     }
     
     function getLastPayTime(address empAddress)public view returns(uint){
         return payRecords[empAddress].lastPayTime;
     }
     
     function LicenseNumber(uint refNumber)public view returns(string){
         return licensesRecord[refNumber];
     }

    
}