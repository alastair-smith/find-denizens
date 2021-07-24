const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const errorHandler = require('rewire')('../../../src/handlers/error')

describe('handlers function error', () => {
  const sandbox = createSandbox()
  const ERROR_MESSAGES = { INTERNAL_SERVER_ERROR: 'Internal server error' }
  const STATUS_CODES = { INTERNAL_SERVER_ERROR: 500 }
  const request = {}
  let response, next
  const appError = new Error('some internal error not to be shared with the user')

  beforeEach(() => {
    response = {
      send: () => response,
      status: () => response
    }
    sandbox.spy(response, 'send')
    sandbox.spy(response, 'status')
    next = sandbox.spy()

    errorHandler.__set__({ ERROR_MESSAGES, STATUS_CODES })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return the correct status', () => {
    errorHandler(appError, request, response, next)

    expect(response.status).to.have.been.calledOnceWith(500)
  })
  it('should return a json with basic error information', () => {
    errorHandler(appError, request, response, next)

    expect(response.send).to.have.been.calledAfter(response.status).calledWith({ error: 'Internal server error' })
  })
  it('should add the error to the response for the logging middleware', () => {
    errorHandler(appError, request, response, next)

    expect(response).to.have.property('err').deep.equal(appError)
  })
  it('should not re-send the response if the headers have already been sent', () => {
    response.headersSent = true
    errorHandler(appError, request, response, next)

    expect(response.send).to.have.callCount(0)
  })
})
