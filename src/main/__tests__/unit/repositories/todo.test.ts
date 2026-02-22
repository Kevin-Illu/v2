import { describe, expect, test, vi } from 'vitest'

import { TodoRepository } from '../../../src/repositories/todo'
import type { MainDatabaseInstance } from '../../../src/types'

function createDbMock() {
  return {
    fetch: vi.fn(),
    execute: vi.fn()
  } as unknown as MainDatabaseInstance
}

describe('Todo Repository', () => {
  test('getStates returns DB states', async () => {
    const db = createDbMock()
    const states = [{ id: 1, name: 'Active', description: 'Things are happening!' }]
    ;(db.fetch as any).mockResolvedValue(states)

    const repo = new TodoRepository(db)
    const result = await repo.getStates()

    expect(result).toEqual(states)
  })

  test('getTodos maps raw rows to Todo[] domain model', async () => {
    const db = createDbMock()
    ;(db.fetch as any).mockResolvedValue([
      {
        todo_id: 7,
        todo_name: 'Write release notes',
        todo_state_id: 1,
        todo_state_name: 'Active',
        step_id: 9,
        step_name: 'Draft notes',
        parent_step_id: null,
        level: 0,
        parent_name: null,
        todo_description: 'Prepare changelog',
        step_description: 'Collect merged PRs',
        todo_archived: 0,
        step_completed: 0
      }
    ])

    const repo = new TodoRepository(db)
    const result = await repo.getTodos()

    expect(result).toEqual([
      {
        id: 7,
        name: 'Write release notes',
        archived: false,
        state_id: 1,
        state_name: 'Active',
        description: 'Prepare changelog',
        steps: [
          {
            id: 9,
            parent_step_id: null,
            name: 'Draft notes',
            description: 'Collect merged PRs',
            completed: false,
            sub_steps: []
          }
        ]
      }
    ])
  })

  test('createTodo delegates to execute with normalized params', async () => {
    const db = createDbMock()
    ;(db.execute as any).mockResolvedValue({ lastID: 1, changes: 1 })
    const repo = new TodoRepository(db)

    const payload = { state_id: 1, name: 'todo', description: 'desc' } as any
    const result = await repo.createTodo(payload)

    expect(result).toEqual({ lastID: 1, changes: 1 })
    expect(db.execute).toHaveBeenCalledOnce()
  })
})
