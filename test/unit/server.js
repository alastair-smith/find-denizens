const { createSandbox } = require('sinon')
const { expect } = require('../helpers/expect')
const server = require('rewire')('../../src/server')

describe('function server', () => {
  const sandbox = createSandbox()
  const app = {
    disable: () => {},
    route: () => {},
    listen: () => {},
    use: () => {}
  }
  const loggerMiddlewareInstance = 'LOGGER_MIDDLEWARE_INSTANCE'
  const DEFAULT_PORT = '8000'
  const ROUTES = {
    HEALTHCHECK: '/health'
  }
  const handlers = {
    healthcheck: () => 'healthcheck'
  }

  class StubbedRoute {
    createStubs () {
      this.get = sandbox.stub()
      this.all = sandbox.stub()

      this.get.returns(this)
      this.all.returns(this)
    }
  }
  const healthcheckRoute = new StubbedRoute()

  beforeEach(() => {
    sandbox.stub(console, 'log')

    sandbox.spy(app, 'disable')
    sandbox.stub(app, 'route')
    sandbox.stub(app, 'listen')
    sandbox.spy(app, 'use')

    app.listen.callsArg(1)

    healthcheckRoute.createStubs()
    app.route.withArgs(ROUTES.HEALTHCHECK).returns(healthcheckRoute)

    const express = sandbox.stub()
    express.returns(app)

    server.__set__({
      DEFAULT_PORT,
      ROUTES,
      express,
      handlers,
      loggerMiddleware: () => loggerMiddlewareInstance
    })
  })
  afterEach(() => {
    delete process.env.PORT
    sandbox.restore()
  })

  it('should start an app on the port specified by environment variable', async () => {
    const port = '8080'
    process.env.PORT = port

    await server()

    expect(app.listen).to.have.been.calledWith(port)
  })
  it('should start an app on the default port if no environment variable is specified', async () => {
    await server()

    expect(app.listen).to.have.been.calledWith(DEFAULT_PORT)
  })
  it('should log that the service has started', async () => {
    await server()

    expect(console.log).to.have.been.calledAfter(app.listen).calledWith(`Server started on port ${DEFAULT_PORT}`)
  })
  it('should return the express app', async () => {
    expect(await server()).to.be.deep.equal(app)
  })
  it('should have a healthcheck GET route', async () => {
    await server()

    expect(app.route).to.be.calledWith(ROUTES.HEALTHCHECK)
    expect(healthcheckRoute.get).to.be.calledBefore(app.listen).calledOnceWithExactly(handlers.healthcheck)
  })
  it('should log requests', async () => {
    await server()

    expect(app.use).to.be.calledBefore(app.route).calledWith(loggerMiddlewareInstance)
  })
  it('should not disclose unneccessery information about the service in response headers', async () => {
    await server()

    expect(app.disable).to.be.calledWith('x-powered-by')
  })
})
