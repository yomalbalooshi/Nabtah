import { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Paginator } from 'primereact/paginator'
import { getAllTools } from '../services/tool'
import { getAllVendors } from '../services/vendor'
import ProduceCard from '../components/ProduceCard'
import { InputText } from 'primereact/inputtext'
import { Slider } from 'primereact/slider'
import { Dropdown } from 'primereact/dropdown'
import '../styles/plantList.css'

const ToolList = ({}) => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [tool, setTool] = useState([])
  const [search, setSearch] = useState('')
  const [searchedTool, setSerchedTool] = useState([])
  const [price, setPrice] = useState([0, 100])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  useEffect(() => {
    const getVendorDetails = async () => {
      let response = await getAllVendors()
      const allOption = { name: 'All', _id: null }
      setVendors([allOption, ...response])
    }
    getVendorDetails()
  }, [])

  useEffect(() => {
    const getTools = async () => {
      let response = await getAllTools()
      setTool(response)
      setSerchedTool(response)
    }
    getTools()
  }, [])
  console.log(searchedTool)
  useEffect(() => {
    handleSearch()
  }, [price, search, selectedVendor])

  const handleSearch = () => {
    const newproduce = tool.filter((va) => {
      if (search && !va.name.toLowerCase().includes(search.toLowerCase()))
        return false
      if (
        selectedVendor &&
        selectedVendor._id &&
        !va.vendor.includes(selectedVendor._id)
      )
        return false

      if (va.price > price[1] || va.price < price[0]) return false
      return true
    })
    setSerchedTool(newproduce)
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
  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
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
                BHD {price[0]}&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; BHD{' '}
                {price[1]}
              </h3>
            </div>
            <div className="flex justify-content-center">
              <Slider
                value={price}
                onChange={(e) => setPrice(e.value)}
                className="w-48"
                range
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
          {searchedTool?.map((prod) => (
            <Card
              key={prod._id}
              className="h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
            >
              <ProduceCard produce={prod} />
            </Card>
          ))}
          <Paginator
            first={first}
            rows={rows}
            className="w-1/2"
            totalRecords={searchedTool.length}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ToolList
