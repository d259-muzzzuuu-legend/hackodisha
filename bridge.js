// require('dotenv').config();
// const { ethers } = require("ethers");

// // Configuration
// const sepoliaRpcUrl = "https://sepolia.infura.io/v3/836447d465c84e1b8add096320cb2d7b";
// const bdagRpcUrl = "https://rpc.primordial.bdagscan.com";
// const privateKey = "6dbfc914e66304dc16f32a7f06f3d46759139b7694524513e4730660ad5ab"; l
// const address_A = "0x834169D05477F9Dd8f5535D6A19877342400f16f"; // Sepolia contract
// const address_B = "0x1726ab7b6b547aAeba5674b35fE265464c316Eb1"; // BDAG contract
// const bridgeAddress = "0x7Eedc2cF4ECC62B7eD68c246CfbD883C624589Ce"; // Placeholder bridge

// // ABIs
// const abi_A = [
//   {
//     "inputs": [],
//     "name": "deposit",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [{ "internalType": "address", "name": "_relayer", "type": "address" }],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
//       { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
//     ],
//     "name": "Lockedeth",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       { "internalType": "address payable", "name": "target", "type": "address" },
//       { "internalType": "uint256", "name": "amount", "type": "uint256" }
//     ],
//     "name": "withdraw",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "checkBalance",
//     "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "Relayer",
//     "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// const abi_B = [
//   {
//     "inputs": [
//       { "internalType": "address", "name": "spender", "type": "address" },
//       { "internalType": "uint256", "name": "value", "type": "uint256" }
//     ],
//     "name": "approve",
//     "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       { "internalType": "address", "name": "request", "type": "address" },
//       { "internalType": "uint256", "name": "amount", "type": "uint256" } // Corrected typo from 'amoount'
//     ],
//     "name": "burn",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       { "internalType": "string", "name": "name", "type": "string" },
//       { "internalType": "string", "name": "symbol", "type": "string" },
//       { "internalType": "address", "name": "_relayer", "type": "address" }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [
//       { "internalType": "address", "name": "spender", "type": "address" },
//       { "internalType": "uint256", "name": "allowance", "type": "uint256" },
//       { "internalType": "uint256", "name": "needed", "type": "uint256" }
//     ],
//     "name": "ERC20InsufficientAllowance",
//     "type": "error"
//   },
//   // ... (other error types and functions omitted for brevity, include all from your abi_B if needed)
//   {
//     "inputs": [
//       { "internalType": "address", "name": "request", "type": "address" },
//       { "internalType": "uint256", "name": "amount", "type": "uint256" }
//     ],
//     "name": "mint",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
//       { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
//       { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
//     ],
//     "name": "Approval",
//     "type": "event"
//   },
//   // ... (other events and functions omitted, include all from your abi_B if needed)
//   {
//     "inputs": [],
//     "name": "totalSupply",
//     "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// const bridgeABI = []; // Placeholder: Obtain from bridge provider or remove if not used

// // Global variables
// let signer;
// let provider;

// // Wallet connection
// const connectButton = document.getElementById('mint');
// connectButton.addEventListener("click", connectWallet);

// async function connectWallet() {
//   if (typeof window.ethereum !== 'undefined') {
//     try {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       provider = new ethers.providers.Web3Provider(window.ethereum);
//       signer = provider.getSigner();
//       const address = await signer.getAddress();
//       connectButton.innerText = "✅ Connected";
//       connectButton.disabled = true;
//       document.getElementById('walletStatus').innerText = Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)};
//       showToast("Wallet Connected!", "success");
//     } catch (error) {
//       console.error("User rejected connection:", error);
//       showToast("Connection rejected.", "error");
//     }
//   } else {
//     alert('MetaMask is not installed!');
//   }
// }

// // Bridging function
// async function bridgeToBDAG(amountEth) {
//   if (!signer) throw new Error("Wallet not connected");
//   try {
//     const amountWei = ethers.utils.parseEther(amountEth.toString());
//     const sepoliaContract = new ethers.Contract(address_A, abi_A, signer);
//     const bridgeContract = new ethers.Contract(bridgeAddress, bridgeABI, signer); // Placeholder
//     const bdagContract = new ethers.Contract(address_B, abi_B, signer);

//     console.log("Depositing ETH on Sepolia...");
//     const depositTx = await sepoliaContract.deposit({ value: amountWei });
//     await depositTx.wait();
//     console.log("ETH deposited on Sepolia:", depositTx.hash);

//     const bdagChainId = 12345; // Replace with actual BDAG chain ID
//     const receiverAddress = await signer.getAddress();
//     console.log("Bridging to BDAG...");
//     const bridgeTx = await bridgeContract.bridgeTokens(bdagChainId, receiverAddress, amountWei, { value: ethers.utils.parseEther("0.01") });
//     await bridgeTx.wait();
//     console.log("Bridged to BDAG:", bridgeTx.hash);

//     console.log("Withdrawing tokens on BDAG...");
//     const withdrawTx = await bdagContract.withdraw(receiverAddress, amountWei); // Adjust parameters if needed (e.g., target, amount)
//     await withdrawTx.wait();
//     console.log("Tokens withdrawn on BDAG:", withdrawTx.hash);

//     return { success: true, bridgeTxHash: bridgeTx.hash, withdrawTxHash: withdrawTx.hash };
//   } catch (error) {
//     console.error("Error bridging to BDAG:", error);
//     return { success: false, error: error.message };
//   }
// }

// // Button to trigger bridge
// document.getElementById('bridgeButton').addEventListener('click', async () => {
//   const amountEth = document.getElementById('tradeAmount').value;
//   if (!amountEth || amountEth <= 0) {
//     alert("Please enter a valid amount in ETH");
//     return;
//   }
//   const result = await bridgeToBDAG(amountEth);
//   if (result.success) {
//     alert(Bridging successful! Bridge TX: ${result.bridgeTxHash}, Withdraw TX: ${result.withdrawTxHash});
//   } else {
//     alert(Bridging failed: ${result.error});
//   }
// });

// // Toast function
// function showToast(message, type) {
//   console.log(${type === "success" ? "✅" : "❌"} ${message});
// }
// const { ethers } = require("ethers");

const address_A = "0x834169D05477F9Dd8f5535D6A19877342400f16f";
const abi_A =[
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_relayer",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Lockedeth",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "target",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Relayer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const rpcurl_A = "";

const address_B = "0x1726ab7b6b547aAeba5674b35fE265464c316Eb1";
const abi_B = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "request",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amoount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_relayer",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "request",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Relayer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const rpcurl_B = "https://rpc.primordial.bdagscan.com";

let signer;
let provider;

// Connect Wallet
(function initBridgeUI() {
  const statusEl = document.getElementById('walletStatus');
  const bridgeBtn = document.getElementById('bridgeButton');

  function safeStatus(text) { if (statusEl) statusEl.innerText = text; }

  function ensureEthers() {
    if (typeof ethers !== 'undefined') return true;
    // try to dynamically load ethers
    const existing = document.querySelector('script[data-dynamic-ethers]');
    if (existing) return false;
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js';
    s.async = true;
    s.defer = true;
    s.setAttribute('data-dynamic-ethers', 'true');
    s.onload = () => { console.log('Ethers loaded dynamically'); };
    s.onerror = () => { alert('Failed to load ethers library. Check your network.'); };
    document.head.appendChild(s);
    alert('Loading ethers library... please tap Bridge again in a moment.');
    return false;
  }

  async function ensureConnected() {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert('MetaMask is not installed! Please install MetaMask and try again.');
      return false;
    }
    if (!ensureEthers()) return false;
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const accounts = await provider.listAccounts();
      if (!accounts || accounts.length === 0) {
        await provider.send('eth_requestAccounts', []);
      }
      signer = provider.getSigner();
      const address = await signer.getAddress();
      safeStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
      if (!window.ethereum._bridgeUiSync) {
        window.ethereum._bridgeUiSync = true;
        window.ethereum.on('accountsChanged', (acc) => {
          if (acc && acc.length) {
            const a = acc[0];
            safeStatus(`Connected: ${a.slice(0, 6)}...${a.slice(-4)}`);
          } else {
            safeStatus('');
          }
        });
        window.ethereum.on('chainChanged', () => {
          provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
          signer = provider.getSigner();
        });
      }
      return true;
    } catch (e) {
      console.error('Connection error:', e);
      alert(e && e.message ? e.message : 'Connection rejected.');
      return false;
    }
  }

  bridgeBtn && bridgeBtn.addEventListener('click', async () => {
    if (!ensureEthers()) return;
    const connected = await ensureConnected();
    if (!connected) return;
    const amountEth = document.getElementById('tradeAmount')?.value;
    if (!amountEth || isNaN(amountEth) || parseFloat(amountEth) <= 0) {
      alert('Please enter a valid ETH amount.');
      return;
    }
    try {
      const amountWei = ethers.utils.parseEther(amountEth);
      const sepoliaContract = new ethers.Contract(address_A, abi_A, signer);
      const bdagContract = new ethers.Contract(address_B, abi_B, signer);
      const receiverAddress = await signer.getAddress();

      const depositTx = await sepoliaContract.deposit({ value: amountWei });
      await depositTx.wait();

      const mintTx = await bdagContract.mint(receiverAddress, amountWei);
      await mintTx.wait();

      alert(`✅ Bridging complete!\nDeposit TX: ${depositTx.hash}\nMint TX: ${mintTx.hash}`);
    } catch (error) {
      console.error('Bridging error:', error);
      alert(`❌ Bridging failed: ${error.message}`);
    }
  });
})();

// Bridge ETH to BDAG (without bridge contract)
document.getElementById('bridgeButton').addEventListener("click", async () => {
  const amountEth = document.getElementById('tradeAmount').value;
  if (!amountEth || isNaN(amountEth) || parseFloat(amountEth) <= 0) {
    alert("Please enter a valid ETH amount.");
    return;
  }

  if (!signer) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    const amountWei = ethers.utils.parseEther(amountEth);
    const sepoliaContract = new ethers.Contract(address_A, abi_A, signer);
    const bdagContract = new ethers.Contract(address_B, abi_B, signer);
    const receiverAddress = await signer.getAddress();

    // Step 1: Deposit ETH on Sepolia
    console.log("Depositing ETH on Sepolia...");
    const depositTx = await sepoliaContract.deposit({ value: amountWei });
    await depositTx.wait();
    console.log("Deposit TX:", depositTx.hash);

    // Step 2: Simulate minting BDAG tokens (normally done by backend relayer)
    console.log("Minting BDAG tokens...");
    const mintTx = await bdagContract.mint(receiverAddress, amountWei);
    await mintTx.wait();
    console.log("Mint TX:", mintTx.hash);

    alert(`✅ Bridging complete!\nDeposit TX: ${depositTx.hash}\nMint TX: ${mintTx.hash}`);
  } catch (error) {
    console.error("Bridging error:", error);
    alert(`❌ Bridging failed: ${error.message}`);
  }
});

// Toast feedback (optional console-only)
function showToast(message, type) {
  try { console.log(`${type === 'success' ? '✅' : '❌'} ${message}`); } catch (_) {}
}