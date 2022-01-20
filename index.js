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

// const initialize = (event) => {

    // if (window.ethereum) {
    //     ethereum.request({ method: "eth_requestAccounts" })
    //         .then(() => document.getElementById("count").click())
    //         .catch((err) => console.error(err.message));

//         ethereum.on("chainChanged", () => window.location.reload());

        // ethereum.on("accountsChanged", (accounts) => {
        //     if (accounts.length > 0) {
        //         console.log(`Using account ${accounts[0]}`);
        //     } else {
        //         console.error("0 accounts.");
        //     }
        // });


//         ethereum.on("message", (message) => console.log(message));

        // ethereum.on("connect", (info) => {
        //     console.log(`Connected to network ${info}`);
        // });

//         ethereum.on("disconnect", (error) => {
//             console.log(`Disconnected from network ${error}`);
//         });

//         const provider = new ethers.providers.Web3Provider(window.ethereum);

//         const signer = provider.getSigner();

//         const contract = new ethers.Contract(address, abi, signer);

//         document.getElementById("count").addEventListener("click", function() {
//             contract.getCount().then((count) => document.getElementById("count").innerText = count)
//                 .catch((err) => console.error(err));
//         });

//         contract.on("Count", (method, count, caller) => {
//             console.log("Event occured from smart contract: ", method, count, caller);
//         });



//         document.getElementById("increase").addEventListener("click", function() {

//             contract.increase()
//                 .then((tx) => {
//                     console.log("Transaction occured: ", tx.hash);
//                     return tx.wait().then(() => {

//                         contract.getCount().then((count) => document.getElementById("count").innerText = count)

//                         console.log("Increased count");

//                     }).catch((err) => console.error(err.message));
//                 })
//                 .catch((err) => console.error(err.message));
//         });

//         document.getElementById("decrease").addEventListener("click", function() {

//             contract.decrease()
//                 .then((tx) => {
//                     console.log("Transaction occured: ", tx.hash);
//                     return tx.wait().then(() => {

//                         contract.getCount().then((count) => document.getElementById("count").innerText = count)

//                         console.log("Decreased count");

//                     }).catch((err) => console.error(err.message));
//                 })
//                 .catch((err) => console.error(err.message));
//         });
//     } else {
//         console.error("Install MetaMask.");
//     }

// }
const detectEthereumProvider =  require('@metamask/detect-provider');
const onboarding = require('@metamask/onboarding');
const initialize = () => {
    const onboardButton = document.getElementById('loginButton');
    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');
    const network = document.getElementById('NetworkID');
    // onboardButton.innerText = 'Yaay!';


    const isMetamaskInstalled = () => {
        const {ethereum} = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const onClickConnect = async () => {
        try {
          // Will open the MetaMask UI
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error(error);
        }
      };

    // Handling chain change ...// network detection and validaton is still pending
    ethereum.on("chainChanged", () => window.location.reload());

    // and display the network that is connected to.... not working currently
    ethereum.on("connect", (info) => {
      network.innerText = `Connected to network ${info.account}`;
  });
    // Handle the account change
    ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
      if (accounts.length > 0) {
        getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
      } else {
          console.error("0 accounts.");
          getAccountsResult.innerHTML ='Not able to get accounts';

      }
  });


  // function to detect metamask is connected or not
    const MetaMaskClientCheck = () => {
        if (!isMetamaskInstalled()) {
          onboardButton.innerText = 'Click here to install MetaMask!';
          // when button is clicked, we call this function
          onboardButton.onclick = onClickInstall;
          onboardButton.disable = false;

        } else {
          onboardButton.innerText = 'Connect to Metamask';
          onboardButton.onclick = onClickConnect;
          onboardButton.disabled = false;
        }
      };
     // Get account address connected to
      getAccountsButton.addEventListener('click', async () => {
        //we use eth_accounts because it returns a list of addresses owned by us.
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        //We take the first address in the array of addresses and display it
        getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
      });

      MetaMaskClientCheck();
}
document.addEventListener("DOMContentLoaded", initialize);