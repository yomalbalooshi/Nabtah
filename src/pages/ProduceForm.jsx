import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const ProduceForm = () => {
  let navigate = useNavigate()
  
  const { vendorId } = useParams('vendorId')

  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    description: '',
    available: '',
    price: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const produce = { formValues, vendorId }
    await Client.post(`/produce/create`, produce)
    setFormValues({ name: '', type: '', description: '', available: '', price: '' })
    navigate(`/`)
  }
  //
  return (
    <div>
      <h3>Form body</h3>
    </div>
  )
}

export default ProduceForm
