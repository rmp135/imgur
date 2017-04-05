/// <reference path="../ResponseModels.d.ts" />

import Client from '../Client';
import { performAPIRequest } from '../RequestTasks';

export function get (client: Client, id: string): Promise<APIResponse<CommentResponse>> {
  const url = [
    'comment',
    id
  ]
  return performAPIRequest<CommentResponse>(client, url)
}

export function create (client: Client, comment: string, imageId: string, parentId?: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment'
  ]
  const requestOptions = {
    method: 'post',
    data: {
      comment,
      image_id: imageId,
      parent_id: parentId
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function remove (client: Client, id: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    id
  ]
  const requestOptions = {
    method: 'delete'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function replies (client: Client, id: string): Promise<APIResponse<CommentResponse[]>> {
  const url = [
    'comment',
    id,
    'replies'
  ]
  return performAPIRequest<CommentResponse[]>(client, url)
}

export function replyCreate (client: Client, parentId: string, comment: string, imageId: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    parentId
  ]
  const requestOptions = {
    method: 'post',
    data: {
      comment,
      image_id: imageId
    }
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function vote (client: Client, id: string, vote: 'up' | 'down'): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    id,
    'vote',
    vote
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}

export function report (client: Client, id: string): Promise<APIResponse<boolean>> {
  const url = [
    'comment',
    id,
    'report'
  ]
  const requestOptions = {
    method: 'post'
  }
  return performAPIRequest<boolean>(client, url, requestOptions)
}