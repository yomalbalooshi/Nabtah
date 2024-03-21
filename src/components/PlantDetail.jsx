import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'
const PlantDetail = () => {
  const { plantId } = useParams()
  const [plantDetail, setPlantDetail] = useState({})

  useEffect(() => {
    const getPlantDetail = async () => {
      const response = await Client.get(`/plant/${plantId}`)
      console.log(response.data)
      setPlantDetail(response.data)
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
          {plantDetail?.pruningMonth?.map((prune) => (
            <p>{prune}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlantDetail
