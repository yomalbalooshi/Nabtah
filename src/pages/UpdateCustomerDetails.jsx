import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { updateCustomerDetails, getCustomerDetails } from '../services/customer'

const UpdateCustomerDetails = ({ setUpdated, authenticatedUser }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [customerDetail, setcustomerDetail] = useState(null)
  const [formValues, setFormValues] = useState({
    address: ''
  })

  useEffect(() => {
    const getCustomerDetail = async () => {
      let response = await getCustomerDetails(id)
      setcustomerDetail(response)
    }
    getCustomerDetail()
  }, [])

  useEffect(() => {
    setFormValues({
      address: customerDetail?.address || ''
    })
  }, [customerDetail])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    })
    console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const customer = { ...formValues, id: id }
    await updateCustomerDetails(customer)
    setUpdated((prev) => !prev)
    navigate(`/account`)
  }

  return (
    authenticatedUser &&
    authenticatedUser.role === 'customer' && (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
            Update Address
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
                  Your Address
                </label>
                <div className="mt-2">
                  <InputTextarea
                    id="address"
                    name="address"
                    type="text"
                    value={formValues?.address}
                    required
                    className="block w-full "
                    onChange={handleChange}
                    rows={5}
                    cols={30}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-14"
                >
                  Update Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default UpdateCustomerDetails
