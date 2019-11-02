import 'jasmine'
import { Options } from '../'
import Client from '../Client'
import * as Album from './Album'
import * as rewire from 'rewire'

let RewireAlbum = rewire('./Album')
const MockAlbum: typeof Album & typeof RewireAlbum = <any> RewireAlbum

describe('Album', () => {
  let mockPerformAPIRequest: Function
  const client = new Client()
  beforeEach(() => {
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')
    RewireAlbum = rewire('./Album')
    MockAlbum.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('get', () => {
    it('should get the album by album id', () => {
      const res = MockAlbum.get(client, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('images', () => {
    it('should get images in album by album id', () => {
      const res = MockAlbum.images(client, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId', 'images'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('image', () => {
    it('should get image by image id in an album by album id', () => {
      const res = MockAlbum.image(client, 'albumId', 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId', 'image', 'imageId'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('create', () => {
    it('should create an album with ids', () => {
      const res = MockAlbum.create(client, {
        title: 'title',
        description: 'description',
        privacy: 'hidden',
        layout: 'grid',
        cover: 'coverid',
        ids: ['12','33','55']
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album'], {
        method: 'post',
        data: {
          title: 'title',
          description: 'description',
          privacy: 'hidden',
          layout: 'grid',
          cover: 'coverid',
          ids: '12,33,55'
        }
      })
      expect(res as any).toBe('mock return')
    })
    it('should create an album with deletehashes', () => {
      const res = MockAlbum.create(client, {
        title: 'title',
        description: 'description',
        privacy: 'hidden',
        layout: 'grid',
        cover: 'coverid',
        deletehashes: ['12','33','55']
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album'], {
        method: 'post',
        data: {
          title: 'title',
          description: 'description',
          privacy: 'hidden',
          layout: 'grid',
          cover: 'coverid',
          deletehashes: '12,33,55'
        }
      })
      expect(res as any).toBe('mock return')
    })
  })
  describe('update', () => {
    it('should update an album with ids', () => {
      const res = MockAlbum.update(client, 'albumId', {
        title: 'title',
        description: 'description',
        privacy: 'hidden',
        layout: 'grid',
        cover: 'coverid',
        ids: ['12','33','55']
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId'], {
        method: 'post',
        data: {
          title: 'title',
          description: 'description',
          privacy: 'hidden',
          layout: 'grid',
          cover: 'coverid',
          ids: '12,33,55'
        }
      })
      expect(res as any).toBe('mock return')
    })
    it('should update an album with deletehashes', () => {
      const res = MockAlbum.update(client, 'albumId', {
        title: 'title',
        description: 'description',
        privacy: 'hidden',
        layout: 'grid',
        cover: 'coverid',
        deletehashes: ['12','33','55']
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId'], {
        method: 'post',
        data: {
          title: 'title',
          description: 'description',
          privacy: 'hidden',
          layout: 'grid',
          cover: 'coverid',
          deletehashes: '12,33,55'
        }
      })
      expect(res as any).toBe('mock return')
    })
  })
  describe('remove', () => {
    it('should remove an album by id', () => {
      const res = MockAlbum.remove(client, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
  })
  describe('favorite', () => {
    it('should favorite an album by id', () => {
      const res = MockAlbum.favorite(client, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId', 'favorite'], { method: 'post' })
      expect(res as any).toBe('mock return')
    })
  })
  describe('setImages', () => {
    it('should set images using ids', () => {
      const res = MockAlbum.setImages(client, 'albumId', ['123','33','6'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId'], {
        method: 'post',
        data: {
          ids: '123,33,6'
        }
      })
      expect(res as any).toBe('mock return')
    })
    it('should set images using deletehashes', () => {
      const res = MockAlbum.setImages(client, 'albumId', null, ['123','33','6'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId'], {
        method: 'post',
        data: {
          deletehashes: '123,33,6'
        }
      })
      expect(res as any).toBe('mock return')
    })
  })
  describe('addImages', () => {
    it('should set images using ids', () => {
      const res = MockAlbum.addImages(client, 'albumId', ['123','33','6'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId', 'add'], {
        method: 'put',
        data: {
          ids: '123,33,6'
        }
      })
      expect(res as any).toBe('mock return')
    })
    it('should set images using deletehashes', () => {
      const res = MockAlbum.addImages(client, 'albumId', null, ['123','33','6'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId', 'add'], {
        method: 'put',
        data: {
          deletehashes: '123,33,6'
        }
      })
      expect(res as any).toBe('mock return')
    })
  })
  describe('addImages', () => {
    it('should remove images using ids', () => {
      const res = MockAlbum.removeImages(client, 'albumId', ['123','33','6'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['album', 'albumId', 'remove_images'], {
        method: 'delete',
        data: {
          ids: '123,33,6'
        }
      })
      expect(res as any).toBe('mock return')
    })
  })
})
