const contractAddress = "0xE667751C3C97296C3762fcBF3a42ab9b6A2933B3";
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "cancelTransfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			}
		],
		"name": "createTransfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			}
		],
		"name": "getMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTransfers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address payable",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "code",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "sum",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "creationDate",
						"type": "uint256"
					}
				],
				"internalType": "struct SendingMoney.Transfer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transfers",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "code",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "sum",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "creationDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contract = new web3.eth.Contract(abi, contractAddress, {gas: 300000});

export const getAllAccounts = async () => {
    return await web3.eth.getAccounts();
}

export const getBalanceOf = async (address) => {
    try {
        const balance = await web3.eth.getBalance(address);
        return web3.utils.fromWei(balance, 'ether').slice(0, 5);
    }
    catch (e) {
        throw new Error(e);
    }
}

export const getSenderTransfers = async (currentAccount) => {

    const trasfers = await contract.methods.getTransfers().call();
    return trasfers.filter(item => {
        return item.sender === currentAccount;
    });

}

export const getRecipientTransfers = async (currentAccount) => {

    const trasfers = await contract.methods.getTransfers().call();
    return trasfers.filter(item => {
        return item.recipient === currentAccount;
    });

}

export const transformDate = async (date) => {
    return new Date(date * 1000);
}


