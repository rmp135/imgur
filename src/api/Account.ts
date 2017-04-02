import * as url from 'url';
import { performAPIRequest } from '../RequestTasks';
import Endpoints from '../Endpoints';
import { AxiosRequestConfig } from 'axios';
import Client from '../Client'

export function get (client: Client, username?: string) {
  const url = {
    path: [
      'account' || 'me',
    ]
  }
  return performAPIRequest(client, url)
}

export function favorites (client: Client, username?: string) {
  const url = {
    path: [
      'account',
      username || 'me',
      'favorites'
    ]
  }
  return performAPIRequest(client, url)
}