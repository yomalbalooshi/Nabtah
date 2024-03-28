import PackageCard from '../components/PackageCard'
import { getAllPackages } from '../services/package'
import { useState, useEffect } from 'react'

const Package = () => {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    const getPackages = async () => {
      let response = await getAllPackages()
      setPackages(response)
    }
    getPackages()
  }, [])

  return (
    <div className="bg-white py-8 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Packages
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            All of the available packages from our vendors
          </p>
        </div>
        {packages.map((pack) => (
          <div key={pack._id}>
            <PackageCard pack={pack} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Package
