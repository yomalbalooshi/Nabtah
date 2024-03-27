import Axios from 'axios'


export const BASE_URL = 'https://hqbvuwp4d6.us-east-1.awsapprunner.com/'


const Client = Axios.create({ baseURL: BASE_URL })

export default Client
