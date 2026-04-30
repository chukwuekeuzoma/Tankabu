import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Activity, X, ChevronDown, Wallet, Menu } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account, network, connect, disconnect } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  
  const tabs = [
    { name: 'Dashboard', path: '/dashboard' },
  ];

  if (account) {
    tabs.push({ name: 'Dispatcher', path: '/dispatcher' });
    tabs.push({ name: 'Admin', path: '/admin' });
    tabs.push({ name: 'Driver', path: '/driver' });
    tabs.push({ name: 'Checkpoints', path: '/checkpoints' });
    tabs.push({ name: 'Station', path: '/station' });
  }

  const handleConnect = async () => {
    await connect();
    setShowModal(false);
  };

  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <>
      <nav className="topnav w-full bg-(--bg) border-b border-(--br) flex items-center justify-between fixed top-0 left-0 right-0 z-200 px-4 md:px-10 h-[88px] gap-2 md:gap-4">
        {/* Brand */}
        <div className="tn-brand flex items-center shrink-0 m-0">
          <div className="tn-mark bg-(--blue) w-8 h-8 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="tn-name text-[18px] font-bold tracking-tight ml-3">Tankabu</span>
        </div>

        {/* Navigation Pills - Desktop */}
        <div className="tn-pills hidden! md:flex! bg-(--bg3) rounded-[20px] p-[5px] gap-1 mx-auto shrink-0 max-w-full">
          {tabs.map((tab) => {
            const active = isActive(tab.path) || (tab.path !== '/' && location.pathname.startsWith(tab.path));
            return (
              <button
                key={tab.path}
                className={`tp ${active ? 'on' : ''}`}
                onClick={() => navigate(tab.path)}
                style={{ 
                  borderRadius: '16px', 
                  padding: '10px 24px', 
                  fontSize: '13px', 
                  fontWeight: 600,
                  background: active ? 'var(--bg)' : 'transparent',
                  color: active ? 'var(--tx1)' : 'var(--tx3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: 'auto',
                  height: 'auto'
                }}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end flex-1 md:flex-none gap-3">
          {/* Connect / Connected State */}
          <div className="flex items-center gap-4 shrink-0">
          {account ? (
            <div className="flex items-center" style={{ 
              background: 'var(--bg2)', 
              border: '1px solid var(--br)', 
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex'
            }}>
              {/* Network Part */}
              <div style={{ 
                padding: '8px 14px', 
                borderRight: '1px solid var(--br)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(59, 123, 246, 0.03)'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)' }}></div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tx2)', letterSpacing: '0.02em' }}>{network}</span>
              </div>
              
              {/* Address Part */}
              <div style={{ 
                padding: '8px 14px', 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }} onClick={() => disconnect()}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--tx1)', fontFamily: 'var(--mono)' }}>{truncate(account)}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowModal(true)}
              style={{ 
                background: 'var(--blue)', 
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          )}
          </div>
          
          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-(--tx2) hover:text-(--tx1) bg-(--bg3) rounded-[12px] border border-(--br)"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[88px] left-0 right-0 bg-(--bg) border-b border-(--br) z-195 p-4 flex flex-col gap-2 shadow-2xl overflow-y-auto max-h-[calc(100vh-88px)]">
          {tabs.map((tab) => {
            const active = isActive(tab.path) || (tab.path !== '/' && location.pathname.startsWith(tab.path));
            return (
              <button
                key={tab.path}
                onClick={() => { navigate(tab.path); setIsMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3.5 rounded-xl font-semibold text-[13px] transition-all flex items-center ${
                  active ? 'bg-(--blue) text-white' : 'bg-(--bg3) text-(--tx2) border border-(--br)'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(10px)' }} onClick={() => setShowModal(false)}>
          <div style={{ backgroundColor: 'var(--bg)', borderRadius: '24px', width: '100%', maxWidth: '400px', padding: '32px', border: '1px solid var(--br2)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em' }}>Initialize Connection</span>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--tx3)', cursor: 'pointer' }}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={handleConnect} style={{ background: 'var(--bg3)', border: '1px solid var(--br)', borderRadius: '16px', padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }} className="hover:border-blue-500">
                <div className="flex items-center gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" style={{ width: '24px', height: '24px' }} alt="MetaMask" />
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--tx1)' }}>MetaMask</span>
                </div>
                <div className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 rounded font-bold uppercase">Popular</div>
              </button>
              <button style={{ background: 'var(--bg3)', border: '1px solid var(--br)', borderRadius: '16px', padding: '16px 20px', cursor: 'not-allowed', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                <div className="flex items-center gap-4">
                  <img src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg" style={{ width: '24px', height: '24px' }} alt="WalletConnect" />
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--tx1)' }}>WalletConnect</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
