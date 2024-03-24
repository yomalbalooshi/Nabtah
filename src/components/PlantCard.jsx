import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div className="text-center w-96">
          {showDetails ? (
            <div>
              <div className="flex flex-col pt-4 gap-5">
                <p className=" text-xs">{plant.origin}</p>
                <p className=" text-xs">{plant.sunlight}</p>
                <p className=" text-xs">{plant.watering}</p>
                <p className=" text-xs">
                  Prune {plant.pruningCount.amount} times a{' '}
                  {plant.pruningCount.interval}
                </p>
              </div>
              <div className="flex justify-around mt-6">
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
                  <button>Visit Plant Page</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className=" flex flex-col gap-4">
              <h2 className="text-2xl pt-4">{plant.name}</h2>
              <p className="text-sm text-gray-500 mt-2">{plant.description}</p>
              <div className=" flex justify-around">
                <button
                  className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                  onClick={toggleDetails}
                >
                  See More
                </button>
                <button className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlantCard
