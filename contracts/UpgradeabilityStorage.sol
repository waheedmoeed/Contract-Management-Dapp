pragma solidity ^0.4.15;

import "./UpgradeabilityProxy.sol";


/**
 * @title UpgradeabilityStorage
 * @dev This contract represents a proxy where the storage address to which it will delegate can be upgraded
 */
contract UpgradeabilityStorage is UpgradeabilityProxy {
  /**
   * @dev This event will be emitted every time the storage gets upgraded
   * @param Storage representing the address of the upgraded storage
   */
    event StorageUpgraded(address indexed Storage);

  // Storage position of the address of the current implementation
    bytes32 private constant STORAGEPOSITION = keccak256("org.salarymanagement.storage");

  /**
   * @dev Constructor function
   */
    constructor() public{}

  /**
   * @dev Tells the address of the current storage
   * @return address of the current storage
   */
    function Storage() public view returns (address Storage) {
        bytes32 position = STORAGEPOSITION;
        assembly {
        impl := sload(position)
        }
    }

  /**
   * @dev Sets the address of the current storage
   * @param Storage address representing the new storage to be set
   */
  function setStorage(address Storage) internal {
    bytes32 position = implementationPosition;
    assembly {
      sstore(position, Storage)
    }
  }

  /**
   * @dev Upgrades the storage address
   * @param newStorage representing the address of the new storage to be set
   */
  function _upgradeStorageTo(address newStorage) internal {
    address currentStorage = Storage();
    require(currentStorage != newStorage);
    setStorage(newStorage);
    emit StorageUpgraded(newStorage);
  }