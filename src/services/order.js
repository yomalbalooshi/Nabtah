import Client from './api'

export const addOrder = async (data) => {
  try {
    const res = Client.post('/order', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateOrder = async (data) => {
  try {
    const res = await Client.put(`/order/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
