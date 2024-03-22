import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { useState } from 'react'

const ProduceForm = () => {
  let navigate = useNavigate()

  // const { vendorId } = useParams('vendorId')

  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    description: '',
    available: true,
    price: 0
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const produce = { formValues, vendorId }
    await Client.post(`/produce`, produce)
    setFormValues({
      name: '',
      type: '',
      description: '',
      available: true,
      price: 0
    })
    navigate(`/`)
  }

  return (
    <div>
      <h3>awaiting form libs - produce form</h3>
    </div>
  )
}

export default ProduceForm
