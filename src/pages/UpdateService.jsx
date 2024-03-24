import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { updateService, serviceDetails } from '../services/service'

const ServiceForm = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [serviceDetail, setServiceDetail] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    quantity: '',
    frequency: '',
    description: '',
    available: null,
    price: 0
  })

  useEffect(() => {
    const getServiceDetails = async () => {
      let response = await serviceDetails(id)
      setServiceDetail(response)
    }
    getServiceDetails()
  }, [])

  useEffect(() => {
    setFormValues({
      name: serviceDetail?.name,
      description: serviceDetail?.description,
      available: serviceDetail?.available,
      price: serviceDetail?.price,
      quantity: serviceDetail?.quantity,
      frequency: serviceDetail?.frequency
    })
  }, [serviceDetail])

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // navigate(`/`)
    const service = {
      ...formValues,
      id: id
    }
    await updateService(service)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
          Service
        </h2>
      </div>

      <div>
        <div className=" shadow-2xl max-w-2xl mx-auto flex justify-center pb-16 mt-20 mb-10">
          <form className="space-y-8  w-96 pt-10 " onSubmit={handleSubmit}>
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
                  value={formValues.name}
                  type="text"
                  required
                  className="block w-full "
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
                <InputText
                  id="description"
                  name="description"
                  value={formValues.description}
                  type="text"
                  required
                  className="block w-full "
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
                  value={formValues.available}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
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
                  step=".01"
                  type="number"
                  value={formValues.price}
                  min={0}
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity
              </label>
              <div className="mt-2">
                <InputText
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formValues.quantity}
                  min={0}
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="frequency"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Frequency
              </label>
              <div className="mt-2">
                <InputText
                  id="frequency"
                  name="frequency"
                  value={formValues.frequency}
                  type="text"
                  min={0}
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-14"
              >
                Add Serivce
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ServiceForm
