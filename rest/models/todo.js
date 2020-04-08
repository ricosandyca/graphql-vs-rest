const { model, Schema } = require('mongoose')

const TodoSchema = new Schema({
  title: String,
  description: String,
  done: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = model('todos', TodoSchema)
