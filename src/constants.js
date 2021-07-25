const f = Object.freeze

const CITIES = f({
  LONDON: 'London'
})

module.exports = f({
  CITIES,
  CITY_COORDINATES: f({
    [CITIES.LONDON]: f({ latitude: 51.509865, longitude: -0.118092 })
  }),
  DEFAULT_PORT: '3000',
  ERROR_MESSAGES: f({
    NOT_FOUND: 'Not found',
    INCORRECT_METHOD_PREFIX: 'Method not supported, must be type: ',
    INTERNAL_SERVER_ERROR: 'Internal server error'
  }),
  STATUS_CODES: f({
    SUCCESS: 200,
    NOT_FOUND: 404,
    INCORRECT_METHOD: 405,
    INTERNAL_SERVER_ERROR: 500
  }),
  HEALTHY_STATUS_MESSAGE: 'Healthy',
  MAX_RANGE: 80467.2, // 50 miles in metres
  ROUTES: f({
    HEALTHCHECK: '/healthcheck',
    FIND_DENIZENS_BY_CITY: '/find-denizens/city/London'
  }),
  USERS_API: f({
    ALL_USERS_PATH: '/users',
    BASE_URL: 'https://bpdts-test-app.herokuapp.com',
    USERS_LIVING_IN_CITY_PATH: '/city/{city}/users',
    USER_PATH: '/user/{id}'
  })
})
