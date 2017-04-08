import { performAPIRequest } from '../RequestTasks';
import Client from '../Client';

export function getAll (client: Client, unreadOnly?: boolean): Promise<APIResponse<NotificationsContainerResponse>> {
  const path = [
    'notification'
  ]
  const params = {
    new: unreadOnly
  }
  return performAPIRequest<NotificationsContainerResponse>(client, { path, params })
}

export function get (client: Client, notificationId: string): Promise<APIResponse<NotificationResponse>> {
  const url = [
    'notification',
    notificationId
  ]
  return performAPIRequest<NotificationResponse>(client, url)
}

export function markAsRead (client: Client, notificationId: string | string[]): Promise<APIResponse<boolean>> {
  const url = [
    'notification'
  ]
  const requestOptions = {
    method: 'post',
    data: {
      ids: typeof notificationId == 'string' ? notificationId : notificationId.join(',')
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}