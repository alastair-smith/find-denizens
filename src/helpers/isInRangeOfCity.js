const { isPointWithinRadius } = require('geolib')
const { CITY_COORDINATES, MAX_RANGE } = require('../constants')

module.exports = city => ({ latitude, longitude }) =>
  isPointWithinRadius(
    { latitude, longitude },
    CITY_COORDINATES[city],
    MAX_RANGE
  )
