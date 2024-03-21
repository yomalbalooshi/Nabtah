import Client from './api'

export const getAllTools = async () => {
  try {
    const res = await Client.get(`/tool`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const toolDetails = async (id) => {
  try {
    const res = await Client.get(`tool/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addTool = async (data) => {
  try {
    const res = Client.post('/tool', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deleteTool = async (id) => {
  try {
    const res = await Client.delete(`/tool/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateTool = async (data) => {
  try {
    const res = await Client.put(`/tool/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
