import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import Client from './Client'

export async function performRequest (client: Client, config: AxiosRequestConfig) : Promise<object> {
  const options : AxiosRequestConfig = {
    validateStatus (status) {
      return status === 200
    },
    ...config
  }
  try {
    return (await axios(options)).data
  } catch (e) {
    throw {
      status: e.response.status,
      body: e.response.data
    }
  }
}