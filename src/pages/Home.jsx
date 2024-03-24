import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'
import { getAllVendors } from '../services/vendor'

const Home = () => {
  const [plants, setPlants] = useState([])
  const [vendors, setVendors] =useState([])

  useEffect(() => {
    const getVendorDetails = async () => {
      let response = await getAllVendors()
      setVendors(response)
    }
    getVendorDetails()
  }, [])

  const vendorRef = useRef()
  const plantRef = useRef()

  const scrollToElement = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const getPlants = async () => {
      const response = await Client.get('/plant')
      console.log(response.data)
      setPlants(response.data)
    }
    getPlants()
  }, [])

  return (
    <div>
      <div className=" text-center mt-20 text-l">
        <h1>Your garden's second home</h1>
        <h4>One stop for all your gardening needs</h4>
        <div className=" flex justify-around">
          <button
            className="bg-green-400"
            onClick={() => {
              scrollToElement(vendorRef)
            }}
          >
            Jump to shops
          </button>
          <button
            className="bg-green-400"
            onClick={() => {
              scrollToElement(plantRef)
            }}
          >
            Jump to plants
          </button>
        </div>
      </div>
      <div>
        <h2 ref={vendorRef} className=" text-center mt-20 text-3xl">
          Most popular shops right now!
        </h2>
        <div className="flex justify-around mt-20 text-center">
          {vendors.map((vendor) => (
            <div className=" flex flex-col" key={vendor._id}>
              <img
                className=" max-w-96"
                src={vendor.avatar}
                alt={vendor.name}
              />
              <h2>{vendor.name}</h2>
              <p>{vendor.location}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 ref={plantRef} className=" text-center mt-20 text-3xl">
          Our plant picks for you
        </h2>
        <div className="flex justify-around mt-20 text-center">
          {plants.map((plant) => (
            <div key={plant._id}>
              <Link to={`/plantDetail/${plant._id}`}>
                <div className=" flex flex-col">
                  <img
                    className=" max-w-96 min-h-72 max-h-72"
                    src={plant.image}
                    alt={plant.name}
                  />
                  <h2>{plant.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
