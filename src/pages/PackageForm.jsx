import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { useState } from 'react'

const PackageForm = () => {
  let navigate = useNavigate()

  // const { vendorId } = useParams('vendorId')

  const [formValues, setFormValues] = useState({
    name: '',
    price: 0,
    description: '',
    frequency: '',
    plants: [''],
    services: [''],
    produce: [''],
    tools: [''],
    available: true
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/`)
    const packages = { formValues, vendorId }
    await Client.post(`/package`, packages)
    setFormValues({
      name: '',
      price: '',
      description: '',
      frequency: '',
      plants: [''],
      services: [''],
      produce: [''],
      tools: [''],
      available: true
    })
  }

  return (
    <div>
      <h3>awaiting form libs- package form</h3>
    </div>
  )
}

export default PackageForm
