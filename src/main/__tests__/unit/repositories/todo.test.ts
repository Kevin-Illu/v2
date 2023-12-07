import { describe, test, expect } from 'vitest'

import { DataBase } from '../../globalConfig'
import { userMock } from '../../mocks'

import { Step, Todo } from '$globalTypes/databaseResponse'
import { TodoRepository } from './../../../src/repositories/todo'

const todoMock: Partial<Todo> = {
  name: 'example',
  archived: false,
  state_id: 1,
  description: 'example.example'
}

// TODO: check what is wrong with this table
const todoDbResponse = {
  archived: 0,
  id: 1,
  created_date: '2023-12-05 04:29:53',
  description: 'a todo example',
  name: 'example',
  steps_id: null,
  state_id: 1,
  parent_step_id: null,
  user_id: 1
}

const stepMock: Partial<Step> = {
  name: 'sub example',
  parent_step_id: null,
  description: 'sub example.example',
  completed: false
}

const stepMockDbResponse = {
  id: 1,
  parent_step_id: null,
  completed: 0,
  archived: 0,
  description: 'sub example.example',
  name: 'sub example',
  todo_id: 1
}

describe('Todo Repository', () => {
  const repo = new TodoRepository(DataBase)

  describe.skip('creational methods', () => {
    test('create a new todo', async () => {
      const { changes } = await repo.createTodo(todoMock, userMock.id)
      expect(changes).toEqual(1)
    })

    test('create a new step', async () => {
      todoMock.id = 1
      const { changes } = await repo.createStep(stepMock, todoMock.id)

      expect(changes).toEqual(1)
    })
  })

  describe('getter methods', () => {
    test('get all the states', async () => {
      const result = await repo.getStates()

      expect(result.length > 0).toBe(true)
    })

    test('get todos', async () => {
      const result = await repo.getTodos()

      expect(result.length > 0).toBe(true)
    })

    test('get todo by id', async () => {
      const result = await repo.getTodoById(1)

      expect(result).toEqual(todoDbResponse)
    })

    test('get step by id', async () => {
      const result = await repo.getStepById(1)

      expect(result).toEqual(stepMockDbResponse)
    })
  })

  describe('update methods', () => {
    test('update todo', async () => {
      const newTodoMock = {
        id: 4,
        name: 'new mock'
      } as Todo

      await repo.updateTodo(newTodoMock)
      const mockModified = await repo.getTodoById(newTodoMock.id)

      expect(mockModified.name).toEqual(newTodoMock.name)
    })

    test('update step', async () => {
      const stepToModify = {
        id: 4,
        name: 'step modified',
        description: 'step modified',
        completed: true
      } as Step

      await repo.updateStep(stepToModify)
      const mockModified = await repo.getStepById(stepToModify.id)

      expect(mockModified.name).toEqual(stepToModify.name)
    })
  })
})
