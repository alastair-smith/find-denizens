const { CITIES } = require('../constants')
const getUsersLivingInCity = require('../helpers/getUsersLivingInCity')
const getUserIDsInRangeOfCity = require('../helpers/getUserIDsInRangeOfCity')

module.exports = async () => {
  const city = CITIES.LONDON

  const usersLivingInCity = getUsersLivingInCity(city)
  const usersInRangeOfCity = getUserIDsInRangeOfCity(city)

  const denizens = (await Promise.all([usersLivingInCity, usersInRangeOfCity]))
    .flat()

  return { data: denizens }
}
