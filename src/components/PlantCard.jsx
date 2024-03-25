import React, { useState } from 'react'
import AddToCart from './AddToCart'
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
            className="rounded-l-lg w-52 min-w-52 h-56 object-cover"
            src={plant.image}
            alt={plant.name}
          />
        </div>
        <div className="flex flex-col align-middle text-center">
          {showDetails ? (
            <div>
              <p>{plant.origin}</p>
              <p>{plant.sunlight}</p>
              <p>{plant.watering}</p>
              <p>
                Prune {plant.pruningCount.amount} times a{' '}
                {plant.pruningCount.interval}
              </p>
              <button
                className="text-sm w-32 mt-9 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                onClick={toggleDetails}
              >
                See Less
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl pt-4">{plant.name}</h2>
              <p className="text-sm text-gray-500">{plant.description}</p>
              <div className=" flex justify-around pt-10 ">
                <button
                  className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                  onClick={toggleDetails}
                >
                  See More
                </button>
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
