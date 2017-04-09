import * as Client from './Client'
import * as rewire from 'rewire'
import { TwoStageAuthReturn } from './AuthorizationTasks'

let RewireClient = rewire('./Client')
const MockClient: typeof Client & typeof RewireClient = <any> RewireClient;

describe('Client', () => {
  beforeEach(() => {
    RewireClient = rewire('./Client')
  })
  describe('Construction', () => {
    it('should construct with blank info', () => {
      const client = new Client.default()
      expect(client.access_token).toBeNull()
      expect(client.client_id).toBeNull()
      expect(client.refresh_token).toBeNull()
      expect(client.client_secret).toBeNull()
    })
    it('should construct with only the access_token', () => {
      const client = new Client.default('access_token')
      expect(client.client_id).toEqual('access_token')
      expect(client.access_token).toBeNull()
      expect(client.refresh_token).toBeNull()
      expect(client.client_secret).toBeNull()
    })
    it('should construct with config', () => {
      const config = {
        access_token: 'access_token',
        client_id: 'client_id',
        client_secret: 'client_secret',
        refresh_token: 'refresh_token'
      }
      const client = new Client.default(config)
      expect(client.access_token).toEqual('access_token')
      expect(client.client_id).toEqual('client_id')
      expect(client.refresh_token).toEqual('refresh_token')
      expect(client.client_secret).toEqual('client_secret')
    })
  })
  describe('Authorization', () => {
    describe('regenerateFromRefreshToken', () => {
      it('should regenerate', () => {
        const mockReturn = {} as Promise<RequestTokenResponse>
        const mockRegenerateFromRefreshToken = jasmine.createSpy('regenerateFromRefreshToken').and.returnValue(mockReturn)
        const client = new MockClient.default()
        MockClient.__set__({
          AuthorizationTasks: {
            regenerateFromRefreshToken: mockRegenerateFromRefreshToken
          }
        })
        const res = client.Authorize.regenerateFromRefreshToken('refresh_token')
        expect(mockRegenerateFromRefreshToken).toHaveBeenCalledWith(client, 'refresh_token')
        expect(res).toBe(mockReturn)
      })
    })
    describe('byPin', () => {
      it('should call twoStageAuth with the application state', () => {
        const mockReturn = {} as TwoStageAuthReturn
        const mocktwoStageAuth = jasmine.createSpy('mocktwoStageAuth').and.returnValue(mockReturn)
        
        const client = new MockClient.default()
        MockClient.__set__({
          AuthorizationTasks: {
            twoStageAuth: mocktwoStageAuth
          }
        })
        const res = client.Authorize.byPIN('state')
        expect(mocktwoStageAuth).toHaveBeenCalledWith(client, 'pin', 'pin', 'state')
        expect(res).toBe(mockReturn)
      })
    })
    describe('byCode', () => {
      it('should call twoStageAuth with the application state', () => {
        const mockReturn: any = {
          url: 'url',
          authorize: () => {}
        }
        const mocktwoStageAuth = jasmine.createSpy('mocktwoStageAuth').and.returnValue(mockReturn)
        
        const client = new MockClient.default()
        MockClient.__set__({
          AuthorizationTasks: {
            twoStageAuth: mocktwoStageAuth
          }
        })
        const res = client.Authorize.byCode('state')
        expect(mocktwoStageAuth).toHaveBeenCalledWith(client, 'authorization_code', 'code', 'state')
        expect(res.url).toBe('url')
      })
      it('should parse the code url and authorize', () => {
        const mockAuthorize = jasmine.createSpy('authorize').and.returnValue('auth')
        const mockReturn: any = {
          url: 'url',
          authorize: mockAuthorize
        }
        const mocktwoStageAuth = jasmine.createSpy('twoStageAuth').and.returnValue(mockReturn)
        const mockParseCodeURL = jasmine.createSpy('parseCodeURL').and.returnValue('12345')
        const client = new MockClient.default()
        MockClient.__set__({
          AuthorizationTasks: {
            twoStageAuth: mocktwoStageAuth,
            parseCodeURL: mockParseCodeURL
          }
        })
        const res = client.Authorize.byCode('state')
        expect(mocktwoStageAuth).toHaveBeenCalledWith(client, 'authorization_code', 'code', 'state')
        const authRes = res.authorize('http://example.com?code=12345')
        expect(mockParseCodeURL).toHaveBeenCalledWith('http://example.com?code=12345')
        expect(mockAuthorize).toHaveBeenCalledWith('12345')
        expect(authRes).toBe('auth' as any)
      })
    })
    describe('byToken', () => {
      it('should return the url', () => {
        const mockGenerateTokenURLReturn = 'url'
        const mockGenerateTokenURL = jasmine.createSpy('generateTokenURL').and.returnValue(mockGenerateTokenURLReturn)

        const mockReturn = {
          url: 'url',
          parse: (token: string): RequestTokenResponse => {
            return ({} as RequestTokenResponse)
          }
        }
        const client = new MockClient.default()
        MockClient.__set__({
          AuthorizationTasks: {
            generateTokenURL: mockGenerateTokenURL
          }
        })
        const res = client.Authorize.byToken('state')
        expect(mockGenerateTokenURL).toHaveBeenCalledWith(client, 'state')
        expect(res.url).toBe('url')
      })
      it('should return the parsing function', () => {
        const mockParseTokenURLReturn =  {
          access_token: 'access_token',
          refresh_token: 'refresh_token'
        } as RequestTokenResponse
        const mockParseTokenURL = jasmine.createSpy('parseTokenURL').and.returnValue(mockParseTokenURLReturn)
        const mockGenerateTokenURLReturn = 'url'
        const mockGenerateTokenURL = jasmine.createSpy('generateTokenURL').and.returnValue(mockGenerateTokenURLReturn)

        const mockReturn = {
          url: 'url',
          parse: (token: string): RequestTokenResponse => {
            return ({} as RequestTokenResponse)
          }
        }
        const client = new MockClient.default()
        MockClient.__set__({
          AuthorizationTasks: {
            generateTokenURL: mockGenerateTokenURL,
            parseTokenURL: mockParseTokenURL
          }
        })
        const res = client.Authorize.byToken('state')
        expect(mockGenerateTokenURL).toHaveBeenCalledWith(client, 'state')
        const parsed = res.authorize('url')
        expect(mockParseTokenURL).toHaveBeenCalledWith('url')
        expect(parsed).toBe(mockParseTokenURLReturn)
        expect(client.access_token).toBe('access_token')
        expect(client.refresh_token).toBe('refresh_token')
      })
    })
  })
})
