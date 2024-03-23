import Client from './api'

export const addOrderItem = async (data) => {
  try {
    const res = Client.post('/orderItem', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteOrderItem = async (data) => {
  try {
    const res = await Client.delete(`/orderItem/${data.orderItemId}`, { data })
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateOrderItem = async (data) => {
  try {
    const res = await Client.put(`/orderItem/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
