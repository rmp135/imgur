import { APIResponse } from '../__test/RequestTasks';
import * as Client from './Client'
import * as rewire from 'rewire'
import { TwoStageAuthReturn } from './AuthorizationTasks'

const RewireClient = rewire('./Client')
const MockClient: typeof Client & typeof RewireClient = <any> RewireClient;

describe('Client', () => {
  describe('Construction', () => {
    it('should construct with blank info', () => {
      const client = new Client.default()
      expect(client.access_token).toEqual('')
      expect(client.client_id).toEqual('')
      expect(client.refresh_token).toEqual('')
      expect(client.client_secret).toEqual('')
    })
    it('should construct with only the access_token', () => {
      const client = new Client.default('access_token')
      expect(client.client_id).toEqual('access_token')
      expect(client.access_token).toEqual('')
      expect(client.refresh_token).toEqual('')
      expect(client.client_secret).toEqual('')
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
        const C = new MockClient.default()
        MockClient.__with__({
          AuthorizationTasks: {
            regenerateFromRefreshToken: mockRegenerateFromRefreshToken
          }
        })(() => {
          const res = C.Authorize.regenerateFromRefreshToken('refresh_token')
          expect(mockRegenerateFromRefreshToken).toHaveBeenCalledWith(C, 'refresh_token')
          expect(res).toBe(mockReturn)
        })
      })
    })
    describe('byPin', () => {
      it('should call twoStageAuth with the application state', () => {
        const mockReturn = {} as TwoStageAuthReturn
        const mocktwoStageAuth = jasmine.createSpy('mocktwoStageAuth').and.returnValue(mockReturn)
        
        const C = new MockClient.default()
        MockClient.__with__({
          AuthorizationTasks: {
            twoStageAuth: mocktwoStageAuth
          }
        })(() => {
          const res = C.Authorize.byPIN('state')
          expect(mocktwoStageAuth).toHaveBeenCalledWith(C, 'pin', 'pin', 'state')
          expect(res).toBe(mockReturn)
        })
      })
    })
    describe('byCode', () => {
      it('should call twoStageAuth with the application state', () => {
        const mockReturn = {} as TwoStageAuthReturn
        const mocktwoStageAuth = jasmine.createSpy('mocktwoStageAuth').and.returnValue(mockReturn)
        
        const C = new MockClient.default()
        MockClient.__with__({
          AuthorizationTasks: {
            twoStageAuth: mocktwoStageAuth
          }
        })(() => {
          const res = C.Authorize.byCode('state')
          expect(mocktwoStageAuth).toHaveBeenCalledWith(C, 'authorization_code', 'code', 'state')
          expect(res).toBe(mockReturn)
        })
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
        const C = new MockClient.default()
        MockClient.__with__({
          AuthorizationTasks: {
            generateTokenURL: mockGenerateTokenURL
          }
        })(() => {
          const res = C.Authorize.byToken('state')
          expect(mockGenerateTokenURL).toHaveBeenCalledWith(C, 'state')
          expect(res.url).toBe('url')
          expect(res.parse)
        })
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
        const C = new MockClient.default()
        MockClient.__with__({
          AuthorizationTasks: {
            generateTokenURL: mockGenerateTokenURL,
            parseTokenURL: mockParseTokenURL
          }
        })(() => {
          const res = C.Authorize.byToken('state')
          expect(mockGenerateTokenURL).toHaveBeenCalledWith(C, 'state')
          const parsed = res.parse('url')
          expect(mockParseTokenURL).toHaveBeenCalledWith('url')
          expect(parsed).toBe(mockParseTokenURLReturn)
          expect(C.access_token).toBe('access_token')
          expect(C.refresh_token).toBe('refresh_token')
        })
      })
    })
    describe('Account', () => {
      describe('get', () => {
        it('should call with just a username', () => {
          const mockGetReturn = {} as Promise<APIResponse<AccountResponse>>
          const mockGet = jasmine.createSpy('get').and.returnValue(mockGetReturn)

          const C = new MockClient.default()
          MockClient.__with__({
            Account: {
              get: mockGet
            }
          })(() => {
            const res = C.Account.get('username')
            expect(mockGet).toHaveBeenCalledWith(C, 'username')
            expect(res).toEqual(mockGetReturn)
          })
        })
        it('should call with no parameter username', () => {
          const mockGetReturn = {} as Promise<APIResponse<AccountResponse>>
          const mockGet = jasmine.createSpy('get').and.returnValue(mockGetReturn)

          const C = new MockClient.default()
          MockClient.__with__({
            Account: {
              get: mockGet
            }
          })(() => {
            const res = C.Account.get()
            expect(mockGet).toHaveBeenCalledWith(C, undefined)
            expect(res).toEqual(mockGetReturn)
          })
        })
      })
      describe('favorites', () => {
        it('should call with just a username', () => {
          const mockFavoritesReturn = {} as Promise<APIResponse<BaseGalleryResponse[]>>
          const mockFavorites = jasmine.createSpy('get').and.returnValue(mockFavoritesReturn)

          const C = new MockClient.default()
          MockClient.__with__({
            Account: {
              accountFavorites: mockFavorites
            }
          })(() => {
            const res = C.Account.favorites('username')
            expect(mockFavorites).toHaveBeenCalledWith(C, 'username')
            expect(res).toEqual(mockFavoritesReturn)
          })
        })
        it('should call with some options', () => {
          const mockFavoritesReturn = {} as Promise<APIResponse<BaseGalleryResponse[]>>
          const mockFavorites = jasmine.createSpy('get').and.returnValue(mockFavoritesReturn)

          const C = new MockClient.default()
          MockClient.__with__({
            Account: {
              accountFavorites: mockFavorites
            }
          })(() => {
            const res = C.Account.favorites({ username: 'something' })
            expect(mockFavorites).toHaveBeenCalledWith(C, { username: 'something' })
            expect(res).toEqual(mockFavoritesReturn)
          })
        })
      })
    })
  })
})
