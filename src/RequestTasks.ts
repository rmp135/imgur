import * as url from 'url'
import axios, { AxiosRequestConfig } from 'axios'
import Client from './Client'

const API_BASE_PATH = 'https://api.imgur.com/3'
const MASHAPE_BASE_PATH = 'https://imgur-apiv3.p.mashape.com/3'

export interface URLConfig {
  path: any[],
  params?: {
    [key: string]: any
  }
}

export async function performRequest<T> (client: Client, config: AxiosRequestConfig): Promise<T> {
  const options: AxiosRequestConfig = {
    validateStatus (status) {
      return status === 200
    },
    ...config
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(options)
  }
  try {
    const res = await axios(options)
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

export function performAPIRequest<T> (client: Client, url: URLConfig | any[], axiosConfig?: AxiosRequestConfig): Promise<APIResponse<T>> {
  const apiBase = client.mashape_key != null ? MASHAPE_BASE_PATH : API_BASE_PATH
  if (Array.isArray(url)) {
    url.unshift(apiBase)
  } else {
    url.path.unshift(apiBase)
  }
  const options: AxiosRequestConfig = {
    url: joinURL(url),
    headers: { },
    ...axiosConfig
  }
  if (client.access_token != null) {
    options.headers.Authorization = `Bearer ${client.access_token}`
  } else if (client.client_id != null) {
    options.headers.Authorization = `Client-ID ${client.client_id}`
  }
  if (client.mashape_key != null) {
    options.headers['X-Mashape-Key'] = client.mashape_key
  }
  return performRequest(client, options)
}

export function joinURL (urlToJoin: URLConfig | string[]): string {
  if (Array.isArray(urlToJoin)) {
    return urlToJoin.join('/')
  }
  const query = new url.URLSearchParams(urlToJoin.params).toString()
  return url.format({ pathname: urlToJoin.path.join('/'), search: query })
}