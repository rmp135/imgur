import { ClientInstance } from '_debugger';
import Image from './ResponseModels/Image'
import axios from 'axios'
import * as url from 'url'

interface RequestTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: null,
  account_id: string,
  refresh_token: string
  account_username: string
}

export interface ClientConfig {
  client_id?: string
  client_secret?: string
  access_token?: string
  refresh_token?: string
}

export class RequestError {
  constructor () {

  }
}

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
  
  async authorizeByPIN (applicationState?: string) : Promise<{ url: string, authorize: (pin: string) => Promise<object> } > {
    if (this.client_id === '') {
      console.warn('This client has no client_id.')
    }
    if (this.client_secret === '') {
      console.warn('This client has no client_secret.')
    }
    const PINAuth = async (pin: string) => {
      const options = {
        data: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          grant_type: 'pin',
          pin
        },
        method: 'post',
        url: `https://api.imgur.com/oauth2/token`,
      }
      const res = await this._performRequest(options) as RequestTokenResponse
      this.access_token = res.access_token
      this.refresh_token = res.refresh_token
      return res
    }
    let userURL = `https://api.imgur.com/oauth2/authorize?client_id=${this.client_id}&response_type=pin`
    if (applicationState != null) {
      userURL = userURL + `&state=${applicationState}`
    }
    return { url: userURL, authorize: PINAuth }
  }

  async regenerateFromRefreshToken (refreshToken: string) : Promise<string> {
    const options = {
      data: {
        refresh_token: refreshToken,
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'refresh_token'
      },
      method: 'post',
      url: `https://api.imgur.com/oauth2/token`,
    }
    return this._performRequest(options)
  }

  async getImage (id: string) : Promise<Image> {
    const options = {
      headers: {
        'Authorization': `Client-ID ${this.client_id}`
      },
      method: 'get',
      url: `https://api.imgur.com/3/image/${id}`,
    }
    return this._performRequest(options)
  }
  private async _performRequest (newOptions: object): Promise<any> {
    const options = {
      validateStatus (status) {
        return status == 200
      },
      ...newOptions
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
}