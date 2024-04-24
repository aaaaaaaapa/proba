const contractAddress = "0x424Cf38A3878B97552eCEc0e34F911F3084261aF";
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
						"name": "isAvaible",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isReceived",
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
				"name": "isAvaible",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isReceived",
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

const currentAccount = sessionStorage.currentAccount;

const contract = new web3.eth.Contract(abi, contractAddress, {gas: 300000});

export const getAllAccounts = async () => {
    return await web3.eth.getAccounts();
}

export const convertToEth = (sum) => {
	const balance = Number(web3.utils.fromWei(sum, 'ether'));
	const rounedBalance = Math.round(balance * 100) / 100;
	return String(rounedBalance);
}

export const convertToWei = (sum) => {
	return web3.utils.toWei(sum);
}

export const getBalanceOf = async (address) => {
    try {
        const balance = await web3.eth.getBalance(address);
        return convertToEth(balance);
    }
    catch (error) {
        throw new Error(error);
    }
}

export const getAllTransfers = async () => {
	return await contract.methods.getTransfers().call();
}

const getAllTransfersObj = async () => {
	return Object.assign({}, await contract.methods.getTransfers().call())
}

export const getSenderTransfers = async (currentAccount) => {

	const trasfers = await getAllTransfers();
	return trasfers.filter(elem => {
		return elem.sender === currentAccount;
	});
}

export const getSenderTransfersObj = async (currentAccount) => {

    const trasfers = await getAllTransfersObj();
    
	return Object.fromEntries(Object.entries(trasfers).
    filter(([key, val]) => val.sender === currentAccount));

}

export const getRecipientTransfersObj = async (currentAccount) => {

    const trasfers = await getAllTransfersObj();
    
	return Object.fromEntries(Object.entries(trasfers).
    filter(([key, val]) => val.recipient === currentAccount));

}

export const cancelTransfer = (id) => {
	contract.methods.cancelTransfer(id).send({from: currentAccount});
}

export const transformDate = (date) => {

	const strDate = new Date(date * 1000);
	const formatter = new Intl.DateTimeFormat('ru-RU');
	
	return formatter.format(strDate);
}

export const createTransfer = async (recipient, code, sum) => {
	return await contract.methods.createTransfer(recipient, code).send({from: currentAccount, value: convertToWei(sum)}, (error, receipt) => {
		if (error) {
			return error;
		}
	});
}

export const getMoney = async (id, code) => {
	return await contract.methods.getMoney(id, code).send({from: currentAccount});
}

// console.log(createTransfer('0x93d5eD3c068Ba317b205BE35EC3aa2ecA4be0010', 'ass', '1'))
