The API function names attempt to follow the naming conventions from [https://api.imgur.com/endpoints]()

All calls are returned as a response wrapped in a Promise.

```javascript
const client = new Client('43652b743b5a7a0')

let images = await client.Gallery.album('9WaZy')
```
```json
{
  "data":{
    "id":"9WaZy",
    "title":"Disco",
    "description":null,
    "datetime":1491732441,
    "cover":"cuNH0dL",
    "cover_width":2160,
    "cover_height":2160,
    "account_url":"JoMostert",
    "account_id":40476684,
    "privacy":"public",
    "layout":"blog",
    "views":35,
    "link":"http://imgur.com/a/9WaZy",
    "ups":0,
    "downs":1,
    "points":-1,
    "score":-1,
    "is_album":true,
    "vote":null,
    "favorite":false,
    "nsfw":false,
    "section":"",
    "comment_count":0,
    "topic":"No Topic",
    "topic_id":29,
    "images_count":1,
    "in_gallery":true,
    "is_ad":false,
    "tags":[

    ],
    "in_most_viral":false,
    "images":[
      {
        "id":"cuNH0dL",
        "title":null,
        "description":null,
        "datetime":1491732411,
        "type":"image/jpeg",
        "animated":false,
        "width":2160,
        "height":2160,
        "size":1910015,
        "views":114,
        "bandwidth":217741710,
        "vote":null,
        "favorite":false,
        "nsfw":null,
        "section":null,
        "account_url":null,
        "account_id":null,
        "is_ad":false,
        "tags":[

        ],
        "in_most_viral":false,
        "in_gallery":false,
        "link":"http://i.imgur.com/cuNH0dL.jpg",
        "comment_count":null,
        "ups":null,
        "downs":null,
        "points":null,
        "score":null
      }
    ]
  },
  "success":true,
  "status":200
}
```

Some API calls require authentication before calling. Refer to the [authorization](authorization.md) documentation.

Calls that have required fields will be required as inline parameters, any optional parameters may be specified as an object.

```javascript
const client = new Client('43652b743b5a7a0')

let images = await client.Gallery.tag('tag name')

images = await client.Gallery.tag('tag name', { page: 2, sort: 'top', window: 'all' })

console.log(images)
```

Some calls specify a username. This can either be ommitted or passed as `null` to use the currently authorized user.

```javascript
const client = new Client('43652b743b5a7a0')

let images = await client.Account.favorites()

images = await client.Account.favorites(null, { page: 2, sort: 'best' })

console.log(images)
```

Due to `delete` being a keyword, this has been renamed to `remove` instead. e.g. `Client.Image.remove(23)` to delete an image.

