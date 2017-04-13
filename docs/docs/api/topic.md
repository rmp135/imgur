[Imgur Documentation](https://api.imgur.com/endpoints/topic)

## defaults

Params:

```javascript
client.Topic.defaults()
```

## galleryTopics

Params:

- topicId: string
- options
    - sort?: 'viral' or 'top' or 'time'
    - page?: number
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'

```javascript
client.Notification.get('topicId', { sort: 'viral', page: 2, window: 'day' })
```

## topicItem

Params:

- topicItem: string
- itemId: string

```javascript
client.Notification.markAsRead('topicItem', 'itemId')
```
