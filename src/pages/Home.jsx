import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api'
import { getAllVendors } from '../services/vendor'
import { getAllTools } from '../services/tool'
import { Carousel } from 'primereact/carousel'
import { getAllProduces } from '../services/produce'
import '../../src/styles/home.css'

const Home = () => {
  const [plants, setPlants] = useState([])
  const [plantCar, setPlantCar] = useState([])
  const [vendors, setVendors] = useState([])
  const [tools, setTools] = useState([])
  const [produce, setProduce] = useState([])

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
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

  useEffect(() => {
    const getProduceDetails = async () => {
      let response = await getAllProduces()
      setProduce(response.slice(0, 9))
    }
    getProduceDetails()
  }, [])

  const vendorRef = useRef()
  const plantRef = useRef()
  const toolRef = useRef()
  const produceRef = useRef()

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

  const toolTemplate = (tool) => {
    return (
      <div>
        <div className="flex flex-col pb-10 items-center">
          <img
            className=" h-64 w-96 object-cover shadow-xl mb-6 rounded-md"
            src={tool.image}
            alt={tool.name}
          />
          <h2>{tool.name}</h2>
        </div>
      </div>
    )
  }

  const produceTemplate = (produce) => {
    return (
      <div>
        <div className="flex flex-col pb-10 items-center">
          <img
            className=" h-64 w-96 object-cover shadow-xl mb-6 rounded-md"
            src={produce.image}
            alt={produce.name}
          />
          <h2>{produce.name}</h2>
        </div>
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
        <div className="flex items-center h-12 text-xl justify-around py-4 shadow-sm">
          <button
            className=" ml-40 hover:text-green-600 hover:underline underline-offset-8"
            onClick={() => {
              scrollToElement(vendorRef)
            }}
          >
            Vendors
          </button>
          <button
            className="hover:text-green-600 hover:underline underline-offset-8 "
            onClick={() => {
              scrollToElement(plantRef)
            }}
          >
            Plants
          </button>
          <button
            className="hover:text-green-600 hover:underline underline-offset-8"
            onClick={() => {
              scrollToElement(toolRef)
            }}
          >
            Tools
          </button>
          <button
            className=" mr-40 hover:text-green-600 hover:underline underline-offset-8"
            onClick={() => {
              scrollToElement(produceRef)
            }}
          >
            Produce
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex">
          <div
            className="flex justify-center items-center w-1/3 text-justify relative samplew"
            style={{ lineHeight: '2' }}
          >
            <p className=" absolute top-24 left-8 mr-10 ">
              Passionate about plants, our vendors meticulously curate
              top-quality selections, cultivated with expertise and
              sustainability in focus. With unwavering dedication to exceptional
              service and care, they provide green companions tailored for your
              garden, ensuring vibrant beauty and enduring delight. Explore
              botanical excellence with Nabtah today, and elevate your gardening
              experience to new heights of satisfaction and fulfillment.
            </p>
          </div>
          <div className="flex text-center w-2/3">
            <div className="sample">
              <h2 ref={vendorRef} className="text-center text-3xl mb-10 mt-6">
                Popular Vendors
              </h2>
              <div className="card">
                <Carousel
                  className=" pb-10 carolink"
                  value={vendors}
                  numVisible={3}
                  numScroll={3}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={vendorTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sample ">
        <div className="flex">
          <div className="flex mt-10 text-center w-2/3">
            <div className="">
              <h2 ref={plantRef} className="text-center text-3xl mb-10">
                Popular Plants
              </h2>
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
          <div
            className=" flex justify-center items-center w-1/3 px-5 text-justify relative samplew"
            style={{ lineHeight: '2' }}
          >
            <p className=" absolute top-28 right-8 ml-10">
              Our vendors are committed to sourcing and providing a diverse
              range of high-quality plants, each carefully selected for its
              excellence and suitability. With expertise and dedication, they
              ensure that every plant meets our standards of quality and
              sustainability. Explore our vendors' offerings and discover the
              perfect green companions for your garden with Nabtah.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className=" flex sample">
          <div
            className=" flex justify-center items-center w-1/3 px-5 text-justify relative samplew"
            style={{ lineHeight: '2' }}
          >
            <p className="absolute top-28 left-8 mr-10">
              At Nabtah, our vendors meticulously curate an extensive selection
              of top-quality gardening tools. With a focus on excellence and
              functionality, each tool is chosen for its durability and
              effectiveness in enhancing your gardening experience. Explore our
              range of tools today and elevate your gardening endeavors with
              Nabtah.
            </p>
          </div>
          <div className="flex text-center w-2/3 mt-10">
            <div>
              <h2 ref={toolRef} className="text-center text-3xl pb-10">
                Popular Tools
              </h2>
              <div className="card">
                <Carousel
                  className=" pb-10"
                  value={tools}
                  numVisible={3}
                  numScroll={3}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={toolTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sample">
        <div className="flex">
          <div className="flex mt-10 text-center w-2/3">
            <div>
              <h2 ref={produceRef} className="text-center text-3xl pb-10">
                Popular Produce
              </h2>
              <div className="card">
                <Carousel
                  className=" pb-10"
                  value={produce}
                  numVisible={3}
                  numScroll={3}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={produceTemplate}
                />
              </div>
            </div>
          </div>
          <div
            className=" flex justify-center items-center w-1/3 px-5 text-justify relative samplew"
            style={{ lineHeight: '2' }}
          >
            <p className=" absolute top-28 right-8 ml-10">
              Nabtah proudly offers a diverse range of fresh and high-quality
              produce sourced directly from our trusted vendors. With a
              commitment to freshness and flavor, each item is carefully
              selected to ensure superior taste and nutritional value. Explore
              our selection of produce and experience culinary excellence with
              Nabtah.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
