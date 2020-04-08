const mongoose = require('mongoose')
const { Todo } = require('../models')

const TodoDatas = [
  {
    title: 'Todo 1',
    description: 'Lorem ipsum dolor sit amet',
    done: false
  },
  {
    title: 'Todo 2',
    description: 'Lorem ipsum dolor sit amet',
    done: true
  },
  {
    title: 'Todo 3',
    description: 'Lorem ipsum dolor sit amet',
    done: false
  }
]

async function run () {
  const clear = process.argv[2] === 'clear'
  if (!clear) {
    console.log('Data has been created')
    await Todo.insertMany(TodoDatas)
  } else {
    // clear all data
    await Todo.deleteMany({})
    console.log('All data has been deleted')
  }
  process.exit(0)
}

// create connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/graphql-vs-rest'
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(run)
  .catch(console.log)
