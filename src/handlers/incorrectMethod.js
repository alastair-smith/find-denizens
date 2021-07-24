const { ERROR_MESSAGES, STATUS_CODES } = require('../constants')

module.exports = supportedMethod => (request, response) =>
  response
    .status(STATUS_CODES.INCORRECT_METHOD)
    .send({
      error: `${ERROR_MESSAGES.INCORRECT_METHOD_PREFIX}${supportedMethod}`
    })
