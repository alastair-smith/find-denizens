const { ERROR_MESSAGES, STATUS_CODES } = require('../constants')

module.exports = (error, request, response, next) => {
  response.err = error

  return response.headersSent
    ? next(error)
    : response
      .status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
      .send({ error: STATUS_CODES.INTERNAL_SERVER_ERROR })
}
