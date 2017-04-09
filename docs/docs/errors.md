Handled errors will be thrown with the response status and the data (if any) returned from imgur.

```javascript
const client = new Client()

client.Account.sendVerificationEmail() // Required authentication.
```
```json
{
  "status": 403,
  "body": {
    "error": "Malformed auth header.",
    "method": "POST"
  },
  "success": false,
  "status": 403
}
```