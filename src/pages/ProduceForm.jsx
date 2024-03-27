import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { addProduce } from '../services/produce'

const ProduceForm = ({ authenticatedUser, setUpdated }) => {
  let navigate = useNavigate()
  let vendorId = authenticatedUser._id
  const [available, setAvailable] = useState(null)
  const [type, setType] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    description: '',
    image: '',
    available: true,
    price: 0
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const produce = {
      ...formValues,
      available: available,
      type: type,
      vendor: vendorId
    }
    navigate(`/account`)
    await addProduce(produce)
    setUpdated((prev) => !prev)
    setFormValues({
      name: '',
      type: '',
      description: '',
      image: '',
      available: true,
      price: 0
    })
  }

  return (
    authenticatedUser &&
    authenticatedUser.role === 'vendor' && (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-700">
            Produce
          </h2>
        </div>

        <div>
          <div className=" shadow-2xl max-w-2xl mx-auto flex justify-center pb-16 mt-10 mb-10">
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
                    type="text"
                    required
                    className="block w-full "
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
                    className="block w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2">
                  <Dropdown
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.value)}
                    options={[
                      { name: 'Vegetable', value: 'vegetable' },
                      { name: 'Fruit', value: 'fruit' },
                      { name: 'Other', value: 'other' }
                    ]}
                    optionLabel="name"
                    required
                    className=" w-full md:w-14rem "
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
                    value={available}
                    onChange={(e) => setAvailable(e.value)}
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
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-14"
                >
                  Add Produce
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default ProduceForm
