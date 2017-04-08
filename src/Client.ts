import {
  ChangeAccountSettingsOptions,
  IdOption,
  PageOption,
  SortOption,
  UsernameOption
} from './api/Account';
import { AxiosRequestConfig } from 'axios';
import { joinURL, performRequest } from './RequestTasks';
import * as AuthorizationTasks from './AuthorizationTasks';
import * as Account from './api/Account';
import * as Image from './api/Image';
import * as Comment from './api/Comment'
import { ReportReasonEnum } from "./api/ReportReasonEnum";

export interface ClientConfig {
  client_id?: string
  client_secret?: string
  access_token?: string
  refresh_token?: string
}

export default class {
  client_id: string | null = null
  client_secret: string | null = null
  access_token: string | null = null
  refresh_token: string | null = null
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
      this.client_id = config.client_id == null ? '' : config.client_id
      this.client_secret = config.client_secret == null ? '' : config.client_secret
      this.refresh_token = config.refresh_token == null ? '' : config.refresh_token
      this.access_token = config.access_token == null ? '' : config.access_token
    }    
  }
  
  toString (): string {
    return `Access Token: ${this.access_token}
Client ID: ${this.client_id}
Client Secret: ${this.client_secret}
Refresh Token: ${this.refresh_token}
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
    byCode: (applicationState?: string) => {
      return AuthorizationTasks.twoStageAuth(this, 'authorization_code', 'code', applicationState)
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
    galleryFavorites: (username?: string | null, config?: PageOption & SortOption) => Account.galleryFavorites(this, username, config),
    favorites: (username?: string | null, options?: PageOption & SortOption) => Account.favorites(this, username, options),
    accountSubmissions: (username?: string | null, page?: number) => Account.submissions(this, username, page),
    accountSettings: () => Account.settings(this),
    changeAccountSettings: (options: ChangeAccountSettingsOptions) => Account.changeSettings(this, options),
    accountGalleryProfile: (username?: string) => Account.galleryProfile(this, username),
    verifyEmail: (username?: string) => Account.verifyEmail(this, username),
    sendVerificationEmail: () => Account.sendVerificationEmail(this),
    albums: (username?: string | null, page?: number) => Account.albums(this, username, page),
    album: (username: string | null, albumId: string) => Account.album(this, username, albumId),
    albumIds: (username: string | null, page: number) => Account.albumIds(this, username, page),
    albumCount: (username?: string) => Account.albumCount(this, username),
    albumRemove: (username: string | null, albumId: string) => Account.albumRemove(this, username, albumId),
    comments: (username: string | null, options?: SortOption & PageOption) => Account.comments(this, username, options),
    comment: (username: string | null, commentId: string) => Account.comment(this, username, commentId),
    commentIds: (username: string | null, options?: SortOption & PageOption) => Account.commentIds(this, username, options),
    commentCount: (username?: string) => Account.commentCount(this, username),
    commentRemove: (commentId: string) => Account.commentRemove(this, commentId),
    images: (username?: string | null, page?: number) => Account.images(this, username, page),
    image: (username: string | null, imageId: string) => Account.image(this, username, imageId),
    imageIds: (username?: string | null, page?: number) => Account.imageIds(this, username, page),
    imageCount: (username?: string) => Account.imageCount(this, username),
    imageRemove: (username: string | null, deleteHash: string) => Account.imageRemove(this, username, deleteHash),
    replies: () => Account.replies(this)
  }

  Image = {
    get: (imageId: string) => Image.get(this, imageId),
    remove: (imageId: string) => Image.remove(this, imageId),
    upload: (image: string, options?: Image.UploadOptions) => Image.upload(this, image, options),
    update: (imageId: string, options: Image.UpdateOptions) => Image.update(this, imageId, options),
    favorite: (imageId: string) => Image.favorite(this, imageId)
  }

  Comment = {
    get: (commentId: string) => Comment.get(this, commentId),
    create: (imageId: string, comment: string, parentId?: string) => Comment.create(this, imageId, comment, parentId),
    remove: (commentId: string) => Comment.remove(this, commentId),
    replies: (commentId: string) => Comment.replies(this, commentId),
    replyCreate: (commentId: string, imageId: string, comment: string,) => Comment.replyCreate(this, commentId, imageId, comment),
    vote: (commentId: string, vote: 'up' | 'down') => Comment.vote(this, commentId, vote),
    report: (commentId: string, reason?: ReportReasonEnum) => Comment.report(this, commentId)
  }
}