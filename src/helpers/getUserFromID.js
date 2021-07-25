const { get } = require('axios')
const { USERS_API } = require('../constants')

module.exports = async id => {
  const url = `${USERS_API.BASE_URL}${USERS_API.USER_PATH.replace('{id}', id)}`
  const user = (await get(url)).data

  return user
}
