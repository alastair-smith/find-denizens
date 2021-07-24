const CITIES = {
  LONDON: 'London'
}

module.exports = Object.freeze({
  CITIES,
  CITY_COORDINATES: {
    [CITIES.LONDON]: { latitude: 51.509865, longitude: -0.118092 }
  },
  DEFAULT_PORT: '3000',
  ERROR_MESSAGES: {
    NOT_FOUND: 'Not found',
    INCORRECT_METHOD_PREFIX: 'Method not supported, must be type: ',
    INTERNAL_SERVER_ERROR: 'Internal server error'
  },
  STATUS_CODES: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INCORRECT_METHOD: 405,
    INTERNAL_SERVER_ERROR: 500
  },
  HEALTHY_STATUS_MESSAGE: 'Healthy',
  MAX_RANGE: 80467.2, // 50 miles in metres
  ROUTES: {
    HEALTHCHECK: '/healthcheck',
    FIND_DENIZENS_BY_CITY: '/find-denizens/city/London'
  },
  USERS_API: {
    ALL_USERS_PATH: '/users',
    BASE_URL: 'https://bpdts-test-app.herokuapp.com',
    USERS_LIVING_IN_CITY_PATH: '/city/{city}/users'
  }
})
