const express = require('express')
const loggerMiddleware = require('express-pino-logger')
const { DEFAULT_PORT, ROUTES } = require('./constants')
const handlers = {
  healthcheck: require('./handlers/healthcheck')
}

module.exports = () => {
  const port = process.env.PORT || DEFAULT_PORT
  const app = express()

  app.use(loggerMiddleware())

  app
    .route(ROUTES.HEALTHCHECK)
    .get(handlers.healthcheck)

  app.listen(port)
  console.log(`Server started on port ${port}`)

  return app
}
