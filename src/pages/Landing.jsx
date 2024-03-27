import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import PlantModel from '../models/PlantModel'
import { useState } from 'react'

const Landing = () => {
  const [isRotating, setIsRotating] = useState(false)

  const adjustPlantForScreenSize = () => {
    let screenScale = null
    let screenPosition = [0, -6.5, -43]
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
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to Nabtah</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Explore our wide range of plants and gardening essentials. Whether
          you're a seasoned gardener or just starting, we have everything you
          need to bring life and greenery into your home.
        </p>
      </div>
      <div className="w-1/2 h-5/6 flex flex-col justify-center items-center">
        <Canvas
          className={` bg-transparent ${
            isRotating ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          camera={{ near: 0.1, far: 1000 }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[20, 10, 1]} intensity={3} />
            <ambientLight intensity={5} />
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
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Sign In
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:bg-gray-900">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
