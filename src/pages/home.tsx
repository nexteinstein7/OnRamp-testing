import React from 'react'
import { useAccount, useConnect, useContractWrite} from 'wagmi'
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom'

const Home = () =>  {

  
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") || ''
  )
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

    useEffect(() => {

    }, [address])

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
      setEmail(event.target.value)
    }
  
    const { write } = useContractWrite({
      address: '0x45CA79DFfAdE621719f76350238ae9d91e2f3D96', // Contract Address
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "_buyer",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "giftCard",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: 'giftCard',
      args:["0x49cB5Fa951AD2ABbC4d14239BfE215754c7Df030",  email]
    })

    // const contractWrite2 = useContractWrite({
    //   address: '0x5D0b9751d192273eADA651D0274E38e1ADAD2eF8',
    //   abi: [{
    //       "inputs": [
    //         {
    //           "internalType": "string",
    //           "name": "_email",
    //           "type": "string"
    //         }
    //       ],
    //       "name": "withdraw",
    //       "outputs": [],
    //       "stateMutability": "nonpayable",
    //       "type": "function"
    //     }],
    //   functionName: 'withdraw',
    //   args: [email]
    // })
 
  return (
    <>
     <div className='flex justify-center items-center flex-col gap-5 mt-10 bg-gradient-to-r from-white to-gray-100 h-auto'>
      <div className='font-semibold text-3xl h-full italic'> Otherswipe  </div>
    <>
      {isConnected && <div>{}</div>}
 
      <div className='flex flex-row gap-3'>
            <label className='font-semibold'>Email Address:</label>
            <input
              className="border-solid border-2 border-green-600 gap-3 rounded-md w-80"
              value={email}
              onChange={handleEmailChange}
            />
            </div>
            <div className='flex flex-row gap-3'>
            <button onClick={() => write()} className='bg-green-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-green-400 rounded shadow'>Confirm Email</button>
            </div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
        > {address}
          
          {isLoading &&
            pendingConnector?.id === connector.id &&
            ' (connecting)'}
        </button>
      ))}
 
      {error && <div>{error.message}</div>}
    </>
    <div className='flex flex-row justify-center gap-3'>
    <Link to="/onramp">
    <button className='bg-green-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-green-400 rounded shadow'>OnRampKit</button>
    </Link>

    <Link to="/claim">
    <button className="bg-green-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-green-400 rounded shadow">
       Claim Page
    </button>
    </Link>
    </div>
    </div>
    </>
  )
}

export default Home