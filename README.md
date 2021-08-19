# @rmp135/imgur

__A Typescript compatible imgur client for node.__

[![Build Status](https://travis-ci.org/rmp135/imgur.svg?branch=master)](https://travis-ci.org/rmp135/imgur)

### Getting Started

Install using npm.

```shell
npm install @rmp135/imgur
```

Authorization, searching and image uploading are all supported. Refer to the [documentation](https://rmp135.github.io/imgur/) for more information.

```javascript
import { Client } from '@rmp135/imgur'

// The client can be initialised with the client_id.

let client = new Client('43652b743b5a7a0')

// Or with full authorization information.

client = new Client({
  access_token: 'be3fb3e75b229254c8a44e41e376bfc01154ba42',
  client_id: '43652b743b5a7a2',
  client_secret: '2817603add0052fc9920bd3896abdd26992cf422',
  refresh_token: '71f0489801d0d6ae906f51ea20ae562b2ef18d42'
})

const images = await client.Gallery.subRedditGalleries('pics')

console.log(images)
```