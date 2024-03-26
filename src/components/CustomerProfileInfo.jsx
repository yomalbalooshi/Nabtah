import { useState, useEffect, useRef } from 'react'
import { getCustomerDetails } from '../services/customer'
import { usePDF } from 'react-to-pdf'

const CustomerProfileInfo = ({ authenticatedUser }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' })
  const [userDetails, setuserDetails] = useState({})
  const changeDateFormat = (dateToFormat) => {
    let date = new Date(dateToFormat)
    let formattedDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()

    return formattedDate
  }
  useEffect(() => {
    if (authenticatedUser) {
      const getuserDetails = async () => {
        let response = await getCustomerDetails(authenticatedUser._id)
        setuserDetails(response)
      }
      getuserDetails()
    }
  }, [])
  return (
    authenticatedUser &&
    userDetails.orders && (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-9"
              onClick={() => toPDF()}
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download Pdf</span>
            </button>
          </div>

          <div ref={targetRef} className="mt-16">
            <div className="space-y-20">
              {userDetails.orders.map((order) => (
                <div key={order._id}>
                  <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                    <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between sm:block">
                        <dt className="font-medium text-gray-900">
                          Date placed
                        </dt>
                        <dd className="sm:mt-1">
                          <time>{changeDateFormat(order.createdAt)}</time>
                          {/* <p>{order.createdAt}</p> */}
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-gray-900">
                          Order number
                        </dt>
                        <dd className="sm:mt-1">{order._id}</dd>
                      </div>
                    </dl>
                  </div>

                  <table className="mt-4 w-full text-gray-500 sm:mt-6">
                    <caption className="sr-only">Products</caption>
                    <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                      {order
                        ? order.orderItems.map((product) => (
                            <tr key={product._id}>
                              <td className="py-6 pr-8">
                                <div className="flex items-center">
                                  <img
                                    src={product.itemId.image}
                                    alt={product.name}
                                    className="mr-6 h-16 w-16 rounded object-cover object-center"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {product.itemId.name}
                                    </div>
                                    <div className="mt-1 sm:hidden">
                                      {product.itemId.price}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                {product.itemId.price}
                              </td>
                              <td className="hidden py-6 pr-8 sm:table-cell">
                                {product.quantity}
                              </td>
                            </tr>
                          ))
                        : ''}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )
}
export default CustomerProfileInfo
