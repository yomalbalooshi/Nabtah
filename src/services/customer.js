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
export const addItemToCustomerCart = async (id, data) => {
  try {
    const res = await Client.post(`/customer/${id}/cart`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const getCustomerCartItem = async (data) => {
  try {
    const res = await Client.get(`/customer/${data.id}/cartItem/${data.itemId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateCartItem = async (id, data) => {
  try {
    const res = await Client.put(`/customer/${id}/cart`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteCartItem = async (id, data) => {
  try {
    const res = await Client.delete(`/customer/${id}/cart`, {
      data
    })
    return res.data
  } catch (error) {
    throw error
  }
}
export const updateCustomerDetails = async (data) => {
  try {
    const res = await Client.put(`/customer/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
