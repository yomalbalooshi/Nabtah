import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PaymentSuccess = () => {

  useEffect(()=>{

  },[])
  
  return (
    <div className="flex justify-center">
      <div className="flex flex-col text-center mt-20">
        <h1>Payment Successful</h1>
        <p>Thanks for shopping at Nabtah</p>
        <Link to="/home">
          <button className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
