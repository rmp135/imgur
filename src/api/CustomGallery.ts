import { performAPIRequest } from "../RequestTasks";
import Client from '../Client'

export function get (client: Client, options?: Options.PageOption & Options.GallerySortOption & Options.WindowOption): Promise<APIResponse<CustomGalleryResponse>> {
  const url: any[] = [
    'custom'
  ]
  if (options != null) {
    url.push(options.sort, options.window, options.page)
  }
  return performAPIRequest<CustomGalleryResponse>(client, url)
}

export function image (client: Client, itemId: string): Promise<APIResponse<BaseImageResponse>> {
  const url = [
    'custom',
    itemId
  ]
  return performAPIRequest<BaseImageResponse>(client, url)
}

export function addTags (client: Client, tags: string[]): Promise<APIResponse<boolean>> {
  const url = [
    'custom',
    'add_tags'
  ]
  const requestOptions = {
    method: 'put',
    data: {
      tags: tags.join(',')
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function removeTage (client: Client, tags: string[]): Promise<APIResponse<boolean>> {
  const url = [
    'custom',
    'remove_tags'
  ]
  const requestOptions = {
    method: 'delete',
    data: {
      tags: tags.join(',')
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}