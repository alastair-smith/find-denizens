const pinoHttp = require('pino-http')

module.exports = () => pinoHttp({
  customLogLevel: (response, error) => {
    if (response.statusCode >= 500 || error) return 'error'
    if (response.statusCode >= 400) return 'warn'
    return 'info'
  }
})
