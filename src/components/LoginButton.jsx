import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <button className="mx-4 mt-3" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  )
}

export default LoginButton
