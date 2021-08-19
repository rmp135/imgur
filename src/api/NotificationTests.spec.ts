import Client from '../Client';
import * as Notification from './Notification';
import rewire from 'rewire';

let RewireNotification = rewire('./Notification')
const MockNotification: typeof Notification & typeof RewireNotification = <any> RewireNotification

describe('Notification', () => {
  let mockPerformAPIRequest: Function
  const client = new Client()
  beforeEach(() => {
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')
    RewireNotification = rewire('./Notification')
    MockNotification.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('getAll', () => {
    it('should call the api with the readonly flag', () => {
      const res = MockNotification.getAll(client, false)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['notification'], params: { new: false }})
      expect(res).toBe('mock return' as any)
    })
    it('should call the api without the readonly flag', () => {
      const res = MockNotification.getAll(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['notification'], params: { new: undefined }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('get', () => {
    it('should call the api with the notificationId', () => {
      const res = MockNotification.get(client, 'notificationId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['notification', 'notificationId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('markAsRead', () => {
    it('should call the api with the notificationId as a string', () => {
      const res = MockNotification.markAsRead(client, 'notificationId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['notification'], { method: 'post', data: { ids: 'notificationId' }})
      expect(res).toBe('mock return' as any)
    })
    it('should call the api with the notificationId as an array', () => {
      const res = MockNotification.markAsRead(client, ['id1', 'id2', 'id3'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['notification'], { method: 'post', data: { ids: 'id1,id2,id3' }})
      expect(res).toBe('mock return' as any)
    })
  })
})
