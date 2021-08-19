import * as RequestTasks from "./RequestTasks";
import rewire from 'rewire'
import Client from './Client'

let RewireRequestTasks = rewire('./RequestTasks')
const MockRequestTasks: typeof RequestTasks & typeof RewireRequestTasks = <any> RewireRequestTasks

describe('RequestTasks', () => {
  beforeEach(() => {
    RewireRequestTasks = rewire('./RequestTasks')
  })
  describe('performRequest', () => {
    it('should send a request and fill in the headers', async () => {
      const mockAxios = jasmine.createSpy('axios').and.returnValue({
        headers: {
          'x-ratelimit-clientlimit': 23,
          'x-ratelimit-clientremaining': 33,
          'x-ratelimit-userlimit': 11,
          'x-ratelimit-userremaining': 112,
          'x-ratelimit-userreset': 2000,
          'x-post-rate-limit-limit': 1121,
          'x-post-rate-limit-remaining': 233,
          'x-post-rate-limit-reset': 4
        },
        data: 'mock data'
      })
      MockRequestTasks.__set__({
        axios_1: {
          default: mockAxios
        } 
      })
      const client = new Client()
      jasmine.clock().mockDate(new Date(2017, 1, 1, 1, 1, 1))
      const res = await MockRequestTasks.performRequest(client, { method: 'post' })
      expect(mockAxios).toHaveBeenCalledWith({ validateStatus: jasmine.any(Function), method: 'post' })
      expect(res).toEqual('mock data' as any)
      expect(client.RateLimits.client_limit).toBe(23)
      expect(client.RateLimits.client_remaining).toBe(33)
      expect(client.RateLimits.user_limit).toBe(11)
      expect(client.RateLimits.user_remaining).toBe(112)
      expect(client.RateLimits.user_reset).toEqual(new Date(2017,1 ,1, 1, 1, 3))
      expect(client.RateLimits.ip_limit).toBe(1121)
      expect(client.RateLimits.ip_remaining).toBe(233)
      expect(client.RateLimits.ip_reset).toEqual(new Date(2017, 1, 1, 1, 1, 5))
    })
    it('should throw the header and response data when an error occurs', async () => {
      const mockAxios = jasmine.createSpy('axios').and.returnValue(Promise.reject({ response: { status: 123 , data: 'error body' }}))
      MockRequestTasks.__set__({
        axios_1: {
          default: mockAxios
        } 
      })
      const client = new Client()
      MockRequestTasks.performRequest(client, { method: 'post' })
      .catch((err) => {
        expect(err).toEqual({ status: 123, body: 'error body' })
      })
    })
  })
  describe('performAPIRequest', () => {
    it('should call with only a url', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      const res = MockRequestTasks.performAPIRequest(client, ['path1', 'path2'])
      expect(mockJoinURL).toHaveBeenCalledWith(['https://api.imgur.com/3', 'path1', 'path2'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', headers: { } })
      expect(res).toBe('request return' as any)
    })
    it('should set the bearer if the access_token is specified', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      client.access_token = 'access_token'
      client.client_id = 'client_id'
      const res = MockRequestTasks.performAPIRequest(client, ['path1', 'path2'])
      expect(mockJoinURL).toHaveBeenCalledWith(['https://api.imgur.com/3', 'path1', 'path2'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', headers: { Authorization: 'Bearer access_token' } })
      expect(res).toBe('request return' as any)
    })
    it('should set the Client-ID if the client id is specified', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      client.client_id = 'client_id'
      const res = MockRequestTasks.performAPIRequest(client, ['path1', 'path2'])
      expect(mockJoinURL).toHaveBeenCalledWith(['https://api.imgur.com/3', 'path1', 'path2'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', headers: { Authorization: 'Client-ID client_id' } })
      expect(res).toBe('request return' as any)
    })
    it('should call with only a url and request options', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      const res = MockRequestTasks.performAPIRequest(client, ['path1', 'path2'], { method: 'get'})
      expect(mockJoinURL).toHaveBeenCalledWith(['https://api.imgur.com/3', 'path1', 'path2'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', method: 'get', headers: { } })
      expect(res).toBe('request return' as any)
    })
    it('should call with a path and params', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      const res = MockRequestTasks.performAPIRequest(client, { path: ['path1', 'path2'], params: { param1: 'param1' }})
      expect(mockJoinURL).toHaveBeenCalledWith({ path: ['https://api.imgur.com/3', 'path1', 'path2'], params: { param1: 'param1' }})
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', headers: { } })
      expect(res).toBe('request return' as any)
    })
    it('should call with the mashape header and url if available', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      client.mashape_key = 'mashape key'
      const res = MockRequestTasks.performAPIRequest(client, { path: ['path1', 'path2'], params: { param1: 'param1' }})
      expect(mockJoinURL).toHaveBeenCalledWith({ path: ['https://imgur-apiv3.p.mashape.com/3', 'path1', 'path2'], params: { param1: 'param1' }})
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', headers: { 'X-Mashape-Key': 'mashape key' } })
      expect(res).toBe('request return' as any)
    })
    it('should call with the mashape and client header and url if available', () => {
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue('request return')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockRequestTasks.__set__({
        joinURL: mockJoinURL,
        performRequest: mockPerformRequest
      })
      const client = new Client()
      client.access_token = 'access token'
      client.mashape_key = 'mashape key'
      const res = MockRequestTasks.performAPIRequest(client, { path: ['path1', 'path2'], params: { param1: 'param1' }})
      expect(mockJoinURL).toHaveBeenCalledWith({ path: ['https://imgur-apiv3.p.mashape.com/3', 'path1', 'path2'], params: { param1: 'param1' }})
      expect(mockPerformRequest).toHaveBeenCalledWith(client, { url: 'joined url', headers: { 'X-Mashape-Key': 'mashape key', Authorization: 'Bearer access token' } })
      expect(res).toBe('request return' as any)
    })
  })
  describe('joinURL', () => {
    it('should join only a path string array', () => {
      const res = MockRequestTasks.joinURL(['p1', 'p2', 'p3'])
      expect(res).toBe('p1/p2/p3')
    })
    it('should join a path and params object', () => {
      const mockFormat = jasmine.createSpy('format').and.returnValue('formatted url')
      const mockSearchParams = jasmine.createSpy('searchParams').and.returnValues({ toString: () => 'searchparams' })
      MockRequestTasks.__set__({
        url: {
          URLSearchParams: mockSearchParams,
          format: mockFormat
        }
      })
      const res = MockRequestTasks.joinURL({ path: ['p1', 'p2', 'p3'], params: { p1: 2, p2: 3 }})
      expect(mockFormat).toHaveBeenCalledWith({ pathname: 'p1/p2/p3', search: 'searchparams'})
      expect(res).toBe('formatted url')
    })
  })
})
