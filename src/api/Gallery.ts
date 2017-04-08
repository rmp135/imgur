import { SortOption } from './Account';
import Client from "../Client";
import { performAPIRequest, performRequest, URLConfig } from '../RequestTasks';
import "./Options"

export interface GalleryGetOptions extends Options.GallerySortOption, Options.PageOption {
  showViral?: boolean
}

export function get (client: Client, section: Options.Section, options?: GalleryGetOptions): Promise<APIResponse<BaseGalleryResponse[]>> {
  const url: URLConfig = {
    path: [
      'gallery',
      section
    ],
    params: { }
  }
  url.params = { }
  if (options != null) {
    url.path.push(options.sort, options.page)
    url.params.showViral = options.showViral
  }
  return performAPIRequest(client, url)
}

export function memesGallery (client: Client, options?: Options.GallerySortOption & Options.PageOption & Options.WindowOption): Promise<APIResponse<(BaseGalleryResponse & MemeResponse)[]>> {
  const url: any = [
    'g',
    'memes',
  ]
  if (options != null) {
    url.push(options.sort, options.window, options.page)
  }
  return performAPIRequest<(BaseGalleryResponse & MemeResponse)[]>(client, url)
}

export function memesImage (client: Client, imageId: string): Promise<APIResponse<BaseGalleryResponse & MemeResponse>> {
  const url = [
    'g',
    'memes',
    imageId
  ]
  return performAPIRequest<BaseGalleryResponse & MemeResponse>(client, url)
}

export interface SubRedditGalleriesOptions extends Options.WindowOption, Options.PageOption, Options.GallerySortOption {
  subreddit: string
}

export interface SubRedditGalleriesResponse extends GalleryImageResponse {
  reddit_comments: string
}

export function subredditGalleries (client: Client, options: string | SubRedditGalleriesOptions): Promise<APIResponse<SubRedditGalleriesResponse[]>> {
  const url: any = [
    'gallery',
    'r'
  ]
  if (typeof options == 'string') {
    url.push(options)
  } else {
    url.push(options.subreddit, options.sort, options.window, options.page)
  }
  return performAPIRequest<SubRedditGalleriesResponse[]>(client, url)
}

export function subredditImage (client: Client, subreddit: string, image: string): Promise<APIResponse<SubRedditGalleriesResponse>> {
  const url = [
    'gallery',
    'r',
    subreddit,
    image
  ]
  return performAPIRequest<SubRedditGalleriesResponse>(client, url)
}

export interface TagOption {
  tagName: string
}

export function tag (client: Client, options: string | TagOption & Options.PageOption & Options.GallerySortOption & Options.WindowOption): Promise<APIResponse<TagResponse>> {
  const url: any[] = [
    'gallery',
    'r'
  ]
  if (typeof options == 'string') {
    url.push(options)
  } else {
    url.push(options.tagName, options.sort, options.window, options.page)
  }
  return performAPIRequest<TagResponse>(client, url)
}

export function tagImage (client: Client, tagName: string, imageId: string): Promise<APIResponse<GalleryImageResponse>> {
  const url = [
    'gallery',
    't',
    tagName,
    imageId
  ]
  return performAPIRequest<GalleryImageResponse>(client, url)
}

export function itemTags (client: Client, id: string): Promise<APIResponse<TagVoteResponse[]>> {
  const url = [
    'gallery',
    id,
    'tags'
  ]
  return performAPIRequest<TagVoteResponse[]>(client, url)
}

export function tagVoting (client: Client, id: string, tagName: string, vote: 'up' | 'down'): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    id,
    'vote',
    'tag',
    tagName,
    vote
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function updateTags (client: Client, id: string, tags: string[]): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    'tags',
    id
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export type ImageType = 'jpg' | 'png' | 'gif' | 'anigif' | 'album'
export type ImageSize = 'small' | 'med' | 'big' | 'lrg' | 'huge'

export interface GallerySearchOptions {
  all?: string[]
  any?: string[]
  exactly?: string
  not?: string[]
  type?: ImageType
  q_size_px?: ImageSize
}

export function search (client: Client, searchOptions: string | GallerySearchOptions, filterOptions?: Options.GallerySortOption & Options.WindowOption & Options.PageOption): Promise<APIResponse<BaseGalleryResponse[]>> {
  const path: any[] = [
    'gallery',
    'search'
  ]
  const params: {
    q?: string
    q_all?: string
    q_any?: string
    q_exactly?: string
    q_not?: string
    q_type?: ImageType
    q_size_px?: ImageSize
  } = {
    
  }
  if (filterOptions != null) {
    path.push(filterOptions.sort, filterOptions.window, filterOptions.page)
  }
  if (typeof searchOptions == 'string') {
    params.q = searchOptions
  } else {
    params.q_all = searchOptions.all != null ? searchOptions.all.join(',') : undefined
    params.q_any = searchOptions.any != null ? searchOptions.any.join(',') : undefined
    params.q_exactly = searchOptions.exactly
    params.q_not = searchOptions.not != null ? searchOptions.not.join(',') : undefined
    params.q_size_px = searchOptions.q_size_px
    params.q_type = searchOptions.type
  }
  return performAPIRequest<BaseGalleryResponse[]>(client, { path, params })
}

export function random (client: Client, page?: number): Promise<APIResponse<BaseGalleryResponse[]>> {
  const url = [
    'gallery',
    'random',
    'random',
    page
  ]
  return performAPIRequest<BaseGalleryResponse[]>(client, url)
}

export interface ShareOptions {
  title: string
  topic?: string
  bypassTerms?: boolean,
  mature?: boolean
  tags: string[]
}

export  function share (client: Client, id: string, options: string | ShareOptions): Promise<APIResponse<boolean>> {
  const path = [
    'gallery',
    id
  ]
  const params: any = {

  }
  if (typeof options == 'string') {
    params.title = options
  } else {
    params.title = options.title
    params.topic = options.topic
    params.terms = options.bypassTerms ? '1' : undefined
    params.mature = options.mature ? '1' : undefined
    params.tags = options.tags != null ? options.tags.join(',') : undefined
  }
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, { path, params }, requestOptions)
}

export function remove (client: Client, id: string): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    id
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function album (client: Client, id: string): Promise<APIResponse<GalleryAlbumResponse>> {
  const url = [
    'gallery',
    'album',
    id
  ]
  return performAPIRequest<GalleryAlbumResponse>(client, url)
}

export function image (client: Client, id: string): Promise<APIResponse<GalleryImageResponse>> {
  const url = [
    'gallery',
    'album',
    id
  ]
  return performAPIRequest<BaseImageResponse>(client, url)
}

export enum ReportReasonEnum {
  DOES_NOT_BELONG = 1,
  SPAM = 2,
  ABUSIVE = 3,
  UNMARKED_MATURE = 4,
  PORN = 5
}

export function report (client: Client, id: string, reason: ReportReasonEnum): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    id,
    'report'
  ]
  const requestOptions = {
    method: 'post',
    data: {
      reason: reason
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function votes (client: Client, id: string): Promise<APIResponse<VoteResponse>> {
  const url = [
    'gallery',
    'album',
    'votes'
  ]
  return performAPIRequest<VoteResponse>(client, url)
}

export function comments (client: Client, id: string, sort?: Options.CommentSort): Promise<APIResponse<CommentResponse[]>> {
  const url = [
    'gallery',
    id,
    'comments',
    sort    
  ]
  return performAPIRequest<CommentResponse[]>(client, url)
}

export function comment (client: Client, itemId: string, commentId: string): Promise<APIResponse<CommentResponse>> {
  const url = [
    'gallery',
    itemId,
    'comment',
    commentId
  ]
  return performAPIRequest<CommentResponse>(client, url)
}

export function commentCreate (client: Client, id: string, comment: string): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    id,
    'comment'
  ]
  const requestOptions = {
    method: 'post',
    data: {
      comment
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function commentReply (client: Client, itemId: string, commentId: string, comment: string): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    itemId,
    'comment',
    commentId
  ]
  const requestOptions = {
    method: 'post',
    data: {
      comment
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function commentIds (client: Client, id: string): Promise<APIResponse<number[]>> {
  const url = [
    'gallery',
    id,
    'comments',
    'ids'
  ]
  return performAPIRequest<number[]>(client, url)
}

export function commentCount (client: Client, id: string): Promise<APIResponse<number>> {
  const url = [
    'gallery',
    id,
    'comments',
    'count'
  ]
  return performAPIRequest<number>(client, url)
}