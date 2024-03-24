import { useEffect, useState, useContext } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputSwitch } from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { getCustomerDetails } from '../services/customer'
import { loadStripe } from '@stripe/stripe-js'
import Client from '../services/api'

const ShoppingCart = ({ authenticatedUser }) => {
  const [shoppingCartItems, setshoppingCartItems] = useState([])

  useEffect(() => {
    const getuserDetails = async () => {
      let response = await getCustomerDetails(authenticatedUser._id)
      setshoppingCartItems(response.cart)
    }
    getuserDetails()
  }, [])

  console.log(shoppingCartItems)

  const handlePurchase = async () => {
    const stripe = await loadStripe(
      'pk_test_51OxrxoIWiRBaab8WUp26UQLP1KA1MLIKzGNGjpr2z42WO2aAmlRg6JdTLLkDvI34NSXKGhCIzAgU3OvYNU76fucv00zL7j5y8l'
    )

    const payload = {
      products: shoppingCartItems
    }

    try {
      const response = await Client.post('/create-checkout-session', payload)
      const session = await response.data

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      })

      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return authenticatedUser ? (
    // <div>
    //   <h1>Shopping Cart</h1>
    //   <button>{authenticatedUser._id}</button>

    //   {/* <div>
    //     {authenticatedUser.cart.map((item) => (
    //       <div key={item._id}>{item.itemId.name}</div>
    //     ))}
    //   </div> */}
    //   <div classNameName="flex">
    //     <div classNameName="card flex-grow mr-11  ">
    //       <div classNameName="flex justify-content-center align-items-center mb-4 gap-2"></div>
    //       <DataTable
    //         value={authenticatedUser.cart}
    //         dataKey="_id"
    //         tableStyle={{ minWidth: '50rem' }}
    //       >
    //         <Column headerStyle={{ width: '3rem' }}></Column>
    //         <Column header="Product" body={imageBodyTemplate}></Column>
    //         <Column field="itemId.name" header="Name"></Column>
    //         <Column field="itemId.category" header="Type"></Column>
    //         <Column field="quantity" header="quantity"></Column>
    //         <Column field="itemId.price" header="price"></Column>
    //       </DataTable>
    //     </div>
    //     <div classNameName="flex-grow min-w-80 card">Order Details</div>
    //   </div>
    // </div>
    <div className="font-[sans-serif]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-extrabold text-[#333]">Shopping Cart</h2>
        <div className="grid lg:grid-cols-3 gap-12 relative mt-10">
          <div className="lg:col-span-2 space-y-6">
            {shoppingCartItems.map((item) => (
              //       <div key={item._id}>{item.itemId.name}</div>
              //
              <div
                key={item._id}
                className="p-2 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative"
              >
                <div className="grid sm:grid-cols-2 items-center gap-4">
                  <div className="w-full h-full p-4 shrink-0 bg-gray-100">
                    <img
                      src={item.itemId.image}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-extrabold text-[#333]">
                      {item.itemId.name}
                    </h3>
                    <hr className="my-6" />
                    <p className="text-sm text-[#333] space-y-2 pl-4">
                      {item.itemId.description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                      <div className="flex items-center gap-4">
                        <h4 className="text-base font-bold text-[#333]">
                          Qty:
                        </h4>

                        <button
                          type="button"
                          className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)]"
                        >
                          {item.quantity}
                        </button>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#333]">
                          {item.itemId.price} BHD
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-0">
            <h3 className="text-xl font-extrabold [#333] border-b pb-3">
              Order Summary
            </h3>
            <ul className="text-[#333] text-sm divide-y mt-6">
              <li className="flex flex-wrap gap-4 py-3">
                Subtotal <span className="ml-auto font-bold">$70.00</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3">
                Shipping <span className="ml-auto font-bold">Free</span>
              </li>
              <li className="flex flex-wrap gap-4 py-3 font-bold">
                Total <span className="ml-auto">$74.00</span>
              </li>
            </ul>
            <button
              type="button"
              className="mt-6 text-sm px-6 py-2.5 w-full bg-[#333] hover:bg-[#111] text-white rounded-md"
              onClick={handlePurchase}
            >
              Check out
            </button>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-base font-bold [#333] mb-2">
                  Safe and secure checkout
                </h4>
                <p className="text-sm text-[#333]">
                  Rest easy knowing that your personal information is protected
                  during the checkout process. Our secure checkout ensures the
                  confidentiality of your data.
                </p>
              </div>
              <div>
                <h4 className="text-base font-bold [#333] mb-2">
                  Fast and reliable shipping
                </h4>
                <p className="text-sm text-[#333]">
                  Experience prompt and reliable shipping services that get your
                  order to your doorstep in no time. We prioritize efficient
                  delivery to ensure your satisfaction.
                </p>
              </div>
              <div>
                <h4 className="text-base font-bold [#333] mb-2">
                  Need assistance or have more questions?
                </h4>
                <p className="text-sm text-[#333]">
                  Feel free to reach out to us at support@nabtah.com. Our
                  dedicated customer support team is here to help and provide
                  you with the information you need. We strive to respond
                  promptly and ensure your satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}
export default ShoppingCart
