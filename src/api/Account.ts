import * as Options from '../Options'
import { performAPIRequest } from '../RequestTasks';
import Client from '../Client'

export function get (client: Client, username?: string): Promise<APIResponse<AccountResponse>> {
  const url = [
    'account',
    username || 'me',
  ]
  return performAPIRequest<AccountResponse>(client, url)
}

export function galleryFavorites (client: Client, username?: string | null, options?: Options.PageOption & Options.AccountCommentSortOption): Promise<APIResponse<BaseGalleryResponse[]>> {
  const defaultOptions = {
    username,
    page: null,
    sort: null
  }
  if (options != null) {
    Object.assign(defaultOptions, options)
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

export function favorites (client: Client, username?: string | null, options?: Options.PageOption & Options.AccountFavoriteSortOption): Promise<APIResponse<BaseGalleryResponse[]>> {
  const defaultOptions: any = {
    username,
    page: null,
    sort: null
  }
  if (options != null) {
    defaultOptions.page = options.page
    defaultOptions.sort = options.sort
  }
  const url = [
    'account',
    defaultOptions.username || 'me',
    'favorites',
    defaultOptions.page,
    defaultOptions.sort
  ]
  return performAPIRequest<BaseGalleryResponse[]>(client, url)
}

export function submissions (client: Client, username?: string | null, page?: number): Promise<APIResponse<BaseGalleryResponse[]>> {
  const url = [
    'account',
    username || 'me',
    'submissions',
    page
  ]
  return performAPIRequest<BaseGalleryResponse[]>(client, url)
}

export function settings (client: Client): Promise<APIResponse<AccountResponse>> {
  const url = [
    'account',
    'me',
    'settings'
  ]
  return performAPIRequest<AccountResponse>(client, url)
}

export function changeSettings (client: Client, options: Options.ChangeAccountSettingsOptions): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    'me',
    'settings'
  ]
  const requestOptions = {
    method: 'put',
    data: options
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function galleryProfile (client: Client, username?: string): Promise<APIResponse<GalleryProfileResponse>> {
  const url = [
    'account',
    username || 'me',
    'gallery_profile'
  ]
  return performAPIRequest<GalleryProfileResponse>(client, url)
}

export function verifyEmail (client: Client, username?: string): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    username || 'me',
    'verifyemail'
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

export function albums (client: Client, username?: string | null, page?: number): Promise<APIResponse<AlbumResponse[]>> {
 const url = [
   'account',
   username || 'me',
   'albums',
   page
 ]
  return performAPIRequest<AlbumResponse[]>(client, url)
}

export function album (client: Client, username: string | null, albumId: string): Promise<APIResponse<AlbumResponse>> {
  const url = [
    'account',
    username || 'me',
    'album',
    albumId
  ]
  return performAPIRequest<AlbumResponse>(client, url)
}

export function albumIds (client: Client, username?: string | null, page?: number): Promise<APIResponse<number[]>> {
  const url = [
    'account',
    username || 'me',
    'albums',
    'ids',
    page
  ]
  return performAPIRequest<number[]>(client, url)
}

export function albumCount (client: Client, username?: string): Promise<APIResponse<number>> {
  const url = [
    'account',
    username || 'me',
    'albums',
    'count'
  ]
  return performAPIRequest<number>(client, url)
}

export function albumRemove (client: Client, username: string | null, albumId: string): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    username || 'me',
    'album',
    albumId
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function comments (client: Client, username?: string | null, options?: Options.AccountCommentSortOption & Options.PageOption): Promise<APIResponse<CommentResponse[]>> {
  const url: any[] = [
    'account',
    username || 'me',
    'comments'
  ]
  if (options != null) {
    url.push(options.sort, options.page)
  }
  return performAPIRequest<CommentResponse[]>(client, url)
}

export function comment (client: Client, username: string | null, commentId: string): Promise<APIResponse<CommentResponse>> {
  const url = [
    'account',
    username || 'me',
    'comment',
    commentId
  ]
  return performAPIRequest<CommentResponse>(client, url)
}

export function commentIds (client: Client, username?: string | null, options?: Options.AccountCommentSortOption & Options.PageOption): Promise<APIResponse<number[]>> {
  const url: any[] = [
    'account',
    username || 'me',
    'comments',
    'ids'
  ]
  if (options != null) {
    url.push(options.sort, options.page)
  }
  return performAPIRequest<number[]>(client, url)
}

export function commentCount (client: Client, username?: string): Promise<APIResponse<number>> {
  const url = [
    'account',
    username || 'me',
    'comments',
    'count'
  ]
  return performAPIRequest<number>(client, url)
}

export function commentRemove (client: Client, commentId: string): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    'me',
    'comment',
    commentId
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function images (client: Client, username?: string | null, page?: number): Promise<APIResponse<ImageResponse[]>> {
  const url = [
    'account',
    username || 'me',
    'images',
    page
  ]
  return performAPIRequest<ImageResponse[]>(client, url)
}

export function image (client: Client, username: string | null, imageId: string): Promise<APIResponse<ImageResponse>> {
  const url = [
    'account',
    username || 'me',
    'image',
    imageId
  ]
  return performAPIRequest<ImageResponse>(client, url)
}

export function imageIds (client: Client, username?: string | null, page?: number): Promise<APIResponse<string[]>> {
  const url = [
    'account',
    username || 'me',
    'images',
    'ids',
    page
  ]
  return performAPIRequest<string[]>(client, url)
}

export function imageCount (client: Client, username?: string): Promise<APIResponse<number>> {
  const url = [
    'account',
    username || 'null'
  ]
  return performAPIRequest<number>(client, url)
}

export function imageRemove (client: Client, username: string | null, deleteHash: string): Promise<APIResponse<boolean>> {
  const url = [
    'account',
    username || 'me',
    'image',
    deleteHash
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function replies (client: Client): Promise<APIResponse<NotificationResponse[]>> {
  const url = [
    'account',
    'me',
    'notifications',
    'replies'
  ]
  return performAPIRequest<NotificationResponse[]>(client, url)
}