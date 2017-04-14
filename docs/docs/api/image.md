[Imgur Documentation](https://api.imgur.com/endpoints/image)

## get

Params:

- imageId: string

```javascript
client.Image.get('imageId')
```

## upload

Images can be uploaded as a base64 string or a url. To upload as a url, you must pass the relevant `type` in the options.

You do not have to be authorized to upload an image.

Params:

- image: string
- options?
    - title?: string
    - type?: 'base64' or 'url'
    - album?: string
    - description?: string
    - name?: string

```javascript
client.Image.upload('base64 encoded string', { title: 'some title', album: 'albumId' })
```
```javascript
client.Image.upload('http://example.com/image.png', { type: 'url', title: 'some title', album: 'albumId' })
```

## remove

The client must be authorized to remove an image of that user.

Params:

- imageId: string

```javascript
client.Image.remove('imageId')
```

## update

Params:

- imageId: string
- options?
    - title?: string
    - descriptiom?: string

```javascript
client.Image.update('imageId', { title: 'new title' })
```

## favorite

Params:

- imageId: string

```javascript
client.Image.favorite('imageId')
```

