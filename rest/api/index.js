const { Router } = require('express')
const { Todo } = require('../models')

const router = Router()

router
  .route('/todos/:_id?')
  .get(async ({ params: { _id } }, res) => {
    if (!_id) {
      // fetch all data
      res.send({
        data: await Todo.find({})
      })
    } else {
      // fetch selected data by _id
      res.send({
        data: await Todo.findById(_id)
      })
    }
  })
  .post(async ({ body: data }, res) => {
    const newTodo = new Todo(data)
    res.send({
      data: await newTodo.save()
    })
  })
  .put(async ({ params: { _id }, body: data }, res) => {
    res.send({
      data: await Todo
        .findByIdAndUpdate(_id, data, { new: true })
    })
  })
  .delete(async ({ params: { _id } }, res) => {
    res.send({
      data: await Todo
        .findByIdAndDelete(_id)
    })
  })

module.exports = router
