The responses from the API will match those given in the [Imgur documentation](https://api.imgur.com/models).

```javascript
await res = client.Gallery.album('USxzb')
console.log(res)
```
Response:
```json
  "data": {
    "id": "USxzb",
    "title": "The definition of \"nailing it\"",
    "description": null,
    "datetime": 1492125017,
    "cover": "fGDtDVT",
    "cover_width": 398,
    "cover_height": 480,
    "account_url": "ICanGetYouAToeBy3oClock",
    "account_id": 37452752,
    "privacy": "hidden",
    "layout": "blog",
    "views": 0,
    "link": "http://imgur.com/a/USxzb",
    "ups": 8438,
    "downs": 88,
    "points": 8350,
    "score": 8350,
    "is_album": true,
    "vote": null,
    "favorite": false,
    "nsfw": false,
    "section": "gifsthatkeepongiving",
    "comment_count": 375,
    "topic": "No Topic",
    "topic_id": 29,
    "images_count": 1,
    "in_gallery": true,
    "is_ad": false,
    "tags": [],
    "in_most_viral": true,
    "images": [{
      "id": "fGDtDVT",
      "title": null,
      "description": "Source: https://m.youtube.com/watch?v=Ft99FKKsqqE&ytbChannel=SwingNellia",
      "datetime": 1492124964,
      "type": "image/gif",
      "animated": true,
      "width": 398,
      "height": 480,
      "size": 58245249,
      "views": 926608,
      "bandwidth": 53970513685392,
      "vote": null,
      "favorite": false,
      "nsfw": null,
      "section": null,
      "account_url": null,
      "account_id": null,
      "is_ad": false,
      "tags": [],
      "in_most_viral": false,
      "in_gallery": false,
      "mp4": "http://i.imgur.com/fGDtDVT.mp4",
      "gifv": "http://i.imgur.com/fGDtDVT.gifv",
      "mp4_size": 27041738,
      "link": "http://i.imgur.com/fGDtDVTh.gif",
      "looping": true,
      "comment_count": null,
      "ups": null,
      "downs": null,
      "points": null,
      "score": null
    }]
  },
  "success": true,
  "status": 200
}
```