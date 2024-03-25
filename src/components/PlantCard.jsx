import React, { useState } from 'react'
import AddToCart from './AddToCart'
import { Link } from 'react-router-dom'
import { IoMdSunny } from 'react-icons/io'
import { FaWater } from 'react-icons/fa'
import { IoCutOutline } from 'react-icons/io5'
import { IoLocation } from 'react-icons/io5'
import { FaShoppingCart } from 'react-icons/fa'

const PlantCard = ({ plant }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div>
      <div className="flex">
        <div>
          <img
            className="rounded-l-lg w-80 min-w-80 h-56 object-cover"
            src={plant?.image}
            alt={plant.name}
          />
        </div>
        <div className="w-96">
          {showDetails ? (
            <div className="ml-3 flex flex-col justify-between">
              <div className="flex flex-col pt-4 gap-4">
                <p className="text-xs flex items-center ">
                  <IoLocation
                    className="mr-2 text-lg "
                    style={{
                      color: 'black',
                      stroke: 'black',
                      strokeWidth: '1'
                    }}
                  />
                  {plant.origin}
                </p>
                <p className="text-xs flex items-center ">
                  <IoMdSunny
                    className="mr-2 text-lg "
                    style={{
                      color: 'black',
                      stroke: 'black',
                      strokeWidth: '1'
                    }}
                  />
                  {plant.sunlight}
                </p>
                <p className="text-xs flex">
                  <FaWater
                    className="mr-2 text-lg "
                    style={{
                      color: 'black',
                      stroke: 'black',
                      strokeWidth: '1'
                    }}
                  />
                  {plant.watering}
                </p>
                <p className="text-xs flex items-center">
                  <IoCutOutline
                    className="mr-2 text-lg "
                    style={{
                      color: 'black',
                      stroke: 'black',
                      strokeWidth: '1'
                    }}
                  />
                  Prune {plant?.pruningCount?.amount} times a
                  {plant?.pruningCount?.interval}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-6 mr-4">
                <button
                  className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleDetails}
                >
                  See Less
                </button>
                <Link
                  className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  to={`/plantDetail/${plant._id}`}
                >
                  <button>Details</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col align-bottom">
              <div className=" flex flex-col gap-4 text-center">
                <h2 className="text-2xl pt-4">{plant.name}</h2>
                <p className="text-sm text-gray-500 mt-2 px-4">
                  {plant.description}
                </p>
              </div>
              <div className=" flex justify-end gap-2 pr-4 mt-8">
                <button
                  className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                  onClick={toggleDetails}
                >
                  See More
                </button>
                {/* <button className=" w-10 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded flex justify-center align-middle">
                  <FaShoppingCart />
                </button> */}
                <AddToCart product={plant} productType={'Plant'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlantCard
