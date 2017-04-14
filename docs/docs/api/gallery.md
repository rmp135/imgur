[Imgur Documentation](https://api.imgur.com/endpoints/topic)

## get

Params:

- options?
    - section?: 'hot' or 'top' or 'user'
    - sort?: 'viral' or 'top' or 'time' or 'rising'
    - page?: number
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'
    - showViral?: boolean

```javascript
client.Gallery.get({ section: 'user', sort: 'rising', page: 2 })
```

## memesGallery

Params:

- options?
    - sort?: 'viral' or 'top' or 'time'
    - page?: number
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'

```javascript
client.Gallery.memesGallery({ sort: 'time', page: 2, window: 'all' })
```

## memesImage

Params:

- imageId: string

```javascript
client.Gallery.memesImage('imageId')
```

## subredditGalleries

Params:

- subreddit: string
- options?
    - page?: number
    - sort?: 'time' or 'top'
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'

```javascript
client.Gallery.subredditGalleries({ page: 2, sort: 'time', window: 'day' })
```

## subredditImage

Params:

- subreddit: string
- imageId: string

```javascript
client.Gallery.subredditImage('subredditId', 'imageId')
```

## tag

Params:

- tagName: string
- options?
    - sort?: 'viral' or 'top' or 'time' or 'rising'
    - page?: number
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'

```javascript
client.Gallery.tag('tagName', { sort: 'viral', page: 2, window: 'day' })
```

## tagImage

Params:

- tagName: string
- imageId: string

```javascript
client.Gallery.tagImage('tagName', 'imageId')
```

## itemTags

- itemId: string

```javascript
client.Gallery.itemTags('itemId')
```

## tagVoting

The client must be authorized to vote on a tag.

Params:

- itemId: string
- tagName: string
- vote: 'up' or 'down'

```javascript
client.Gallery.tagVoting('itemId', 'tagName', 'up')
```

## updateTags

The client must be authorized to update the tags on a gallery item.

Params:

- itemId: string
- tags: string[]

```javascript
client.Gallery.updateTags('itemId', ['tag1', 'tag2'])
```

## search

If the first param is given as a string, a simple text search will be performed. Otherwise, the combination of search options will be used.

Params:

- searchOption: string or
    - all?: string[]
    - any?: string[]
    - exactly?: string
    - note?: string[]
    - type?: 'jpg' or 'png' or 'gif' or 'anigif' pr 'album'
    - size?: 'small' or 'med' or 'lrg' or 'huge'
- filterOptions?
    - sort?: 'viral' or 'top' or 'time'
    - window?: 'day' or 'week' or 'month' or 'year' or 'all'
    - page?: number

The following search for 'cats' only.

```javascript
client.Gallery.search('cats')
```

The following will search for 'cats' but not 'dogs' or 'mice' that are of type 'gif'

```javascript
client.Gallery.search({ all: ['cats'], not: ['dogs', 'mice'], type: 'gif' })
```

## random

```javascript
client.Gallery.random()
```

## share

Params:

- itemId: string
- title: string
- options?
    - topic?: string
    - bypassTerms?: boolean
    - mature?: boolean
    - tags?: string[]


```javascript
client.Gallery.share('itemId', { topic: 'some topic', bypassTerms: false, mature: false, tags: ['tag1', 'tag2'] })
```

## remove

The client must be authorized to remove a post from the gallery.

Params:

- itemId:? string

```javascript
client.Gallery.remove('itemId')
```

## album

Params:

-albumId: string

```javascript
client.Gallery.album('albumId')
```

## image

Params:

- imageId: string

```javascript
client.Gallery.image('imageId')
```

## report

Refer to the [Imgur documentation](https://api.imgur.com/endpoints/comment#comment-report) on which numbers refer to which reporting reason.

Params:

- itemId: string
- reason?: number

```javascript
client.Gallery.report({ section: 'user', sort: 'rising', page: 2 })
```

## votes

Params:

- itemId: string

```javascript
client.Gallery.votes('itemId')
```

## comments

Params:

- itemId: string
- sort?: 'best' or 'top' or 'new'

```javascript
client.Gallery.comments('itemId', 'best')
```

## comment

Params:

- commentId: string

```javascript
client.Gallery.commemnt('commentId')
```

## commentCreate

Params:

- itemId: string
- comment: string

```javascript
client.Gallery.commentCreate('itemId', 'this is a comment')
```

## commentReply

Params:

- itemId: string
- commentId: string
- comment: string

```javascript
client.Gallery.commentReply('itemId', 'commentId', 'this is a comment')
```

## commentIds

Params:

- itemId: string

```javascript
client.Gallery.commentIds('itemId')
```

## commentCount

Params:

- itemId: string

```javascript
client.Gallery.commentCount('itemId')
```
