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
      <div className="flex flex-wrap justify-around">
        {plants.map((plant) => (
          <Card
            key={plant._id}
            className=" w-2/5 h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
          >
            <PlantCard plant={plant} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PlantList
