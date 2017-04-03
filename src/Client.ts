import { AxiosRequestConfig } from 'axios';
import { APIResponse, joinURL, performRequest } from './RequestTasks';
import * as AuthorizationTasks from './AuthorizationTasks'
import * as Account from './api/Account'
import * as Image from './api/Image'

export interface ClientConfig {
  client_id?: string
  client_secret?: string
  access_token?: string
  refresh_token?: string
}

export default class {
  client_id: string = ''
  client_secret: string = ''
  access_token: string = ''
  refresh_token: string = ''
  RateLimits: {
    client_limit: number | null
    client_remaining: number | null
    user_limit: number | null
    user_remaining: number | null
    user_reset?: Date | null
    ip_limit: number | null
    ip_remaining: number | null
    ip_reset: Date | null
  } = {
    client_limit: null,
    client_remaining: null,
    user_limit: null,
    user_remaining: null,
    user_reset: null,
    ip_limit: null,
    ip_remaining: null,
    ip_reset: null
  }
  
  constructor (config?: ClientConfig | string) {
    if (typeof config === 'string') {
      this.client_id = config
    }
    else if (config != null) {
      this.client_id = config.client_id == null ? '' : config.client_id
      this.client_secret = config.client_secret == null ? '' : config.client_secret
      this.refresh_token = config.refresh_token == null ? '' : config.refresh_token
      this.access_token = config.access_token == null ? '' : config.access_token
    }    
  }
  
  toString (): string {
    return `Access Token: ${this.access_token}
Client ID: ${this.client_id}
Client Secret: ${this.client_secret}
Refresh Token: ${this.refresh_token}
--- Rate Limits
Client Limit: ${this.RateLimits.client_limit}
Client Remaining: ${this.RateLimits.client_remaining}
User Limit: ${this.RateLimits.user_limit}
User Remaining: ${this.RateLimits.user_remaining}
User Reset: ${this.RateLimits.user_reset}
IP Limit: ${this.RateLimits.ip_limit}
IP Remaining: ${this.RateLimits.ip_remaining}
IP Reset: ${this.RateLimits.ip_reset}
`
  }

  Authorize = {
    regenerateFromRefreshToken: (refreshToken?: string) : Promise<RequestTokenResponse> => {
      return AuthorizationTasks.regenerateFromRefreshToken(this, refreshToken)
    },
    byPIN: (applicationState?: string): { url: string, authorize: (pin: string) => Promise<RequestTokenResponse> } => {
      return AuthorizationTasks.twoStageAuth(this, 'pin', 'pin', applicationState)
    },
    byCode: (applicationState?: string): { url: string, authorize: (pin: string) => Promise<RequestTokenResponse> } => {
      return AuthorizationTasks.twoStageAuth(this, 'authorization_code', 'code', applicationState)
    },
    byToken: (applicationState?: string) : { url: string, parse: (token: string) => RequestTokenResponse } => {
      return {
        url: AuthorizationTasks.authorizeByToken(this, applicationState),
        parse: (url: string) : RequestTokenResponse => {
          const res = AuthorizationTasks.parseTokenURL(url)
          this.access_token = res.access_token
          this.refresh_token = res.refresh_token
          return res
        } 
      }
    }
  }

  Account = {
    get: (username?: string): Promise<APIResponse<AccountResponse>> => Account.get(this, username),
    favorites: (config? : { username?: string, page?: number, sort?: Account.SortOrder }): Promise<APIResponse<BaseGalleryResponse>> => Account.favorites(this, config)
  }

  Image = {
    get: (id: string): Promise<APIResponse<ImageResponse>> => Image.get(this, id)
  }
}