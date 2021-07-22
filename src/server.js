const express = require('express')
const { DEFAULT_PORT } = require('./constants')

module.exports = () => {
  const port = process.env.PORT || DEFAULT_PORT
  const app = express()

  app.listen(port)
  console.log(`Server started on port ${port}`)

  return app
}
