// SPDX-License-Identifier: MIT 
pragma solidity >0.8.24;

contract SendingMoney {
    
    struct Transfer {
        address payable sender;
        address payable recipient;
        string code;
        uint sum;
        bool isAvaible;
        bool isReceived;
        uint creationDate;
    }

    Transfer[] public transfers; 

    function createTransfer(address payable recipient, string memory code) public payable {
        require(msg.value > 0, unicode"Недостаточно средств для перевода");
        require(recipient != msg.sender, unicode"Вы не можете отправить деньги себе");
        transfers.push(Transfer(payable(msg.sender), recipient, code, msg.value, true, false, block.timestamp)); 
    }

    function getMoney(uint id, string memory code) public payable {
        require(transfers[id].isAvaible, unicode"Перевод не доступен или не существует");
        require(transfers[id].sender != msg.sender, unicode"Вы не можете отправить деньги себе");
        require(transfers[id].recipient == msg.sender, unicode"Вы не являетесь адресатом перевода");

        if (keccak256(abi.encodePacked(transfers[id].code)) == keccak256(abi.encodePacked(code))) {
            payable(msg.sender).transfer(transfers[id].sum);
            transfers[id].isReceived = true;
        }
        else {
            transfers[id].sender.transfer(transfers[id].sum);
        }
        transfers[id].isAvaible = false;
    }

    function cancelTransfer(uint id) public payable {
        require(transfers[id].isAvaible, unicode"Перевод уже выполнен или не существует");
        transfers[id].sender.transfer(transfers[id].sum);
        transfers[id].isAvaible = false;
    }

    function getTransfers() public view returns(Transfer[] memory) {
        return transfers;
    }

}