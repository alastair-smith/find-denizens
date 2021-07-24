const { get } = require('axios')
const { USERS_API } = require('../constants')
const isInRangeOfCity = require('./isInRangeOfCity')

module.exports = async city => {
  const url = `${USERS_API.BASE_URL}${USERS_API.ALL_USERS_PATH}`
  const users = (await get(url)).data
  const userIDs = users
    .filter(isInRangeOfCity(city))
    .map(({ id }) => id)

  return userIDs
}
