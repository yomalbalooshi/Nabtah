import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Paginator } from 'primereact/paginator'
import { getAllPlants } from '../services/plant'
import PlantCard from '../components/PlantCard'

const PlantList = () => {
  const [plants, setPlants] = useState([])

  useEffect(() => {
    const getPlants = async () => {
      let response = await getAllPlants()
      setPlants(response)
    }
    getPlants()
    console.log(plants)
  }, [])

  return (
    <div>
      <h1>PlantList</h1>
      <div className="flex">
        <div className="w-1/4 shadow-xl border-2 border-gray-50 flex flex-col items-center">
          <h2 className="mt-4">Filters</h2>
        </div>
        <div className="flex flex-wrap justify-around w-3/4">
          {plants.map((plant) => (
            <Card
              key={plant._id}
              className=" h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
            >
              <PlantCard plant={plant} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlantList
