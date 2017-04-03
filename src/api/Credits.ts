import * as url from 'url';
import { APIResponse, performAPIRequest } from '../RequestTasks';
import Client from '../Client'

export default async function (client: Client) {
  const url = {
    path: [
      'credits',
    ]
  }
  const res = await performAPIRequest<CreditsResponse>(client, url)
  client.RateLimits.user_limit = res.data.UserLimit
  client.RateLimits.user_remaining = res.data.UserRemaining
  client.RateLimits.user_reset = new Date(Date.now() + res.data.UserReset)
  client.RateLimits.client_limit = res.data.ClientLimit
  client.RateLimits.client_remaining = res.data.ClientRemaining
  return res
}
