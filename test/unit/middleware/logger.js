const { createSandbox } = require('sinon')
const expect = require('../../helpers/expect')
const logger = require('rewire')('../../../src/middleware/logger')

describe('middleware logger', () => {
  describe('function customLogLevel', () => {
    const sandbox = createSandbox()
    let response = {}
    beforeEach(() => {
      response = {}

      const pinoHttp = sandbox.stub()
      pinoHttp.returnsArg(0)

      logger.__set__({ pinoHttp })
    })
    afterEach(() => {
      sandbox.restore()
    })
    it('should return "info" with a standard 200 response', () => {
      response.statusCode = 200
      expect(logger().customLogLevel(response)).to.equal('info')
    })
    it('should return "info" with a temporary redirect 302 response', () => {
      response.statusCode = 302
      expect(logger().customLogLevel(response)).to.equal('info')
    })
    it('should return "info" with a permenant redirect 301 response', () => {
      response.statusCode = 301
      expect(logger().customLogLevel(response)).to.equal('info')
    })
    it('should return "info" with a temporary redirect 302 response', () => {
      response.statusCode = 302
      expect(logger().customLogLevel(response)).to.equal('info')
    })
    it('should return "warn" for validation error 400 status', () => {
      response.statusCode = 400
      expect(logger().customLogLevel(response)).to.equal('warn')
    })
    it('should return "warn" for not found error 404 status', () => {
      response.statusCode = 404
      expect(logger().customLogLevel(response)).to.equal('warn')
    })
    it('should return "warn" for incorerct method error 405 status', () => {
      response.statusCode = 405
      expect(logger().customLogLevel(response)).to.equal('warn')
    })
    it('should return "error" for internal server error 500 status', () => {
      response.statusCode = 500
      expect(logger().customLogLevel(response)).to.equal('error')
    })
    it('should return "error" when there is an error and a 200 status', () => {
      response.statusCode = 200
      const error = new Error('some error')
      expect(logger().customLogLevel(response, error)).to.equal('error')
    })
    it('should return "error" when there is an error and a 500 status', () => {
      response.statusCode = 500
      const error = new Error('some error')
      expect(logger().customLogLevel(response, error)).to.equal('error')
    })
  })
})
