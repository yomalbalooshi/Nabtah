import './App.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import { useState, useEffect, useContext } from 'react'
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
import ToolList from './pages/ToolList'
import UpdateToolForm from './pages/UpdateTool'
import UpdateService from './pages/UpdateService'
import UpdateProduce from './pages/UpdateProduce'
import UpdatePlant from './pages/UpdatePlant'
import UpdatePackage from './pages/UpdatePackage'
import Schedule from './pages/Schedule'
import { ShoppingCartContext } from './context/ShoppingCartContext'
import ShoppingCart from './components/ShoppingCart'
import PaymentFailed from './pages/PaymentFailed'
import PaymentSuccess from './pages/PaymentSuccess'
import Package from './pages/Package'

const App = () => {
  const [updated, setUpdated] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [authenticatedUser, setauthenticatedUser] = useState([])
  let cart = useContext(ShoppingCartContext)

  useEffect(() => {
    if (isAuthenticated && user) {
      const getuserDetails = async () => {
        let response = await showUserDetails(user.sub, user)
        response.role = user['https://nabtah.com/roles'][0]
        setauthenticatedUser(response)
        localStorage.setItem('auth0_id', user.sub)
        localStorage.setItem('_id', response._id)
        if (user['https://nabtah.com/roles'] == 'customer') {
          cart.setCartFromDb(response.cart)
        }
      }
      getuserDetails()
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
          <Route
            path="/updateproduce/:id"
            element={<UpdateProduce setUpdated={setUpdated} />}
          />
          <Route
            path="/toolform"
            element={<ToolForm authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/updatetool/:id"
            element={<UpdateToolForm setUpdated={setUpdated} />}
          />
          <Route
            path="/serviceform"
            element={<ServiceForm authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/updateservice/:id"
            element={<UpdateService setUpdated={setUpdated} />}
          />
          <Route
            path="/packageform"
            element={<PackageForm authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/updatepackage/:id"
            element={<UpdatePackage setUpdated={setUpdated} />}
          />
          <Route
            path="/addplant"
            element={<AddPlant authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/updateplant/:id"
            element={<UpdatePlant setUpdated={setUpdated} />}
          />
          <Route path="/plantDetail/:plantId" element={<PlantDetail />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/servicelist" element={<ServiceList />} />
          <Route
            path="/account"
            element={
              <Account
                authenticatedUser={authenticatedUser}
                updated={updated}
              />
            }
          />
          <Route path="/plantlist" element={<PlantList />} />
          <Route
            path="/shoppingcart"
            element={<ShoppingCart authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/paymentsuccess"
            element={<PaymentSuccess authenticatedUser={authenticatedUser} />}
          />
          <Route path="/paymentfailed" element={<PaymentFailed />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route path="/toollist" element={<ToolList />} />
          <Route path="/packages" element={<Package />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
