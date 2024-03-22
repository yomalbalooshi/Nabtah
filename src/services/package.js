import Client from './api'

export const getAllPackages = async () => {
  try {
    const res = await Client.get(`/package`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const showPackage = async (id) => {
  try {
    const res = await Client.get(`/package/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const addPackage = async (data) => {
  try {
    const res = Client.post('/package', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const deletePackage = async (data) => {
  try {
    const res = await Client.delete(`/package/${data.packageId}`, { data })
    return res.data
  } catch (error) {
    throw error
  }
}

export const updatePackage = async (data) => {
  try {
    const res = await Client.put(`/package/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
