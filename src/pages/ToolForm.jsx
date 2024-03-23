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
    price: 0
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
      price: 0
    })
  }

  return (
    <div>
      <h3>awaiting form libs - toolform</h3>
    </div>
  )
}

export default ToolForm
