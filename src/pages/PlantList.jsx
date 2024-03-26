import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Paginator } from 'primereact/paginator'
import { getAllPlants } from '../services/plant'
import { getAllVendors } from '../services/vendor'
import PlantCard from '../components/PlantCard'
import { InputText } from 'primereact/inputtext'
import { Slider } from 'primereact/slider'
import { SelectButton } from 'primereact/selectbutton'
import { Dropdown } from 'primereact/dropdown'
import '../styles/plantList.css'

const PlantList = () => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')
  const [searchedPlants, setSearchedPlants] = useState([])
  const [price, setPrice] = useState([0, 100])
  const [sunlight, setSunlight] = useState(null)

  const items = [
    { name: 'Low', value: 'low' },
    { name: 'Partial', value: 'partial' },
    { name: 'Full', value: 'full' }
  ]

  useEffect(() => {
    const getVendorDetails = async () => {
      let response = await getAllVendors()
      const allOption = { name: 'All', _id: null }
      setVendors([allOption, ...response])
      setSearchedPlants(response)
    }
    getVendorDetails()
  }, [])

  useEffect(() => {
    const getPlants = async () => {
      let response = await getAllPlants()
      setPlants(response)
      setSearchedPlants(response)
    }
    getPlants()
    console.log(plants)
  }, [])

  useEffect(() => {
    handleSearch()
  }, [price, search, sunlight, selectedVendor])

  const handleSearch = () => {
    const newPlants = plants.filter((va) => {
      //filtering by name
      if (search && !va.name.toLowerCase().includes(search.toLowerCase()))
        return false
      //filter by vendorId
      if (
        selectedVendor &&
        selectedVendor._id &&
        !va.vendor.includes(selectedVendor._id)
      )
        return false
      //filter by sunlight
      if (sunlight && !va.sunlight[0].toLowerCase().includes(sunlight))
        return false
      //filter by price
      if (va.price > price[1] || va.price < price[0]) return false
      return true
    })
    setSearchedPlants(newPlants)
  }

  const selectedVendorTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const vendorsOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 shadow-lg border-2 border-gray-50 flex flex-col items-center min-h-96">
          <h2 className="mt-4 text-xl">Filters</h2>
          <div className="mt-5">
            <InputText
              type="text"
              placeholder="Search for Plant"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              value={search}
            />
          </div>
          <div className="flex flex-col mt-10 text-center">
            <div className="mb-2">
              <h1>Price</h1>
            </div>
            <div>
              <h3 className="pb-2">
                BHD {price[0]} - BHD {price[1]}
              </h3>
            </div>
            <div className="flex justify-content-center">
              <p className="mt-4">BHD 0</p>
              <Slider
                value={price}
                onChange={(e) => setPrice(e.value)}
                className="w-48"
                range
              />
              <p className="mt-4">BHD 100</p>
            </div>
          </div>
          <div className="mt-10">
            <h1 className=" text-center">Sunlight Requirements</h1>
            <div className="flex justify-content-center mt-4">
              <SelectButton
                value={sunlight}
                onChange={(e) => setSunlight(e.value)}
                optionLabel="name"
                options={items}
              />
            </div>
          </div>
          <div className="card flex justify-content-center mt-10">
            <div className="flex flex-col mt-5 text-center">
              <h1>Sort by Vendor</h1>
              <Dropdown
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.value)}
                options={vendors}
                optionLabel="name"
                placeholder="Select a vendor"
                filter
                valueTemplate={selectedVendorTemplate}
                itemTemplate={vendorsOptionTemplate}
                className="w-full md:w-14rem mt-5"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-around w-3/4">
          {searchedPlants.map((plant) => (
            <Card
              key={plant._id}
              className="h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
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
