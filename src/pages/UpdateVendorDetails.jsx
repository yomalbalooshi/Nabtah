import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { updateVendorDetails, getVendorDetails } from '../services/vendor'

const UpdateVendorDetails = ({ setUpdated }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  const [vendorDetail, setvendorDetail] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    avatar: '',
    location: ''
  })

  useEffect(() => {
    const getVendorDetail = async () => {
      let response = await getVendorDetails(id)
      setvendorDetail(response)
    }
    getVendorDetail()
  }, [])

  useEffect(() => {
    setFormValues({
      name: vendorDetail?.name || '',
      avatar: vendorDetail?.avatar || '',
      location: vendorDetail?.location || ''
    })
  }, [vendorDetail])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const vendor = { ...formValues, id: id }
    await updateVendorDetails(vendor)
    setUpdated((prev) => !prev)
    navigate(`/account`)
  }
  const cities = [
    { name: 'Manama', value: 'Manama' },
    { name: 'Riffa', value: 'Riffa' },
    { name: 'Hamad Town', value: 'Hamad Town Town' },
    { name: "A'ali", value: "A'ali" },
    { name: 'Isa Town', value: 'Isa Town' },
    { name: 'Sitra', value: 'Sitra' },
    { name: 'Budaiya', value: 'Budaiya' },
    { name: 'Jidhafs', value: 'Jidhafs' },
    { name: 'Al-Malikiyah', value: 'Al-Malikiyah' },
    { name: 'Al-Muharraq', value: 'Al-Muharraq' },
    { name: 'Diraz', value: 'Diraz' },
    { name: 'Hidd', value: 'Hidd' },
    { name: 'Sanad', value: 'Sanad' },
    { name: 'Zallaq', value: 'Zallaq' },
    { name: 'Jannusan', value: 'Jannusan' },
    { name: 'Salmabad', value: 'Salmabad' },
    { name: 'Saar', value: 'Saar' },
    { name: 'Tubli', value: 'Tubli' },
    { name: 'Galali', value: 'Galali' },
    { name: 'Juffair', value: 'Juffair' },
    { name: 'Karzakkan', value: 'Karzakkan' },
    { name: 'Karrana', value: 'Karrana' },
    { name: "Ma'ameer", value: "Ma'ameer" },
    { name: 'Qalali', value: 'Qalali' },
    { name: 'Ras Zuwayed', value: 'Ras Zuwayed' },
    { name: 'Seef', value: 'Seef' },
    { name: 'Tashan', value: 'Tashan' },
    { name: 'Zayed Town', value: 'Zayed Town' },
    { name: 'Al-Hoora', value: 'Al-Hoora' }
  ]
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
          Account Details
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
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              {/* <div className="mt-2">
                <InputText
                  id="location"
                  name="location"
                  value={formValues?.location}
                  type="text"
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div> */}
              <Dropdown
                id="location"
                name="location"
                value={formValues.location}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    location: e.value
                  }))
                }
                options={cities}
                optionLabel="name"
                required
                className=" w-full md:w-14rem "
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2">
                <InputText
                  id="avatar"
                  name="avatar"
                  type="text"
                  value={formValues?.avatar}
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
                Update Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateVendorDetails
