const { HEALTHY_STATUS_MESSAGE, STATUS_CODES } = require('../constants')

module.exports = (request, response) => {
  response
    .status(STATUS_CODES.SUCCESS)
    .send({ status: HEALTHY_STATUS_MESSAGE })
}
