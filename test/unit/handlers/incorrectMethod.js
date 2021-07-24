const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const incorrectMethod = require('rewire')('../../../src/handlers/incorrectMethod')

describe('handlers function notFound', () => {
  const sandbox = createSandbox()
  const ERROR_MESSAGES = { INCORRECT_METHOD_PREFIX: 'Must be method: ' }
  const STATUS_CODES = { INCORRECT_METHOD: 405 }
  const request = {}
  const response = {
    send: () => response,
    status: () => response
  }

  beforeEach(() => {
    sandbox.spy(response, 'send')
    sandbox.spy(response, 'status')

    incorrectMethod.__set__({ ERROR_MESSAGES, STATUS_CODES })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return the correct status when configured for GET', () => {
    incorrectMethod('GET')(request, response)

    expect(response.status).to.have.been.calledOnceWith(405)
  })
  it('should return a json with basic error information when configured for GET', () => {
    incorrectMethod('GET')(request, response)

    expect(response.send).to.have.been.calledAfter(response.status).calledWith({ error: 'Must be method: GET' })
  })
  it('should return the correct status when configured for POST', () => {
    incorrectMethod('POST')(request, response)

    expect(response.status).to.have.been.calledOnceWith(405)
  })
  it('should return a json with basic error information when configured for POST', () => {
    incorrectMethod('POST')(request, response)

    expect(response.send).to.have.been.calledAfter(response.status).calledWith({ error: 'Must be method: POST' })
  })
})
