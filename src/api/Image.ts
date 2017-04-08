import * as url from 'url';
import { performAPIRequest } from '../RequestTasks';
import { AxiosRequestConfig } from 'axios';
import Client from '../Client'

export interface UploadOptions {
  image: string
  uploadType?: UploadType
  type?: string
  album?: string
  name?: string
  description?: string
}

export type UploadType = 'base64' | 'url'

export interface UpdateOptions {
  id: string,
  title?: string,
  description? : string
}

export function get (client: Client, id: string) : Promise<APIResponse<ImageResponse>> {
  const url = [
    'image',
    id,
  ]
  return performAPIRequest<ImageResponse>(client, url)
}

export function upload (client: Client, options: string | UploadOptions) {
  const url = [
    'image'
  ]
  const config : AxiosRequestConfig = {
    method: 'post'
  }
  if (typeof options === 'string') {
    config.data = {
      image: options,
      type: 'base64'
    }
  } else {
    config.data = options
  }
  return performAPIRequest<ImageResponse>(client, url, config)
}

export function remove (client: Client, id: string) : Promise<APIResponse<boolean>> {
  const url = [
    'image',
    id
  ]
  const requestConfig = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestConfig)
}

export function update (client: Client, options: UpdateOptions) : Promise<APIResponse<boolean>> {
  const url = [
    'image',
    options.id
  ]
  const requestConfig = {
    method: 'post',
    data: {
      title: options.title,
      description: options.description
    }
  }
  return performAPIRequest<boolean>(client, url, requestConfig)
}

export function favorite (client: Client, id: string) : Promise<APIResponse<boolean>> {
  const url = [
    'image',
    id
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}