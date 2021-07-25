const { CITIES } = require('../constants')
const getUsersLivingInCity = require('../helpers/getUsersLivingInCity')
const getUserIDsInRangeOfCity = require('../helpers/getUserIDsInRangeOfCity')
const getUserFromID = require('../helpers/getUserFromID')

module.exports = async () => {
  const city = CITIES.LONDON

  const [usersLivingInCity, userIDsInRangeOfCity] = await Promise.all([
    getUsersLivingInCity(city),
    getUserIDsInRangeOfCity(city)
  ])

  const usersInRangeNotLivingInCity = await Promise.all(userIDsInRangeOfCity
    .filter(rangeUserID => !usersLivingInCity.some(
      ({ id: livingUserID }) => livingUserID === rangeUserID
    ))
    .map(getUserFromID))

  const denizens = [...usersLivingInCity, ...usersInRangeNotLivingInCity]

  return { data: denizens }
}
