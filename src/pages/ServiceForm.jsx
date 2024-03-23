import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { useState } from 'react'

const ServiceForm = () => {
  let navigate = useNavigate()

  // const { vendorId } = useParams('vendorId')

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    available: true,
    price: 0,
    quantity: 0,
    frequency: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/`)
    const service = { formValues, vendorId }
    await Client.post(`/service`, service)
    setFormValues({
      name: '',
      description: '',
      available: true,
      price: 0,
      quantity: 0,
      frequency: ''
    })
  }

  return (
    <div>
      <h3>awaiting form libs - service form</h3>
    </div>
  )
}

export default ServiceForm
