import { Card } from 'primereact/card'
import { useState, useEffect } from 'react'
import { getAllVendors } from '../services/vendor'
import { Paginator } from 'primereact/paginator'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import '../styles/vendorList.css'

const VendorList = () => {
  const [vendors, setVendors] = useState([])
  const [searchedArray, setSearchedArray] = useState([])
  const [selectedCities, setSelectedCities] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  const cities = [
    { name: 'Manama' },
    { name: 'Riffa' },
    { name: 'Hamad Town' },
    { name: "A'ali" },
    { name: 'Isa Town' },
    { name: 'Sitra' },
    { name: 'Budaiya' },
    { name: 'Jidhafs' },
    { name: 'Al-Malikiyah' },
    { name: 'Al-Muharraq' },
    { name: 'Diraz' },
    { name: 'Hidd' },
    { name: 'Sanad' },
    { name: 'Zallaq' },
    { name: 'Jannusan' },
    { name: 'Salmabad' },
    { name: 'Saar' },
    { name: 'Tubli' },
    { name: 'Galali' },
    { name: 'Juffair' },
    { name: 'Karzakkan' },
    { name: 'Karrana' },
    { name: "Ma'ameer" },
    { name: 'Qalali' },
    { name: 'Ras Zuwayed' },
    { name: 'Seef' },
    { name: 'Tashan' },
    { name: 'Zayed Town' },
    { name: 'Al-Hoora' }
  ]

  useEffect(() => {
    const getVendorDetails = async () => {
      let response = await getAllVendors()
      setVendors(response)
      setSearchedArray(response)
    }
    getVendorDetails()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [selectedCities])

  const handleSearch = (event) => {
    const value = event?.target?.value
    const newVendorsArray = vendors
      .filter((va) => {
        if (!value) return true
        return va.name.toLowerCase().includes(value.toLowerCase())
      })
      .filter((val) => {
        if (selectedCities.length === 0) return true
        return selectedCities.includes(val)
        const vendorCity = val.location.split(',')[0]
        return selectedCities.some((city) => city.name === vendorCity)
      })
    setSearchedArray(newVendorsArray)
    setFirst(0)
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  return (
    <div>
      <div className="flex justify-center py-2">
        <InputText
          type="text"
          placeholder="Search for Vendor"
          className="w-1/3"
          onChange={handleSearch}
        />
        <MultiSelect
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select Cities"
          maxSelectedLabels={3}
          className="w-1/6 md:w-20rem"
        />
      </div>
      <h2 className="text-center text-3xl mt-8">Our Vendors</h2>
      <div className="flex flex-wrap justify-around text-center">
        {searchedArray.slice(first, first + rows).map((vendor) => (
          <Card
            key={vendor._id}
            className="my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
          >
            <div className="flex flex-col">
              <img
                className="rounded-t-lg w-96 h-56 object-cover"
                src={vendor.avatar}
                alt={vendor.name}
              />
              <h2 className="text-2xl pt-4">{vendor.name}</h2>
              <p className="text-sm p-4 text-gray-500">{vendor.location}</p>
            </div>
          </Card>
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={searchedArray.length}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default VendorList
