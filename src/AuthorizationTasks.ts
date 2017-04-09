import { AxiosRequestConfig } from 'axios';
import Client from './Client'
import * as RequestTasks from './RequestTasks'
import * as querystring from 'querystring'
import * as URL from 'url'

const OATH_BASE_PATH = 'https://api.imgur.com/oauth2'

export interface TwoStageAuthReturn {
  url: string,
  authorize: (input: string) => Promise<RequestTokenResponse>
}

export function regenerateFromRefreshToken (client: Client, refreshToken?: string) : Promise<RequestTokenResponse> | null {
  const token = refreshToken || client.refresh_token
  if (token == null) {
    console.error('Please provide a refresh token on the client or as an argument.')
    return null
  }
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

export function twoStageAuth (client: Client, grantType: string, responseType: string, applicationState?: string) : TwoStageAuthReturn {
  const authorize = generateAuthRequest(client, grantType, responseType)
  let userURL = RequestTasks.joinURL({ path: [OATH_BASE_PATH, 'authorize'], params: { client_id: client.client_id, response_type: responseType, state: applicationState } })
  return { url: userURL, authorize }
}

export function generateTokenURL (client: Client, applicationState?: string) : string {
  let userURL = RequestTasks.joinURL({ path: [OATH_BASE_PATH, 'authorize'], params: { client_id: client.client_id, response_type: 'token', state: applicationState }})
  return userURL
}

export function parseCodeURL (url: string): string {
  const res = querystring.parse(URL.parse(url).query)
  return res.code
}

export function parseTokenURL (url: string) : RequestTokenResponse {
  const res = querystring.parse(URL.parse(url).hash as string)
  return {
    access_token: res['#access_token'],
    expires_in: Number(res.expires_in),
    token_type: res.token_type,
    account_id: res.account_id,
    refresh_token: res.refresh_token,
    account_username: res.account_username
  }
}