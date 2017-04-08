import { performAPIRequest } from '../RequestTasks';
import Client from '../Client'
import './Options'

export function getAll (client: Client): Promise<APIResponse<ConversationResponse[]>> {
  console.warn('This endpoint does not appear to function correctly.')
  const url = [
    'conversations'
  ]
  return performAPIRequest<ConversationResponse[]>(client, url)
}

export function get (client: Client, id: string, options?: Options.PageOption & Options.OffsetOption): Promise<APIResponse<ConversationResponse>> {
  const url: any[] = [
    'conversation',
    id
  ]
  if (options != null) {
    url.push(options.page, options.offset)
  }
  return performAPIRequest<ConversationResponse>(client, url)
}