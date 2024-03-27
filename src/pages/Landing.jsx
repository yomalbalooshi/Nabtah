import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import PlantModel from '../models/PlantModel'
import { useState } from 'react'
import { Timeline } from 'primereact/timeline'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import 'primeicons/primeicons.css'
import { Link } from 'react-router-dom'

const Landing = () => {
  const [isRotating, setIsRotating] = useState(false)
  const events = [
    {
      status: 'Ordered',
      date: 'Today',
      icon: 'pi pi-shopping-cart',
      color: '#9C27B0',
      image: 'game-controller.jpg',
      content:
        'Customers effortlessly navigate our website, exploring a diverse range of products. They select items with ease, aided by detailed descriptions and high-quality images, before placing their orders confidently.'
    },
    {
      status: 'Processing',
      date: 'In 3 Hours',
      icon: 'pi pi-cog',
      color: '#673AB7',
      content:
        'Upon order placement, our dedicated team swiftly processes each request. From verifying details to updating inventory, we ensure accuracy and efficiency in preparing orders for shipment.'
    },
    {
      status: 'Shipped',
      date: 'In 6 Hours',
      icon: 'pi pi-shopping-cart',
      color: '#FF9800',
      content:
        'Processed orders are promptly dispatched through our trusted network of logistics partners. We prioritize reliable and timely shipping, optimizing routes to minimize transit times and provide real-time tracking for customer convenience.'
    },
    {
      status: 'Delivered',
      date: 'Next Day',
      icon: 'pi pi-check',
      color: '#607D8B',
      content:
        "Customers experience swift and secure delivery of their purchases, facilitated by our partnership with reputable courier services. Whether it's same-day or standard delivery, we prioritize customer satisfaction, ensuring a seamless final step in their shopping journey."
    }
  ]

  const customizedMarker = (item) => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
        style={{ backgroundColor: item.color, borderRadius: '50%' }}
      >
        <i className={item.icon}></i>
      </span>
    )
  }

  const customizedContent = (item) => {
    return (
      <Card className="p-6" title={item.status} subTitle={item.date}>
        <div className="flex justify-center items-center gap-10">
          {item.image && (
            <img
              src={`https://www.leafenvy.co.uk/cdn/shop/articles/top-10-most-aesthetic-house-plants-990193_1200x1200.jpg?v=1693062918`}
              alt={item.name}
              width={200}
              className="shadow-1 h-48 object-cover"
            />
          )}
          <p>{item.content}</p>
        </div>
      </Card>
    )
  }

  const adjustPlantForScreenSize = () => {
    let screenScale = null
    let screenPosition = [0, -1.5, -43]
    let rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9]
    } else {
      screenScale = [30, 30, 30]
    }
    return [screenScale, screenPosition, rotation]
  }

  const [plantScale, plantPosition, plantRotation] = adjustPlantForScreenSize()

  return (
    <div className="bg-white">
      <div className="flex">
        <div className="flex justify-center items-center">
          <div className="h-screen w-1/2">
            <Canvas
              className={` bg-transparent ${
                isRotating ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              camera={{ near: 0.1, far: 1000 }}
            >
              <Suspense fallback={<Loader />}>
                <directionalLight position={[5, 1, 1]} intensity={3} />
                <ambientLight intensity={2} />
                <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" />

                <PlantModel
                  position={plantPosition}
                  scale={plantScale}
                  rotation={plantRotation}
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                />
              </Suspense>
            </Canvas>
          </div>
          <div className="flex flex-col justify-center items-center w-1/2">
            <h2 className="text-3xl font-bold mb-10">
              Nabtah's 4 step process
            </h2>
            <div>
              <p className="text-lg text-gray-700 mb-8 text-center px-10">
                Our website streamlines ordering and delivery in four simple
                steps: customers browse and place orders, which are swiftly
                processed and shipped, culminating in prompt delivery. This
                ensures a smooth and satisfying shopping experience.
              </p>
              <div className="flex justify-center">
                <Link to="/contactus">
                  <button className="  flex justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6">
                    Contact us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="card mt-24 mb-20">
        <Timeline
          value={events}
          align="alternate"
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      </div>
    </div>
  )
}

export default Landing
