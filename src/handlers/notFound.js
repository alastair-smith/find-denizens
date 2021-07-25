const { ERROR_MESSAGES, STATUS_CODES } = require('../constants')

module.exports = (request, response) =>
  response
    .status(STATUS_CODES.NOT_FOUND)
    .send({ error: ERROR_MESSAGES.NOT_FOUND })
