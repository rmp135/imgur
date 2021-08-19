import Client from '../Client';
import * as CustomGallery from './CustomGallery';
import rewire from 'rewire';

let RewireCustomGallery = rewire('./CustomGallery')
const MockCustomGallery: typeof CustomGallery & typeof RewireCustomGallery = <any> RewireCustomGallery

describe('CustomGallery', () => {
  const client = new Client()
  let mockPerformAPIRequest: Function
  beforeEach(() => {
    RewireCustomGallery = rewire('./CustomGallery')
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')    
    MockCustomGallery.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('get', () => {
    it('should get custom gallery without options', () => {
      const res = MockCustomGallery.get(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['custom'])
      expect(res).toBe('mock return' as any)
    })
    it('should get custom gallery with options', () => {
      const res = MockCustomGallery.get(client, { page: 3, sort: 'time', window: 'all'})
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['custom', 'time', 'all', 3])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('image', () => {
    it('should get custom gallery image', () => {
      const res = MockCustomGallery.image(client, 'itemId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['custom', 'itemId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('addTags', () => {
    it('should add tags to the user gallery', () => {
      const res = MockCustomGallery.addTags(client, ['tag1', 'tag2'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['custom', 'add_tags'], { method: 'put', data: { tags: 'tag1,tag2' }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('removeTags', () => {
    it('should remove tags from the user gallery', () => {
      const res = MockCustomGallery.removeTage(client, ['tag1', 'tag2'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['custom', 'remove_tags'], { method: 'delete', data: { tags: 'tag1,tag2' }})
      expect(res).toBe('mock return' as any)
    })
  })
})
