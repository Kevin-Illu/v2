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

const stepMock: Partial<Step> = {
  name: 'sub example',
  parent_step_id: null,
  description: 'sub example.example',
  completed: false
}

describe('Todo Repository', () => {
  const repo = new TodoRepository(DataBase)

  describe('creational methods', () => {
    test('create a new todo', async () => {
      const { changes } = await repo.create(todoMock, userMock.id)
      expect(changes).toEqual(1)
    })

    test('create a new step', async () => {
      todoMock.id = 1
      const { changes } = await repo.createStep(stepMock, todoMock.id)

      expect(changes).toEqual(1)
    })
  })
})
