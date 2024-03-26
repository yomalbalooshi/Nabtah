import Client from './api'

export const contact = async (data) => {
  try {
    const res = await Client.post(`/mail`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
