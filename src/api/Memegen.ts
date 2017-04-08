import { performAPIRequest } from '../RequestTasks';
import Client from '../Client';

export function defaults (client: Client): Promise<APIResponse<ImageResponse[]>> {
  const url = [
    'memegen',
    'defaults'
  ]
  return performAPIRequest<ImageResponse[]>(client, url)
}