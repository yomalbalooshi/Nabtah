import Client from './api'

export const getAllServices = async () => {
  try {
    const res = await Client.get(`/service`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const serviceDetails = async (id) => {
  try {
    const res = await Client.get(`service/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addSerice = async (data) => {
  try {
    const res = Client.post('/service', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteService = async (id) => {
  try {
    const res = await Client.delete(`/service/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateService = async (data) => {
  try {
    const res = await Client.put(`/service/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
