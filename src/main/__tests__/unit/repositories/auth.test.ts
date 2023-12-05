import { describe, expect, test } from 'vitest'
import { AuthRepository } from './../../../src/repositories/auth'

import { DataBase } from '../../globalConfig'
import { User } from '$globalTypes/databaseResponse'

describe('Auth Repository', () => {
  const repo = new AuthRepository(DataBase)

  test('registers a new user', async () => {
    const registrationResult = await repo.register({
      name: 'kevin',
      email: 'exampl@example.com'
    })

    expect(registrationResult).toBe(true)
  })

  test('gets user information', async () => {
    const userMock: User = {
      id: 1,
      name: 'kevin',
      email: 'example@example.com'
    }

    // Registrar el usuario mock para simular que ya existe
    await repo.register(userMock)

    const result = await repo.getUser(userMock.id)
    expect(result).toEqual(userMock)
  })
})
