[Imgur Documentation](https://api.imgur.com/endpoints/account)

If the username is ommitted or set as null, the currently authorized user will be used.

## get

Params:

- username?: string

```javascript
client.Account.get('username')
```

## galleryFavorites

Params:

- username?: string

```javascript
client.Account.galleryFavorites('username')
```

## submissions

Params:

- username?: string

```javascript
client.Account.submissions('username')
```

## settings

Only the currently authorized user can have their account settings retrieved.

```javascript
client.Account.settings('username')
```

## changeSettings

Only the currently authorized user can have their account settings changed.

Params:

- options
    - bio?: string
    - public_images?: boolean
    - messaging_enabled?: boolean
    - album_privacy?: boolean
    - accepted_gallery_terms?: boolean
    - username?: string
    - show_mature?: boolean
    - newsletter_subscribed?: boolean

```javascript
client.Account.get({ bio: 'bio', messaging_enabled: false })
```

## galleryProfile

Params:

- username?: string

```javascript
client.Account.galleryProfile('username')
```

## verifyEmail

Params:

- username?: string


```javascript
client.Account.verifyEmail('username')
```

Returns:

- Either `true` or `false` whether their email has been verified.

## sendVerificationEmail

Only the current authorized user can have their verification email sent.

```javascript
client.Account.sendVerificationEmail()
```

## albums

Params:

- username?: string
- page?: number

```javascript
client.Account.albums(null, 2)
```

## album

Params:

- username?: string
- albumId: string

```javascript
client.Account.albums('username', 'albumId')
```

## albumsIds

Params:

- username?: string
- page?: number

```javascript
client.Account.albumIds('username', 2)
```

## albumCount

Params:

- username?: string

```javascript
client.Account.albumCount('username')
```

## albumRemove

Params:

- username?: string
- albumId: string

```javascript
client.Account.albums('username', 'albumId')
```

## comments

Params:

- username?: string
- options?:
    - page?: number
    - sort?: 'best' or 'top' or 'new'

```javascript
client.Account.comments('username', { page: 2, sort: 'best' })
```

## comment

Params:

- username?: string
- commentId: number

```javascript
client.Account.albums('username', 'commentId')
```

## commentIds

Params:

- username?: string
- options?:
    - page?: number
    - sort?: 'best' or 'top' or 'new'

```javascript
client.Account.commentIds('username', { page: 2, sort: 'best' })
```

## commentCount

Params:

- username?: string

```javascript
client.Account.commentCount('username')
```

## commentRemove

Params:

- username?: string
- commentId: string

```javascript
client.Account.commentRemove('username', 'commentId')
```

## images

Params:

- username?: string
- page?: number

```javascript
client.Account.images('username', 2)
```

## image

Params:

- username?: string
- imageId: string

```javascript
client.Account.image('username', 'imageId')
```

## imageIds

Params:

- username?: string
- page?: number

```javascript
client.Account.imageIds('username', 2)
```

## imageCount

Params:

- username?: string

```javascript
client.Account.imageCount('username')
```

## imageRemove

Only images of the currently authorized user can be removed. If an image was uploaded as an anonymous user, it can be deleted with the delete hash.

Params:

- username?: string
- deleteHash: string

```javascript
client.Account.imageRemove('username', 'imageId')
```

## replies

Replies can only be retrieved for the currently authorized user.

```javascript
client.Account.replies()
```