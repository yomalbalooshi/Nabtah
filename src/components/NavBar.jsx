import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Account from '../pages/Account'

const NavBar = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <div>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}
      {/* <Account/> */}
      <Account />
    </div>
  )
}

export default NavBar
