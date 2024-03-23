import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

const Account = ({ authenticatedUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [userDetails, setuserDetails] = useState({})
  useEffect(() => {
    if (authenticatedUser) {
      console.log('authhhheeenticated')
    }
  }, [authenticatedUser])
  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    authenticatedUser && (
      <div>
        <p>welcome {authenticatedUser.name}</p>
        <img src={authenticatedUser.avatar} alt={authenticatedUser.name} />
        <p>{authenticatedUser.email}</p>
        <p>auth0_id: {authenticatedUser.auth0_id}</p>
      </div>
    )
  )
}

export default Account
