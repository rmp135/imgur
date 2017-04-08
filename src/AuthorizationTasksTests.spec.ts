import * as urlJoin from 'url-join';
import * as AuthorizationTasks from "./AuthorizationTasks";
import * as rewire from 'rewire'
import Client from "./Client";

let RewireAuthorizationTasks = rewire('./AuthorizationTasks')
const MockAuthorizationTask: typeof AuthorizationTasks & typeof RewireAuthorizationTasks = <any> RewireAuthorizationTasks

describe('AuthorizationTasks', () => {
  beforeEach(() => {
    RewireAuthorizationTasks = rewire('./AuthorizationTasks')
  })
  describe('regenerateFromRequestToken', () => {
    it('should return null if the neither token can be found', () => {
      const origError = console.error
      console.error = jasmine.createSpy('console')
      const client = new Client()
      const res = MockAuthorizationTask.regenerateFromRefreshToken(client)
      expect(console.error).toHaveBeenCalledWith('Please provide a refresh token on the client or as an argument.')
      expect(res).toBeNull()
      console.error = origError
    })
    it('should use the paramter over the client refresh token', async (done) => {
      const clientOptions = {
        client_id: 'client id',
        client_secret: 'client secret'
      }
      const client = new Client(clientOptions)
      client.refresh_token = 'client refresh token'
      const mockJoinUrl = jasmine.createSpy('joinUrl').and.returnValue('url')
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue(Promise.resolve(''))
      MockAuthorizationTask.__set__({
        RequestTasks: {
          joinURL: mockJoinUrl,
          performRequest: mockPerformRequest
        }
      })
      const res = await MockAuthorizationTask.regenerateFromRefreshToken(client, 'param refresh token')
      expect(mockJoinUrl).toHaveBeenCalledWith(['https://api.imgur.com/oauth2', 'token'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, {
        data: {
          client_id: 'client id',
          client_secret: 'client secret',
          grant_type: 'refresh_token',
          refresh_token: 'param refresh token'
        },
        method: 'post',
        url: 'url'
      })
      done()
    })
    it('should fall back to the client refresh token', async (done) => {
      const clientOptions = {
        client_id: 'client id',
        client_secret: 'client secret',
        refresh_token: 'client refresh token'
      }
      const client = new Client(clientOptions)
      client.refresh_token = 'client refresh token'
      const mockJoinUrl = jasmine.createSpy('joinUrl').and.returnValue('url')
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue(Promise.resolve(''))
      MockAuthorizationTask.__set__({
        RequestTasks: {
          joinURL: mockJoinUrl,
          performRequest: mockPerformRequest
        }
      })
      const res = await MockAuthorizationTask.regenerateFromRefreshToken(client)
      expect(mockJoinUrl).toHaveBeenCalledWith(['https://api.imgur.com/oauth2', 'token'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, {
        data: {
          client_id: 'client id',
          client_secret: 'client secret',
          grant_type: 'refresh_token',
          refresh_token: 'client refresh token'
        },
        method: 'post',
        url: 'url'
      })
      done()
    })
    it('should set the client access and refresh tokens', async (done) => {
      const clientOptions = {
        client_id: 'client id',
        client_secret: 'client secret'
      }
      const client = new Client(clientOptions)
      client.refresh_token = 'client refresh token'
      const mockJoinUrl = jasmine.createSpy('joinUrl').and.returnValue('url')
      const mockPerformRequest = jasmine.createSpy('performRequest').and.returnValue(Promise.resolve({
        access_token: 'new access token',
        refresh_token: 'new refresh token'
      }))
      MockAuthorizationTask.__set__({
        RequestTasks: {
          joinURL: mockJoinUrl,
          performRequest: mockPerformRequest
        }
      })
      const res = await MockAuthorizationTask.regenerateFromRefreshToken(client, 'param refresh token')
      expect(mockJoinUrl).toHaveBeenCalledWith(['https://api.imgur.com/oauth2', 'token'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, {
        data: {
          client_id: 'client id',
          client_secret: 'client secret',
          grant_type: 'refresh_token',
          refresh_token: 'param refresh token'
        },
        method: 'post',
        url: 'url'
      })
      expect(client.access_token).toBe('new access token')
      expect(client.refresh_token).toBe('new refresh token')
      done()
    })
  })
  describe('generateAuthRequest', () => {
    it('should return the authorize function', () => {
      const client = new Client()
      const authFn = MockAuthorizationTask.generateAuthRequest(client, 'grantType', 'responseType')
      expect(authFn).toEqual(jasmine.any(Function))
      expect(authFn.length).toBe(1)
    })
    it('should perform a request with the relevant information', async () => {
      const mockAPIReturn = { access_token: 'access_token', refresh_token: 'refresh_token' }
      const mockPerformRequest = jasmine.createSpy('performAPIRequest').and.returnValue(mockAPIReturn)
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockAuthorizationTask.__set__({
        RequestTasks: {
          performRequest: mockPerformRequest,
          joinURL: mockJoinURL
        }
      })
      const clientOptions = {
        client_id: 'client_id',
        client_secret: 'client_secret',
      }
      const client = new Client(clientOptions)
      const authFn = MockAuthorizationTask.generateAuthRequest(client, 'grantType', 'responseType')
      const res = await authFn('responseValue')
      expect(mockJoinURL).toHaveBeenCalledWith(['https://api.imgur.com/oauth2', 'token'])
      expect(mockPerformRequest).toHaveBeenCalledWith(client, {
        data: {
          client_id: 'client_id',
          client_secret: 'client_secret',
          grant_type: 'grantType',
          responseType: 'responseValue'
        },
        method: 'post',
        url: 'joined url'
      })
      expect(client.access_token).toBe('access_token')
      expect(client.refresh_token).toBe('refresh_token')
      expect(res).toBe(mockAPIReturn as RequestTokenResponse)
    })
  })
  describe('twoStateAuth', () => {
    it('should return the user url and authorization callback', () => {
      const mockGenerateAuthRequest = jasmine.createSpy('generateAuthRequest').and.returnValue('mock auth request')
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockAuthorizationTask.__set__({
        generateAuthRequest: mockGenerateAuthRequest,
        RequestTasks: {
          joinURL: mockJoinURL
        }
      })
      const client = new Client('client_id')
      const ret = MockAuthorizationTask.twoStageAuth(client, 'grantType', 'responseType', 'applicationState')
      expect(mockGenerateAuthRequest).toHaveBeenCalledWith(client, 'grantType', 'responseType')
      expect(mockJoinURL).toHaveBeenCalledWith({ path: ['https://api.imgur.com/oauth2', 'authorize'], params: { client_id: 'client_id', response_type: 'responseType', state: 'applicationState' }})
      expect(ret.authorize).toBe('mock auth request')
      expect(ret.url).toBe('joined url')
    })
  })
  describe('generateTokenURL', () => {
    it('should return a joined url', () => {
      const mockJoinURL = jasmine.createSpy('joinURL').and.returnValue('joined url')
      MockAuthorizationTask.__set__({
        RequestTasks: {
          joinURL: mockJoinURL
        }
      })
      const client = new Client('client_id')
      const res = MockAuthorizationTask.generateTokenURL(client, 'state')
      expect(mockJoinURL).toHaveBeenCalledWith({ path: ['https://api.imgur.com/oauth2', 'authorize'], params: { client_id: 'client_id', response_type: 'token', state: 'state' }})
      expect(res).toBe('joined url')
    })
  })
  describe('parseTokenURL', () => {
    it('should parse the result from a url', () => {
      const mockparse = jasmine.createSpy('parse').and.returnValue({
        'https://imgur.com/#access_token': 'access token',
        expires_in: '12345',
        token_type: 'token type',
        account_id: 'account id',
        refresh_token: 'refresh token',
        account_username: 'account username'
      })
      MockAuthorizationTask.__set__({
        querystring: {
          parse: mockparse
        }
      })
      const res = MockAuthorizationTask.parseTokenURL('url to parse')
      expect(mockparse).toHaveBeenCalledWith('url to parse')
      expect(res).toEqual({
        access_token: 'access token',
        expires_in: 12345,
        token_type: 'token type',
        account_id: 'account id',
        refresh_token: 'refresh token',
        account_username: 'account username'
      })
    })
  })
})
