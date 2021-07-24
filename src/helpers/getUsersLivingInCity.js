const { get } = require('axios')
const { USERS_API } = require('../constants')

module.exports = async city => {
  const url = `${USERS_API.BASE_URL}${USERS_API.USERS_LIVING_IN_CITY_PATH.replace('{city}', city)}`
  const users = (await get(url)).data
  const usersWithFullDetail = users.map(user => ({ city, ...user }))

  return usersWithFullDetail
}
