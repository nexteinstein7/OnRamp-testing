import React from 'react'
import {useState, useEffect} from "react"
import { SafeOnRampKit, StripePack } from '@safe-global/onramp-kit';
import { Link } from 'react-router-dom';
import {useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";

export interface WalletFundProps {
    address: string;
  }

const  OnRamp = () => {

        const [address, setAddress] = useState<string>(
          localStorage.getItem('safeAddress') || ''
        );

      
        function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
          setAddress(event.target.value);
        }
        const fundWallet = async function () {

          const safeOnRamp = await SafeOnRampKit.init(
            new StripePack({
              // Get public key from Stripe: https://dashboard.stripe.com/register
              stripePublicKey:
                'pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO',
              // Deploy your own server: https://github.com/safe-global/safe-core-sdk/tree/main/packages/onramp-kit/example/server
              onRampBackendUrl: 'https://aa-stripe.safe.global',
            })
          );
      
          // See options for using the StripePack open method in:
          // https://stripe.com/docs/crypto/using-the-api
          const sessionData = await safeOnRamp.open({
            // sessionId: sessionId, optional parameter
            element: '#stripe-root',
            defaultOptions: {
              transaction_details: {
                wallet_address: "0x45CA79DFfAdE621719f76350238ae9d91e2f3D96", // Contract Address
                supported_destination_networks: ['ethereum', 'polygon'],
                supported_destination_currencies: ['usdc'], // This can be replaced by matic for try 
                lock_wallet_address: true
              },
              customer_information: {
                email: '8404.john.smith@example.com'
              }
            }
          })
        };
      
        return (
          <div className='mt-5 flex flex-col gap-3 items-center'>
            <Link to="/">
            <button className='mb-20 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                Main Page
            </button>
            </Link>
            <div className='flex flex-row gap-3'>
            <label className='font-semibold'>Destination Address:</label>
            <input
              className="border-solid border-2 border-green-600 gap-3 rounded-md w-96"
              value={address}
              onChange={handleAddressChange}
            />
            </div>
            <div></div>
            <button className="bg-green-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-green-400 rounded shadow" onClick={fundWallet}>
              Create Gift
            </button>
          </div>
        );
      }



export default  OnRamp
