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
        const orderItems = response?.cart?.map((cartItem) => ({
          itemId: cartItem?.itemId?._id,
          quantity: cartItem?.quantity,
          itemModel: cartItem?.itemModel,
          customer: authenticatedUser?._id
        }))
        const order = {
          orderItems,
          customer: authenticatedUser._id
        }
        await addOrder(order)
        cartContext.clearCart()
      }

      getUserDetailsAndAddOrder()
    }
  }, [authenticatedUser])

  return (
    <div className="flex flex-col content-center items-center">
      <div className="flex successimg w-32 h-32 mt-20"></div>
      <div className="flex flex-col text-center mt-8">
        <h1 className=" text-3xl">Payment Successful</h1>
        <p className=" my-4">Thanks for shopping at Nabtah</p>
        <Link to="/">
          <button className="text-sm w-48 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
