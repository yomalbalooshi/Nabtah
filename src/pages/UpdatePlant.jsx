import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { showPlant, updatePlant } from '../services/plant'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import '../styles/vendorList.css'

const UpdatePlant = ({ setUpdated }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [plantDetails, setPlantDetail] = useState(null)
  const [formValues, setFormValues] = useState(null)

  useEffect(() => {
    const getPlantDetails = async () => {
      let response = await showPlant(id)
      setPlantDetail(response)
    }
    getPlantDetails()
  }, [])

  useEffect(() => {
    setFormValues({
      apiId: plantDetails?.id,
      name: plantDetails?.name,
      category: plantDetails?.category,
      scientificName: plantDetails?.scientificName,
      family: plantDetails?.family,
      cycle: plantDetails?.cycle,
      watering: plantDetails?.watering,
      sunlight: plantDetails?.sunlight,
      pruningMonth: plantDetails?.pruningMonth,
      pruningCount: {
        amount: plantDetails?.pruningCount.amount,
        interval: plantDetails?.pruningCount.interval
      },
      description: plantDetails?.description,
      image: plantDetails?.image,
      available: plantDetails?.available,
      price: plantDetails?.price
    })
  }, [plantDetails])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  console.log(formValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/account`)

    const plant = {
      ...formValues,
      id: id
    }
    await updatePlant(plant)
    setUpdated((prev) => !prev)
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
            Plant
          </h2>
        </div>
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
                  value={formValues?.name}
                  onChange={handleChange}
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
                  value={formValues?.description}
                  onChange={handleChange}
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
                    value={formValues?.category}
                    onChange={handleChange}
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
                    value={formValues?.scientificName}
                    onChange={handleChange}
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
                    value={formValues?.family}
                    onChange={handleChange}
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
                    value={formValues?.cycle}
                    onChange={handleChange}
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
                    type="text"
                    required
                    className="block w-full"
                    value={formValues?.watering}
                    onChange={handleChange}
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
                    value={formValues?.pruningCount.amount}
                    onChange={(e) =>
                      setFormValues((prevPlantDetails) => ({
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
                    value={formValues?.pruningCount.interval}
                    onChange={(e) =>
                      setFormValues((prevPlantDetails) => ({
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
                    value={formValues?.sunlight}
                    onChange={handleChange}
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
                    value={formValues?.image}
                    onChange={handleChange}
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
                    value={formValues?.available}
                    onChange={(e) =>
                      setFormValues((prevformValues) => ({
                        ...prevformValues,
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
                    value={formValues?.price}
                    onChange={handleChange}
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
                    name="pruningmonths"
                    value={formValues?.pruningMonth}
                    onChange={(e) =>
                      setFormValues((prevformValues) => ({
                        ...prevformValues,
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
                Update Plant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdatePlant
