import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { useState } from 'react'

const ToolForm = () => {
  let navigate = useNavigate()

  // const { vendorId } = useParams('vendorId')

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    available: true,
    price: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/`)
    const tool = { formValues, vendorId }
    await Client.post(`/tool`, tool)
    setFormValues({
      name: '',
      description: '',
      available: true,
      price: ''
    })
  }

  return (
    <div>
      <h3>awaiting form libs</h3>
    </div>
  )
}

export default ToolForm
