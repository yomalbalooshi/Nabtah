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
      <div className="flex flex-col items-center justify-center mt-20">
        <h2>{plantDetail.name} details</h2>
        <img
          className=" max-w-96"
          src={plantDetail.image}
          alt={plantDetail.name}
        />
        <p>{plantDetail.description}</p>
        <p>Sunlight needed: {plantDetail.sunlight}</p>
        <p>Watering Instruction: {plantDetail.watering}</p>
        <p>Pruning month(s):</p>
        <div>
          {plantDetail?.pruningMonth?.map((prune, i) => (
            <p key={i}>{prune}</p>
          ))}
        </div>
        <Link to="/home">
          <button className="bg-green-400">Back</button>
        </Link>
      </div>
    </div>
  )
}

export default PlantDetail
