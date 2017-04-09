import Client from '../Client'
import * as Gallery from './Gallery'
import * as rewire from 'rewire'
import { ReportReasonEnum } from '../ReportReasonEnum'

let RewireGallery = rewire('./Gallery')
const MockGallery: typeof Gallery & typeof RewireGallery = <any> RewireGallery

describe('Gallery', () => {
  const client = new Client()
  let mockPerformAPIRequest: Function
  beforeEach(() => {
    RewireGallery = rewire('./Gallery')
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')    
    MockGallery.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('get', () => {
    it('should get the gallery without options', () => {
      const res = MockGallery.get(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['gallery'], params: { }})
      expect(res).toBe('mock return' as any)
    })
    it('should get the gallery with options', () => {
      const res = MockGallery.get(client, { page: 2, section: 'hot', showViral: false, window: 'all', sort: 'time' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['gallery', 'hot', 'time', 'all', 2], params: { showViral: false }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('memesGallery', () => {
    it('should get the memes gallery without options', () => {
      const res = MockGallery.memesGallery(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['g', 'memes'])
      expect(res).toBe('mock return' as any)
    })
    it('should get the memes gallery with options', () => {
      const res = MockGallery.memesGallery(client, { page: 3, sort: 'time', window: 'day' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['g', 'memes', 'time', 'day', 3])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('memesImage', () => {
    it('should get the memes image by id', () => {
      const res = MockGallery.memesImage(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['g', 'memes', 'imageId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('subredditGalleries', () => {
    it('should get subreddit galleries by subreddit', () => {
      const res = MockGallery.subredditGalleries(client, 'subreddit')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'r', 'subreddit'])
      expect(res).toBe('mock return' as any)
    })
    it('should get subreddit galleries by subreddit and options', () => {
      const res = MockGallery.subredditGalleries(client, 'subreddit', { page: 3, sort: 'time', window: 'day' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'r', 'subreddit', 'time', 'day', 3])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('subredditImage', () => {
    it('should get subreddit image by subreddit and image', () => {
      const res = MockGallery.subredditImage(client, 'subreddit', 'image')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'r', 'subreddit', 'image'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('tag', () => {
    it('should get a tag without options', () => {
      const res = MockGallery.tag(client, 'tagName')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 't', 'tagName'])
      expect(res).toBe('mock return' as any)
    })
    it('should get a tag with options', () => {
      const res = MockGallery.tag(client, 'tagName', { page: 3, sort: 'time', window: 'all'})
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 't', 'tagName', 'time', 'all', 3])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('tagImage', () => {
    it('should get a tag image by id', () => {
      const res = MockGallery.tagImage(client, 'tagName', 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 't', 'tagName', 'imageId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('itemTags', () => {
    it('should get item tags by item id', () => {
      const res = MockGallery.itemTags(client, 'itemId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId', 'tags'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('tagVoting', () => {
    it('should voteby item tame and tag name', () => {
      const res = MockGallery.tagVoting(client, 'itemId', 'tagName', 'down')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId', 'vote', 'tag', 'tagName', 'down'], { method: 'post' })
      expect(res).toBe('mock return' as any)
    })
  })
  describe('updateTags', () => {
    it('should voteby item tame and tag name', () => {
      const res = MockGallery.updateTags(client, 'itemId', ['tag1', 'tag2'])
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'tags', 'itemId'], { method: 'post', data: { tags: 'tag1,tag2' }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('search', () => {
    it('should search by simple term and no options', () => {
      const res = MockGallery.search(client, 'searchTerm')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['gallery', 'search'], params: { q: 'searchTerm' }})
      expect(res).toBe('mock return' as any)
    })
    it('should search by simple term and options', () => {
      const res = MockGallery.search(client, 'searchTerm', { page: 3, sort: 'time', window: 'all' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['gallery', 'search', 'time', 'all', 3], params: { q: 'searchTerm' }})
      expect(res).toBe('mock return' as any)
    })
    it('should search by advanced terms and no options', () => {
      const res = MockGallery.search(client, {
        all: ['all1', 'all2'],
        any: ['any1', 'any2'],
        exactly: 'exactly',
        not: ['not1', 'not2'],
        type: 'gif',
        size: 'small'
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['gallery', 'search'], params: {
        q_all: 'all1,all2',
        q_any: 'any1,any2',
        q_exactly: 'exactly',
        q_not: 'not1,not2',
        q_type: 'gif',
        q_size_px: 'small'
      }})
      expect(res).toBe('mock return' as any)
    })
    it('should search by advanced terms and options', () => {
      const res = MockGallery.search(client, {
        all: ['all1', 'all2'],
        any: ['any1', 'any2'],
        exactly: 'exactly',
        not: ['not1', 'not2'],
        type: 'gif',
        size: 'small'
      }, { 
        page: 3,
        sort: 'time',
        window: 'month'
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, { path: ['gallery', 'search', 'time', 'month', 3], params: {
        q_all: 'all1,all2',
        q_any: 'any1,any2',
        q_exactly: 'exactly',
        q_not: 'not1,not2',
        q_type: 'gif',
        q_size_px: 'small'
      }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('random', () => {
    it('should get random images without options', () => {
      const res = MockGallery.random(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'random', 'random', undefined])
      expect(res).toBe('mock return' as any)
    })
    it('should get random images without options', () => {
      const res = MockGallery.random(client, 3)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'random', 'random', 3])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('share', () => {
    it('should share an image without options', () => {
      const res = MockGallery.share(client, 'itemId', 'title')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId'], { method: 'post', data: { title: 'title' }})
      expect(res).toBe('mock return' as any)
    })
    it('should share an image with options', () => {
      const res = MockGallery.share(client, 'itemId', 'title', { topic: 'topic', bypassTerms: true, mature: true, tags: ['tag1', 'tag2']})
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId'], { method: 'post', data: {
        title: 'title',
        topic: 'topic',
        terms: '1',
        mature: '1',
        tags: 'tag1,tag2'
      }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('remove', () => {
    it('should remove an image by id', () => {
      const res = MockGallery.remove(client, 'itemId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId'], { method: 'delete' })
      expect(res).toBe('mock return' as any)
    })
  })
  describe('album', () => {
    it('should return an album by id', () => {
      const res = MockGallery.album(client, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'album', 'albumId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('image', () => {
    it('should return an image by id', () => {
      const res = MockGallery.image(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'image', 'imageId'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('report', () => {
    it('should report without reason', () => {
      const res = MockGallery.report(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'imageId', 'report'], { method: 'post', data: { reason: undefined }})
      expect(res).toBe('mock return' as any)
    })
    it('should report with a reason', () => {
      const res = MockGallery.report(client, 'imageId', ReportReasonEnum.SPAM)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'imageId', 'report'], { method: 'post', data: { reason: 2 }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('votes', () => {
    it('should show votes for an item', () => {
      const res = MockGallery.votes(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'imageId', 'votes'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('comments', () => {
    it('should show comments for an item without sort', () => {
      const res = MockGallery.comments(client, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'imageId', 'comments', undefined])
      expect(res).toBe('mock return' as any)
    })
    it('should show comments for an item with sort', () => {
      const res = MockGallery.comments(client, 'imageId', 'best')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'imageId', 'comments', 'best'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('commentCreate', () => {
    it('should create a comment', () => {
      const res = MockGallery.commentCreate(client, 'imageId', 'comment')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'imageId', 'comment'], { method: 'post', data: { comment: 'comment' }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('commentReply', () => {
    it('should create a reply to a comment', () => {
      const res = MockGallery.commentReply(client, 'itemId', 'commentId', 'comment')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId', 'comment', 'commentId'], { method: 'post', data: { comment: 'comment' }})
      expect(res).toBe('mock return' as any)
    })
  })
  describe('commentIds', () => {
    it('should get comment ids', () => {
      const res = MockGallery.commentIds(client, 'itemId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId', 'comments', 'ids'])
      expect(res).toBe('mock return' as any)
    })
  })
  describe('commentCount', () => {
    it('should get the comment count', () => {
      const res = MockGallery.commentCount(client, 'itemId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['gallery', 'itemId', 'comments', 'count'])
      expect(res).toBe('mock return' as any)
    })
  })
})
