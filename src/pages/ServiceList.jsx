import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'

const ServiceList = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const getServices = async () => {
      const response = await Client.get('/service')
      console.log(response.data)
      setServices(response.data)
    }
    getServices()
  }, [])
  return (
    <div>
      <h2>service listo</h2>
      <div className="flex justify-around mt-20 text-center">
        {services.map((service) => (
          <div className=" flex flex-col" key={service._id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Price: BHD {service.price}</p>
            <p>
              Availability: {service.available ? 'Available' : 'Unavailable'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceList
