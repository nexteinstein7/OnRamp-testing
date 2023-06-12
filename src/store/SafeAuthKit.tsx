const a = 1

export default a 
// import { SafeAuthKit, Web3AuthModalPack } from '@safe-global/auth-kit'
// import { ethers } from 'ethers'
// import {useEffect, useState } from 'react'

// import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
// import { Web3AuthOptions } from '@web3auth/modal'
// import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
// import { initialChain } from '../chains/chains'
// import getChain from '../utils/getChain'

// const loginWeb3Auth = async () => {
  
//     // const [chainId, setChainId] = useState<string>(initialChain.id)
//     // const chain = getChain(chainId) || initialChain


//     try {
//       const options: Web3AuthOptions = {
//         clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID || '',
//         web3AuthNetwork: 'testnet',
//         chainConfig: {
//           chainNamespace: CHAIN_NAMESPACES.EIP155,
//           chainId: "80001" ,   // chain.id, 
//           rpcTarget: "https://matic-mumbai.chainstacklabs.com"     //chain.rpcUrl
//         },
//         uiConfig: {
//           theme: 'dark',
//           loginMethodsOrder: ['google', 'facebook']
//         }
//       }

//       const modalConfig = {
//         [WALLET_ADAPTERS.TORUS_EVM]: {
//           label: 'torus',
//           showOnModal: false
//         },
//         [WALLET_ADAPTERS.METAMASK]: {
//           label: 'metamask',
//           showOnDesktop: true,
//           showOnMobile: false
//         }
//       }

//       const openloginAdapter = new OpenloginAdapter({
//         loginSettings: {
//           mfaLevel: 'mandatory'
//         },
//         adapterSettings: {
//           uxMode: 'popup',
//           whiteLabel: {
//             name: 'Safe'
//           }
//         }
//       })

//       const web3AuthModalPack = new Web3AuthModalPack(options, [openloginAdapter], modalConfig)

//       const safeAuth = await SafeAuthKit.init(web3AuthModalPack)

//       if (safeAuth) {
//         const { safes, eoa } = await safeAuth.signIn()
//         const provider = safeAuth.getProvider() as ethers.providers.ExternalProvider
//       }
//     } catch (error) {
//       console.log('error: ', error)
//     }
//   }

//   export default loginWeb3Auth