[Imgur Documentation](https://api.imgur.com/endpoints/comment)

## get

Params:

- commentId: string

```javascript
client.Comment.get('commentId')
```

## create

User must be authorized to create comments.

Params:

- imageId: string
- comment: string
- parentId?: string

```javascript
client.Comment.create('imageId', 'this is the comment', 'parentCommentId')
```

## remove

User must be authorized as the user that created the comment to delete it.

Params:

- commentId: string

```javascript
client.Comment.remove('commentId')
```

## replies

Params:

- commentId: string

```javascript
client.Comment.replies('commentId')
```

## replyCreate

Similar to [create](#create). Likewise, the client must be authorized to reply to a comment.

Params:

- commentId: string
- imageId: string
- comment: string

```javascript
client.Comment.replyCreate('commentId', 'imageId', 'this is the comment')
```

## vote

The client must be authorized to vote on a comment.

Params:

- commentId: string
- vote: 'up' or 'down'

```javascript
client.Comment.vote('commentId', 'up')
```

## report

Params:

- commentId: string
- reason?: number

Refer to the [Imgur documentation](https://api.imgur.com/endpoints/comment#comment-report) on which numbers refer to which reporting reason.

Note: For TypeScript users, the `ReportReasonEnum` can be used instead of the raw numbers.


```javascript
client.Comment.report('commentId', 2)
```