const { STATUS_CODES } = require('../constants')
const findDenizensByCity = require('../operators/findDenizensByCity')

module.exports = async (request, response, next) => {
  try {
    const denizens = await findDenizensByCity()
    response
      .status(STATUS_CODES.SUCCESS)
      .send(denizens)
  } catch (error) {
    next(error)
  }
}
