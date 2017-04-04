import { parse } from 'querystring';
import * as url from 'url';
import { URLConfig, APIResponse, performAPIRequest } from '../RequestTasks';
import { AxiosRequestConfig } from 'axios';
import Client from '../Client'

export type SortOrder = "oldest" | "newest"
export type AlbumPrivacyEnum = 'public' | 'hidden' | 'secret'

export interface ChangeAccountSettingsOptions {
  bio?: string,
  public_images?: boolean
  messaging_enabled?: boolean
  album_privacy? : AlbumPrivacyEnum
  accepted_gallery_terms?: boolean
  username?: string
  show_mature?: boolean
  newsletter_subscribed?: boolean
}

export interface IdOption {
  id: string
}

export interface UsernameOption {
  username?: string
}

export interface PageOption {
  page?: number
}

export interface SortOption {
  sort?: SortOrder
}

export function get (client: Client, username?: string) : Promise<APIResponse<AccountResponse>> {
  const url = [
    'account',
    username || 'me',
  ]
  return performAPIRequest<AccountResponse>(client, url)
}

export function galleryFavorites (client: Client, options? : string | UsernameOption & PageOption & SortOption) : Promise<APIResponse<BaseGalleryResponse[]>> {
  const defaultOptions = {
    username: 'me',
    page: null,
    sort: null
  }
  if (options != null) {
    if (typeof options === 'string') {
      defaultOptions.username = options
    } else {
      Object.assign(defaultOptions, options)
    }
  }
  const url = [
    'account',
    defaultOptions.username || 'me',
    'gallery_favorites',
    defaultOptions.page,
    defaultOptions.sort
  ]
  return performAPIRequest<BaseGalleryResponse[]>(client, url)
}

export function accountFavorites (client: Client, options?: PageOption) : Promise<APIResponse<BaseGalleryResponse[]>> {
  const defaultOptions = {
    username: 'me',
    page: null,
    sort: null
  }
  if (options != null) {
    if (typeof options === 'string') {
      defaultOptions.username = options
    } else {
      Object.assign(defaultOptions, options)
    }
  }
  const url = [
    'account',
    defaultOptions.username || 'me',
    'favorites',
    defaultOptions.page
  ]
  return performAPIRequest<BaseGalleryResponse[]>(client, url)
}

export function accountSubmisions (client: Client, options?: string | UsernameOption & PageOption): Promise<APIResponse<BaseGalleryResponse[]>> {
  const baseOptions: any = {
    username: 'me',
    page: null
  }
  if (typeof options == 'string') {
    baseOptions.username = options
  } else {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    baseOptions.username,
    'submissions',
    baseOptions.page
  ]
  return performAPIRequest<BaseGalleryResponse[]>(client, baseOptions)
}

export function accountSettings (client: Client) : Promise<APIResponse<AccountResponse>> {
  const url = [
    'account',
    'me',
    'settings'
  ]
  return performAPIRequest<AccountResponse>(client, url)
}

export function changeAccountSettings (client: Client, options: ChangeAccountSettingsOptions): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    'me',
    'settings'
  ]
  const requestOptions = {
    method: 'put'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function accountGalleryProfile (client: Client, username?: string) : Promise<APIResponse<GalleryProfileResponse>> {
  const url = [
    'account',
    username || 'me',
  ]
  return performAPIRequest<GalleryProfileResponse>(client, url)
}

export function verifyEmail (client: Client, username?: string): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    username || 'me'
  ]
  return performAPIRequest<boolean>(client, url)
}

export function sendVerificationEmail (client: Client): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    'me',
    'verifyemail'
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function albums (client: Client, options?: string | UsernameOption & PageOption): Promise<APIResponse<AlbumResponse[]>> {
 const defaultOptions = {
   username: 'me',
   page: null
 }
 if (options != null) {
   if (typeof options === 'string') {
     defaultOptions.username = options
   } else {
     Object.assign(defaultOptions, options)
   }
 }
 const url = [
   'account',
   defaultOptions.username,
   'albums',
   defaultOptions.page
 ]
  return performAPIRequest<AlbumResponse[]>(client, url)
}

export function album (client: Client, options: string | IdOption & UsernameOption): Promise<APIResponse<AlbumResponse>> {
  const defaultOptions = {
    username: 'me',
    id: ''
  }
  if (typeof options === 'string') {
    defaultOptions.id = options
  } else {
    Object.assign(defaultOptions, options)
  }
  const url = [
    'account',
    defaultOptions.username,
    'album',
    defaultOptions.id
  ]
  return performAPIRequest<AlbumResponse>(client, url)
}

export function albumIds (client: Client, options?: string | UsernameOption & PageOption) : Promise<APIResponse<number[]>> {
  const defaultOptions: any = {
    username: 'me'
  }
  if (options != null) {
    if (typeof options === 'string') {
      defaultOptions.username = options
    } else {
      Object.assign(defaultOptions, options) 
    }
  }
  const url = [
    'account',
    defaultOptions.username,
    'albums',
    'ids',
    defaultOptions.page
  ]
  return performAPIRequest<number[]>(client, url)
}

export function albumCount (client: Client, options?: string): Promise<APIResponse<number>> {
  const url = [
    'account',
    options || 'me',
    'albums',
    'count'
  ]
  return performAPIRequest<number>(client, url)
}

export function albumRemove (client: Client, options: string | UsernameOption & IdOption): Promise<APIResponse<boolean>> {
  const baseOptions: any = {
    username: 'me',
    id: null
  }
  if (typeof options === 'string') {
    baseOptions.id = options
  } else {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    baseOptions.username,
    'album',
    baseOptions.id
  ]
  const requestOptions = {
    methods: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function comments (client: Client, options?: string | UsernameOption & SortOption & PageOption) : Promise<APIResponse<CommentResponse[]>> {
  const baseOptions: any = {
    username: 'me',
    sort: null,
    page: null
  }
  Object.assign(baseOptions, options)
  const url = [
    'account',
    baseOptions.username,
    baseOptions.sort,
    baseOptions.page
  ]
  return performAPIRequest<CommentResponse[]>(client, url)
}

export function comment (client: Client, options: number | UsernameOption & IdOption): Promise<APIResponse<CommentResponse>> {
  const baseOptions: any = {
    username: 'me',
    id: null
  }
  if (typeof options === 'number') {
    baseOptions.id = options
  } else  {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    baseOptions.username,
    'comment',
    baseOptions.id
  ]
  return performAPIRequest<CommentResponse>(client, url)
}

export function commentIds (client: Client, options? : UsernameOption & SortOption & PageOption): Promise<APIResponse<number[]>> {
  const baseOptions : any = {
    username: 'me',
    sort: null, 
    page: null
  }
  Object.assign(baseOptions, options)
  const url = [
    'account',
    baseOptions.username,
    'comments',
    'ids',
    baseOptions.sort,
    baseOptions.page
  ]
  return performAPIRequest<number[]>(client, url)
}

export function commentCount (client: Client, options?: string): Promise<APIResponse<number>> {
  const url = [
    'account',
    options || 'me',
    'comments',
    'count'
  ]
  return performAPIRequest<number>(client, url)
}

export function commentRemove (client: Client, options: number): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    'me',
    'comment',
    options
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, options)
}

export function images (client: Client, options?: string | UsernameOption & PageOption) : Promise<APIResponse<ImageResponse[]>> {
  const baseOptions : any = {
    username:  'me',
    page: null
  }
  if (typeof options === 'string') {
    baseOptions.username = options
  } else {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    baseOptions.username,
    'images',
    baseOptions.page
  ]
  return performAPIRequest<ImageResponse[]>(client, baseOptions)
}

export function image (client: Client, options: string | UsernameOption & IdOption): Promise<APIResponse<ImageResponse>> {
  const baseOptions: any = {
    id: null,
    username: 'me'
  }
  if (typeof options === 'string') {
    baseOptions.id = options
  } else {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    'me',
    'image',
    baseOptions.id
  ]
  return performAPIRequest<ImageResponse>(client, url)
}

export function imageIds (client: Client, options?: string | UsernameOption & PageOption): Promise<APIResponse<string[]>> {
  const baseOptions: any = {
    username: 'me',
    page: null
  }
  if (typeof options === 'string') {
    baseOptions.username = options
  } else {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    baseOptions.username,
    'images',
    'ids',
    baseOptions.page
  ]
  return performAPIRequest<string[]>(client, baseOptions)
}

export function imageCount (client: Client, options?: string): Promise<APIResponse<number>> {
  const url = [
    'account',
    options || 'null'
  ]
  return performAPIRequest<number>(client, url)
}

export function imageRemove (client: Client, options: string | UsernameOption & { deleteHash: string }): Promise<APIResponse<boolean>> {
  const baseOptions: any = {
    username: 'me',
    deleteHash: null
  }
  if (typeof options === 'string') {
    baseOptions.deleteHash = options
  } else {
    Object.assign(baseOptions, options)
  }
  const url = [
    'account',
    baseOptions.username,
    'image',
    baseOptions.deleteHash
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function replies (client: Client, options?: string): Promise<APIResponse<NotificationResponse[]>> {
  const url = [
    'account',
    options || 'me',
    'notifications',
    'replies'
  ]
  return performAPIRequest<NotificationResponse[]>(client, url)
}