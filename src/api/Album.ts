import * as Options from '../Options'
import { performAPIRequest } from '../RequestTasks'
import Client from '../Client'

export function get (client: Client, id: string): Promise<APIResponse<AlbumResponse>> {
  const url = [
    'album',
    id,
  ]
  return performAPIRequest<AlbumResponse>(client, url)
}

export function images (client: Client, id: string): Promise<APIResponse<ImageResponse[]>> {
  const url = [
    'album',
    id,
    'images'
  ]
  return performAPIRequest<ImageResponse[]>(client, url)
}

export function image (client: Client, albumId: string, imageId: string): Promise<APIResponse<ImageResponse[]>> {
  const url = [
    'album',
    albumId,
    'image',
    imageId
  ]
  return performAPIRequest<ImageResponse[]>(client, url)
}

export function create (client: Client, options: Options.CreateAlbumOptions): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album'
  ]
  const requestOptions = {
    method: 'post',
    data: {
      title: options.title,
      description: options.description,
      privacy: options.privacy,
      layout: options.layout,
      cover: options.cover
    } as any
  }
  if (options.deletehashes != null) {
    requestOptions.data.deletehashes = options.deletehashes.join(',')
  }
  if (options.ids != null) {
    requestOptions.data.ids = options.ids.join(',')
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}

export function update (client: Client, id: string, options: Options.CreateAlbumOptions): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album',
    id
  ]
  const requestOptions = {
    method: 'post',
    data: {
      title: options.title,
      description: options.description,
      privacy: options.privacy,
      layout: options.layout,
      cover: options.cover
    } as any
  }
  if (options.deletehashes != null) {
    requestOptions.data.deletehashes = options.deletehashes.join(',')
  }
  if (options.ids != null) {
    requestOptions.data.ids = options.ids.join(',')
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}

export function remove (client: Client, id: string): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album',
    id
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}

export function favorite (client: Client, id: string): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album',
    id,
    'favorite'
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}

export function setImages (client: Client, id: string, imageIds: string[] | null, deleteHashes?: string[]): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album',
    id
  ]
  const requestOptions = {
    method: 'post',
    data: { } as any
  }
  if (deleteHashes != null) {
    requestOptions.data.deletehashes = deleteHashes.join(',')
  }
  if (imageIds != null) {
    requestOptions.data.ids = imageIds.join(',')
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}

export function addImages (client: Client, id: string, imageIds: string[] | null, deleteHashes?: string[]): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album',
    id,
    'add'
  ]
  const requestOptions = {
    method: 'put',
    data: { } as any
  }
  if (deleteHashes != null) {
    requestOptions.data.deletehashes = deleteHashes.join(',')
  }
  if (imageIds != null) {
    requestOptions.data.ids = imageIds.join(',')
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}

export function removeImages (client: Client, id: string, imageIds: string[]): Promise<APIResponse<AlbumCreateResponse>> {
  const url = [
    'album',
    id,
    'remove_images'
  ]
  const requestOptions = {
    method: 'delete',
    data: {
      ids: imageIds.join(',')
    }
  }
  return performAPIRequest<AlbumCreateResponse>(client, url, requestOptions)
}
