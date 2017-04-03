import Client from './Client'
import * as rewire from 'rewire'

describe('Client', () => {
  describe('Construction', () => {
    it('should construct with blank info', () => {
      const client = new Client()
      expect(client.access_token).toEqual('')
      expect(client.client_id).toEqual('')
      expect(client.refresh_token).toEqual('')
      expect(client.client_secret).toEqual('')
    })
    it('should construct with only the client_id', () => {
      const client = new Client('client_id')
      expect(client.client_id).toEqual('client_id')
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
      const client = new Client(config)
      expect(client.access_token).toEqual('access_token')
      expect(client.client_id).toEqual('client_id')
      expect(client.refresh_token).toEqual('refresh_token')
      expect(client.client_secret).toEqual('client_secret')
    })
  })
})
