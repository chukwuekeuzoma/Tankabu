import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  network: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const NETWORK_NAMES: { [key: number]: string } = {
  1: 'Ethereum',
  56: 'BSC Mainnet',
  97: 'BSC Testnet',
  137: 'Polygon',
  8453: 'Base',
  84532: 'Base Sepolia'
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const checkConnection = async () => {
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const addr = await accounts[0].getAddress();
          setAccount(addr);
          const net = await provider.getNetwork();
          setNetwork(NETWORK_NAMES[Number(net.chainId)] || `Chain ${net.chainId}`);
        }
      } catch (err) {
        console.error("Failed to check connection:", err);
      }
    }
  };

  useEffect(() => {
    checkConnection();
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) setAccount(accounts[0]);
        else setAccount(null);
      });
      (window as any).ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const connect = async () => {
    if (!(window as any).ethereum) return alert('Please install MetaMask');
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const net = await provider.getNetwork();
      setNetwork(NETWORK_NAMES[Number(net.chainId)] || `Chain ${net.chainId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setNetwork(null);
  };

  return (
    <WalletContext.Provider value={{ account, network, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
