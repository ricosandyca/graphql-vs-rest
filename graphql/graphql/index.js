const { Todo } = require('../models')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = require('graphql')

const DateType = new GraphQLScalarType({ name: 'Date' })

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    createdAt: { type: DateType },
    updatedAt: { type: DateType }
  }
})

const Queries = new GraphQLObjectType({
  name: 'queries',
  fields: {
    todos: {
      type: GraphQLList(TodoType),
      resolve: async () => await Todo.find({})
    },
    todo: {
      type: TodoType,
      args: { _id: { type: GraphQLID } },
      resolve: async (_, { _id }) => await Todo.findById(_id)
    }
  }
})

const InputTodoType = new GraphQLInputObjectType({
  name: 'InputTodo',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    done: { type: GraphQLBoolean }
  }
})

const Mutations = new GraphQLObjectType({
  name: 'mutations',
  fields: {
    createTodo: {
      type: TodoType,
      args: { data: { type: InputTodoType } },
      resolve: async (_, { data }) => {
        const newTodo = new Todo(data)
        return await newTodo.save()
      }
    },
    updateTodo: {
      type: TodoType,
      args: {
        _id: { type: GraphQLID },
        data: { type: InputTodoType }
      },
      resolve: async (_, { _id, data }) => Todo
        .findByIdAndUpdate(_id, data, { new: true })
    },
    deleteTodo: {
      type: TodoType,
      args: { _id: { type: GraphQLID } },
      resolve: async (_, { _id }) => await Todo
        .findByIdAndDelete(_id)
    }
  }
})

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
})
