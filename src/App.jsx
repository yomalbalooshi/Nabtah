import './App.css'
import NavBar from './components/NavBar'
import ProduceForm from './pages/ProduceForm'
import ServiceForm from './pages/ServiceForm'
import ToolForm from './pages/ToolForm'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <h1 className=" text-cyan-900 text-3xl text-center">Nabtah</h1>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produceform" element={<ProduceForm />} />
          <Route path="/toolform" element={<ToolForm />} />
          <Route path="/serviceform" element={<ServiceForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
