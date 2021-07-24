module.exports = Object.freeze({
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
  ROUTES: {
    HEALTHCHECK: '/healthcheck',
    FIND_DENIZENS_BY_CITY: '/find-denizens/city/:city'
  }
})
