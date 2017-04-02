import { ClientInstance } from '_debugger';
import * as url from 'url'
import Endpoints from './Endpoints'
import * as AuthorizationTasks from './AuthorizationTasks'

export default class Client {
  client_id: string = ''
  client_secret: string = ''
  access_token: string = ''
  refresh_token: string = ''
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
Refresh Token: ${this.refresh_token}`
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
}