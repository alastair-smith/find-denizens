const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const notFound = require('rewire')('../../../src/handlers/notFound')

describe('handlers function notFound', () => {
  const sandbox = createSandbox()
  const ERROR_MESSAGES = { NOT_FOUND: 'not found' }
  const STATUS_CODES = { NOT_FOUND: 404 }
  const request = {}
  const response = {
    send: () => response,
    status: () => response
  }

  beforeEach(() => {
    sandbox.spy(response, 'send')
    sandbox.spy(response, 'status')

    notFound.__set__({ ERROR_MESSAGES, STATUS_CODES })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should return the correct status', () => {
    notFound(request, response)

    expect(response.status).to.have.been.calledOnceWith(404)
  })
  it('should return a json with basic error information', () => {
    notFound(request, response)

    expect(response.send).to.have.been.calledAfter(response.status).calledWith({ error: 'not found' })
  })
})
