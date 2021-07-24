const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const findDenizensByCityHandler = require('rewire')('../../../src/handlers/findDenizensByCity')

describe('handlers function findDenizensByCity', () => {
  const sandbox = createSandbox()
  const STATUS_CODES = { SUCCESS: 200 }
  const request = {}
  const response = {
    send: () => response,
    status: () => response
  }
  const denizens = {
    data: [{ id: 1, name: 'Selena' }, { id: 2, name: 'Eric' }]
  }
  const operatorError = new Error('Error in the operator layer')
  let findDenizensByCityOperator, next

  beforeEach(() => {
    sandbox.spy(response, 'send')
    sandbox.spy(response, 'status')
    next = sandbox.spy()

    findDenizensByCityOperator = sandbox.stub()
    findDenizensByCityOperator.resolves(denizens)

    findDenizensByCityHandler.__set__({
      STATUS_CODES,
      findDenizensByCity: findDenizensByCityOperator
    })
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should respond with a success status code', async () => {
    await findDenizensByCityHandler(request, response, next)

    expect(response.status).to.be.calledWith(200)
  })
  it('should respond with the results of the operator layer', async () => {
    await findDenizensByCityHandler(request, response, next)

    expect(response.send).to.be.calledWith(denizens)
  })
  it('should not send a response if the operator layer encounters an error', async () => {
    findDenizensByCityOperator.reset()
    findDenizensByCityOperator.rejects(operatorError)

    await findDenizensByCityHandler(request, response, next)

    expect(response.send).to.have.callCount(0)
  })
  it('should call next with any errors from the operator layer', async () => {
    findDenizensByCityOperator.reset()
    findDenizensByCityOperator.rejects(operatorError)

    await findDenizensByCityHandler(request, response, next)

    expect(next).to.have.been.calledWith(operatorError)
  })
})
