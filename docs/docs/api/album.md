[Imgur Documentation](https://api.imgur.com/endpoints/album)

If the username is ommitted or set as null, the currently authorized user will be used.

## get

Returns the images and album info from an album.

Params:

- id: string

```javascript
client.Album.get('23ffdW')
```

## images

Returns only the images from an album.

Params:

- id: string

```javascript
client.Album.images('23ff6W')
```

## image

Params:

- albumId: string
- imageId: string

```javascript
client.Album.image('2f33F', '9dWf23')
```

## create

Creates an album under the currently authenticated user, or an album not assigned to a user.

Use either `ids` for an array of image ids that should be added to the album, or `deletehashes` for the delete hashes (for public images) that should be applied to the album.

Params:

- options
    - title?: string
    - description?: boolean
    - privacy?: string
    - layout?: string
    - cover?: string
    - ids?: string[]
    - deletehashes?: string[]

```javascript
client.Album.create({ ids: ['g2dWWf'], title: 'album title' })
```

## update

Params:

- options
    - title?: string
    - description?: boolean
    - privacy?: string
    - layout?: string
    - cover?: string
    - ids?: string[]
    - deletehashes?: string[]

```javascript
client.Album.create({ ids: ['g2dWWf'], title: 'album title' })
```

## remove

Params:

- id: string

```javascript
client.Album.remove('g2g22K')
```

## favorite

Params:

- id: string

```javascript
client.Album.remove('g2g22K')
```

## setImages

Replaces all images in an album with images specified by id or delete hash.

To specify only delete hashes, set `imageIds` to `null`.

Params:

- imageIds: string[] | null
- deleteHashes?: string[]

```javascript
client.Album.setImages(['g2g22K'])
```

## addImages

Adds images to an album with images specified by id or delete hash.

To specify only delete hashes, set `imageIds` to `null`.

Params:

- imageIds: string[] | null
- deleteHashes?: string[]

```javascript
client.Album.addImages(['g2g22K'])
```

## removeImages

Params:

- imageIds: string[]

```javascript
client.Album.removeImages(['g2g22K'])
```
