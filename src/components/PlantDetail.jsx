import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { showPlant } from '../services/plant'
const PlantDetail = () => {
  const { plantId } = useParams()
  const [plantDetail, setPlantDetail] = useState({})

  useEffect(() => {
    const getPlantDetail = async () => {
      let response = await showPlant(plantId)
      setPlantDetail(response)
    }
    getPlantDetail()
  }, [])

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-2xl pb-4">{plantDetail.name} details</h2>
        <img
          className=" max-w-96 border-2 border-gray-200 shadow-xl mb-6"
          src={plantDetail.image}
          alt={plantDetail.name}
        />
        <div className="flex flex-col gap-2 text-center pb-8">
          <p>{plantDetail.description}</p>
          <p>Sunlight needed: {plantDetail.sunlight}</p>
          <p>Watering Instruction: {plantDetail.watering}</p>
          <p>Pruning month(s):</p>
          <div>
            {plantDetail?.pruningMonth?.map((prune, i) => (
              <p key={i}>{prune}</p>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <Link to="/home">
            <button className="text-sm w-32 mt-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PlantDetail
