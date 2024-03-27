import axios from 'axios'
import { useState, useEffect } from 'react'
import { Paginator } from 'primereact/paginator'
import { Card } from 'primereact/card'
import { addPlant } from '../services/plant'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { getAllVendorPlants } from '../services/vendor'
import { useNavigate } from 'react-router-dom'
import '../styles/vendorList.css'

const AddPlant = ({ authenticatedUser, setUpdated }) => {
  let navigate = useNavigate()
  let vendorId = authenticatedUser._id
  const [plants, setPlants] = useState(null)
  const [searchQuery, setSearchQuery] = useState(null)
  const [plantDetails, setPlantDetails] = useState(null)
  const [vendorPlants, setVendorPlants] = useState(null)
  const [addedPlantIds, setAddedPlantIds] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(12)

  useEffect(() => {
    const handleVendorPlants = async () => {
      const data = await getAllVendorPlants(vendorId)
      setVendorPlants(data)
    }
    handleVendorPlants()
  }, [authenticatedUser])

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
      scientificName: selectedPlant.scientific_name[0],
      family: selectedPlant.family,
      cycle: selectedPlant.cycle,
      sunlight: selectedPlant.sunlight[0],
      pruningMonth: selectedPlant.pruning_month,
      pruningCount: {
        amount: selectedPlant.pruning_count.amount,
        interval: selectedPlant.pruning_count.interval
      },
      description: selectedPlant.description,
      vendor: vendorId
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/account')

    await addPlant(plantDetails)
    setAddedPlantIds([...addedPlantIds, plantDetails.apiId])
    setUpdated((prev) => !prev)
  }

  const vendorApiIds = Array.isArray(vendorPlants)
    ? vendorPlants.map((plant) => plant.apiId)
    : []

  let filteredPlants = plants?.filter(
    (plant) =>
      !plant.cycle.toLowerCase().includes('premium') &&
      !vendorApiIds.includes(String(plant.id)) &&
      !addedPlantIds.includes(plant.id) &&
      plant?.default_image?.original_url
  )

  return (
    authenticatedUser &&
    authenticatedUser.role === 'vendor' && (
      <div className="mt-40">
        <form onSubmit={handleSearch}>
          <div className="flex justify-center  mt-20">
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
        {filteredPlants && (
          <h2 className="text-center text-3xl mt-8">Plants</h2>
        )}
        <div className="flex flex-wrap justify-around text-center">
          {filteredPlants?.slice(first, first + rows).map((plant) => (
            <Card
              key={plant.id}
              className="my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg pb-10"
            >
              <div className="flex flex-col">
                <img
                  className="rounded-t-lg w-96 h-56 object-cover"
                  src={plant?.default_image?.original_url}
                />
                <h2 className="text-2xl pt-4">{plant?.common_name}</h2>
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
        {filteredPlants && (
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredPlants?.length}
            onPageChange={onPageChange}
          />
        )}

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className=" shadow-2xl max-w-7xl mx-auto flex justify-center pb-16  mb-10">
            <form
              className="space-y-8 w-full mx-auto pl-20 pr-20 pt-10"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <InputText
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full "
                    value={plantDetails?.name}
                    onChange={(e) =>
                      setPlantDetails((prevPlantDetails) => ({
                        ...prevPlantDetails,
                        name: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <InputTextarea
                    id="description"
                    name="description"
                    rows={5}
                    cols={30}
                    type="text"
                    required
                    className="block w-full "
                    value={plantDetails?.description}
                    onChange={(e) =>
                      setPlantDetails((prevPlantDetails) => ({
                        ...prevPlantDetails,
                        description: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-9">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="category"
                      name="category"
                      type="text"
                      required
                      className="block w-full "
                      value={plantDetails?.category}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          category: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="scientificName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Scientific Name
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="scientificName"
                      name="scientificName"
                      type="text"
                      required
                      className="block w-full"
                      value={plantDetails?.scientificName}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          scientificName: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="family"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Family
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="family"
                      name="family"
                      type="text"
                      required
                      className="block w-full"
                      value={plantDetails?.family}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          family: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cycle"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cycle
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="cycle"
                      name="cycle"
                      type="text"
                      required
                      className="block w-full"
                      value={plantDetails?.cycle}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          cycle: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="watering"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Watering
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="watering"
                      name="watering"
                      type="number"
                      required
                      className="block w-full"
                      value={plantDetails?.watering}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          watering: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pruningcount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pruning Count
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="pruningcount"
                      name="pruningcount"
                      type="number"
                      required
                      className="block w-full"
                      value={plantDetails?.pruningCount.amount}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          pruningCount: {
                            ...plantDetails.pruningCount,
                            amount: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pruninginterval"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pruning Interval
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="pruninginterval"
                      name="pruninginterval"
                      type="text"
                      required
                      className="block w-full"
                      value={plantDetails?.pruningCount.interval}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          pruningCount: {
                            ...plantDetails.pruningCount,
                            interval: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="sunglight"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sunlight
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="sunlight"
                      name="sunlight"
                      type="text"
                      required
                      className="block w-full"
                      value={plantDetails?.sunlight}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          sunlight: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="image"
                      name="image"
                      type="text"
                      required
                      className="block w-full"
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          image: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="available"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Available
                  </label>
                  <div className="mt-2">
                    <Dropdown
                      id="available"
                      name="available"
                      value={plantDetails?.available}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          available: e.value
                        }))
                      }
                      options={[
                        { name: 'Yes', value: true },
                        { name: 'No', value: false }
                      ]}
                      optionLabel="name"
                      required
                      className=" w-full md:w-14rem "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <InputText
                      id="price"
                      name="price"
                      step=".001"
                      type="number"
                      min={0}
                      required
                      className="block w-full "
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          price: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pruningmonths"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Pruning Months
                  </label>
                  <div className="mt-2">
                    <MultiSelect
                      id="pruningmonths"
                      required
                      name="pruningmonths"
                      value={plantDetails?.pruningMonth}
                      onChange={(e) =>
                        setPlantDetails((prevPlantDetails) => ({
                          ...prevPlantDetails,
                          pruningMonth: e.value
                        }))
                      }
                      maxSelectedLabels={5}
                      options={[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                      ]}
                      filter
                      className="w-full md:w-20rem"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="  flex justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
                >
                  Add Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default AddPlant
