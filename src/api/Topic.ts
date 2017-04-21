import * as Options from '../Options'
import { performAPIRequest } from '../RequestTasks';
import Client from '../Client';

export function defaults (client: Client): Promise<APIResponse<TopicResponse[]>> {
  const url = [
    'topics',
    'defaults'
  ]
  return performAPIRequest<TopicResponse[]>(client, url)
}

export function galleryTopics (client: Client, topicId: string, options?: Options.GallerySortOption & Options.PageOption & Options.WindowOption): Promise<APIResponse<BaseGalleryResponse[]>> {
  const url: any[] = [
    'topics',
    topicId
  ]
  if (options != null) {
    url.push(options.sort, options.window, options.page)
  }
  return performAPIRequest<BaseGalleryResponse[]>(client, url)
}

export function topicItem (client: Client, topicId: string, itemId: string): Promise<APIResponse<BaseGalleryResponse>> {
  const url = [
    'topics',
    topicId,
    itemId
  ]
  return performAPIRequest<BaseGalleryResponse>(client, url)
}