pragma solidity ^0.4.25;

contract EmployeeContract{
    uint startDate;
    uint endDate;
    uint pay;
    
    string name;
    string cnicNumber;
    string ipfsHash;
    
    bytes32 companySecert;
    bytes32 employeeSecret;
    
    address companyAddress;
    address employeeAddress;
    address controlAuthority;
    
    constructor(string Name, string cNumber, string iHash, uint Pay, uint eDate, bytes32 cSecret, address eAddress, address controlAddress) public{
        name = Name;
        cnicNumber = cNumber;
        ipfsHash = iHash;
        endDate = eDate;
        pay = Pay;
        companySecert = cSecret;
        employeeAddress = eAddress;
        companyAddress = msg.sender;
        controlAuthority = controlAddress;
    }
    
    /**
     * Events
     **/
     
    event ContractedStarted(address empAdd, uint startTime);
    
    
    /**
     * Modifiers
     * */
     modifier onlyEmployee(){
         require(tx.origin == employeeAddress, "Only employee address is allow to perform this action in employee contract");
         _;
     }
     
     //Checking on the basis of employee secret
     modifier onlyControlAuthority(bytes32 secret){
         require(tx.origin == controlAuthority, "Only control authority can do this");
         require(keccak256(abi.encode(secret)) == keccak256(abi.encode(employeeSecret)) , "Secret does not match" ) ;
         _;
     }
     
     //Checking on the basis of getCompanySecret
     modifier onlyControlAuthority2(bytes32 secret){
         require(tx.origin == controlAuthority, "Only control authority can do this");
         require(keccak256(abi.encode(secret)) == keccak256(abi.encode(companySecert)) , "Secret does not match" ) ;
         _;
     }
     
     
    /**
     * Write Methods
     * */
    function startContract(bytes32 eSecret) public onlyEmployee returns(bool){
        employeeSecret = eSecret;
        startDate = now;
        emit ContractedStarted(msg.sender, now);
        return true;
    } 
    
     
     /**
      * Read Methods
      **/
    function getPay()public view returns(uint){
        return pay;
    }
    
    function getContractEndtime()public view returns(uint){
        return endDate;
    }
    
    function getCompanySecret()public view returns(bytes32){
        return keccak256(abi.encode(companySecert));
    }
    
    function getEmployeeSecret()public view returns(bytes32){
        return keccak256(abi.encode(companySecert));
    }
    
    function getIpfsHash()public view returns(string){
        return ipfsHash;
    }
    
    function getCompanyAddress()public view returns(address){
        return companyAddress;
    }
    
    /**
     * Contract Destruction
     * */
    
    //Destruct the contract with the help of the employee seccret
    function destructContractEmp(bytes32 secret)public onlyControlAuthority(secret){
        selfdestruct(tx.origin);
    }
    
    //Destruct the secret with the help of the company secret
    function destructContractComp(bytes32 secret)public onlyControlAuthority2(secret){
        selfdestruct(tx.origin);
    }
}