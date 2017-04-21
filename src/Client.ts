import * as Options from './Options'
import * as AuthorizationTasks from './AuthorizationTasks'
import * as Account from './api/Account';
import * as Comment from './api/Comment'
import * as Conversation from './api/Conversation'
import * as Credits from './api/Credits'
import * as CustomGallery from './api/CustomGallery'
import * as Gallery from './api/Gallery'
import * as Image from './api/Image'
import * as Memegen from './api/Memegen'
import * as Notification from './api/Notification'
import * as Topic from './api/Topic'

export interface ClientConfig {
  client_id?: string
  client_secret?: string
  access_token?: string
  refresh_token?: string
  mashape_key?: string
}

export default class {
  client_id: string | null = null
  client_secret: string | null = null
  access_token: string | null = null
  refresh_token: string | null = null
  mashape_key: string | null = null
  RateLimits: {
    client_limit: number | null
    client_remaining: number | null
    user_limit: number | null
    user_remaining: number | null
    user_reset?: Date | null
    ip_limit: number | null
    ip_remaining: number | null
    ip_reset: Date | null
  } = {
    client_limit: null,
    client_remaining: null,
    user_limit: null,
    user_remaining: null,
    user_reset: null,
    ip_limit: null,
    ip_remaining: null,
    ip_reset: null
  }
  
  constructor (config?: ClientConfig | string) {
    if (typeof config === 'string') {
      this.client_id = config
    }
    else if (config != null) {
      this.client_id = config.client_id || null
      this.client_secret = config.client_secret || null
      this.refresh_token = config.refresh_token || null
      this.access_token = config.access_token || null
      this.mashape_key = config.mashape_key || null
    }    
  }
  
  toString (): string {
    return `Access Token: ${this.access_token}
Client ID: ${this.client_id}
Client Secret: ${this.client_secret}
Refresh Token: ${this.refresh_token}
Mashape Key: ${this.mashape_key}
--- Rate Limits
Client Limit: ${this.RateLimits.client_limit}
Client Remaining: ${this.RateLimits.client_remaining}
User Limit: ${this.RateLimits.user_limit}
User Remaining: ${this.RateLimits.user_remaining}
User Reset: ${this.RateLimits.user_reset}
IP Limit: ${this.RateLimits.ip_limit}
IP Remaining: ${this.RateLimits.ip_remaining}
IP Reset: ${this.RateLimits.ip_reset}
`
  }

  Authorize = {
    regenerateFromRefreshToken: (refreshToken?: string) => {
      return AuthorizationTasks.regenerateFromRefreshToken(this, refreshToken)
    },
    byPIN: (applicationState?: string) => {
      return AuthorizationTasks.twoStageAuth(this, 'pin', 'pin', applicationState)
    },
    byCode: (applicationState?: string): AuthorizationTasks.TwoStageAuthReturn =>  {
      const auth = AuthorizationTasks.twoStageAuth(this, 'authorization_code', 'code', applicationState)
      return {
        url: auth.url,
        authorize: (url: string) => auth.authorize(AuthorizationTasks.parseCodeURL(url))
      }
    },
    byToken: (applicationState?: string) => {
      return {
        url: AuthorizationTasks.generateTokenURL(this, applicationState),
        authorize: (url: string) => {
          const res = AuthorizationTasks.parseTokenURL(url)
          this.access_token = res.access_token
          this.refresh_token = res.refresh_token
          return res
        } 
      }
    }
  }

  Account = {
    get: (username?: string) => Account.get(this, username),
    galleryFavorites: (username?: string | null, config?: Options.PageOption & Options.AccountCommentSortOption) => Account.galleryFavorites(this, username, config),
    favorites: (username?: string | null, options?: Options.PageOption & Options.AccountCommentSortOption) => Account.favorites(this, username, options),
    submissions: (username?: string | null, page?: number) => Account.submissions(this, username, page),
    settings: () => Account.settings(this),
    changeSettings: (options: Options.ChangeAccountSettingsOptions) => Account.changeSettings(this, options),
    galleryProfile: (username?: string) => Account.galleryProfile(this, username),
    verifyEmail: (username?: string) => Account.verifyEmail(this, username),
    sendVerificationEmail: () => Account.sendVerificationEmail(this),
    albums: (username?: string | null, page?: number) => Account.albums(this, username, page),
    album: (username: string | null, albumId: string) => Account.album(this, username, albumId),
    albumIds: (username: string | null, page: number) => Account.albumIds(this, username, page),
    albumCount: (username?: string) => Account.albumCount(this, username),
    albumRemove: (username: string | null, albumId: string) => Account.albumRemove(this, username, albumId),
    comments: (username: string | null, options?: Options.AccountCommentSortOption & Options.PageOption) => Account.comments(this, username, options),
    comment: (username: string | null, commentId: string) => Account.comment(this, username, commentId),
    commentIds: (username: string | null, options?: Options.AccountCommentSortOption & Options.PageOption) => Account.commentIds(this, username, options),
    commentCount: (username?: string) => Account.commentCount(this, username),
    commentRemove: (commentId: string) => Account.commentRemove(this, commentId),
    images: (username?: string | null, page?: number) => Account.images(this, username, page),
    image: (username: string | null, imageId: string) => Account.image(this, username, imageId),
    imageIds: (username?: string | null, page?: number) => Account.imageIds(this, username, page),
    imageCount: (username?: string) => Account.imageCount(this, username),
    imageRemove: (username: string | null, deleteHash: string) => Account.imageRemove(this, username, deleteHash),
    replies: () => Account.replies(this)
  }

  Comment = {
    get: (commentId: string) => Comment.get(this, commentId),
    create: (imageId: string, comment: string, parentId?: string) => Comment.create(this, imageId, comment, parentId),
    remove: (commentId: string) => Comment.remove(this, commentId),
    replies: (commentId: string) => Comment.replies(this, commentId),
    replyCreate: (commentId: string, imageId: string, comment: string) => Comment.replyCreate(this, commentId, imageId, comment),
    vote: (commentId: string, vote: 'up' | 'down') => Comment.vote(this, commentId, vote),
    report: (commentId: string, reason?: Options.ReportReasonEnum) => Comment.report(this, commentId)
  }

  Conversation = {
    getAll: () => Conversation.getAll(this),
    get: (conversationId: string, options?: Options.PageOption & Options.OffsetOption) => Conversation.get(this, conversationId, options)
  }

  Credits = {
    get: () => Credits.get(this)
  }

  CustomGallery = {
    get: (options?: Options.PageOption & Options.GallerySortOption & Options.WindowOption) => CustomGallery.get(this, options),
    image: (itemId: string) => CustomGallery.image(this, itemId),
    addTags: (tags: string[]) => CustomGallery.addTags(this, tags),
    removeTags: (tags: string[]) => CustomGallery.removeTage(this, tags)
  }

  Gallery = {
    get: (options?: Options.GalleryGetOptions) => Gallery.get(this, options),
    memesGallery: (options?: Options.GallerySortOption & Options.PageOption & Options.WindowOption) => Gallery.memesGallery(this, options),
    memesImage: (imageId: string) => Gallery.memesImage(this, imageId),
    subredditGalleries: (subreddit: string, options?: Options.SubredditGalleryOptions) => Gallery.subredditGalleries(this, subreddit, options),
    subredditImage: (subreddit: string, imageId: string) => Gallery.subredditImage(this, subreddit, imageId),
    tag: (tagName: string, options?: Options.PageOption & Options.GallerySortOption & Options.WindowOption) => Gallery.tag(this, tagName, options),
    tagImage: (tagName: string, imageId: string) => Gallery.tagImage(this, tagName, imageId),
    itemTags: (itemId: string) => Gallery.itemTags(this, itemId),
    tagVoting: (itemId: string, tagName: string, vote: 'up' | 'down') => Gallery.tagVoting(this, itemId, tagName, vote),
    updateTags: (itemId: string, tags: string[]) => Gallery.updateTags(this, itemId, tags),
    search: (searchOptions: string | Gallery.GallerySearchOptions, filterOptions: Options.GallerySortOption & Options.WindowOption & Options.PageOption) => Gallery.search(this, searchOptions, filterOptions),
    random: () => Gallery.random(this),
    share: (itemId: string, title: string, options?: Gallery.ShareOptions) => Gallery.share(this, itemId, title, options),
    remove: (itemId: string) => Gallery.remove(this, itemId),
    album: (albumId: string) => Gallery.album(this, albumId),
    image: (imageId: string) => Gallery.image(this, imageId),
    report: (itemId: string, reason?: Options.ReportReasonEnum) => Gallery.report(this, itemId, reason),
    votes: (itemId: string) => Gallery.votes(this, itemId),
    comments: (itemId: string, sort?: Options.GalleryCommentSort) => Gallery.comments(this, itemId, sort),
    comment: (itemId: string, commentId: string) => Gallery.comment(this, itemId, commentId),
    commentCreate: (itemId: string, comment: string) => Gallery.commentCreate(this, itemId, comment),
    commentReply: (itemId: string, commentId: string, comment: string) => Gallery.commentReply(this, commentId, itemId, comment),
    commentIds: (itemId: string) => Gallery.commentIds(this, itemId),
    commentCount: (itemId: string) => Gallery.commentCount(this, itemId)
  }

  Image = {
    get: (imageId: string) => Image.get(this, imageId),
    upload: (image: string | Buffer, options?: Image.UploadOptions) => Image.upload(this, image, options),
    remove: (imageId: string) => Image.remove(this, imageId),
    update: (imageId: string, options: Image.UpdateOptions) => Image.update(this, imageId, options),
    favorite: (imageId: string) => Image.favorite(this, imageId)
  }

  Memegen = {
    defaults: () => Memegen.defaults(this)
  }

  Notification = {
    getAll: (unreadOnly?: boolean) => Notification.getAll(this, unreadOnly),
    get: (notificationId: string) => Notification.get(this, notificationId),
    markAsRead: (notificationId: string) => Notification.markAsRead(this, notificationId)
  }

  Topic = {
    defaults: () => Topic.defaults(this),
    galleryTopics: (topicId: string, options?: Options.GallerySortOption & Options.PageOption & Options.WindowOption) => Topic.galleryTopics(this, topicId, options),
    topicItem: (topicId: string, itemId: string) => Topic.topicItem(this, topicId, itemId)
  }
}
