pragma solidity ^0.4.25;

import './UpgradeabilityStorage.sol';
import "./CompanyContract.sol";

contract OwnedUpgradeability is UpgradeabilityStorage {
  address owner;
  address storageContract;
      /**
      * @dev Event to show ownership has been transferred
      * @param previousOwner representing the address of the previous owner
      * @param newOwner representing the address of the new owner
      */
      event ProxyOwnershipTransferred(address previousOwner, address newOwner);
    
      // Storage position of the owner of the contract
      bytes32 private constant proxyOwnerPosition = keccak256("org.zeppelinos.proxy.owner");
    
      /**
      * @dev the constructor sets the original owner of the contract to the sender account.
      */
      constructor() public {
        owner = msg.sender;
        setUpgradeabilityOwner(msg.sender);
      }
    
      /**
      * @dev Throws if called by any account other than the owner.
      */
      modifier onlyProxyOwner() {
        require(msg.sender == proxyOwner(),"Only Proxy Owner can do this operation");
        _;
      }
      
      modifier onlySameOwner(address newCompCont){
          require(Companycontract(newCompCont).getOwner() == proxyOwner() , "Proxy Contract and Companycontract owner must be same");
          _;
      }
      
    
      /**
       * @dev Tells the address of the owner
       * @return the address of the owner
       */
      function proxyOwner() public view returns (address ownerAdd) {
        bytes32 position = proxyOwnerPosition;
        assembly {
          ownerAdd := sload(position)
        }
      }
      
      /**
       * @dev Sets the address of the owner
       */
      function setUpgradeabilityOwner(address newProxyOwner) internal {
        bytes32 position = proxyOwnerPosition;
        assembly {
          sstore(position, newProxyOwner)
        }
      }
    
      /**
       * @dev Allows the current owner to transfer control of the contract to a newOwner.
       * @param newOwner The address to transfer ownership to.
       */
      function transferProxyOwnership(address newOwner) public onlyProxyOwner {
        require(newOwner != address(0));
        emit ProxyOwnershipTransferred(proxyOwner(), newOwner);
        owner = newOwner;
        setUpgradeabilityOwner(newOwner);
      }
    
      /**
       * @dev Allows the proxy owner to upgrade the current version of the proxy.
       * @param newImplementation representing the address of the new implementation to be set.
       */
      
      function upgradeTo(address newImplementation) public onlyProxyOwner onlySameOwner(newImplementation) returns(bool){
          _upgradeTo(newImplementation);
      }
    
      
      function upgradeStorage(address storageAddress)public onlyProxyOwner returns(bool){
          _upgradeStorageTo(storageAddress);
          storageContract = storageAddress;
      }
      
      //Make proxy contract able to accept ether
      function sendEtherToContract() payable public{
      }
      
      function getEtherOfContract()public view returns(uint){
          return address(this).balance * 1000000000000000000;
      }

      function checkOwnerShip(address addrToCheck)public view returns(bool){
          return addrToCheck == proxyOwner();
      }
}