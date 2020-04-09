const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./api')

const app = express()
const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/graphql-vs-rest'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.log)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)

app.listen(PORT, () => console.log('Server running on port', PORT))
