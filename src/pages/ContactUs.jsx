import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { contact } from '../services/contactus'
const ContactUs = () => {
  const initialState = {
    name: '',
    email: '',
    message: ''
  }
  let navigate = useNavigate()

  const [formState, setFormState] = useState(initialState)
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const contactMail = { ...formState }
    await contact(contactMail)
    setFormState(initialState)
    navigate(`/`)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-5xl font-semibold leading-9 tracking-tight text-gray-900">
          Contact Us
        </h2>
      </div>

      <div>
        <div className=" shadow-2xl max-w-2xl mx-auto flex justify-center pb-16 mt-20 mb-10">
          <form className="space-y-8  w-96 pt-10 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <InputText
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2">
                <InputTextarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="block w-full "
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-14"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
