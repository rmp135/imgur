import * as url from 'url';
import { URLConfig, APIResponse, performAPIRequest } from '../RequestTasks';
import { AxiosRequestConfig } from 'axios';
import Client from '../Client'

export function get (client: Client, username?: string) : Promise<APIResponse<AccountResponse>> {
  const url = {
    path: [
      'account',
      username || 'me',
    ]
  }
  return performAPIRequest<AccountResponse>(client, url)
}

export type SortOrder = "oldest" | "newest"

export interface AccountFavoritesOptions {
  username?: string
  page?: number
  sort?: SortOrder
}

export function favorites (client: Client, config?: string | AccountFavoritesOptions ) : Promise<APIResponse<BaseGalleryResponse>> {
  let options = {
    username: 'me',
    page: null,
    sort: null
  }
  if (config != null) {
    if (typeof config === 'string') {
      options.username = config
    } else {
      options = Object.assign(options, config)
    }
  }
  const url : URLConfig = {
    path: [
      'account',
      options.username || 'me',
      'favorites',
      options.page,
      options.sort
    ]
  }
  return performAPIRequest<BaseGalleryResponse>(client, url)
}