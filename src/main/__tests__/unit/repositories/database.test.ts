import { DatabaseRepository } from '../../../src/repositories/database'
import { DataBase } from '../../globalConfig'
import { describe, expect, test } from 'vitest'

describe.skip('database repository', () => {
  const repo = new DatabaseRepository(DataBase)

  describe('test launch app', () => {
    test('should return true when is the first launch otherwise skip it', async (context) => {
      const firstLaunch = await repo.checkFirstLaunch()

      if (!firstLaunch) {
        console.log('skipping because already launched')
        context.skip()
      }

      expect(firstLaunch).toBe(true)
    })

    test('should return false when not is the first launch', async () => {
      const firstLaunch = await repo.checkFirstLaunch()
      expect(firstLaunch).toBe(false)
    })
  })
})
