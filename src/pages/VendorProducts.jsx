import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  getAllVendorPlants,
  getAllVendorProduce,
  getAllVendorTools,
  getAllVendorServices,
  getAllVendorPackages
} from '../services/vendor'
import { TabView, TabPanel } from 'primereact/tabview'
import AddToCart from '../components/AddToCart'
import { GiPlantRoots } from 'react-icons/gi'
import { GiFruitBowl } from 'react-icons/gi'
import { GiGardeningShears } from 'react-icons/gi'
import { LuPackageOpen } from 'react-icons/lu'
import { FaToolbox } from 'react-icons/fa6'
import PlantCard from '../components/PlantCard'
import { Card } from 'primereact/card'
import { Paginator } from 'primereact/paginator'
import { Accordion, AccordionTab } from 'primereact/accordion'
import PackageCard from '../components/PackageCard'
import ProduceCard from '../components/ProduceCard'

const VendorProducts = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  let vendorId = id
  const [vendorPlants, setVendorPlants] = useState(null)
  const [vendorPackages, setVendorPackages] = useState(null)
  const [vendorProduce, setVendorProduce] = useState(null)
  const [vendorTools, setVendorTools] = useState(null)
  const [vendorServices, setVendorServices] = useState(null)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  useEffect(() => {
    const handleVendorPlants = async () => {
      const data = await getAllVendorPlants(vendorId)
      setVendorPlants(data)
    }
    const handleVendorProduce = async () => {
      const data = await getAllVendorProduce(vendorId)
      setVendorProduce(data)
    }
    const handleVendorServices = async () => {
      const data = await getAllVendorServices(vendorId)
      setVendorServices(data)
    }
    const handleVendorTools = async () => {
      const data = await getAllVendorTools(vendorId)
      setVendorTools(data)
    }
    const handleVendorPackages = async () => {
      const data = await getAllVendorPackages(vendorId)
      setVendorPackages(data)
    }
    handleVendorPlants()
    handleVendorProduce()
    handleVendorServices()
    handleVendorTools()
    handleVendorPackages()
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }
  const createDynamicTabs = () => {
    return vendorServices?.slice(first, first + rows).map((service, i) => {
      return (
        <AccordionTab
          key={service._id}
          header={
            service.available ? service.name : `${service.name} (unavailable)`
          }
          disabled={service.available === false}
        >
          <div className=" flex justify-between">
            <div className=" flex flex-col justify-center ">
              <p className=" mb-6">{service.description}</p>
              <p>
                <span className="font-bold">Price:</span> BHD {service.price}
              </p>
              <p>
                <span className="font-bold">Frequency:</span>{' '}
                {service.frequency}
              </p>
              <p>
                <span className="font-bold">Quantity:</span> {service.quantity}
              </p>
              <AddToCart product={service} productType={'Service'} />
            </div>
            <div className=" flex flex-col justify-center text-center ">
              <p className=" text-xs">Provided by</p>
              <p className=" text-xl font-medium">{service.vendor.name}</p>
              <img
                className=" w-52 h-32 rounded-3xl border-2 border-gray-300 shadow-md"
                src={service.vendor.avatar}
                alt={service.vendor.name}
              />
            </div>
          </div>
        </AccordionTab>
      )
    })
  }
  return (
    <div>
      <div className="mt-0">
        <TabView>
          <TabPanel header="Plants" leftIcon={<GiPlantRoots />}>
            <div className="flex flex-wrap justify-around ">
              {vendorPlants?.map((plant) => (
                <Card
                  key={plant._id}
                  className="h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
                >
                  <PlantCard plant={plant} />
                </Card>
              ))}
            </div>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={vendorPlants?.length}
              onPageChange={onPageChange}
            />
          </TabPanel>
          <TabPanel header="Produce" leftIcon={<GiFruitBowl />}>
            <div className="flex flex-wrap justify-around ">
              {vendorProduce?.map((prod) => (
                <Card
                  key={prod._id}
                  className="h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
                >
                  <ProduceCard produce={prod} />
                </Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Services" leftIcon={<GiGardeningShears />}>
            <div className="card">
              <Accordion className=" mx-8 shadow-md">
                {createDynamicTabs()}
              </Accordion>
            </div>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={vendorServices?.length}
              onPageChange={onPageChange}
            />
          </TabPanel>
          <TabPanel header="Tools" leftIcon={<FaToolbox />}>
            <div className="flex flex-wrap justify-around ">
              {vendorTools?.map((prod) => (
                <Card
                  key={prod._id}
                  className="h-56 my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
                >
                  <ProduceCard produce={prod} />
                </Card>
              ))}
            </div>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={vendorTools?.length}
              onPageChange={onPageChange}
            />
          </TabPanel>
          <TabPanel header="Packages" leftIcon={<LuPackageOpen />}>
            <div className="bg-white py-8 sm:py-8">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center"></div>
                {vendorPackages?.map((pack) => (
                  <div key={pack._id}>
                    <PackageCard pack={pack} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}

export default VendorProducts
