import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import {useContractWrite, usePrepareContractWrite } from "wagmi"

const Claim = () => {


    const [email, setEmail] = useState<string>(
        localStorage.getItem("email") || ''
    )

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value)
      }


    const { write } = useContractWrite({
        address: '0x45CA79DFfAdE621719f76350238ae9d91e2f3D96', //Contract Address
        abi: [{
            "inputs": [
              {
                "internalType": "string",
                "name": "_email",
                "type": "string"
              }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }],
        functionName: 'withdraw',
        args: [email]
      })

    return (
        <div className='flex justify-center items-center flex-col gap-5 mt-10 bg-gradient-to-r from-white to-gray-100 h-auto'>
            <Link to="/">
                <button className='mb-20 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    Main Page
                </button>
            </Link>
            <div>Users can Claim their gifts here if they know the E-mail address</div>
            <input
                    className="border-solid border-2 border-green-600 gap-3 rounded-md w-80"
                    value={email}
                    onChange={handleEmailChange}
                />
            <button onClick={() => write()} className="bg-green-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-green-400 rounded shadow">Claim your Gift</button>
            {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
        </div>
    )
}

export default Claim