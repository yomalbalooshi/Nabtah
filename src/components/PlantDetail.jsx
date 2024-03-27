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
      <div className="flex justify-center pt-10">
        <h2 className="text-3xl pb-4">{plantDetail.name} details</h2>
      </div>
      <div className="flex justify-center">
        <p className="py-8">{plantDetail.description}</p>
      </div>
      <div className="flex items-center justify-center m-8">
        <div className="w-1/3">
          <img
            className=" max-w-96 border-2 border-gray-200 shadow-xl mb-6 rounded-xl"
            src={plantDetail.image}
            alt={plantDetail.name}
          />
        </div>
        <div className="flex flex-col gap-2 text-justify pb-8 w-2/3">
          <p>
            <span className=" font-bold">Sunlight needed: </span>
            {plantDetail?.sunlight}
          </p>
          <p>
            <span className=" font-bold">Watering Instruction: </span>
            {plantDetail?.watering}
          </p>
          <p>
            <span className=" font-bold">Cycle: </span>
            {plantDetail?.cycle}
          </p>
          <p>
            <span className=" font-bold">Category: </span>
            {plantDetail?.category}
          </p>
          <p>
            <span className=" font-bold">Origin: </span>
            {plantDetail?.origin}
          </p>
          <p>
            <span className=" font-bold">Average dimesnions: </span>
            {(plantDetail?.dimensions?.min + plantDetail?.dimensions?.max) /
              2}{' '}
            Inches
          </p>
          <p>
            <span className=" font-bold">Pruning month(s): </span>
          </p>
          <div className="flex">
            {plantDetail?.pruningMonth?.map((prune, i) => (
              <p key={i}>{prune} &nbsp;</p>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex justify-center mb-4">
        <Link to="/">
          <button className="text-sm w-32 mt-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 rounded">
            Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PlantDetail
