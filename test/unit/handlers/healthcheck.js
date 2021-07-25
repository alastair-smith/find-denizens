const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const healthcheck = require('rewire')('../../../src/handlers/healthcheck')

describe('handlers function healthcheck', () => {
  const sandbox = createSandbox()
  const HEALTHY_STATUS_MESSAGE = 'Service is healthy'
  const STATUS_CODES = { SUCCESS: 200 }
  const request = {}
  const response = {
    send: () => response,
    status: () => response
  }

  beforeEach(() => {
    sandbox.spy(response, 'send')
    sandbox.spy(response, 'status')

    healthcheck.__set__({ HEALTHY_STATUS_MESSAGE, STATUS_CODES })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return a success status code', () => {
    healthcheck(request, response)

    expect(response.status).to.have.been.calledOnceWith(STATUS_CODES.SUCCESS)
  })
  it('should return a json with a healthy status message', () => {
    healthcheck(request, response)

    expect(response.send).to.have.been.calledAfter(response.status).calledWith({ status: HEALTHY_STATUS_MESSAGE })
  })
})
