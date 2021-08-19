import Client from '../Client';
import * as Account from './Account';
import rewire from 'rewire';

let RewireAccount = rewire('./Account')
const MockAccount: typeof Account & typeof RewireAccount = <any> RewireAccount

describe('Account', () => {
  const client = new Client()
  let mockPerformAPIRequest: Function
  beforeEach(() => {
    RewireAccount = rewire('./Account')
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')    
    MockAccount.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('get', () => {
    it('should get an account by username', () => {
      const res = MockAccount.get(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username'])
      expect(res as any).toBe('mock return')
    })
    it('should get the current user account if no username is specified', () => {
      const res = MockAccount.get(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('galleryFavorites', () => {
    it('should get favorites by username', () => {
      const res = MockAccount.galleryFavorites(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'gallery_favorites', null, null])
      expect(res as any).toBe('mock return')
    })
    it('should get favorites by username and options', () => {
      const res = MockAccount.galleryFavorites(client, 'username', { page: 2, sort: 'newest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'gallery_favorites', 2, 'newest'])
      expect(res as any).toBe('mock return')
    })
    it('should get favorites by current user', () => {
      const res = MockAccount.galleryFavorites(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'gallery_favorites', null, null])
      expect(res as any).toBe('mock return')
    })
    it('should get favorites by username and options', () => {
      const res = MockAccount.galleryFavorites(client, null, { page: 2, sort: 'newest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'gallery_favorites', 2, 'newest'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('accountFavorites', () => {
    it('should get favorites by username', () => {
      const res = MockAccount.favorites(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'favorites', null, null])
      expect(res as any).toBe('mock return')
    })
    it('should get favorites by username and options', () => {
      const res = MockAccount.favorites(client, 'username', { page: 2, sort: 'newest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'favorites', 2, 'newest'])
      expect(res as any).toBe('mock return')
    })
    it('should get favorites by current account', () => {
      const res = MockAccount.favorites(client, null)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'favorites', null, null])
      expect(res as any).toBe('mock return')
    })
    it('should get favorites by current account and options', () => {
      const res = MockAccount.favorites(client, null, { page: 2, sort: 'newest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'favorites', 2, 'newest'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('accountSubmissions', () => {
    it('should get submissions by username', () => {
      const res = MockAccount.submissions(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'submissions', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get submissions by current user', () => {
      const res = MockAccount.submissions(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'submissions', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get submissions by username and options', () => {
      const res = MockAccount.submissions(client, 'username', 2)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'submissions', 2])
      expect(res as any).toBe('mock return')
    })
    it('should get submissions by current user', () => {
      const res = MockAccount.submissions(client, null, 3)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'submissions', 3])
      expect(res as any).toBe('mock return')
    })
  })
  describe('accountSettings', () => {
    it('should get submissions by username', () => {
      const res = MockAccount.settings(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'settings'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('changeAccountSettings', () => {
    it('should get submissions by username', () => {
      const res = MockAccount.changeSettings(client, {
        accepted_gallery_terms: false,
        album_privacy: 'hidden',
        bio: 'bio',
        messaging_enabled: false,
        newsletter_subscribed: true,
        public_images: false,
        show_mature: false,
        username: 'username'
      })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'settings'], {
        method: 'put',
        data: {
          bio: 'bio',
          public_images: false,
          messaging_enabled: false,
          album_privacy: 'hidden',
          accepted_gallery_terms: false,
          username: 'username',
          show_mature: false,
          newsletter_subscribed: true
        }
      })
      expect(res as any).toBe('mock return')
    })
  })
  describe('accountGalleryProfile', () => {
    it('should get account gallery by username', () => {
      const res = MockAccount.galleryProfile(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'gallery_profile']) 
      expect(res as any).toBe('mock return')
    })
    it('should get account gallery by username', () => {
      const res = MockAccount.galleryProfile(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'gallery_profile']) 
      expect(res as any).toBe('mock return')
    })
  })
  describe('verifyEmail', () => {
    it('should get account gallery by username', () => {
      const res = MockAccount.verifyEmail(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'verifyemail']) 
      expect(res as any).toBe('mock return')
    })
    it('should get account gallery by current user', () => {
      const res = MockAccount.verifyEmail(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'verifyemail']) 
      expect(res as any).toBe('mock return')
    })
  })
  describe('sendVerificationEmail', () => {
    it('should send a verification email by current user', () => {
      const res = MockAccount.sendVerificationEmail(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'verifyemail'], { method: 'post' }) 
      expect(res as any).toBe('mock return')
    })
  })
  describe('albums', () => {
    it('should get albums by username', () => {
      const res = MockAccount.albums(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'albums', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get albums by current user', () => {
      const res = MockAccount.albums(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'albums', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get albums by username and page', () => {
      const res = MockAccount.albums(client, 'username', 2)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'albums', 2])
      expect(res as any).toBe('mock return')
    })
    it('should get albums by current user', () => {
      const res = MockAccount.albums(client, null, 3)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'albums', 3])
      expect(res as any).toBe('mock return')
    })
  })
  describe('album', () => {
    it('should get album by username', () => {
      const res = MockAccount.album(client, 'username', 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'album', 'albumId'])
      expect(res as any).toBe('mock return')
    })
    it('should get album by current user', () => {
      const res = MockAccount.album(client, null, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'album', 'albumId'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('albumIds', () => {
    it('should get albumIds by username', () => {
      const res = MockAccount.albumIds(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'albums', 'ids', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get albumIds by username and page', () => {
      const res = MockAccount.albumIds(client, 'username', 23)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'albums', 'ids', 23])
      expect(res as any).toBe('mock return')
    })
    it('should get albumIds by current user', () => {
      const res = MockAccount.albumIds(client, null)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'albums', 'ids', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get albumIds by current user and page', () => {
      const res = MockAccount.albumIds(client, null, 2)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'albums', 'ids', 2])
      expect(res as any).toBe('mock return')
    })
  })
  describe('albumCount', () => {
    it('should get albumCount by username', () => {
      const res = MockAccount.albumCount(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'albums', 'count'])
      expect(res as any).toBe('mock return')
    })
    it('should get albumCount by currrent user', () => {
      const res = MockAccount.albumCount(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'albums', 'count'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('albumRemove', () => {
    it('should remove album by username and id', () => {
      const res = MockAccount.albumRemove(client, 'username', 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'album', 'albumId'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
    it('should remove album by current user and id', () => {
      const res = MockAccount.albumRemove(client, null, 'albumId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'album', 'albumId'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
  })
  describe('comments', () => {
    it('should get comments by username', () => {
      const res = MockAccount.comments(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'comments'])
      expect(res as any).toBe('mock return')
    })
    it('should get comments by current user', () => {
      const res = MockAccount.comments(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comments'])
      expect(res as any).toBe('mock return')
    })
    it('should get comments by username and options', () => {
      const res = MockAccount.comments(client, 'username', { page: 2, sort: 'newest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'comments', 'newest', 2])
      expect(res as any).toBe('mock return')
    })
    it('should get comments by current user and options', () => {
      const res = MockAccount.comments(client, null, { page: 3, sort: 'oldest'})
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comments', 'oldest', 3])
      expect(res as any).toBe('mock return')
    })
  })
  describe('comment', () => {
    it('should get comment by username and comment id', () => {
      const res = MockAccount.comment(client, 'username', 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'comment', 'commentId'])
      expect(res as any).toBe('mock return')
    })
    it('should get comment by current user and comment id', () => {
      const res = MockAccount.comment(client, null, 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comment', 'commentId'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('commentIds', () => {
    it('should get commentIds by username', () => {
      const res = MockAccount.commentIds(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'comments', 'ids'])
      expect(res as any).toBe('mock return')
    })
    it('should get commentIds by username and options', () => {
      const res = MockAccount.commentIds(client, 'username', { page: 2, sort: 'oldest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'comments', 'ids', 'oldest', 2])
      expect(res as any).toBe('mock return')
    })
    it('should get commentIds by current user', () => {
      const res = MockAccount.commentIds(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comments', 'ids'])
      expect(res as any).toBe('mock return')
    })
    it('should get commentIds by current user and options', () => {
      const res = MockAccount.commentIds(client, null, { page: 2, sort: 'oldest' })
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comments', 'ids', 'oldest', 2])
      expect(res as any).toBe('mock return')
    })
  })
  describe('commentCount', () => {
    it('should get comment count by username', () => {
      const res = MockAccount.commentCount(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'comments', 'count'])
      expect(res as any).toBe('mock return')
    })
    it('should get comment count by current user', () => {
      const res = MockAccount.commentCount(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comments', 'count'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('commentRemove', () => {
    it('should remove a comment by comment id', () => {
      const res = MockAccount.commentRemove(client, 'commentId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'comment', 'commentId'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
  })
  describe('images', () => {
    it('should get all images by username', () => {
      const res = MockAccount.images(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'images', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get all images by username and page', () => {
      const res = MockAccount.images(client, 'username', 2)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'images', 2])
      expect(res as any).toBe('mock return')
    })
    it('should get all images by current user', () => {
      const res = MockAccount.images(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'images', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get all images by current user and page', () => {
      const res = MockAccount.images(client, null, 2)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'images', 2])
      expect(res as any).toBe('mock return')
    })
  })
  describe('image', () => {
    it('should get and image by username and image id', () => {
      const res = MockAccount.image(client, 'username', 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'image', 'imageId'])
      expect(res as any).toBe('mock return')
    })
    it('should get all images by current user and image id', () => {
      const res = MockAccount.image(client, null, 'imageId')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'image', 'imageId'])
      expect(res as any).toBe('mock return')
    })
  })
  describe('imageIds', () => {
    it('should get imageIds by username', () => {
      const res = MockAccount.imageIds(client, 'username')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'images', 'ids', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get imageIds by username and page', () => {
      const res = MockAccount.imageIds(client, 'username', 2)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'images', 'ids', 2])
      expect(res as any).toBe('mock return')
    })
    it('should get imageIds by current user', () => {
      const res = MockAccount.imageIds(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'images', 'ids', undefined])
      expect(res as any).toBe('mock return')
    })
    it('should get imageIds by current user and page', () => {
      const res = MockAccount.imageIds(client, null, 3)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'images', 'ids', 3])
      expect(res as any).toBe('mock return')
    })
  })
  describe('imageRemove', () => {
    it('should remove an image by username and delete hash', () => {
      const res = MockAccount.imageRemove(client, 'username', 'deleteHash')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'username', 'image', 'deleteHash'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
    it('should remove an image by current user and delete hash', () => {
      const res = MockAccount.imageRemove(client, null, 'deleteHash')
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'image', 'deleteHash'], { method: 'delete' })
      expect(res as any).toBe('mock return')
    })
  })
  describe('replies', () => {
    it('should get replies for the current user', () => {
      const res = MockAccount.replies(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['account', 'me', 'notifications', 'replies'])
      expect(res as any).toBe('mock return')
    })
  })
})
