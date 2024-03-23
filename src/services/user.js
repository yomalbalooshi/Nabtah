import Client from './api'

export const showUserDetails = async (id, user) => {
  //this method gets the user if they are in the database, otherwise it creates the user in the database and responds with the user information
  // id is auth0_id
  try {
    if (user['https://nabtah.com/roles'][0] === 'vendor') {
      const res = await Client.post(`/vendor/${id}`, user)
      console.log(res.data)

      return res.data
    } else if (user['https://nabtah.com/roles'][0] === 'customer') {
      console.log('a customer')
      console.log(user)
      const res = await Client.post(`/customer/${id}`, user)
      console.log(res.data)
      return res.data
    }
  } catch (error) {
    throw error
  }
}
