import * as url from 'url';
import { performAPIRequest } from '../RequestTasks';
import { AxiosRequestConfig } from 'axios';
import Client from '../Client'

export interface UploadOptions {
  title?: string
  type?: UploadType
  album?: string
  name?: string
  description?: string
}

export type UploadType = 'base64' | 'url'

export interface UpdateOptions {
  title?: string,
  description? : string
}

export function get (client: Client, imageId: string) : Promise<APIResponse<ImageResponse>> {
  const url = [
    'image',
    imageId,
  ]
  return performAPIRequest<ImageResponse>(client, url)
}

export function upload (client: Client, image: string, options?: UploadOptions) {
  const url = [
    'image'
  ]
  const config: AxiosRequestConfig = {
    method: 'post'
  }
  config.data = {
    image,
    type: 'base64'
  }
  if (options != null) {
    config.data = {
      ...config.data,
      ...options
    }
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

export function update (client: Client, imageId: string, options: UpdateOptions) : Promise<APIResponse<boolean>> {
  const url = [
    'image',
    imageId
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

export function favorite (client: Client, imageId: string) : Promise<APIResponse<boolean>> {
  const url = [
    'image',
    imageId,
    'favorite'
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}