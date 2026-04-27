import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { WalletProvider } from './context/WalletContext'
import { ShipmentProvider } from './context/ShipmentContext'

function App() {
  return (
    <WalletProvider>
      <ShipmentProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ShipmentProvider>
    </WalletProvider>
  )
}

export default App
