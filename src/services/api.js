import Axios from 'axios'

export const BASE_URL = 'http://localhost:3000'

const Client = Axios.create({ baseURL: BASE_URL })

export default Client
