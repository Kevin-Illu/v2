import { describe, expect, test, vi } from 'vitest'

import { DatabaseRepository } from '../../../src/repositories/database'
import type { MainDatabaseInstance } from '../../../src/types'

function createDbMock() {
  return {
    fetch: vi.fn(),
    runSerialQueries: vi.fn()
  } as unknown as MainDatabaseInstance
}

describe('DatabaseRepository', () => {
  test('checkFirstLaunch returns false when initialized=true', async () => {
    const db = createDbMock()
    ;(db.fetch as any).mockResolvedValue([{ value: 'true' }])

    const repo = new DatabaseRepository(db)
    const result = await repo.checkFirstLaunch()

    expect(result).toBe(false)
  })

  test('checkFirstLaunch returns true when config table is missing', async () => {
    const db = createDbMock()
    ;(db.fetch as any).mockRejectedValue(new Error('no such table'))

    const repo = new DatabaseRepository(db)
    const result = await repo.checkFirstLaunch()

    expect(result).toBe(true)
  })
})
