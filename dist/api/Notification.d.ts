import Client from '../Client';
export declare function getAll(client: Client, unreadOnly?: boolean): Promise<APIResponse<NotificationsContainerResponse>>;
export declare function get(client: Client, notificationId: string): Promise<APIResponse<NotificationResponse>>;
export declare function markAsRead(client: Client, notificationId: string | string[]): Promise<APIResponse<boolean>>;
