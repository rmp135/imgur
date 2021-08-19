import Client from '../Client';
import * as Credits from './Credits';
import rewire from 'rewire';

let RewireCredits = rewire('./Credits')
const MockCredits: typeof Credits & typeof RewireCredits = <any> RewireCredits

describe('Credits', () => {
  const client = new Client()
  let mockPerformAPIRequest: Function
  const mockCredits = {
    data: {
      UserLimit: 23,
      UserRemaining: 44,
      UserReset: 1000,
      ClientLimit: 112,
      ClientRemaining: 999
    }
  }
  beforeEach(() => {
    RewireCredits = rewire('./Credits')
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue(mockCredits)
    MockCredits.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('default', () => {
    it('should get and set the credits', async () => {
      jasmine.clock().mockDate(new Date(2017, 8, 11, 1, 1, 1))
      const res = await MockCredits.get(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['credits'])
      expect(client.RateLimits.user_limit).toBe(23)
      expect(client.RateLimits.user_remaining).toBe(44)
      expect(client.RateLimits.user_reset).toEqual(new Date(2017, 8, 11, 1, 1, 2))
      expect(client.RateLimits.client_limit).toBe(112)
      expect(client.RateLimits.client_remaining).toBe(999)
      expect(res).toBe(mockCredits as any)
    })
  })
})
