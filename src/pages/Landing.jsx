import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Loader from '../components/Loader'
import PlantModel from '../models/PlantModel'
import { useState } from 'react'

const Landing = () => {
  const [isRotating, setIsRotating] = useState(false)

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
    <div className="bg-gray-200">
      <div className="justify-center bg-gray-200 flex pt-10 text-4xl">
        <h2>About Nabtah</h2>
      </div>
      <div className="flex bg-gray-200">
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
            <p className="text-lg text-gray-700 mb-8 text-center px-10">
              Our website streamlines ordering and delivery in four simple
              steps: customers browse and place orders, which are swiftly
              processed and shipped, culminating in prompt delivery. This
              ensures a smooth and satisfying shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
