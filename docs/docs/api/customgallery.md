[Imgur Documentation](https://api.imgur.com/endpoints/custom_gallery)

The client must be authorized to retrieve the custom gallery a user.

## get

Params:

- options?
    - page?: number
    - sort?: 'viral' or 'top' or 'time'
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'

```javascript
client.CustomGallery.get({ page: 2, sort: 'top', window: 'week' })
```

## image

Params:

imageId: string

```javascript
client.CustomGallery.image('imageId')
```

## addTags

Params:

- tags string[]

```javascript
client.CustomGallery.addTags(['tag1', 'tag2', 'tag3'])
```

## removeTags

Params:

- tags string[]

```javascript
client.CustomGallery.removeTags(['tag1', 'tag2', 'tag3'])
```
