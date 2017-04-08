import Client from '../Client';
import * as Image from './Image';
import * as rewire from 'rewire';

let RewireImage = rewire('./Image')
const MockImage: typeof Image & typeof RewireImage = <any> RewireImage

describe('Image', () => {
  const client = new Client()
  let mockPerformAPIRequest: Function
  beforeEach(() => {
    RewireImage = rewire('./Image')
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')    
    MockImage.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('get', () => {
    it('should call the api with the image id', () => {
      const res = MockImage.get(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['image', 'imageId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('upload', () => {
    it('should call the api with the image only', () => {
      const res = MockImage.upload(client, 'image')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['image'], { method: 'post', data: { image: 'image', type: 'base64' }})
      expect(res).toBe('mock return' as any)
    })
    it('should call the api with the image and options', () => {
      const res = MockImage.upload(client, 'image', { album: 'album', description: 'description', name: 'name', title: 'title', type: 'url' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['image'], { method: 'post', data: { image: 'image', type: 'url', title: 'title', description: 'description', name: 'name', album: 'album' }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('remove', () => {
    it('should call the api with the image only', () => {
      const res = MockImage.remove(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['image', 'imageId'], { method: 'delete' })
      expect(res).toBe('mock return' as any)
    })
  })
  describe('update', () => {
    it('should call the api with the imageId and update information', () => {
      const res = MockImage.update(client, 'imageId', { title: 'title', description: 'description'})
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['image', 'imageId'], { method: 'post', data: { title: 'title', description: 'description' } })
      expect(res).toBe('mock return' as any)
    })
  })
  describe('favorite', () => {
    it('should call the api with the imageId', () => {
      const res = MockImage.favorite(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['image', 'imageId', 'favorite'], { method: 'post' })
      expect(res).toBe('mock return' as any)
    })
  })
})
