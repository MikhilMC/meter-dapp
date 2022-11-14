// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Payable {
    uint256 public mtrBalance;
    uint256 public mtrgBalance;
    uint256 public voltBalance;
    IERC20 public immutable mtrgAddress;
    IERC20 public immutable voltAddress;

    constructor(address _mtrgAddress, address _voltAddress) {
        mtrgAddress = IERC20(_mtrgAddress);
        voltAddress = IERC20(_voltAddress);
    }

    receive() external payable {
        receiveMTR();
    }

    fallback() external payable {
        receiveMTR();
    }

    function receiveMTR() public payable {
        mtrBalance += msg.value;
    }

    function receiveMTRG() external payable {
        uint256 amount = mtrgAddress.allowance(msg.sender, address(this));
        mtrgBalance += amount;
        mtrgAddress.transferFrom(msg.sender, address(this), amount);
    }

    function receiveVOLT() external payable {
        uint256 amount = voltAddress.allowance(msg.sender, address(this));
        voltBalance += amount;
        voltAddress.transferFrom(msg.sender, address(this), amount);
    }

    function transferMTR(address toAddress, uint256 transferAmount) public {
        require(mtrBalance >= transferAmount, "Invalid amount");
        mtrBalance -= transferAmount;
        payable(toAddress).transfer(transferAmount);
    }

    function transferMTRG(address toAddress, uint256 transferAmount) public {
        require(mtrgBalance >= transferAmount, "Invalid amount");
        mtrgBalance -= transferAmount;
        mtrgAddress.transfer(toAddress, transferAmount);
    }

    function transferVOLT(address toAddress, uint256 transferAmount) public {
        require(voltBalance >= transferAmount, "Invalid amount");
        voltBalance -= transferAmount;
        voltAddress.transfer(toAddress, transferAmount);
    }
}
