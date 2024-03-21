import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import CustomerProfile from '../pages/CustomerProfile'
import { Link } from 'react-router-dom'
const NavBar = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div>
      <Link to="/home">Home</Link>
      <LoginButton />
      <LogoutButton />
      <CustomerProfile />
    </div>
  )
}

export default NavBar
