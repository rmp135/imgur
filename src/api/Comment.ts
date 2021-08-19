import * as Options from '../Options'
import Client from '../Client';
import { performAPIRequest } from '../RequestTasks'
import { AxiosRequestConfig } from 'axios'

export function get (client: Client, commentId: string): Promise<APIResponse<CommentResponse>> {
  const url = [
    'comment',
    commentId
  ]
  return performAPIRequest<CommentResponse>(client, url)
}

export function create (client: Client, imageId: string, comment: string, parentId?: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment'
  ]
  const requestOptions: AxiosRequestConfig = {
    method: 'post',
    data: {
      comment,
      image_id: imageId,
      parent_id: parentId
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function remove (client: Client, commentId: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    commentId
  ]
  const requestOptions: AxiosRequestConfig = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function replies (client: Client, commentId: string): Promise<APIResponse<CommentResponse[]>> {
  const url = [
    'comment',
    commentId,
    'replies'
  ]
  return performAPIRequest<CommentResponse[]>(client, url)
}

export function replyCreate (client: Client, commentId: string, imageId: string, comment: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    commentId
  ]
  const requestOptions: AxiosRequestConfig = {
    method: 'post',
    data: {
      comment,
      image_id: imageId
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function vote (client: Client, commentId: string, vote: 'up' | 'down'): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    commentId,
    'vote',
    vote
  ]
  const requestOptions: AxiosRequestConfig = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function report (client: Client, commentId: string, reason?: Options.ReportReasonEnum): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    commentId,
    'report'
  ]
  const requestOptions: AxiosRequestConfig = {
    method: 'post',
    data: {
      reason
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}