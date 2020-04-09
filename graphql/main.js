const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const gql = require('express-graphql')
const GraphQLSchema = require('./graphql')

const app = express()
const PORT = process.env.PORT || 4000
const DEV = process.env.NODE_ENV === 'development'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/graphql-vs-rest'

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.log)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', gql({
  schema: GraphQLSchema,
  graphiql: DEV
}))

app.listen(PORT, () => console.log('Server running on port', PORT))
