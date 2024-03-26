import Client from './api'

export const getAllVendors = async () => {
  try {
    const res = await Client.get('/vendor')
    return res.data
  } catch (error) {}
}

export const getAllVendorTools = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}/tool`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const getAllVendorPlants = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}/plant`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const getAllVendorServices = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}/service`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getAllVendorProduce = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}/produce`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getAllVendorPackages = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}/package`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getVendorCustomerOrders = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}/customerorders`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getVendorDetails = async (id) => {
  try {
    const res = await Client.get(`vendor/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const updateVendorDetails = async (data) => {
  try {
    const res = await Client.put(`/vendor/${data.id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}
