import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { getCustomerDetails } from '../services/customer'
import { addOrder } from '../services/order'

const PaymentSuccess = ({ authenticatedUser }) => {
  const cartContext = useContext(ShoppingCartContext)
  useEffect(() => {
    if (typeof authenticatedUser === 'object') {
      const getUserDetailsAndAddOrder = async () => {
        const response = await getCustomerDetails(authenticatedUser?._id)
        console.log('resp', response)
        const orderItems = response?.cart?.map((cartItem) => ({
          itemId: cartItem?.itemId?._id,
          quantity: cartItem?.quantity,
          itemModel: cartItem?.itemModel,
          customer: authenticatedUser?._id
        }))
        console.log(orderItems)
        const order = {
          orderItems,
          customer: authenticatedUser._id
        }
        console.log(order)
        await addOrder(order)
        cartContext.clearCart()
      }

      getUserDetailsAndAddOrder()
    }
  }, [authenticatedUser])

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
