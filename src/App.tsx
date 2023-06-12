import './App.css';
import {BrowserRouter as Router } from "react-router-dom"
import Routes from '../src/routes/customRoutes'
import { WagmiConfig, createConfig,  configureChains} from 'wagmi';
import { polygonMumbai} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

function App() {
  return (
    <WagmiConfig config={config}>
    <Router>
      <Routes />
    </Router>
    </WagmiConfig>
  );
}

export default App;
