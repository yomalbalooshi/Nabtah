import Client from './api'

export const getCustomerOrders = async (id) => {
  try {
    const res = await Client.get(`/customer/${id}/orders`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getCustomerDetails = async (id) => {
  try {
    const res = await Client.get(`/customer/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addOwnedPlant = async (id, data) => {
  try {
    const res = Client.post(`/customer/${id}/ownedplant`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteOwnedPlant = async (id, data) => {
  try {
    const res = await Client.delete(`/customer/${id}/ownedplant`, { data })
    return res.data
  } catch (error) {
    throw error
  }
}
