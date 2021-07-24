const express = require('express')
const loggerMiddleware = require('./middleware/logger')
const { DEFAULT_PORT, ROUTES } = require('./constants')
const handlers = {
  healthcheck: require('./handlers/healthcheck')
}

module.exports = async () => {
  const port = process.env.PORT || DEFAULT_PORT
  const app = express()

  app.disable('x-powered-by')

  app.use(loggerMiddleware())

  app
    .route(ROUTES.HEALTHCHECK)
    .get(handlers.healthcheck)

  await new Promise(resolve => app.listen(port, resolve))
  console.log(`Server started on port ${port}`)

  return app
}
