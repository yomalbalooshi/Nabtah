import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import CustomerProfile from '../pages/CustomerProfile'
const NavBar = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <CustomerProfile />
    </div>
  )
}

export default NavBar
