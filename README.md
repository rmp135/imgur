# @rmp135/imgur

__A Typescript compatible imgur client for node.__

### Getting Started

Install using npm.

```shell
npm install @rmp135/imgur
```

or yarn

```shell
yarn add @rmp135/imgur
```

import the Client from the package.

```javascript
import { Client } from @rmp135/imgur
```

Instantiate the Client with your credentails and call the relevant API endpoint. If you do not have credentials, follow the [authorization](authorization.md) page on how to obtain these.

The documentation in this guide will be written with Typescript / ES7 in mind. The `.then / .catch` callbacks still function as you would expect.

```javascript
let client = new Client('43652b743b5a7a0')

// The client can also be initialised with authorization information.


client = new Client({
  access_token: 'be3fb3e75b229254c8a44e41e376bfc01154ba42',
  client_id: '43652b743b5a7a2',
  client_secret: '2817603add0052fc9920bd3896abdd26992cf422',
  refresh_token: '71f0489801d0d6ae906f51ea20ae562b2ef18d42'
})

const images = await client.Gallery.subRedditGalleries('pics')

console.log(images)
```