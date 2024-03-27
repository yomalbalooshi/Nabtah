import React, { useState } from 'react'
import AddToCart from './AddToCart'

const produceCard = ({ produce }) => {
  const truncateDescription = (description) => {
    if (description.split(' ').length > 20) {
      return description.split(' ').slice(0, 20).join(' ') + '...'
    } else {
      return description
    }
  }

  return (
    <div>
      <div className="flex">
        <div>
          <img
            className="rounded-l-lg w-80 min-w-80 h-56 object-cover"
            src={produce?.image}
            alt={produce?.name}
          />
        </div>
        <div className="w-96 relative">
          <div className=" flex flex-col align-bottom">
            <div className=" flex flex-col gap-4 pl-4">
              <div className="flex justify-between">
                <h2 className="text-2xl pt-4">{produce.name}</h2>
                <h2 className=" text-xl pt-5 mr-4">BHD {produce.price}</h2>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {truncateDescription(produce.description)}
              </p>
            </div>
            <div className="items-center mx-4 absolute bottom-3 right-0 ">
              <div className=" flex justify-end gap-2 mt-8">
                <AddToCart product={produce} productType={'produce'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default produceCard
