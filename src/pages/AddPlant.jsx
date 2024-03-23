import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import { useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { Card } from 'primereact/card'
import { addPlant } from '../services/plant'
import '../styles/vendorList.css'

const AddPlant = () => {
  const [plants, setPlants] = useState(null)
  const [searchQuery, setSearchQuery] = useState(null)
  const [plantDetails, setPlantDetails] = useState(null)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(12)
  let vendorId = '65fcf85f7fd2d32df8293118'

  const handleSearch = async (e) => {
    e.preventDefault()
    let response = await axios.get(
      `https://perenual.com/api/species-list?key=sk-Cipx65fb29fbeab5f4804&q=${searchQuery}`
    )
    setPlants(response.data.data)
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  let filteredPlants = plants?.filter(
    (plant) => !plant.cycle.toLowerCase().includes('premium')
  )
  const handleClick = async (e, id) => {
    let selectedPlant
    let response = await axios.get(
      `https://perenual.com/api/species/details/${id}?key=sk-Cipx65fb29fbeab5f4804`
    )
    selectedPlant = response.data
    setPlantDetails({
      apiId: selectedPlant.id,
      name: selectedPlant.common_name,
      category: selectedPlant.type,
      scientificName: selectedPlant.scientific_name,
      family: selectedPlant.family,
      origin: selectedPlant.origin,
      dimensions: {
        min: selectedPlant.dimensions.min_value,
        max: selectedPlant.dimensions.min_value,
        unit: selectedPlant.dimensions.unit
      },
      cycle: selectedPlant.cycle,
      watering: selectedPlant.watering,
      sunlight: selectedPlant.sunlight,
      pruningMonth: selectedPlant.pruning_month,
      pruningCount: {
        amount: selectedPlant.pruning_count.amount,
        interval: selectedPlant.pruning_count.interval
      },
      description: selectedPlant.description,
      vendor: vendorId
    })
  }
  console.log(plantDetails)
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex justify-center">
          <div>
            <InputText
              type="text"
              placeholder="Search for a Plant"
              className="w-96"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className=" w-32 h-12 rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ml-6"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <h2 className="text-center text-3xl mt-8">Plants</h2>
      <div className="flex flex-wrap justify-around text-center">
        {filteredPlants?.slice(first, first + rows).map((plant) => (
          <Card
            key={plant.id}
            className="my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg pb-10"
          >
            <div className="flex flex-col">
              <img
                className="rounded-t-lg w-96 h-56 object-cover"
                src={plant.default_image.original_url}
              />
              <h2 className="text-2xl pt-4">{plant.common_name}</h2>
              <p className="text-sm p-4 text-gray-500">
                {plant.scientific_name}
              </p>
            </div>
            <button
              onClick={(e) => handleClick(e, plant.id)}
              className=" w-32  rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ml-6"
            >
              Add
            </button>
          </Card>
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={filteredPlants?.length}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default AddPlant
