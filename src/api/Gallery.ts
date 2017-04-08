import { SortOption } from './Account';
import Client from "../Client";
import { performAPIRequest, performRequest, URLConfig } from '../RequestTasks';
import { ReportReasonEnum } from "./ReportReasonEnum";

export interface GalleryGetOptions extends Options.SectionOption, Options.GallerySortOption, Options.PageOption, Options.WindowOption {
  showViral?: boolean
}

export function get (client: Client, options?: GalleryGetOptions): Promise<APIResponse<BaseGalleryResponse[]>> {
  const url: URLConfig = {
    path: [
      'gallery'
    ],
    params: { }
  }
  url.params = { }
  if (options != null) {
    url.path.push(options.section, options.sort, options.window, options.page)
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

export function subredditGalleries (client: Client, subreddit: string, options?: Options.WindowOption & Options.PageOption & Options.GallerySortOption): Promise<APIResponse<SubRedditGalleriesResponse[]>> {
  const url: any = [
    'gallery',
    'r',
    subreddit
  ]
  if (options != null) {
    url.push(options.sort, options.window, options.page)
  }
  return performAPIRequest<SubRedditGalleriesResponse[]>(client, url)
}

export function subredditImage (client: Client, subreddit: string, imageId: string): Promise<APIResponse<SubRedditGalleriesResponse>> {
  const url = [
    'gallery',
    'r',
    subreddit,
    imageId
  ]
  return performAPIRequest<SubRedditGalleriesResponse>(client, url)
}

export function tag (client: Client, tagName: string, options?: Options.PageOption & Options.GallerySortOption & Options.WindowOption): Promise<APIResponse<TagResponse>> {
  const url: any[] = [
    'gallery',
    't',
    tagName
  ]
  if (options != null) {
    url.push(options.sort, options.window, options.page)
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

export function itemTags (client: Client, itemId: string): Promise<APIResponse<TagVoteResponse[]>> {
  const url = [
    'gallery',
    itemId,
    'tags'
  ]
  return performAPIRequest<TagVoteResponse[]>(client, url)
}

export function tagVoting (client: Client, itemId: string, tagName: string, vote: 'up' | 'down'): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    itemId,
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

export function updateTags (client: Client, itemId: string, tags: string[]): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    'tags',
    itemId
  ]
  const requestOptions = {
    method: 'post',
    data: {
      tags: tags.join(',')
    }
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
  size?: ImageSize
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
    params.q_size_px = searchOptions.size
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
  topic?: string
  bypassTerms?: boolean,
  mature?: boolean
  tags?: string[]
}

export function share (client: Client, itemId: string, title: string, options?: ShareOptions): Promise<APIResponse<boolean>> {
  const path = [
    'gallery',
    itemId
  ]
  const requestOptions: any = {
    method: 'post',
    data: {
      title
    }
  }
  if (options != null) {
    requestOptions.data.topic = options.topic
    requestOptions.data.terms = options.bypassTerms ? '1' : undefined
    requestOptions.data.mature = options.mature ? '1' : undefined
    requestOptions.data.tags = options.tags != null ? options.tags.join(',') : undefined
  }
  return performAPIRequest<boolean>(client, path, requestOptions)
}

export function remove (client: Client, imageId: string): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    imageId
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function album (client: Client, albumId: string): Promise<APIResponse<GalleryAlbumResponse>> {
  const url = [
    'gallery',
    'album',
    albumId
  ]
  return performAPIRequest<GalleryAlbumResponse>(client, url)
}

export function image (client: Client, imageId: string): Promise<APIResponse<GalleryImageResponse>> {
  const url = [
    'gallery',
    'image',
    imageId
  ]
  return performAPIRequest<BaseImageResponse>(client, url)
}

export function report (client: Client, itemId: string, reason?: ReportReasonEnum): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    itemId,
    'report'
  ]
  const requestOptions = {
    method: 'post',
    data: {
      reason
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function votes (client: Client, itemId: string): Promise<APIResponse<VoteResponse>> {
  const url = [
    'gallery',
    itemId,
    'votes'
  ]
  return performAPIRequest<VoteResponse>(client, url)
}

export function comments (client: Client, itemId: string, sort?: Options.CommentSort): Promise<APIResponse<CommentResponse[]>> {
  const url = [
    'gallery',
    itemId,
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

export function commentCreate (client: Client, itemId: string, comment: string): Promise<APIResponse<boolean>> {
  const url = [
    'gallery',
    itemId,
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

export function commentIds (client: Client, itemId: string): Promise<APIResponse<number[]>> {
  const url = [
    'gallery',
    itemId,
    'comments',
    'ids'
  ]
  return performAPIRequest<number[]>(client, url)
}

export function commentCount (client: Client, itemId: string): Promise<APIResponse<number>> {
  const url = [
    'gallery',
    itemId,
    'comments',
    'count'
  ]
  return performAPIRequest<number>(client, url)
}