import './App.css'
import NavBar from './components/NavBar'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('auth0_id', user.sub)
    } else {
      localStorage.clear()
    }
  }, [isAuthenticated, user])
  return (
    <div>
      <h1>Nabtah</h1>
      <NavBar />
    </div>
  )
}

export default App
