import { Options } from '../'
import Client from '../Client'
import * as Comment from './Comment'
import rewire from 'rewire'

let RewireComment = rewire('./Comment')
const MockComment: typeof Comment & typeof RewireComment = <any> RewireComment

describe('Comment', () => {
  let mockPerformAPIRequest: Function
  const client = new Client()
  beforeEach(() => {
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')
    RewireComment = rewire('./Comment')
    MockComment.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('get', () => {
    it('should get the comment by comment id', () => {
      const res = MockComment.get(client, 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('create', () => {
    it('should create a comment with message and image id', () => {
      const res = MockComment.create(client, 'imageId', 'comment')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment'], { method: 'post', data: { comment: 'comment', image_id: 'imageId', parent_id: undefined }})
      expect(res as any).toBe('mock return')
    })
    it('should create a comment with message, image id and parent comment', () => {
      const res = MockComment.create(client, 'imageId', 'comment', 'parentCommentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment'], { method: 'post', data: { comment: 'comment', image_id: 'imageId', parent_id: 'parentCommentId' }})
      expect(res as any).toBe('mock return')
    })
  })
  describe('remove', () => {
    it('should remove a comment by commment id', () => {
      const res = MockComment.remove(client, 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
  })
  describe('replies', () => {
    it('should show replies to a comment by commment id', () => {
      const res = MockComment.replies(client, 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId', 'replies'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('replyCreate', () => {
    it('should create a comment reply by comment id and image id', () => {
      const res = MockComment.replyCreate(client, 'commentId', 'imageId', 'comment')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId'], { method: 'post', data: { image_id: 'imageId', comment: 'comment' }})
      expect(res as any).toBe('mock return')
    })
  })
  describe('vote', () => {
    it('should vote on a comment', () => {
      const res = MockComment.vote(client, 'commentId', 'down')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId', 'vote', 'down'], { method: 'post', })
      expect(res as any).toBe('mock return')
    })
  })
  describe('report', () => {
    it('should report a comment with reason', () => {
      const res = MockComment.report(client, 'commentId', Options.ReportReasonEnum.SPAM)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId', 'report'], { method: 'post', data: { reason: 2 }})
      expect(res as any).toBe('mock return')
    })
    it('should report a comment without reason', () => {
      const res = MockComment.report(client, 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['comment', 'commentId', 'report'], { method: 'post', data: { reason: undefined }})
      expect(res as any).toBe('mock return')
    })
  })
})
