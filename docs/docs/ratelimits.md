The imgur API is rate limited (see [https://api.imgur.com/#limits]()).

The rate limits can be found under the Client.RateLimits object. 

You can fetch the most recent rate limit by calling `Client.Credits.get()`.

```javascript
const client = new Client('43652b743b5a7a0')
const limits = await client.Credits.get()

console.log(limits)
```
```json
{
  "data": {
    "UserLimit": 2000,
    "UserRemaining": 2000,
    "UserReset": 1491753805,
    "ClientReset": 12500,
    "ClientRemaining": 12408
  },
  "success": true,
  "status": 200
}
```
The Client.RateLimits object will be updated to reflect these new values.

Hint: `client.toString()` will print all the relevant information.
```text
Access Token: 92ff46119ace5e5728ac580a0ed3ee02a011ed82
Client ID: 43652b743b5a7a3
Client Secret: 2817603add0052fc9920bd3896abdd26992cf424
Refresh Token: 4235a53f31464ed1c9e7099e414af25cb9c7ef32
--- Rate Limits
Client Limit: 12500
Client Remaining: 12408
User Limit: 2000
User Remaining: 2000
User Reset: Wed Apr 26 2017 22:25:58 GMT+0100 (BST)
IP Limit: 1250
IP Remaining: 1249
IP Reset: Sun Apr 09 2017 17:02:00 GMT+0100 (BST)
```

These are also updated when a request is made. However, not all rates are returned with all calls so this is more of a guide than a hard number.