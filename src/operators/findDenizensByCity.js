const { CITIES } = require('../constants')
const getUsersLivingInCity = require('../helpers/getUsersLivingInCity')

module.exports = async () => {
  const usersLivingInCity = await getUsersLivingInCity(CITIES.LONDON)

  return { data: usersLivingInCity }
}
