import Endpoints from './Endpoints';
import * as join from 'url-join';
import * as qs from 'qs';
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import Client from './Client'

export interface apiResponse<T> {
  data: T,
  success: boolean,
  status: 200
}

export async function performRequest (client: Client, config: AxiosRequestConfig) : Promise<object> {
  const options : AxiosRequestConfig = {
    validateStatus (status) {
      return status === 200
    },
    ...config
  }
  // console.log(options)
  try {
    const res = await axios(options)
    console.log(res.headers['x-ratelimit-userreset'])
    client.RateLimits.client_limit = res.headers['x-ratelimit-clientlimit'] || client.RateLimits.client_limit
    client.RateLimits.client_remaining = res.headers['x-ratelimit-clientremaining'] || client.RateLimits.client_remaining
    client.RateLimits.user_limit = res.headers['x-ratelimit-userlimit'] || client.RateLimits.user_limit
    client.RateLimits.user_remaining = res.headers['x-ratelimit-userremaining'] || client.RateLimits.user_remaining
    client.RateLimits.user_reset = res.headers['x-ratelimit-userreset'] ? new Date(Date.now() + Number(res.headers['x-ratelimit-userreset'])) : client.RateLimits.user_reset
    client.RateLimits.ip_limit = res.headers['x-post-rate-limit-limit'] || client.RateLimits.ip_limit
    client.RateLimits.ip_remaining = res.headers['x-post-rate-limit-remaining'] || client.RateLimits.ip_remaining
    client.RateLimits.ip_reset = res.headers['x-post-rate-limit-reset'] ? new Date(Date.now() + Number(res.headers['x-post-rate-limit-reset'] * 1000)) : client.RateLimits.ip_reset
    return res.data
  } catch (e) {
    throw {
      status: e.response.status,
      body: e.response.data
    }
  }
}

export function performAPIRequest (client: Client, url: { path: string[], params?: string[]}): Promise<object> {
  url.path.unshift(Endpoints.api.base)
  const options : AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${client.access_token}`
    },
    url: joinURL(url.path, url.params)
  }
  return performRequest(client, options)
}

export function joinURL (paths: string[], querstrings?: string[]) {
  return join(...paths, qs.stringify(querstrings))
}