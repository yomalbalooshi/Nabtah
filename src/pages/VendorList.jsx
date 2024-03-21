import { Card } from 'primereact/card'
import { useState, useEffect } from 'react'
import { getAllVendors } from '../services/vendor'
import { Paginator } from 'primereact/paginator'
import { InputText } from 'primereact/inputtext'
import '../styles/vendorList.css'

const VendorList = () => {
  const [vendors, setVendors] = useState([])
  const [searchedArray, setSearchedArray] = useState([])
  const [searchedLocation, setSearchedLocation] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(8)

  useEffect(() => {
    const getVendorDetails = async () => {
      let response = await getAllVendors()
      setVendors(response)
      setSearchedArray(response)
    }
    getVendorDetails()
  }, [])

  const handleSearch = (event) => {
    const value = event.target.value
    const newVendorsArray = vendors.filter((va) => {
      if (!value) return true
      return va.name.toLowerCase().includes(value.toLowerCase())
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
