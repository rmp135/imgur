[Imgur Documentation](https://api.imgur.com/endpoints/notification)

The client must be authorized to retrieve notifications of a user.

## getAll

Params:

- unreadOnly?: boolean

```javascript
client.Notification.getAll(false)
```

## get

Params:

- notificationId: string

```javascript
client.Notification.get('notificationId')
```

## markAsRead

Params:

- notificationId: string

```javascript
client.Notification.markAsRead('notificationId')
```
