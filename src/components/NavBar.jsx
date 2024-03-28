import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import { useState, useEffect } from 'react'
import LogoutButton from './LogoutButton'
import Account from '../pages/Account'
import { Link } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import PlantList from '../pages/PlantList'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { useContext } from 'react'
import ShoppingCartIcon from './ShoppingCartIcon'
import { IoMdArrowDropdown } from 'react-icons/io'

const NavBar = ({ authenticatedUser }) => {
  const { isAuthenticated, user } = useAuth0()
  const [navbarBg, setNavbarBg] = useState('bg-transparent') // State for navbar background

  let cart = useContext(ShoppingCartContext)
  let cartTotalProducts
  if (isAuthenticated && user['https://nabtah.com/roles'] == 'customer') {
    cartTotalProducts = cart.getProductsCount()
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 0) {
        setNavbarBg('bg-white shadow-md pb-1') // Change background to green when scrolled down
      } else {
        setNavbarBg('bg-white') // Revert back to transparent when scrolled to top
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Run only once on component mount
  return (
    <div>
      <div
        className={`flex justify-between pb-2 text-xl fixed top-0 z-50 w-full ${navbarBg} `}
      >
        <div>
          <Link className="mx-4 mt-2" to="/">
            <img src="/images/logo.png" className="w-40 mt-4 ml-4" />
          </Link>
        </div>
        <div className=" flex items-center   text-teal-950">
          {isAuthenticated &&
            user['https://nabtah.com/roles'] == 'customer' && (
              <div
                className="relative mx-4 mt-4"
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <Link to="#" className="cursor-pointer">
                  <div className="flex">
                    <p>Products</p>
                    <p className="mt-1">
                      <IoMdArrowDropdown />
                    </p>
                  </div>
                </Link>
                {isDropdownOpen && (
                  <div className=" absolute bg-white py-2 px-4 shadow-md rounded-md min-w-48  z-50">
                    <Link
                      to="/plantlist"
                      className="block my-1 p-2 hover:bg-emerald-100 "
                    >
                      Plants
                    </Link>
                    <Link
                      to="/producelist"
                      className="block my-1 p-2 hover:bg-emerald-100 "
                    >
                      Produce
                    </Link>
                    <Link
                      to="/servicelist"
                      className="block my-1 p-2 hover:bg-emerald-100"
                    >
                      Service
                    </Link>
                    <Link
                      to="/toollist"
                      className="block my-1 p-2 hover:bg-emerald-100"
                    >
                      Tools
                    </Link>
                    <Link
                      to="/packages"
                      className="block my-1 p-2 hover:bg-emerald-100"
                    >
                      Packages
                    </Link>
                  </div>
                )}
              </div>
            )}
          {isAuthenticated && user['https://nabtah.com/roles'] == 'vendor' && (
            <div
              className="relative mx-4 mt-4"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <Link to="#" className="cursor-pointer">
                <div className="flex">
                  <p>Add Products</p>
                  <p className="mt-1">
                    <IoMdArrowDropdown />
                  </p>
                </div>
              </Link>
              {isDropdownOpen && (
                <div className=" absolute bg-white py-2 px-4 shadow-md rounded-md min-w-48  z-50">
                  <Link
                    to="/addplant"
                    className="block my-1 p-2 hover:bg-emerald-100 "
                  >
                    Add Plant
                  </Link>
                  <Link
                    to="/produceform"
                    className="block my-1 p-2 hover:bg-emerald-100 "
                  >
                    Add Produce
                  </Link>
                  <Link
                    to="/serviceform"
                    className="block my-1 p-2 hover:bg-emerald-100"
                  >
                    Add Service
                  </Link>
                  <Link
                    to="/toolform"
                    className="block my-1 p-2 hover:bg-emerald-100"
                  >
                    Add Tools
                  </Link>
                  <Link
                    to="/packageform"
                    className="block my-1 p-2 hover:bg-emerald-100"
                  >
                    Add Package
                  </Link>
                </div>
              )}
            </div>
          )}

          {isAuthenticated &&
            user['https://nabtah.com/roles'] == 'customer' && (
              <Link to="/vendorlist" className="mx-4 mt-4">
                Vendors
              </Link>
            )}

          {isAuthenticated &&
            user['https://nabtah.com/roles'] == 'customer' && (
              <Link to="/schedule" className="mx-4 mt-4">
                Schedule
              </Link>
            )}

          <Link to="/about" className="mx-4 mt-4">
            About
          </Link>

          {isAuthenticated && user['https://nabtah.com/roles'] == 'customer' ? (
            <Link className="mx-4" to="/shoppingcart">
              <ShoppingCartIcon ItemsCount={cartTotalProducts} />
            </Link>
          ) : (
            <></>
          )}
          {!isAuthenticated && <LoginButton />}

          {isAuthenticated && (
            <Link className="mx-4 mt-2" to="/account">
              <img
                src={authenticatedUser.avatar}
                className="rounded-full size-10 object-cover"
              />
            </Link>
          )}

          {isAuthenticated && <LogoutButton />}
        </div>
      </div>
    </div>
  )
}

export default NavBar
