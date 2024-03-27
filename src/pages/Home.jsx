import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'
import { getAllVendors } from '../services/vendor'
import { getAllTools } from '../services/tool'
import { Carousel } from 'primereact/carousel'
import '../../src/styles/home.css'

const Home = () => {
  const [plants, setPlants] = useState([])
  const [plantCar, setPlantCar] = useState([])
  const [vendors, setVendors] = useState([])
  const [tools, setTools] = useState([])

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  useEffect(() => {
    const getVendorDetails = async () => {
      let response = await getAllVendors()
      setVendors(response.slice(0, 9))
    }
    getVendorDetails()
  }, [])

  useEffect(() => {
    const getToolDetails = async () => {
      let response = await getAllTools()
      setTools(response.slice(0, 9))
    }
    getToolDetails()
  }, [])

  const vendorRef = useRef()
  const plantRef = useRef()
  const toolRef = useRef()
  const serviceRef = useRef()

  const scrollToElement = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const getPlants = async () => {
      const response = await Client.get('/plant')
      setPlants(response.data)
      setPlantCar(response.data.slice(0, 9))
    }
    getPlants()
  }, [])

  console.log(tools)
  const plantTemplate = (plant) => {
    return (
      <div>
        <Link to={`/plantDetail/${plant._id}`}>
          <div className="flex flex-col pb-10 items-center">
            <img
              className=" h-64 w-96 object-cover shadow-xl mb-6 rounded-md"
              src={plant.image}
              alt={plant.name}
            />
            <h2>{plant.name}</h2>
          </div>
        </Link>
      </div>
    )
  }

  const vendorTemplate = (vendor) => {
    return (
      <div className="flex flex-col pb-10" key={vendor._id}>
        <div className="flex justify-center m-auto">
          <img
            className=" h-64 w-96 object-cover shadow-xl mb-6 rounded-md"
            src={vendor.avatar}
            alt={vendor.name}
          />
        </div>
        <h2 className=" text-2xl pb-1">{vendor.name}</h2>
        <p className=" text-sm">{vendor.location}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center text-l">
        <div className=" h-96 flex bg-gray-300 justify-center items-center background-image ">
          <div className="text-white flex flex-col gap-10">
            <h1 className="text-4xl">
              Welcome to{' '}
              <span className=" text-green-400 text-5xl">Nabtah</span>
            </h1>
            <h4>
              Your garden's second home. One stop for all your gardening needs
            </h4>
          </div>
        </div>
        <div className="flex items-center h-12 text-xl justify-around bg-green-50 ">
          <button
            className=" ml-40 hover:text-green-600 hover:underline underline-offset-8 hover:font-semibold"
            onClick={() => {
              scrollToElement(vendorRef)
            }}
          >
            Vendors
          </button>
          <button
            className="hover:text-green-600 hover:underline underline-offset-8 hover:font-semibold"
            onClick={() => {
              scrollToElement(plantRef)
            }}
          >
            Plants
          </button>
          <button
            className="hover:text-green-600 hover:underline underline-offset-8 hover:font-semibold"
            onClick={() => {
              scrollToElement(toolRef)
            }}
          >
            Tools
          </button>
          <button
            className=" mr-40 hover:text-green-600 hover:underline underline-offset-8 hover:font-semibold"
            onClick={() => {
              scrollToElement(serviceRef)
            }}
          >
            Services
          </button>
        </div>
      </div>
      <div className=" pt-10">
        <h2 ref={vendorRef} className="text-center text-3xl">
          Popular Vendors
        </h2>
        <div className="flex mt-10 text-center">
          <div className="card">
            <Carousel
              className=" pb-10"
              value={vendors}
              numVisible={3}
              numScroll={3}
              responsiveOptions={responsiveOptions}
              itemTemplate={vendorTemplate}
            />
          </div>
        </div>
      </div>
      <div className="bg-sky-100 pt-10">
        <h2 ref={plantRef} className="text-center text-3xl">
          Popular Plants
        </h2>
        <div className="flex mt-10 text-center">
          <div className="card">
            <Carousel
              className=" pb-10"
              value={plantCar}
              numVisible={3}
              numScroll={3}
              responsiveOptions={responsiveOptions}
              itemTemplate={plantTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
