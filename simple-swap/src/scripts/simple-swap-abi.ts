export const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "wrappedBnb_",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "InvalidAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "sell",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;