import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppRoutes } from './routes'
import { WalletProvider } from './context/WalletContext'
import { ShipmentProvider } from './context/ShipmentContext'

function App() {
  return (
    <WalletProvider>
      <ShipmentProvider>
        <BrowserRouter>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--bg2)',
                color: 'var(--tx1)',
                border: '1px solid var(--br)',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#22C55E',
                  secondary: 'white',
                },
              },
            }}
          />
          <AppRoutes />
        </BrowserRouter>
      </ShipmentProvider>
    </WalletProvider>
  )
}

export default App
