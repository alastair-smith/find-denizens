const { HEALTHY_STATUS_MESSAGE } = require('../constants')

module.exports = (request, response) => {
  response.status(200).send({ status: HEALTHY_STATUS_MESSAGE })
}
