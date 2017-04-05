import {
  accountGalleryProfile,
  ChangeAccountSettingsOptions,
  IdOption,
  PageOption,
  SortOption,
  UsernameOption
} from './api/Account';
import { AxiosRequestConfig } from 'axios';
import { APIResponse, joinURL, performRequest } from './RequestTasks';
import * as AuthorizationTasks from './AuthorizationTasks';
import * as Account from './api/Account';
import * as Image from './api/Image';

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
        parse: (url: string) => {
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
    galleryFavorites: (config: string | UsernameOption & PageOption & SortOption) => Account.galleryFavorites(this, config),
    favorites: (config?: string | UsernameOption & PageOption) => Account.accountFavorites(this, config),
    accountSubmissions: (config?: PageOption) => Account.accountSubmisions(this, config),
    accountSettings: () => Account.accountSettings(this),
    changeAccountSettings: (options: ChangeAccountSettingsOptions) => Account.changeAccountSettings(this, options),
    accountGalleryProfile: (username?: string) => Account.accountGalleryProfile(this, username),
    verifyEmail: (username?: string) => Account.verifyEmail(this, username),
    sendVerificationEmail: () => Account.sendVerificationEmail(this),
    albums: (options?: string | UsernameOption & PageOption) => Account.albums(this, options),
    album: (options: string | IdOption & UsernameOption) => Account.album(this, options),
    albumIds: (options?: string | UsernameOption & PageOption) => Account.albumIds(this, options),
    albumCount: (id?: string) => Account.albumCount(this, id),
    albumRemove: (options: string | UsernameOption & IdOption) => Account.albumRemove(this, options),
    comments: (options: number | UsernameOption & SortOption & PageOption) => Account.comments(this, options),
    comment: (options: number | UsernameOption & IdOption) => Account.comment(this, options),
    commentIds: (options?: UsernameOption & SortOption & PageOption) => Account.commentIds(this, options),
    commentCount: (username?: string) => Account.commentCount(this, username),
    images: (options?: string | UsernameOption & PageOption) => Account.images(this, options),
    image: (options: string | UsernameOption & IdOption) => Account.image(this, options),
    imageIds: (options?: string | UsernameOption & PageOption) => Account.imageIds(this, options),
    imageCount: (username?: string) => Account.imageCount(this, username),
    imageRemove: (options: string | UsernameOption & { deleteHash: string }) => Account.imageRemove(this, options),
    replies: (username?: string) => Account.replies(this, username)
  }

  Image = {
    get: (id: string) => Image.get(this, id),
    remove: (id: string) => Image.remove(this, id),
    upload: (options: string | Image.UploadOptions) => Image.upload(this, options),
    update: (options: Image.UpdateOptions) => Image.update(this, options)
  }
}