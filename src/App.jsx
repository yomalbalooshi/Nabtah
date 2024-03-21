import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Client from './services/api'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import ProduceForm from './pages/ProduceForm'
import ServiceForm from './pages/ServiceForm'
import ToolForm from './pages/ToolForm'
import PackageForm from './pages/PackageForm'
import Landing from './pages/Landing'
import PlantDetail from './components/PlantDetail'

const App = () => {
  const [vendors, setVendors] = useState([''])

  useEffect(() => {
    const getVendors = async () => {
      const response = await Client.get('/vendor')
      console.log(response.data)
      setVendors(response.data)
    }
    getVendors()
  }, [])

  return (
    <div>
      <h1 className=" text-cyan-900 text-3xl text-center">Nabtah</h1>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home vendors={vendors} />} />
          <Route path="/produceform" element={<ProduceForm />} />
          <Route path="/toolform" element={<ToolForm />} />
          <Route path="/serviceform" element={<ServiceForm />} />
          <Route path="/packageform" element={<PackageForm />} />
          <Route path="/plantDetail/:plantId" element={<PlantDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
