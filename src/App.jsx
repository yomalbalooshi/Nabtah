import './App.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Client from './services/api'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { useAuth0 } from '@auth0/auth0-react'
import ProduceForm from './pages/ProduceForm'
import ServiceForm from './pages/ServiceForm'
import ToolForm from './pages/ToolForm'
import PackageForm from './pages/PackageForm'
import Landing from './pages/Landing'
import PlantDetail from './components/PlantDetail'
import VendorList from './pages/VendorList'
import ServiceList from './pages/ServiceList'
import AddPlant from './pages/AddPlant'
import Account from './pages/Account'
import PlantList from './pages/PlantList'
import { showUserDetails } from './services/user'

import UpdateToolForm from './pages/UpdateTool'
import UpdateService from './pages/UpdateService'
import UpdateProduce from './pages/UpdateProduce'
import UpdatePlant from './pages/UpdatePlant'
import UpdatePackage from './pages/UpdatePackage'

import PaymentFailed from './pages/PaymentFailed'
import PaymentSuccess from './pages/PaymentSuccess'

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [authenticatedUser, setauthenticatedUser] = useState([])

  useEffect(() => {
    if (isAuthenticated && user) {
      const getuserDetails = async () => {
        let response = await showUserDetails(user.sub, user)
        setauthenticatedUser(response)
        localStorage.setItem('auth0_id', user.sub)
        localStorage.setItem('_id', authenticatedUser._id)
      }
      getuserDetails()
      console.log(user)
    } else {
      localStorage.clear()
    }
  }, [isAuthenticated, user])

  return (
    <div>
      <h1 className=" text-cyan-900 text-3xl text-center">Nabtah</h1>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/produceform" element={<ProduceForm />} />
          <Route path="/updateproduce/:id" element={<UpdateProduce />} />

          <Route path="/toolform" element={<ToolForm />} />
          <Route path="/updatetool/:id" element={<UpdateToolForm />} />
          <Route path="/serviceform" element={<ServiceForm />} />
          <Route path="/updateservice/:id" element={<UpdateService />} />
          <Route path="/packageform" element={<PackageForm />} />
          <Route path="/updatepackage/:id" element={<UpdatePackage />} />
          <Route path="/addplant" element={<AddPlant />} />
          <Route path="/updateplant/:id" element={<UpdatePlant />} />

          <Route path="/plantDetail/:plantId" element={<PlantDetail />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/servicelist" element={<ServiceList />} />
          <Route
            path="/account"
            element={<Account authenticatedUser={authenticatedUser} />}
          />
          <Route path="/plantlist" element={<PlantList />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfailed" element={<PaymentFailed />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
