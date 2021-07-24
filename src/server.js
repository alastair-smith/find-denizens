const express = require('express')
const loggerMiddleware = require('./middleware/logger')
const { DEFAULT_PORT, ROUTES } = require('./constants')
const handlers = {
  error: require('./handlers/error'),
  healthcheck: require('./handlers/healthcheck'),
  incorrectMethod: require('./handlers/incorrectMethod'),
  notFound: require('./handlers/notFound')
}

module.exports = async () => {
  const port = process.env.PORT || DEFAULT_PORT
  const app = express()

  app.disable('x-powered-by')

  app.use(loggerMiddleware())

  app
    .route(ROUTES.HEALTHCHECK)
    .get(handlers.healthcheck)
    .all(handlers.incorrectMethod('GET'))

  app.use(handlers.notFound)
  app.use(handlers.error)

  await new Promise(resolve => app.listen(port, resolve))
  console.log(`Server started on port ${port}`)

  return app
}
