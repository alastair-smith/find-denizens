const { createSandbox } = require('sinon')
const { expect } = require('../../helpers/expect')
const healthcheck = require('rewire')('../../../src/handlers/healthcheck')

describe('handlers function healthcheck', () => {
  const sandbox = createSandbox()
  const HEALTHY_STATUS_MESSAGE = 'Service is healthy'
  const request = {}
  const response = {
    send: () => response,
    status: () => response
  }

  beforeEach(() => {
    sandbox.spy(response, 'send')
    sandbox.spy(response, 'status')

    healthcheck.__set__({ HEALTHY_STATUS_MESSAGE })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return a 200 status', () => {
    healthcheck(request, response)

    expect(response.status).to.have.been.calledOnceWith(200)
  })
  it('should return a json with a healthy status message', () => {
    healthcheck(request, response)

    expect(response.send).to.have.been.calledAfter(response.status).calledWith({ status: HEALTHY_STATUS_MESSAGE })
  })
})
