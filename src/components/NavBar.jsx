import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Account from '../pages/Account'
import { Link } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import PlantList from '../pages/PlantList'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useContext } from 'react'
import ShoppingCartIcon from './ShoppingCartIcon'
const NavBar = () => {
  const { isAuthenticated, user } = useAuth0()
  let cart = useContext(ShoppingCartContext)
  let cartTotalProducts
  if (isAuthenticated && user['https://nabtah.com/roles'] == 'customer') {
    cartTotalProducts = cart.getProductsCount()
  }
  return (
    <div>
      <div>
        <div className=" flex justify-around items-center  bg-green-200 text-blue-900">
          <Link to="/">Home</Link>
          <Link to="/servicelist">Services</Link>
          <Link to="/vendorlist">Vendors</Link>
          <Link to="/serviceform">Add a Service</Link>
          <Link to="/produceform">Add a Produce</Link>
          <Link to="/packageform">Add a Package</Link>
          <Link to="/toolform">Add a tool</Link>
          <Link to="/plantlist">Plants</Link>
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <Link to="/account">Account</Link>}
          {isAuthenticated && user['https://nabtah.com/roles'] == 'customer' ? (
            <Link to="/shoppingcart">
              <ShoppingCartIcon ItemsCount={cartTotalProducts} />
            </Link>
          ) : (
            <></>
          )}
          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
    </div>
  )
}

export default NavBar
