const { expect } = require('../helpers/expect')
const { createSandbox } = require('sinon')
const server = require('rewire')('../../src/server')

describe('function server', () => {
  const sandbox = createSandbox()
  const app = {
    route: () => {},
    listen: () => {}
  }
  const DEFAULT_PORT = '8000'

  beforeEach(() => {
    sandbox.stub(console, 'log')

    sandbox.stub(app, 'route')
    sandbox.spy(app, 'listen')

    const express = sandbox.stub()
    express.returns(app)

    server.__set__({ DEFAULT_PORT, express })
  })
  afterEach(() => {
    delete process.env.PORT
    sandbox.restore()
  })

  it('should start an app on the port specified by environment variable', () => {
    const port = '8080'
    process.env.PORT = port

    server()

    expect(app.listen).to.have.been.calledWith(port)
  })
  it('should start an app on the default port if no environment variable is specified', () => {
    server()

    expect(app.listen).to.have.been.calledWith(DEFAULT_PORT)
  })
  it('should log that the service has started', () => {
    server()

    expect(console.log).to.have.been.calledAfter(app.listen).calledWith(`Server started on port ${DEFAULT_PORT}`)
  })
  it('should return the express app', () => {
    expect(server()).to.be.deep.equal(app)
  })
})
