import Client from '../Client';
import * as Conversation from './Conversation';
import rewire from 'rewire';

let RewireConversation = rewire('./Conversation')
const MockConversation: typeof Conversation & typeof RewireConversation = <any> RewireConversation

describe('Conversation', () => {
  const client = new Client()
  let mockPerformAPIRequest: Function
  beforeEach(() => {
    RewireConversation = rewire('./Conversation')
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')    
    MockConversation.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('getAll', () => {
    it('should get all converstaions', () => {
      const res = MockConversation.getAll(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['conversations'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('get', () => {
    it('should get a converstaions by id', () => {
      const res = MockConversation.get(client, 'conversationId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['conversation', 'conversationId'])
      expect(res).toBe('mock return' as any)
    })
    it('should get a converstaions by id with page and offset', () => {
      const res = MockConversation.get(client, 'conversationId', { offset: 3, page: 2})
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['conversation', 'conversationId', 2, 3])
      expect(res).toBe('mock return' as any)
    })
  })
})
