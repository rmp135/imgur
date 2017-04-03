import { AxiosRequestConfig } from 'axios';
import Client from './Client'
import * as RequestTasks from './RequestTasks'
import * as querystring from 'querystring'

const OATH_BASE_PATH = 'https://api.imgur.com/oauth2'

export function regenerateFromRefreshToken (client: Client, refreshToken?: string) : Promise<RequestTokenResponse> {
  const token = refreshToken || client.refresh_token
  return generateAuthRequest(client, 'refresh_token', 'refresh_token')(token)
}

export function generateAuthRequest (client: Client, grantType: string, responseType: string) : (responseValue: string) => Promise<RequestTokenResponse> {
  return async (responseValue: string) : Promise<RequestTokenResponse> => {
    const requestConfig: AxiosRequestConfig = {
      data: {
        client_id: client.client_id,
        client_secret: client.client_secret,
        grant_type: grantType,
        [responseType]: responseValue
      },
      method: 'post',
      url: RequestTasks.joinURL([OATH_BASE_PATH, 'token' ])
    }
    const res = await RequestTasks.performRequest<RequestTokenResponse>(client, requestConfig)
    client.access_token = res.access_token
    client.refresh_token = res.refresh_token
    return res
  }
}

export function twoStageAuth (client: Client, grantType: string, responseType: string, applicationState?: string) : { url: string, authorize: (input: string) => Promise<RequestTokenResponse> } {
  const authorize = generateAuthRequest(client, grantType, responseType)
  let userURL = RequestTasks.joinURL({ path: [OATH_BASE_PATH, 'authorize'], params: { client_id: client.client_id, response_type: responseType, state: applicationState } })
  return { url: userURL, authorize }
}

export function authorizeByToken (client: Client, applicationState?: string) : string {
  let userURL = RequestTasks.joinURL({ path: [OATH_BASE_PATH, 'authorizeByToken'], params: { client_id: client.client_id, repsonse_type: 'token', state: applicationState }})
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