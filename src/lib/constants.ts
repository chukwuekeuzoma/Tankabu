export const FUEL_DISTRIBUTION_ADDRESS = "0xBC6724f014831D6909b6cD29aBa47301F48d72CC";
export const MOCK_STABLECOIN_ADDRESS = "0x4DA65AF8818f13B922B9B4920395992C215D5D1f";

export const CHAIN_ID = 97;
export const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
export const EXPLORER_URL = "https://testnet.bscscan.com/";

// Backend Security (Vite Env)
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
export const BACKEND_API_KEY = import.meta.env.VITE_BACKEND_API_KEY || "";

export const FUEL_DISTRIBUTION_V2_ABI = [
  "function productRates(bytes32) view returns (uint256)",
  "function createManifest(bytes32,uint256,address,address,address) external returns (uint256)",
  "function validateCheckpoint(uint256,string,uint256) external",
  "function updateRate(bytes32,uint256) external",
  "function getCheckpoint(uint256,uint256) view returns (string,uint256,uint256,address,bool)",
  "event ManifestCreated(uint256 indexed,bytes32,uint256,uint256,address indexed,address indexed,address)",
  "event CheckpointValidated(uint256 indexed,uint256,string,uint256,bool)"
];

export const ERC20_ABI = [
  "function approve(address,uint256) external returns (bool)",
  "function allowance(address,address) view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address,uint256) external returns (bool)",
  "function transferFrom(address,address,uint256) external returns (bool)"
];
