import * as Options from '../Options'
import { performAPIRequest } from '../RequestTasks';
import Client from '../Client'

export function getAll (client: Client): Promise<APIResponse<ConversationResponse[]>> {
  const url = [
    'conversations'
  ]
  return performAPIRequest<ConversationResponse[]>(client, url)
}

export function get (client: Client, conversationId: string, options?: Options.PageOption & Options.OffsetOption): Promise<APIResponse<ConversationResponse>> {
  const url: any[] = [
    'conversation',
    conversationId
  ]
  if (options != null) {
    url.push(options.page, options.offset)
  }
  return performAPIRequest<ConversationResponse>(client, url)
}