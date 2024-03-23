import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import CustomerProfileInfo from '../components/CustomerProfileInfo'
import VendorProfileInfo from '../components/VendorProfileInfo'
const Account = ({ authenticatedUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [userDetails, setuserDetails] = useState({})
  useEffect(() => {
    if (authenticatedUser) {
      console.log(authenticatedUser)
    }
  }, [authenticatedUser])
  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    authenticatedUser && (
      <div>
        <div className="surface-0 p-4 shadow-2 border-round flex space-x-8 justify-evenly">
          <div>
            <img
              src={authenticatedUser.avatar}
              alt={authenticatedUser.name}
              className=" w-56 "
            />
          </div>
          <div className=" flex-grow flex flex-col justify-center">
            <p className="text-3xl font-medium text-900 mb-3 ">
              Welcome, {authenticatedUser.name}!
            </p>
          </div>
        </div>
        {authenticatedUser.role === 'vendor' && (
          <VendorProfileInfo authenticatedUser={authenticatedUser} />
        )}
        {authenticatedUser.role === 'customer' && (
          <CustomerProfileInfo authenticatedUser={authenticatedUser} />
        )}
      </div>
    )
  )
}

export default Account
