import Client from './api'

export const getAllProduces = async () => {
  try {
    const res = await Client.get(`/produce`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const produceDetails = async (id) => {
  try {
    const res = await Client.get(`produce/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addProduce = async (data) => {
  try {
    const res = Client.post('/produce', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteProduce = async (id) => {
  try {
    const res = await Client.delete(`/produce/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateProduce = async (data) => {
  try {
    const res = await Client.put(`/produce/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
