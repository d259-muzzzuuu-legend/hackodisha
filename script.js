// //  const ctx = document.getElementById('portfolioChart').getContext('2d');

// // Tab switching functionality
// function switchTab(button, type) {
//     // Remove active class from all tabs
//     document.querySelectorAll('.tab-button').forEach(tab => {
//         tab.classList.remove('active');
//     });

//     // Add active class to clicked tab
//     button.classList.add('active');

//     // Update button text based on type
//     const actionButton = document.querySelector('.btn-primary');
//     const selectedAsset = document.getElementById('assetSelect').value.split('(')[1].replace(')', '');

//     if (type === 'buy') {
//         actionButton.textContent = Buy ${selectedAsset};
//         actionButton.className = 'btn btn-primary';
//     } else {
//         actionButton.textContent = Sell ${selectedAsset};
//         actionButton.className = 'btn btn-secondary';
//     }
// }

// // Update trade calculation
// document.getElementById('tradeAmount').addEventListener('input', function () {
//     const amount = parseFloat(this.value) || 0;
//     const price = 3354.23; // ETH price
//     const receiveAmount = amount / price;

//     document.querySelector('.price-display:last-of-type span:last-child').textContent =
//         ≈ ${receiveAmount.toFixed(6)} ETH;
// });

// // Asset selection change
// document.getElementById('assetSelect').addEventListener('change', function () {
//     const asset = this.value.split('(')[1].replace(')', '');
//     const prices = {
//         'ETH': 3354.23,
//         'BTC': 43463.12,
//         'BDAG': 0.1496,
//         'SOL': 76.45
//     };

//     document.querySelector('.price-display:first-of-type span:last-child').textContent =
//         $${prices[asset].toLocaleString()};

//     document.querySelector('.btn-primary').textContent = Buy ${asset};
// });

// // Simulate real-time price updates
// setInterval(() => {
//     const priceElements = document.querySelectorAll('.asset-change div:first-child');
//     priceElements.forEach(el => {
//         if (Math.random() > 0.7) {
//             el.classList.add('pulse');
//             setTimeout(() => el.classList.remove('pulse'), 2000);
//         }
//     });
// }, 5000);


// const address_A="0x834169D05477F9Dd8f5535D6A19877342400f16f";
// const abi_A=require('./ab1.json');
// const rpcurl_A="";


// const address_B="0x1726ab7b6b547aAeba5674b35fE265464c316Eb1";
// const abi_B=require('./ab2.json');
// const rpcurl_B="https://rpc.primordial.bdagscan.com";



// let signer;
// let provider;

// const connectButton=document.getElementById('connectButton').addEventListener("click", connectWallet());
// async function connectWallet(){
// 	 if (typeof window.ethereum !== 'undefined') {
//                 try {
//                     await window.ethereum.request({ method: 'eth_requestAccounts' });
//                     provider = new ethers.providers.Web3Provider(window.ethereum);
//                     signer = provider.getSigner();
//                     const address = await signer.getAddress();

//                     connectButton.innerText = "✅ Connected";
//                     connectButton.disabled = true;
//                     walletStatus.innerText = Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)};
                    
//                     showToast("Wallet Connected!", "success");
//                 } catch (error) {
//                     console.error("User rejected connection:", error);
//                     showToast("Connection rejected.", "error");
//                 }
//             } else {
//                 alert('MetaMask is not installed!');
//             }
//         }
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

// Get button and attach event listener
const connectButton = document.getElementById('connectButton');
const walletStatus = document.getElementById('walletStatus');
connectButton && connectButton.addEventListener("click", connectWallet);

function showToast(message, type = "info") {
    try {
        const div = document.createElement('div');
        div.textContent = message;
        div.style.position = 'fixed';
        div.style.right = '16px';
        div.style.bottom = '16px';
        div.style.padding = '10px 14px';
        div.style.borderRadius = '8px';
        div.style.color = '#fff';
        div.style.zIndex = '9999';
        div.style.fontSize = '14px';
        div.style.background = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#334155';
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2500);
    } catch (_) {}
}

async function connectWallet() {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
        alert('MetaMask is not installed! Please install MetaMask and try again.');
        return;
    }
    if (typeof ethers === 'undefined') {
        showToast('Ethers library not loaded. Check CDN script in index.html.', 'error');
        return;
    }
    try {
        if (connectButton) {
            connectButton.disabled = true;
            connectButton.innerText = 'Connecting...';
        }
        provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        await provider.send('eth_requestAccounts', []);
        signer = provider.getSigner();
        const address = await signer.getAddress();

        if (walletStatus) {
            walletStatus.innerText = `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        }
        if (connectButton) {
            connectButton.innerText = '✅ Connected';
            connectButton.disabled = true;
        }

        if (!window.ethereum._uiSyncAttached) {
            window.ethereum._uiSyncAttached = true;
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts && accounts.length) {
                    const a = accounts[0];
                    if (walletStatus) walletStatus.innerText =` Connected: ${a.substring(0, 6)}...${a.substring(a.length - 4)}`;
                    if (connectButton) { connectButton.innerText = '✅ Connected'; connectButton.disabled = true; }
                } else {
                    if (walletStatus) walletStatus.innerText = '';
                    if (connectButton) { connectButton.innerText = 'Connect Wallet'; connectButton.disabled = false; }
                }
            });
            window.ethereum.on('chainChanged', () => {
                provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
                signer = provider.getSigner();
            });
        }

        showToast('Wallet Connected!', 'success');
    } catch (error) {
        console.error('Connection error:', error);
        showToast(error && error.message ? error.message : 'Connection rejected.', 'error');
        if (connectButton) {
            connectButton.disabled = false;
            connectButton.innerText = 'Connect Wallet';
        }
    }
}

const chartCanvas = document.getElementById('portfolioChart');
if (chartCanvas && window.Chart) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Portfolio Value',
          data: [10000, 10250, 10100, 10500, 10700, 11000],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
}

// Restore connection UI on load if user previously granted access
window.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!window.ethereum || typeof ethers === 'undefined') return;
        const prov = new ethers.providers.Web3Provider(window.ethereum, 'any');
        const accounts = await prov.listAccounts();
        if (accounts && accounts.length) {
            provider = prov;
            signer = provider.getSigner();
            const addr = accounts[0];
            if (walletStatus) walletStatus.innerText = `Connected: ${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
            if (connectButton) { connectButton.innerText = '✅ Connected'; connectButton.disabled = true; }
        }
        if (!window.ethereum._uiSyncAttached) {
            window.ethereum._uiSyncAttached = true;
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts && accounts.length) {
                    const a = accounts[0];
                    if (walletStatus) walletStatus.innerText =`Connected: ${a.substring(0, 6)}...${a.substring(a.length - 4)}`;
                    if (connectButton) { connectButton.innerText = '✅ Connected'; connectButton.disabled = true; }
                } else {
                    if (walletStatus) walletStatus.innerText = '';
                    if (connectButton) { connectButton.innerText = 'Connect Wallet'; connectButton.disabled = false; }
                }
            });
            window.ethereum.on('chainChanged', () => {
                provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
                signer = provider.getSigner();
            });
        }
    } catch (_) {}
});