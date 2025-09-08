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

    // Disable button and show loading state
    const originalText = bridgeBtn.textContent;
    bridgeBtn.disabled = true;
    bridgeBtn.textContent = 'Processing...';
    
    try {
      // Check network status first
      const networkStatus = await checkNetworkStatus();
      if (!networkStatus.isHealthy) {
        throw new Error("Network connection issues detected. Please check your connection and try again.");
      }

      const amountWei = ethers.utils.parseEther(amountEth);
      const sepoliaContract = new ethers.Contract(address_A, abi_A, signer);
      const receiverAddress = await signer.getAddress();

      // Get optimized gas price and estimate gas
      const gasPrice = await getOptimalGasPrice();
      const gasEstimate = await estimateGasForDeposit(sepoliaContract, amountWei);
      
      console.log("Gas estimate:", gasEstimate.toString());
      console.log("Gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");

      // Check if user has enough balance for transaction + gas
      const balance = await provider.getBalance(receiverAddress);
      const totalCost = amountWei.add(gasEstimate.mul(gasPrice));
      if (balance.lt(totalCost)) {
        throw new Error(`Insufficient balance. You need ${ethers.utils.formatEther(totalCost)} ETH (${amountEth} ETH + ${ethers.utils.formatEther(gasEstimate.mul(gasPrice))} ETH gas)`);
      }

      // Execute deposit with optimized gas parameters
      const depositTx = await sepoliaContract.deposit({ 
        value: amountWei,
        gasLimit: gasEstimate,
        gasPrice: gasPrice
      });
      
      console.log("Deposit transaction sent:", depositTx.hash);
      const receipt = await depositTx.wait();
      console.log("Deposit confirmed:", receipt.transactionHash);

      alert(`✅ ETH deposited successfully!\nTransaction Hash: ${depositTx.hash}\nGas Used: ${receipt.gasUsed.toString()}\n\nNote: BDAG tokens will be minted by the relayer after verification.`);
    } catch (error) {
      console.error('Bridging error:', error);
      let errorMessage = error.message;
      
      // Provide more specific error messages
      if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient ETH balance for transaction and gas fees.";
      } else if (error.message.includes("gas")) {
        errorMessage = "Gas estimation failed. Please try with a smaller amount or check network conditions.";
      } else if (error.message.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user.";
      }
      
      alert(`❌ Bridging failed: ${errorMessage}`);
    } finally {
      // Restore button state
      bridgeBtn.disabled = false;
      bridgeBtn.textContent = originalText;
    }
  });
})();

// Network status and gas optimization functions
async function checkNetworkStatus() {
  try {
    const network = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    console.log("Connected to network:", network.name, "Chain ID:", network.chainId);
    console.log("Current block:", blockNumber);
    return { network, blockNumber, isHealthy: true };
  } catch (error) {
    console.error("Network check failed:", error);
    return { isHealthy: false, error };
  }
}

async function getGasPrice() {
  try {
    const gasPrice = await provider.getGasPrice();
    return gasPrice;
  } catch (error) {
    console.error("Error fetching gas price:", error);
    // Fallback gas price based on network
    return ethers.utils.parseUnits("20", "gwei");
  }
}

async function getOptimalGasPrice() {
  try {
    // Try to get gas price with some buffer for faster confirmation
    const gasPrice = await provider.getGasPrice();
    // Add 10% buffer for faster confirmation
    return gasPrice.mul(110).div(100);
  } catch (error) {
    console.error("Error getting optimal gas price:", error);
    return ethers.utils.parseUnits("25", "gwei");
  }
}

async function estimateGasForDeposit(contract, amountWei) {
  try {
    const gasEstimate = await contract.estimateGas.deposit({ value: amountWei });
    // Add 20% buffer to gas estimate
    return gasEstimate.mul(120).div(100);
  } catch (error) {
    console.error("Gas estimation failed:", error);
    // Fallback gas limit
    return ethers.BigNumber.from("200000");
  }
}

// Update gas estimation display
async function updateGasEstimation(amountEth) {
  const gasEstimationElement = document.getElementById('gasEstimation');
  if (!gasEstimationElement) return;
  
  if (!amountEth || isNaN(amountEth) || parseFloat(amountEth) <= 0) {
    gasEstimationElement.textContent = "= 0.00 ETH";
    return;
  }

  try {
    const amountWei = ethers.utils.parseEther(amountEth);
    const sepoliaContract = new ethers.Contract(address_A, abi_A, provider);
    const gasEstimate = await estimateGasForDeposit(sepoliaContract, amountWei);
    const gasPrice = await getOptimalGasPrice();
    const gasCost = gasEstimate.mul(gasPrice);
    const gasCostEth = ethers.utils.formatEther(gasCost);
    
    gasEstimationElement.textContent = `= ${parseFloat(gasCostEth).toFixed(6)} ETH`;
  } catch (error) {
    console.error("Error updating gas estimation:", error);
    gasEstimationElement.textContent = "= ~0.001 ETH";
  }
}

// Add event listener for gas estimation updates
document.addEventListener('DOMContentLoaded', function() {
  const amountInput = document.getElementById('tradeAmount');
  if (amountInput) {
    amountInput.addEventListener('input', function() {
      updateGasEstimation(this.value);
    });
  }
});

// Toast feedback (optional console-only)
function showToast(message, type) {
  try { console.log(`${type === 'success' ? '✅' : '❌'} ${message}`); } catch (_) {}
}
