import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    !isAuthenticated && (
      <div className=" flex justify-center">
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    )
  )
}

export default LoginButton
