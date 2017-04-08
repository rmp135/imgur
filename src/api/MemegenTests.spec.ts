import Client from '../Client';
import * as Memegen from './Memegen';
import * as rewire from 'rewire';

let RewireMemegen = rewire('./Memegen')
const MockMemegen: typeof Memegen & typeof RewireMemegen = <any> RewireMemegen

describe('Memegen', () => {
  let mockPerformAPIRequest: Function
  const client = new Client()
  beforeEach(() => {
    mockPerformAPIRequest = jasmine.createSpy('performAPIRequest').and.returnValue('mock return')
    RewireMemegen = rewire('./Memegen')
    MockMemegen.__set__({
      RequestTasks_1: {
        performAPIRequest: mockPerformAPIRequest
      }
    })
  })
  describe('defaults', () => {
    it('should call the api', () => {
      const res = MockMemegen.defaults(client)
      expect(mockPerformAPIRequest).toHaveBeenCalledWith(client, ['memegen', 'defaults'])
      expect(res).toBe('mock return' as any)
    })
  })
})
