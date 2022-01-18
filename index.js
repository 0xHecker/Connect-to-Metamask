const address = "0x256E49D1f0d956E1AEcd8787644501b4b216f185";

const abi = [{
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "internalType": "string",
                "name": "method",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "Count",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "count",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "increase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decrease",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCount",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
]
document.addEventListener("DOMContentLoaded", function(event) {

    if (window.ethereum) {
        ethereum.request({ method: "eth_requestAccounts" })
            .then(() => document.getElementById("count").click())
            .catch((err) => console.error(err.message));

        ethereum.on("chainChanged", () => window.location.reload());

        ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                console.log(`Using account ${accounts[0]}`);
            } else {
                console.error("0 accounts.");
            }
        });


        ethereum.on("message", (message) => console.log(message));

        ethereum.on("connect", (info) => {
            console.log(`Connected to network ${info}`);
        });

        ethereum.on("disconnect", (error) => {
            console.log(`Disconnected from network ${error}`);
        });

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(address, abi, signer);

        document.getElementById("count").addEventListener("click", function() {
            contract.getCount().then((count) => document.getElementById("count").innerText = count)
                .catch((err) => console.error(err));
        });

        contract.on("Count", (method, count, caller) => {
            console.log("Event occured from smart contract: ", method, count, caller);
        });


        sendButton.onclick = () => {
            web3.eth.sendTransaction({
                from: accounts[0],
                to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
                value: '0x29a2241af62c0000',
                gas: 21000,
                gasPrice: 20000000000,
            }, (result) => {
                console.log(result)
            })
        }

        const ethereumButton = document.querySelector('.enableEthereumButton');
        const showAccount = document.querySelector('.showAccount');

        ethereumButton.addEventListener('click', () => {
            getAccount();
        });

        async function getAccount() {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            showAccount.innerHTML = account;
        }

        document.getElementById("increase").addEventListener("click", function() {

            contract.increase()
                .then((tx) => {
                    console.log("Transaction occured: ", tx.hash);
                    return tx.wait().then(() => {

                        contract.getCount().then((count) => document.getElementById("count").innerText = count)

                        console.log("Increased count");

                    }).catch((err) => console.error(err.message));
                })
                .catch((err) => console.error(err.message));
        });

        document.getElementById("decrease").addEventListener("click", function() {

            contract.decrease()
                .then((tx) => {
                    console.log("Transaction occured: ", tx.hash);
                    return tx.wait().then(() => {

                        contract.getCount().then((count) => document.getElementById("count").innerText = count)

                        console.log("Decreased count");

                    }).catch((err) => console.error(err.message));
                })
                .catch((err) => console.error(err.message));
        });



    } else {
        console.error("Install MetaMask.");
    }

});