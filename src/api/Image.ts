import * as url from 'url';
import { APIResponse, performAPIRequest } from '../RequestTasks';
import { AxiosRequestConfig } from 'axios';
import Client from '../Client'

export interface UploadConfig {
  image: string
  type?: string
  album?: string
  name?: string
  description?: string
}

export function get (client: Client, id: string) : Promise<APIResponse<ImageResponse>> {
  const url = {
    path: [
      'image',
      id,
    ]
  }
  return performAPIRequest<ImageResponse>(client, url)
}

export function upload (client: Client, image: string | UploadConfig) {
  const url = {
    path: [
      'image'
    ]
  }
  const config : AxiosRequestConfig = {
    method: 'post'
  }
  if (typeof image === 'string') {
    config.data = {
      image,
      type: 'base64'
    }
  } else {
    config.data = image
  }
  return performAPIRequest<ImageResponse>(client, url, config)
}