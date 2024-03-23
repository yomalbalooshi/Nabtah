import Client from './api'

export const getAllPlants = async () => {
  try {
    const res = await Client.get(`/plant`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const showPlant = async (id) => {
  try {
    const res = await Client.get(`/plant/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addPlant = async (data) => {
  try {
    const res = Client.post('/plant', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deletePlant = async (data) => {
  try {
    const res = await Client.delete(`/plant/${data.plantId}`, { data })
    return res.data
  } catch (error) {
    throw error
  }
}

export const updatePlant = async (data) => {
  try {
    const res = await Client.put(`/plant/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
