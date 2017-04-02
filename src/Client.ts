import { AxiosRequestConfig } from 'axios';
import { performRequest, joinURL } from './RequestTasks';
import { ClientInstance } from '_debugger';
import * as ImgurAccount from './api/Account'
import * as url from 'url'
import  Endpoints from './Endpoints'
import * as AuthorizationTasks from './AuthorizationTasks'

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

  async authorizeByPIN (applicationState?: string): Promise<{ url: string, authorize: (pin: string) => Promise<RequestTokenResponse> } > {
    return AuthorizationTasks.twoStageAuth(this, 'pin', 'pin', applicationState)
  }

  async regenerateFromRefreshToken (refreshToken?: string) : Promise<RequestTokenResponse> {
    return AuthorizationTasks.regenerateFromRefreshToken(this, refreshToken)
  }

  async authorizeByCode (applicationState?: string): Promise<{ url: string, authorize: (pin: string) => Promise<RequestTokenResponse> } > {
    return AuthorizationTasks.twoStageAuth(this, 'authorization_code', 'code', applicationState)
  }

  authorizeByToken (applicationState?: string) : { url: string, parse:(string) => RequestTokenResponse } {
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

  Account = {
    get: (username?: string): Promise<object> => ImgurAccount.get(this, username)
  } 
}