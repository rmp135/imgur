import { expect } from 'chai'
import { describe } from 'mocha'
import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import Client from './Client'
import * as rewire from 'rewire'

describe('Client', () => {
  @suite class Construction {
    @test 'should construct with blank info' () {
      const client = new Client()
      expect(client.access_token).to.equal('')
      expect(client.client_id).to.equal('')
      expect(client.refresh_token).to.equal('')
      expect(client.client_secret).to.equal('')
    }
    @test 'should construct with only the client_id' () {
      const client = new Client('client_id')
      expect(client.client_id).to.equal('client_id')
      expect(client.access_token).to.equal('')
      expect(client.refresh_token).to.equal('')
      expect(client.client_secret).to.equal('')
    }
    @test 'should construct with config' () {
      const config : ClientConfig = {
        access_token: 'access_token',
        client_id: 'client_id',
        client_secret: 'client_secret',
        refresh_token: 'refresh_token'
      }
      const client = new Client(config)
      expect(client.access_token).to.equal('access_token')
      expect(client.client_id).to.equal('client_id')
      expect(client.refresh_token).to.equal('refresh_token')
      expect(client.client_secret).to.equal('client_secret')
    }
  }
})