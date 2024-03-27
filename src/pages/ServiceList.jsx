import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Paginator } from 'primereact/paginator'
import AddToCart from '../components/AddToCart'
import '../styles/vendorList.css'

const ServiceList = () => {
  const [services, setServices] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  useEffect(() => {
    const getServices = async () => {
      const response = await Client.get('/service')
      setServices(response.data)
    }
    getServices()
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const createDynamicTabs = () => {
    return services.slice(first, first + rows).map((service, i) => {
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
      <h2 className=" mt-6 mb-3 text-center text-3xl">Services</h2>
      <div className="card">
        <Accordion className=" mx-8 shadow-md">{createDynamicTabs()}</Accordion>
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={services.length}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default ServiceList
