import { AxiosRequestConfig } from 'axios';
import Endpoints from './Endpoints'
import Client from './Client'
import * as RequestTasks from './RequestTasks'
import * as querystring from 'querystring'

export async function regenerateFromRefreshToken (client: Client, refreshToken?: string) : Promise<RequestTokenResponse> {
  const token = refreshToken || client.refresh_token
  if (client.client_id === '') {
    console.warn('This client has no client_id.')
  }
  if (client.client_secret === '') {
    console.warn('This client has no client_secret.')
  }
  if (token == null) {
    console.warn('No refresh token specified.')
  }
  const requestConfig : AxiosRequestConfig = {
    data: {
      refresh_token: token,
      client_id: client.client_id,
      client_secret: client.client_secret,
      grant_type: 'refresh_token'
    },
    method: 'post',
    url: Endpoints.authorization.base + Endpoints.authorization.token,
  }
  const res = await RequestTasks.performRequest(client, requestConfig) as RequestTokenResponse
  client.access_token = res.access_token;
  client.refresh_token = res.refresh_token
  return res
}

export function twoStageAuth (client: Client, grantType: string, responseType: string, applicationState?: string) {
  if (client.client_id === '') {
    console.warn('This client has no client_id.')
  }
  if (client.client_secret === '') {
    console.warn('This client has no client_secret.')
  }
  const authorize = async (responseValue: string) => {
    const requestConfig: AxiosRequestConfig = {
      data: {
        client_id: client.client_id,
        client_secret: client.client_secret,
        grant_type: grantType,
        [responseType]: responseValue
      },
      method: 'post',
      url: Endpoints.authorization.base + Endpoints.authorization.token
    }
    const res = await RequestTasks.performRequest(client, requestConfig) as RequestTokenResponse
    this.access_token = res.access_token
    this.refresh_token = res.refresh_token
    return res
  }
  let userURL = `https://api.imgur.com/oauth2/authorize?client_id=${client.client_id}&response_type=${responseType}`
  if (applicationState != null) {
    userURL = userURL + `&state=${applicationState}`
  }
  return { url: userURL, authorize }
}

export function authorizeByToken (client: Client, applicationState?: string) {
  let userURL = `https://api.imgur.com/oauth2/authorize?client_id=${client.client_id}&response_type=token`
  if (applicationState != null) {
    userURL = userURL + `&state=${applicationState}`
  }
  return userURL
}

export function parseTokenURL (url: string) : RequestTokenResponse {
  const res = querystring.parse(url)
  return {
    access_token: res['https://imgur.com/#access_token'], // the query string doesn't parse this correctly
    expires_in: Number(res.expires_in),
    token_type: res.token_type,
    account_id: res.account_id,
    refresh_token: res.refresh_token,
    account_username: res.account_id
  }
}