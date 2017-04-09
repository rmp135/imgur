Images can be uploaded using either a base64 encoded string or web url. Other methods of uploading are currently being developed.

```javascript
const imageAsBase64 = fs.readFileSync('./someimage.png', 'base64')

await client.Image.upload(imageAsBase64)
```

If a web url is being uploaded, it must be specified in the `type` option. Other options can be specified here including title and description. See the [imgur docs](https://api.imgur.com/endpoints/image#image-upload) for more.

```javascript
await client.Image.upload('https://example.com/image.png', { type: 'url' })
```
