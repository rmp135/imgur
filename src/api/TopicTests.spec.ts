import Client from '../Client';
import * as Topic from './Topic';
import * as rewire from 'rewire';

let RewireTopic = rewire('./Topic')
const MockTopic: typeof Topic & typeof RewireTopic = <any> RewireTopic

describe('Topic', () => {
  let mockPerformAPIRequest: Function
  const client = new Client()
  beforeEach(() => {
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')
    RewireTopic = rewire('./Topic')
    MockTopic.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('defaults', () => {
    it('should return the defaults', () => {
      const res = MockTopic.defaults(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['topics', 'defaults'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('galleryTopics', () => {
    it('should call the api without any filter options', () => {
      const res = MockTopic.galleryTopics(client, 'topicId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['topics', 'topicId'])
      expect(res).toBe('mock return' as any)
    })
    it('should call the  api with filter options', () => {
      const res = MockTopic.galleryTopics(client, 'topicId', { page: 1, sort: 'top', window: 'day' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['topics', 'topicId', 'top', 'day', 1])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('topicItem', () => {
    it('should call the api with the topic and item id', () => {
      const res = MockTopic.topicItem(client, 'topicId', 'itemId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['topics', 'topicId', 'itemId'])
      expect(res).toBe('mock return' as any)
    })
  })
})
