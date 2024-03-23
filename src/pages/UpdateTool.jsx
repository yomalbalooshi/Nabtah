import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { updateTool, toolDetails } from '../services/tool'

const UpdateToolForm = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [toolDetail, setToolDetail] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    available: null,
    price: 0
  })

  useEffect(() => {
    const getToolDetails = async () => {
      let response = await toolDetails(id)
      setToolDetail(response)
    }
    getToolDetails()
  }, [])

  useEffect(() => {
    setFormValues({
      name: toolDetail?.name,
      description: toolDetail?.description,
      available: toolDetail?.available,
      price: toolDetail?.price
    })
  }, [toolDetail])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/`)
    const tool = { ...formValues, id: id }
    await updateTool(tool)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
          Tool
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
                  type="text"
                  value={formValues?.name}
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
                  value={formValues?.description}
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
                  value={formValues?.available}
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
                  type="number"
                  step=".01"
                  value={formValues?.price}
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
                Update Tool
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateToolForm
