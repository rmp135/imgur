
Imgur documentation: [https://api.imgur.com/oauth2]()

imgur uses oath2 for authorization. A number of ways exist to retrieve the access token and refresh token from the user. All of which are supported by this client.

The following tokens are available on the client.

- client_id
- client_secret
- client_token
- refresh_token

All authorization call (except regenerating from a refresh token) return a url for the user to log in and an `authorize` function to authorize that the information supplied by the user is correct.

The application state argument can be ommitted in all cases.

## byCode


This returns the authorization code as a url parameter that must be exchanged for the access code.

```javascript

client = new Client('43652b743b5a7a0')

const auth = client.Authorize.byCode('application state') 

console.log(auth.url)

// The user navigates to the url, enters their credentials and a url with a `code` url parameter is returned. Put this code into the `authorize` function.

const tokens = await auth.authorize('d2a73efa3c92ba24a1285eddeb3c06b7abcf44b2')

// If successful, the authorization tokens will be returned and populated on the client.

```

## byToken

This returns the code as a url that can be parsed to extract the access code and refresh token.

```javascript

client = new Client('43652b743b5a7a0')

const auth = client.Authorize.byToken('application state') 

console.log(auth.url)

// The user navigates to the url and enters their credentials. A url with the access credentials are then returned. Put this url into the 'authorize' function.

const tokens = auth.authorize('https://imgur.com/#access_token=c6f67dc9be42c74cfb052a640d51b056d9a06c42&expires_in=2419200&token_type=bearer&refresh_token=94294ec17cf55ac9650f0e040649d8985cf624d4&account_username=rmp135&account_id=4118974')

// If successful, the authorization tokens will be returned and populated on the client.

```

## byPIN

This returns a url that, when the user logs in, is displayed with a PIN code. Enter this PIN code into the authorize function.

```javascript

client = new Client('43652b743b5a7a0')

const auth = client.Authorize.byPIN('application state') 

console.log(auth.url)

// The user navigates to the url and enters their credentials. A page with a PIN code will be displayed. Pass this into the authorize function.

const tokens = auth.authorize('4118974')

// If successful, the authorization tokens will be returned and populated on the client.

```

## regenerateFromRefreshToken

This will regenerate the access token from a refresh token.

```javascript

client = new Client('43652b743b5a7a0')

// If the refresh token is not supplied, it will be taken from the client. If neither are supplied, a warning is shown and null is returned.

const auth = await client.Authorize.regenerateFromRefreshToken('94294ec17cf55ac9650f0e040649d8985cf624d4') 

console.log(auth)

// If successful, the authorization tokens will be returned and populated on the client.

```
