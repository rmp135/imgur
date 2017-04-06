import { performAPIRequest } from "../RequestTasks";
import Client from '../Client'

export type Sort = 'viral' | 'top' | 'time'

export type Window = 'day' | 'week' | 'month' | 'year' | 'all'

export interface PageOption {
  page?: number
}

export interface SortOption {
  sort?: Sort
}

export interface WindowOption {
  window?: Window
}

export function get (client: Client, options?: PageOption & SortOption & WindowOption): Promise<APIResponse<CustomGalleryResponse>> {
  const url: any[] = [
    'custom'
  ]
  if (options != null) {
    url.push(options.sort, options.window, options.page)
  }
  return performAPIRequest<CustomGalleryResponse>(client, url)
}

export function image (client: Client, id: string): Promise<APIResponse<BaseImageResponse>> {
  const url = [
    'custom',
    id
  ]
  return performAPIRequest<BaseImageResponse>(client, url)
}

export function addTags (client: Client, tags: string[]): Promise<APIResponse<boolean>> {
  const url = [
    'custom',
    'add_tags'
  ]
  const requestOptions = {
    method: 'put'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function removeTage (client: Client, tags: string[]): Promise<APIResponse<boolean>> {
  const url = [
    'custom',
    'remove_tags'
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}