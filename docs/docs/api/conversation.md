[Imgur Documentation](https://api.imgur.com/endpoints/conversation)

The client must be authorized to retrieve the conversations of a user.

## getAll

```javascript
client.Conversation.getAll()
```

## get

Params:

- conversationid: string
- options?
    - page?: number
    - offset?: number

```javascript
client.Conversation.get('conversationId', { page: 2, offset: 3 })
```