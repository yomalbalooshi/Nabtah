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
        <div
          style={{ backgroundImage: `url(${authenticatedUser.avatar})` }}
          className="bg-cover surface-0 shadow-2 border-round bg-center space-x-8 min-h-64 flex justify-center "
        >
          <div className="backdrop-blur-sm bg-black/45 w-full flex justify-center">
            <p className=" mt-36 text-3xl font-medium text-neutral-50 mb-3 h-full align-text-bottom ">
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
